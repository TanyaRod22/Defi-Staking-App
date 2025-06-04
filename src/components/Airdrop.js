import React, { Component } from 'react';

class Airdrop extends Component {
    constructor() {
        super();
        this.state = { time: {}, seconds: 20 };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));
        let minutes = Math.floor((secs % (60 * 60)) / 60);
        let seconds = Math.ceil(secs % 60);

        return { h: hours, m: minutes, s: seconds };
    }

    startTimer() {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    async countDown() {
        let seconds = this.state.seconds - 1;

        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds
        });

        if (seconds === 0) {
            clearInterval(this.timer);

            try {
                await this.props.decentralBankContract.methods.issueTokens()
                    .send({ from: window.ethereum.selectedAddress });

                console.log("Airdrop successful");
            } catch (err) {
                console.error("Airdrop failed", err);
            }
        }
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.stakingBalance !== this.props.stakingBalance &&
            this.props.stakingBalance >= '50000000000000000000'
        ) {
            this.startTimer();
        }
    }

    render() {
        return (
            <div style={{ color: 'black' }}>
                AIRDROP in: {this.state.time.m}:{this.state.time.s}
            </div>
        );
    }
}

export default Airdrop;
