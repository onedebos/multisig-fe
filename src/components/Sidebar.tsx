import { FunctionComponent } from "react";
import { shortenAddress } from "../../helpers";

type SidebarProps = {
  isConnected: boolean;
  showScreen: any;
  connectWallet: () => void;
  disconnectWallet: () => void;
  walletAddress: string;
};

const Sidebar: FunctionComponent<SidebarProps> = ({
  isConnected,
  showScreen,
  connectWallet,
  disconnectWallet,
  walletAddress,
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

        <div className="mt-8">
          <button
            onClick={!isConnected ? connectWallet : disconnectWallet}
            className={`${!isConnected ? "bg-green-600" : "bg-red-700"} p-2 rounded-md w-full`}
          >
            {!isConnected ? "Connect Wallet" : shortenAddress(walletAddress)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
