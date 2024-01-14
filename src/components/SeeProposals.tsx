import { Fragment, FunctionComponent } from "react";
import { shortenAddress } from "../../helpers";

interface SeeProposalsProps {
  proposals: Array<Proposal>;
  contractAddress: string;
  voteOnProposal: () => void;
}

interface Proposal {
  paymentAmt: number;
  receiver: string;
  voters: Array<String>;
  votingComplete: boolean;
}

const SeeProposals: FunctionComponent<SeeProposalsProps> = ({
  proposals,
  contractAddress,
  voteOnProposal,
}: SeeProposalsProps) => {
  return (
    <div className="bg-gray-800 mt-10 rounded-md p-10 min-w-2xl">
      <h2 className="text-xl">Proposals in this Contract</h2>
      <p className="text-gray-500 mb-5">Contract Address: {shortenAddress(contractAddress)}</p>
      <div className="grid grid-cols-5 bg-gray-500 p-2 rounded-sm mb-3">
        <p className="font-medium text-gray-200 text-center">Payment Amt.</p>
        <p className="font-medium text-gray-200 text-center">Receiver</p>
        <p className="font-medium text-gray-200 text-center">No. of Votes</p>
        <p className="font-medium text-gray-200 text-center">Status</p>
      </div>
      <div className="grid items-center text-center grid-cols-5 gap-4">
        {proposals?.map((proposal, index) => (
          <Fragment key={index}>
            <p>{proposal.paymentAmt / 1000000} XTZ</p>
            <p>{shortenAddress(proposal.receiver)}</p>
            <p>{proposal.voters.length}</p>
            <p className={`${proposal.votingComplete ? "text-green-600" : "text-red-500"}`}>
              {proposal.votingComplete ? "Completed" : "Pending"}
            </p>
            <button
              onClick={voteOnProposal}
              className={` text-white font-bold py-2 px-4 rounded  ${
                proposal.votingComplete ? "cursor-not-allowed bg-gray-700 opacity-50" : "bg-green-500"
              }`}
            >
              Approve
            </button>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default SeeProposals;
