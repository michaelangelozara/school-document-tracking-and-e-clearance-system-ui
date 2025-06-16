import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/Store";
import { ModeType } from "../../types/letter/BaseLetter";

type CancelApplyPropsType = {
  apply: () => void;
  mode: ModeType;
};
const ApplyUpdateButton = ({ apply, mode }: CancelApplyPropsType) => {
  const navigate = useNavigate();
  const isLoading = useSelector(
    (state: RootState) => state.eSignature.isFetching
  );

  const isApplying = useSelector((state: RootState) => state.letter.isApplying);
  return (
    <div className="flex justify-end gap-4 pr-3 md:text-lg">
      <button
        onClick={() => navigate("/home/letters")}
        className="bg-red-500 hover:bg-red-400 text-white p-1 md:p-2 rounded-md cursor-pointer"
      >
        Cancel
      </button>
      <button
        disabled={isLoading}
        onClick={apply}
        className="bg-green-500 hover:bg-green-400 text-white p-1 md:p-2 rounded-md cursor-pointer"
      >
        {mode === "apply"
          ? isApplying
            ? "Applying"
            : "Apply"
          : isApplying
          ? "Updating"
          : "Update"}
      </button>
    </div>
  );
};

export default ApplyUpdateButton;
