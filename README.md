# Chess Dapp on Substrate

Dapp to play chess on a Substrate based Blockchain that has the [Chess Pallet](https://github.com/SubstrateChess/pallet-chess) integrated.

:warning: Just for demo purposes :warning:

## Before running the demo
The main branch works agains the branch https://github.com/SubstrateChess/pallet-chess/tree/gmordie which is the pallet chess refactored for the chain: GMorDie(https://github.com/GMorDIE/gm-chain/).

You can run locally this branch, or if you want to run locally the chain with the main branch of Chess Pallet: https://github.com/SubstrateChess/substrate-chess-chain

Move to the branch alexd10s/chess-pallet in this repo.

Have your account in one of this browser extensions: PolkadotJS or Talisman.

Send native token to them to have enought funds to pay the transactions fees.

For the GMorDie implementation you need the token FREN and for the main chess-pallet implementation you the chain has an Asset with id 200, mint tokens to your account. You need them to bet on your chess match.


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
