import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import { NetworkType } from "@airgap/beacon-sdk";
import { useState, useEffect, useRef } from "react";

const useTaquito = () => {
  const rpcUrl = "https://ghostnet.ecadinfra.com";
  const contractAddress = "KT1H9ZkKu3evkSAwHbjii8YjCzeg9GtMF2BF";
  const Tezos = new TezosToolkit(rpcUrl);
  const network = NetworkType.GHOSTNET;

  const walletRef = useRef<BeaconWallet>();

  walletRef.current && Tezos.setProvider({ wallet: walletRef.current });

  const [walletAddress, setWalletAddress] = useState("");
  const [proposals, setProposals] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contractBalance, setContractBalance] = useState(0);
  const [reloadScreen, setReloadScreen] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    msg: "",
  });

  useEffect(() => {
    getSmartContractBalance();
    getSmartContractStorage();

    if (reloadScreen) {
      getSmartContractBalance();
      getSmartContractStorage();
      setReloadScreen(false);
    }
  }, [reloadScreen]);

  const connectWallet = async () => {
    try {
      const wallet = new BeaconWallet({
        name: "MultiSig dApp",
        preferredNetwork: network,
      });

      await wallet.requestPermissions({
        network: {
          type: NetworkType.GHOSTNET,
          rpcUrl,
        },
      });

      walletRef.current = wallet;
      const address = await wallet.getPKH();

      setWalletAddress(address);
      setIsConnected(true);

      console.log({ address, wallet });
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWallet = () => {
    walletRef.current?.clearActiveAccount();
    console.log(walletRef.current);
    setWalletAddress("");
    setIsConnected(false);
  };

  const sendFundsToSmartContract = async (amount: number) => {
    setMessage({ ...message, msg: "" });

    if (!walletAddress) {
      setMessage({ ...message, msg: "Connect a wallet" });
      return;
    }
    if (amount) {
      try {
        setLoading(true);
        const contract = await Tezos.wallet.at(contractAddress);
        const op = await contract.methods.deposit().send({ amount });
        await op.confirmation();
        setMessage({ ...message, msg: "Funds sent to contract!" });
        setReloadScreen(true);
        setLoading(false);
      } catch (error: any) {
        console.log(error[0].message);
        setMessage({ type: "error", msg: error.message });
        setLoading(false);
      }
    }
  };

  const getSmartContractStorage = async () => {
    setLoading(true);
    try {
      setLoading(true);
      const proposalsArr: any = [];
      const contract = await Tezos.contract.at(contractAddress);
      // Get the contract's storage
      const storage: any = await contract.storage();

      // Get the proposals within the contract's storage
      const proposalsBigMap = storage.proposals;

      // Get the Keys for all proposals in the contract so we can fetch all
      // proposals using their keys
      // This is how to access the data within a BigMapAbstraction class
      const proposalKeys = storage.proposalKeys;

      // Get the values contained within each proposalKey
      const values = await Promise.all(proposalKeys.map((key) => proposalsBigMap.get(key)));
      await proposalKeys.map((key, index) => proposalsArr.push(values[index]));

      if (proposalsArr.length > 0) {
        setProposals(proposalsArr);
      }

      setLoading(false);
      return;
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const setSmartContractStorage = async (receiver: string, paymentAmt: number) => {
    setMessage({ msg: "", type: "" });
    if (!walletAddress) {
      setMessage({ ...message, msg: "Connect a wallet" });
      return;
    }
    try {
      setLoading(true);
      const contract = await Tezos.wallet.at(contractAddress);

      const op = await contract.methodsObject.submit_proposal({ paymentAmt: paymentAmt * 1000000, receiver }).send();

      await op.confirmation();

      console.log({ op });

      setMessage({ type: "success", msg: "Proposal submitted!" });
      setLoading(false);
      setReloadScreen(true);
    } catch (error: any) {
      console.log(error.message);
      setMessage({ type: "error", msg: error.message });
      setLoading(false);
    }
  };

  const getSmartContractBalance = async () => {
    const balance = await Tezos.tz.getBalance(contractAddress);
    setContractBalance(balance.toNumber() / 1000000);
  };

  const voteOnProposal = async () => {
    setMessage({ msg: "", type: "" });
    if (!walletAddress) {
      setMessage({ ...message, msg: "Connect a wallet" });
      return;
    }

    try {
      setLoading(true);
      const contract = await Tezos.wallet.at(contractAddress);

      const op = await contract.methods.vote_on_proposal().send();

      await op.confirmation();
      setMessage({ type: "success", msg: "Vote accepted!" });
      setReloadScreen(true);
      setLoading(false);
    } catch (error: any) {
      console.log(error.message);
      setMessage({ type: "error", msg: error.message });
      setLoading(false);
    }
  };

  return {
    walletAddress,
    connectWallet,
    disconnectWallet,
    contractAddress,
    proposals,
    isConnected,
    sendFundsToSmartContract,
    setSmartContractStorage,
    loading,
    message,
    contractBalance,
    voteOnProposal,
  };
};

export default useTaquito;
