import { FunctionComponent } from "react";

type SidebarProps = {
  isConnected: boolean;
  showSeeProposal: any;
};

const Sidebar: FunctionComponent<SidebarProps> = ({ isConnected, showSeeProposal }) => {
  return (
    <div className="mt-10 p-10 bg-gray-800 max-w-sm rounded-lg">
      <h3 className="text-center font-medium text-xl">MultiXTZ Sig</h3>
      <div className="flex flex-col mt-10">
        <button
          onClick={() => showSeeProposal(true)}
          className="bg-white text-black p-3 rounded-md text-center font-medium"
        >
          See Proposals
        </button>
        <button
          onClick={() => showSeeProposal(false)}
          className="bg-white text-black p-3 rounded-md text-center font-medium mt-3"
        >
          Submit a Proposal
        </button>

        <button className={`${!isConnected ? "bg-green-600" : "bg-red-700"} p-2 rounded-md mt-8`}>
          {!isConnected ? "Connect Wallet" : "Disconnect Wallet"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
