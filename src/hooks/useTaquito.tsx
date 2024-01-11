import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import { NetworkType } from "@airgap/beacon-sdk";
import { useState, useEffect } from "react";

type sendFundsToSmartContractTypes = {
  amount: string;
  receiver: string;
};

const useTaquito = () => {
  const rpcUrl = "https://ghostnet.ecadinfra.com";
  const contractAddress = "KT1QfJbWR1Hg3R8FtSnmuPv4mpvekqZuZi7a";
  const Tezos = new TezosToolkit(rpcUrl);
  const network = NetworkType.GHOSTNET;

  const [walletAddress, setWalletAddress] = useState("");
  const [proposals, setProposals] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  let wallet: BeaconWallet;

  const connectWallet = async () => {
    try {
      wallet = new BeaconWallet({
        name: "MultiSig dApp",
        preferredNetwork: network,
      });

      Tezos.setWalletProvider(wallet);

      await wallet.requestPermissions({
        network: {
          type: NetworkType.GHOSTNET,
          rpcUrl,
        },
      });
      const address = await wallet.getPKH();
      console.log({ address, wallet });
      setWalletAddress(address);
      setIsConnected(true);
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWallet = () => {
    wallet?.clearActiveAccount();
    console.log({ wallet });
    setWalletAddress("");
    setIsConnected(false);
  };

  const sendFundsToSmartContract = async (amount: number, receiver: string) => {
    if (amount && receiver) {
      setLoading(true);
      try {
        const op = await Tezos.wallet.transfer({ to: receiver, amount }).send();
        await op.confirmation();
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  const getSmartContractStorage = () => {};

  const setSmartContractStorage = () => {};

  return {
    walletAddress,
    connectWallet,
    disconnectWallet,
    contractAddress,
    proposals,
    isConnected,
    sendFundsToSmartContract,
  };
};

export default useTaquito;
