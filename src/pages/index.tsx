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
  } = useTaquito();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target.elements.paymentAmt.value);
    console.log(e.target.elements.receiver.value);
  };

  const handleSubmitSendFunds = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target.elements.amtToSend.value);
    sendFundsToSmartContract(e.target.elements.amtToSend.value);
  };

  return (
    <main className="bg-gray-900 p-10 min-h-screen flex gap-4">
      <Sidebar
        isConnected={isConnected}
        showScreen={setShowScreen}
        connectWallet={connectWallet}
        walletAddress={walletAddress}
        disconnectWallet={disconnectWallet}
      />
      {showScreen === "seeProposals" && <SeeProposals proposals={proposals} contractAddress={contractAddress} />}
      {showScreen === "submitProposal" && <SubmitProposal handleSubmit={handleSubmit} />}
      {showScreen === "sendFunds" && (
        <SendFundsToContract contractBalance={3} handleSubmitSendFunds={handleSubmitSendFunds} />
      )}
    </main>
  );
}
