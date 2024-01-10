import Sidebar from "@/components/Sidebar";
import SubmitProposal from "@/components/SubmitProposal";
import SeeProposals from "@/components/SeeProposals";
import useTaquito from "@/hooks/useTaquito";
import { useState } from "react";

export default function Home() {
  const [isSeeProposalsScreen, setIsSeeProposalsScreen] = useState(true);
  const {
    walletAddress,
    connectWallet,
    contractAddress,
    proposals,
    isConnected,
    disconnectWallet,
    sendFundsToSmartContract,
  } = useTaquito();

  return (
    <main className="bg-gray-900 p-10 min-h-screen flex gap-4">
      <Sidebar
        isConnected={isConnected}
        showSeeProposal={setIsSeeProposalsScreen}
        connectWallet={connectWallet}
        walletAddress={walletAddress}
        disconnectWallet={disconnectWallet}
      />
      {isSeeProposalsScreen ? (
        <SeeProposals proposals={proposals} contractAddress={contractAddress} />
      ) : (
        <SubmitProposal sendFundsToSmartContract={sendFundsToSmartContract} />
      )}
    </main>
  );
}
