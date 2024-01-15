import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import { NetworkType } from "@airgap/beacon-sdk";
import { useState, useRef, useEffect } from "react";

const useTaquito = () => {
  const rpcUrl = "https://ghostnet.ecadinfra.com";
  const contractAddress = "KT1QfJbWR1Hg3R8FtSnmuPv4mpvekqZuZi7a";
  const Tezos = new TezosToolkit(rpcUrl);
  const network = NetworkType.GHOSTNET;

  const [walletAddress, setWalletAddress] = useState("");
  const [proposals, setProposals] = useState([]);

  const connectWallet = async () => {};

  const disconnectWallet = () => {};

  const getSmartContractStorage = () => {};

  const setSmartContractStorage = () => {};

  const sendFundsToSmartContract = () => {};

  return { walletAddress, connectWallet, disconnectWallet, contractAddress, proposals };
};

export default useTaquito;
