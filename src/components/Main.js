import React, {Component} from 'react'
import tether from '../tether.png'
import Airdrop from './Airdrop'

class Main extends Component {
    render() {
        return (
            <div id='content' className='mt-3'>
                <table className='p-4 table text-muted text-center'>
                    <thead>
                    <tr style={{color:'white'}}>
                        <th scope='col'>Staking Balance</th>
                        <th scope='col'>Reward Balance</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr style={{color:'white'}}> 
                        <td>
                            {this.props.stakingBalance
                                ? window.web3.utils.fromWei(this.props.stakingBalance.toString(), 'ether') + " USDT"
                                : "0 USDT"}
                        </td>
                        <td>
                            {this.props.rwdBalance
                                ? window.web3.utils.fromWei(this.props.rwdBalance.toString(), 'ether') + " RWD"
                                : "0 RWD"}
                        </td>

                        </tr>
                    </tbody>
                </table>
                <div className='p-4 card mb-2'style={{opacity:'.9'}}>
                    <form 
                    onSubmit={(event) => {
                        event.preventDefault()
                        let amount
                        amount = this.input.value.toString()
                        amount = window.web3.utils.toWei(amount, 'ether')
                        this.props.stakeTokens(amount)
                    }}
                    className='mb-3'>
                        <div style={{borderSpacing:'0 1em'}}>
                            <label className='float-left' style={{marginLeft:'15px', marginRight:'5px'}}><b>Stake Tokens</b></label>
                            <span className='float-right' style={{marginRight:'8px'}}>
                                Balance: {window.web3.utils.fromWei(this.props.tetherBalance, 'ether')}
                            </span>
                            <div className='input-group mb-4 gap-3'>
                                <input
                                ref={(input)=> {this.input = input} } 
                                type='text'
                                placeholder='0'
                                required />
                                <div className='input-group-open'>
                                    <div className='input-group-text'>
                                        <img src={tether} alt='tether' height='32' />
                                        &nbsp;&nbsp;&nbsp; USDT
                                    </div>
                                </div>
                            </div>
                            <button type='submit' className='btn btn-primary btn-lg btn-block'>DEPOSIT</button>
                        </div>
                    </form>
                    <button 
                    type='submit'
                    onClick={(event) => {
                        event.preventDefault(
                        this.props.unstakeTokens()
                        )
                    }}
                    className='btn btn-primary btn-lg btn-block'>WITHDRAW</button>
                    <div className='card-body text-center' style={{color:'blue'}}>
                    <Airdrop
                    stakingBalance={this.props.stakingBalance}
                    decentralBankContract={this.props.decentralBankContract} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;