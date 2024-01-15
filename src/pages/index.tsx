import Sidebar from "@/components/Sidebar";
import SubmitProposal from "@/components/SubmitProposal";
import SeeProposals from "@/components/SeeProposals";
import SendFundsToContract from "@/components/SendFundsToContract";
import { FormEvent, useState } from "react";
import useTaquito from "@/hooks/useTaquito";

export default function Home() {
  const [showScreen, setShowScreen] = useState("seeProposals");

  const { contractAddress } = useTaquito();

  const proposals = [
    {
      paymentAmt: "20",
      votingComplete: true,
      receiver: "tz1ayagi1KJN4Hfiu51CzBFTXuHabVhTUvzD",
      voters: ["tz1ayagi1KJN4Hfiu51CzBFTXuHabVhTUvzD", "tz1ayagi1KJN4Hfiu51CzBFTXuHabVhTUvzD"],
    },
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(e.target.elements.paymentAmt.value);
    console.log(e.target.elements.receiver.value);
  };

  const handleSubmitSendFunds = (e: any) => {
    e.preventDefault();
    console.log(e.target.elements.amtToSend.value);
  };

  return (
    <main className="bg-gray-900 p-10 min-h-screen flex gap-4">
      <Sidebar
        isConnected={true}
        showScreen={setShowScreen}
        connectWallet={() => {}}
        isConnected={() => {}}
        walletAddress={""}
        disconnectWallet={() => {}}
      />
      {showScreen === "seeProposals" && <SeeProposals proposals={proposals} contractAddress={contractAddress} />}
      {showScreen === "submitProposal" && <SubmitProposal handleSubmit={handleSubmit} />}
      {showScreen === "sendFunds" && (
        <SendFundsToContract contractBalance={3} handleSubmitSendFunds={handleSubmitSendFunds} />
      )}
    </main>
  );
}
