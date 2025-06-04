import React, { Component } from 'react'
import Navbar from './Navbar'
import Web3 from 'web3'
import './App.css'
import Main from './Main'
import Tether from '../truffle_abis/Tether.json'
import RWD from '../truffle_abis/RWD.json'
import DecentralBank from '../truffle_abis/DecentralBank.json'
import ParticleSettings from './ParticleSettings'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      tether: {},
      rwd: {},
      decentralBank: {},
      tetherBalance: '0',
      rwdTokenBalance: '0',
      stakingBalance: '0',
      loading: true
    }
  }

  async componentDidMount() {
    await this.loadWeb3()
    if (window.web3) {
      await this.loadBlockchainData()
    }
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
      } catch (error) {
        console.error("User denied account access")
      }
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    if (!web3) {
      console.error("Web3 is not initialized. Please ensure MetaMask is installed and connected.")
      return
    }

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId();
    console.log("Your network ID:", networkId);
    

    // Load Tether contract
    const tetherData = Tether.networks[networkId]
    if (tetherData) {
      const tether = new web3.eth.Contract(Tether.abi, tetherData.address)
      this.setState({ tether })
      const tetherBalance = await tether.methods.balanceOf(accounts[0]).call()
      this.setState({ tetherBalance: tetherBalance.toString() })
    } else {
      window.alert("Tether contract not deployed to detected network")
    }

    // Load RWD contract
    const rwdTokenData = RWD.networks[networkId]
    if (rwdTokenData) {
      const rwd = new web3.eth.Contract(RWD.abi, rwdTokenData.address)
      this.setState({ rwd })
      const rwdTokenBalance = await rwd.methods.balanceOf(accounts[0]).call()
      this.setState({ rwdTokenBalance: rwdTokenBalance.toString() })
    } else {
      window.alert("Reward Token contract not deployed to detected network")
    }

    // Load DecentralBank contract
    const decentralBankData = DecentralBank.networks[networkId]
    if (decentralBankData) {
      const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address)
      this.setState({ decentralBank })
      const stakingBalance = await decentralBank.methods.stakingBalance(accounts[0]).call()
      this.setState({ stakingBalance: stakingBalance.toString() })
    } else {
      window.alert("DecentralBank contract not deployed to detected network")
    }

    this.setState({ loading: false })
  }

  stakeTokens = async (amount) => {
    this.setState({ loading: true });
    const gasPrice = await window.web3.eth.getGasPrice();
    
    this.state.tether.methods
      .approve(this.state.decentralBank._address, amount)
      .send({ from: this.state.account, gasPrice })
      .on("transactionHash", () => {
        this.state.decentralBank.methods
          .depositTokens(amount)
          .send({ from: this.state.account, gasPrice })
          .on("transactionHash", async () => {
            await this.loadBlockchainData();
            this.setState({ loading: false });
          })
          .on("error", (error) => {
            console.error("Unstake error:", error);
          });
      });
  };
  
  unstakeTokens = async () => {
    this.setState({ loading: true });
    const gasPrice = await window.web3.eth.getGasPrice();

    this.state.decentralBank.methods.unstakeTokens()
      .send({ from: this.state.account, gasPrice })
      .on("transactionHash", async () => {
        await this.loadBlockchainData();
        this.setState({ loading: false });
      })
      .on("error", (error) => {
        console.error("Unstake error:", error);
      });
  };
  
  render() {
    let content = this.state.loading
      ? <p id="loader" className='text-center' style={{ color: 'white', margin: '30px' }}>LOADING PLEASE...</p>
      : <Main
          tetherBalance={this.state.tetherBalance}
          rwdBalance={this.state.rwdTokenBalance}
          stakingBalance={this.state.stakingBalance}
          stakeTokens={this.stakeTokens}
          unstakeTokens={this.unstakeTokens}
          decentralBankContract={this.decentralBank}
        />

    return (
      <div className="App" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute' }}>
          <ParticleSettings />
        </div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main
              role="main"
              className="col-lg-12 ml-auto mr-auto"
              style={{ maxWidth: '600px', minHeight: '100vh' }}
            >
              <div>{content}</div>
            </main>
          </div>
        </div>
      </div>
    )
  }
}

export default App