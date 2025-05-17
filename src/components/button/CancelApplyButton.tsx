import { useNavigate } from "react-router-dom";

type CancelApplyPropsType = {
  apply: () => void;
};
const CancelApplyButton = ({ apply }: CancelApplyPropsType) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-end gap-4 pr-3 md:text-lg">
      <button
        onClick={() => navigate("/home/letters")}
        className="bg-red-500 hover:bg-red-400 text-white p-1 md:p-2 rounded-md cursor-pointer"
      >
        Cancel
      </button>
      <button
        onClick={apply}
        className="bg-green-500 hover:bg-green-400 text-white p-1 md:p-2 rounded-md cursor-pointer"
      >
        Apply
      </button>
    </div>
  );
};

export default CancelApplyButton;
