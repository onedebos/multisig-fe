import { FunctionComponent, FormEvent } from "react";
import FormInput from "./FormInput";

interface sendFundsToContractProps {
  handleSubmitSendFunds: (e: FormEvent<HTMLFormElement>) => void;
  contractBalance: number;
  loading: boolean;
}

const SendFundsToContract: FunctionComponent<sendFundsToContractProps> = ({
  handleSubmitSendFunds,
  contractBalance,
  loading,
}) => {
  return (
    <div className="bg-gray-800 mt-10 rounded-md p-10">
      <h2 className="text-xl mb-4 font-medium">Send Funds to MultiSig</h2>
      <p className="font-medium text-sm text-yellow-500">Current MultiSig Balance: {contractBalance} XTZ</p>
      <p className="max-w-xs mb-3 mt-3">Add some funds to the MultiSig Contract Here.</p>
      <form onSubmit={handleSubmitSendFunds}>
        <FormInput type="number" label="Amount (XTZ)" placeholder="Enter amount: " name="amtToSend" />
        <button type="submit" className="bg-green-500 p-2 rounded-md w-full">
          {!loading ? "Send Funds" : "Loading...."}
        </button>
      </form>
    </div>
  );
};

export default SendFundsToContract;
