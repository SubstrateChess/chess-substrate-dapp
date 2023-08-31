# Chess Dapp on Substrate

Dapp to play chess on a Substrate based Blockchain that has the [Chess Pallet](https://github.com/SubstrateChess/pallet-chess) integrated.

:warning: Just for demo purposes :warning:

## Before running the demo

Run locally the chain with the main branch of Chess Pallet: https://github.com/SubstrateChess/substrate-chess-chain or integrate the pallet in your chain with the instructions in the Pallet README: https://github.com/SubstrateChess/pallet-chess

Have your account in one of this browser extensions: PolkadotJS or Talisman.

Send native token to them to have enought funds to pay the transactions fees.

The chain has an Asset with id 200, mint tokens to your account. You need them to bet on your chess match.


### Running the front end locally

Obtain the necessary dependencies so the artifacts can be build and run:

```
yarn install
yarn start
```

## Access through your browser

You can now find in your browser this React application at:

```
http://localhost:1234/
```

## Deployed version

There is a version deployed in https://main--zippy-cobbler-181a0f.netlify.app/

This version is deployed in the Blockchan GMorDie(https://github.com/GMorDIE/gm-chain/) which is the pallet chess refactored for this specific chain, 
you can see it in the branch https://github.com/SubstrateChess/pallet-chess/tree/gmordie

The code of this dapp adapted for this chain is in the branch gmordie: https://github.com/SubstrateChess/chess-substrate-dapp/tree/gmordie

Have your account in one of this browser extensions: PolkadotJS or Talisman.
For this version you need the native token FREN to have enought funds to pay the transactions fees and the bet to start the game.