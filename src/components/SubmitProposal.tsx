import { FunctionComponent } from "react";
import FormInput from "./FormInput";

interface sendFundsToSmartContractProps {
  sendFundsToSmartContract: () => void;
}

const SubmitProposal: FunctionComponent<sendFundsToSmartContractProps> = ({ sendFundsToSmartContract }) => {
  return (
    <div className="bg-gray-800 mt-10 rounded-md p-10">
      <h2 className="text-xl mb-4 font-medium">Submit a Proposal</h2>
      <p className="max-w-xs mb-3">Submit a new proposal for other members to approve.</p>
      <div className="flex flex-col">
        <FormInput label="Payment Amount (XTZ):" type="number" placeholder="10" />
        <FormInput label="Receiver Address:" type="text" placeholder="e.g tz1ayagi1KJN4Hfiu51CzBFTXuHabVhTUvzD" />
      </div>
      <button onClick={() => sendFundsToSmartContract()} className="bg-green-500 p-2 rounded-md w-full">
        Submit Proposal
      </button>
    </div>
  );
};

export default SubmitProposal;
