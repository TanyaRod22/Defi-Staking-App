# 💰 DeFi Token Staking Application

A full-stack decentralized finance (DeFi) staking platform that allows users to stake mock USDT tokens and earn reward tokens (RWD). Built with **React**, **Web3.js**, **Solidity**, **Truffle**, and **Ganache**, this project simulates real-world DeFi yield farming and staking mechanisms.

## 📌 Overview

This project was developed as a termination project at Binghamton University. It demonstrates the complete lifecycle of a decentralized application (dApp)—from smart contract creation to frontend integration—with a focus on transparent, blockchain-based token staking and rewards distribution.

Users can:

- Connect their MetaMask wallet
- Stake mock USDT tokens
- Earn and withdraw RWD tokens as rewards
- View balances and transaction updates in real-time

## 🧱 Tech Stack

### 🔹 Frontend
- React.js
- Bootstrap
- @tsparticles/react (for animated background)
- Web3.js

### 🔹 Smart Contracts
- Solidity (v0.5.0)
- Truffle Framework

### 🔹 Blockchain & Tooling
- Ganache (local Ethereum blockchain)
- MetaMask
- Mocha + Chai for testing
- npm for package management

## 🏗️ Architecture

The project consists of 3 core layers:

| Layer         | Description |
|---------------|-------------|
| Frontend      | React-based UI to interact with smart contracts |
| Smart Contracts | Solidity contracts for USDT, RWD, and DecentralBank |
| Blockchain Backend | Local Ethereum blockchain via Ganache |

## 📂 Project Structure

defi-staking-app/
├── client/   # React 
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Airdrop.js
│       │   ├── Main.js
│       │   ├── Navbar.js
│       ├── ParticleSettings.js
│       ├── App.js
│       └── index.js
├── contracts/                 # Solidity smart contracts
│   ├── Tether.sol
│   ├── RWD.sol
│   └── DecentralBank.sol
├── migrations/                # Truffle migration scripts
│   ├── 1_initial_migration.js
│   ├── 2_deploy_contracts.js
├── test/                      # Smart contract tests (Mocha + Chai)
│   └── decentralbank.test.js
├── truffle-config.js          # Truffle configuration
├── package.json               # Project metadata and dependencies
├── README.md

## 🔐 Smart Contract Summary

- **Tether (USDT):** Mock stablecoin used for staking.
- **RWD Token:** Reward token distributed for staking.
- **DecentralBank:** Core logic for deposit, withdrawal, and reward issuance.

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- Truffle CLI
- Ganache
- MetaMask

### Steps

# Clone the repo
git clone https://github.com/tanyarodrigues/defi-staking-app.git
cd defi-staking-app

# Install dependencies
npm install

# Compile smart contracts
truffle compile

# Start Ganache (ensure it's running on port 8545)

# Deploy contracts
truffle migrate

# Run the frontend
npm start
