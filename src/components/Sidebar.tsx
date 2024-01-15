import { FunctionComponent } from "react";

type SidebarProps = {
  isConnected: boolean;
  showScreen: any;
  connectWallet: () => void;
  walletAddress: string;
  disconnectWallet: () => void;
};

const Sidebar: FunctionComponent<SidebarProps> = ({
  isConnected,
  showScreen,
  connectWallet,
  walletAddress,
  disconnectWallet,
}) => {
  return (
    <div className="mt-10 p-10 bg-gray-800 max-w-sm rounded-lg">
      <h3 className="text-center font-medium text-xl">MultiXTZ Sig</h3>
      <div className="flex flex-col mt-10">
        <button
          onClick={() => showScreen("seeProposals")}
          className="bg-white text-black p-3 rounded-md text-center font-medium"
        >
          See Proposals
        </button>
        <button
          onClick={() => showScreen("submitProposal")}
          className="bg-white text-black p-3 rounded-md text-center font-medium mt-3"
        >
          Submit a Proposal
        </button>
        <button
          onClick={() => showScreen("sendFunds")}
          className="bg-white text-black p-3 rounded-md text-center font-medium mt-3"
        >
          Fund Contract
        </button>

        <button
          onClick={connectWallet}
          className={`${!isConnected ? "bg-green-600" : "bg-red-700"} p-2 rounded-md mt-8`}
        >
          {!isConnected ? "Connect Wallet" : "Disconnect Wallet"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
