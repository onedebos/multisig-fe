import { FunctionComponent } from "react";
import { shortenAddress } from "../../helpers";

interface SeeProposalsProps {
  proposals: Array<Proposal>;
  contractAddress: string;
}

interface Proposal {
  paymentAmt: string;
  receiver: string;
  voters: Array<String>;
  votingComplete: boolean;
}

const SeeProposals: FunctionComponent<SeeProposalsProps> = ({ proposals, contractAddress }: SeeProposalsProps) => {
  return (
    <div className="bg-gray-800 mt-10 rounded-md p-10 min-w-2xl">
      <h2 className="text-xl">Proposals in this Contract</h2>
      <p className="text-gray-500 mb-5">Contract Address: {shortenAddress(contractAddress)}</p>
      <div className="grid grid-cols-5 bg-gray-500 p-2 rounded-sm mb-3">
        <p className="font-medium text-gray-400 text-center">Payment Amt.</p>
        <p className="font-medium text-gray-400 text-center">Receiver</p>
        <p className="font-medium text-gray-400 text-center">No. of Votes</p>
        <p className="font-medium text-gray-400 text-center">Status</p>
      </div>
      <div className="grid items-center text-center grid-cols-5 gap-4">
        {proposals?.map((proposal) => (
          <>
            <p>{proposal.paymentAmt}</p>
            <p>{shortenAddress(proposal.receiver)}</p>
            <p>{proposal.voters.length}</p>
            <p className={`${proposal.votingComplete ? "text-green-600" : "text-red-500"}`}>
              {proposal.votingComplete ? "Completed" : "Pending"}
            </p>
            <button
              className={` text-white font-bold py-2 px-4 rounded  ${
                proposal.votingComplete ? "cursor-not-allowed bg-gray-700 opacity-50" : "bg-green-500"
              }`}
            >
              Approve
            </button>
          </>
        ))}
      </div>
    </div>
  );
};

export default SeeProposals;
