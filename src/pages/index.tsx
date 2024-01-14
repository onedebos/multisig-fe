import Sidebar from "@/components/Sidebar";
import SubmitProposal from "@/components/SubmitProposal";
import SeeProposals from "@/components/SeeProposals";
import useTaquito from "@/hooks/useTaquito";
import { FormEvent, useState } from "react";
import SendFundsToContract from "@/components/SendFundsToContract";

export default function Home() {
  const [showScreen, setShowScreen] = useState("seeProposals");
  const {
    walletAddress,
    connectWallet,
    contractAddress,
    proposals,
    isConnected,
    disconnectWallet,
    sendFundsToSmartContract,
    setSmartContractStorage,
    loading,
    message,
    contractBalance,
    voteOnProposal,
  } = useTaquito();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const paymentAmt = parseInt(e.target.elements.paymentAmt.value);
    const receiver = e.target.elements.receiver.value;
    setSmartContractStorage(receiver, paymentAmt);
  };

  const handleSubmitSendFunds = (e: any) => {
    e.preventDefault();
    sendFundsToSmartContract(e.target.elements.amtToSend.value);
  };

  return (
    <main className="bg-gray-900 p-10 min-h-screen flex gap-4">
      <p className="text-center">{message.msg}</p>
      <Sidebar
        isConnected={isConnected}
        showScreen={setShowScreen}
        connectWallet={connectWallet}
        walletAddress={walletAddress}
        disconnectWallet={disconnectWallet}
      />
      {showScreen === "seeProposals" && (
        <SeeProposals proposals={proposals} contractAddress={contractAddress} voteOnProposal={voteOnProposal} />
      )}
      {showScreen === "submitProposal" && <SubmitProposal handleSubmit={handleSubmit} loading={loading} />}
      {showScreen === "sendFunds" && (
        <SendFundsToContract
          contractBalance={contractBalance}
          handleSubmitSendFunds={handleSubmitSendFunds}
          loading={loading}
        />
      )}
    </main>
  );
}
