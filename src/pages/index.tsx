import Sidebar from "@/components/Sidebar";
import SubmitProposal from "@/components/SubmitProposal";
import SeeProposals from "@/components/SeeProposals";
import { FormEvent, useState } from "react";

export default function Home() {
  const [isSeeProposalsScreen, setIsSeeProposalsScreen] = useState(true);

  const proposals = [
    {
      paymentAmt: "20",
      votingComplete: true,
      receiver: "tz1ayagi1KJN4Hfiu51CzBFTXuHabVhTUvzD",
      voters: ["tz1ayagi1KJN4Hfiu51CzBFTXuHabVhTUvzD", "tz1ayagi1KJN4Hfiu51CzBFTXuHabVhTUvzD"],
    },
  ];

  const contractAddress = "KT1QfJbWR1Hg3R8FtSnmuPv4mpvekqZuZi7a";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target.elements.paymentAmt.value);
    console.log(e.target.elements.receiver.value);
  };

  return (
    <main className="bg-gray-900 p-10 min-h-screen flex gap-4">
      <Sidebar isConnected={true} showSeeProposal={setIsSeeProposalsScreen} connectWallet={() => {}} />
      {isSeeProposalsScreen ? (
        <SeeProposals proposals={proposals} contractAddress={contractAddress} />
      ) : (
        <SubmitProposal handleSubmit={handleSubmit} />
      )}
    </main>
  );
}
