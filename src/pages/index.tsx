import Sidebar from "@/components/Sidebar";
import SubmitProposal from "@/components/SubmitProposal";
import SeeProposals from "@/components/SeeProposals";
import useTaquito from "@/hooks/useTaquito";
import { useState } from "react";

export default function Home() {
  const [isSeeProposalsScreen, setIsSeeProposalsScreen] = useState(true);
  const { walletAddress, connectWallet, contractAddress } = useTaquito();

  const proposals = [
    {
      paymentAmt: "20",
      votingComplete: true,
      receiver: "tz1ayagi1KJN4Hfiu51CzBFTXuHabVhTUvzD",
      voters: ["tz1ayagi1KJN4Hfiu51CzBFTXuHabVhTUvzD", "tz1ayagi1KJN4Hfiu51CzBFTXuHabVhTUvzD"],
    },
  ];

  return (
    <main className="bg-gray-900 p-10 min-h-screen flex gap-4">
      <Sidebar isConnected={true} showSeeProposal={setIsSeeProposalsScreen} />
      {isSeeProposalsScreen ? (
        <SeeProposals proposals={proposals} contractAddress={contractAddress} />
      ) : (
        <SubmitProposal />
      )}
    </main>
  );
}
