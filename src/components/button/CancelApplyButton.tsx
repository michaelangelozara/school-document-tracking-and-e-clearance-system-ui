type CancelApplyPropsType = {
  cancel: () => void;
  apply: () => void;
};
const CancelApplyButton = ({ cancel, apply }: CancelApplyPropsType) => {
  return (
    <div className="flex justify-end gap-4 pr-3">
      <button
        onClick={cancel}
        className="bg-red-500 hover:bg-red-400 text-white p-1 rounded-md"
      >
        Cancel
      </button>
      <button
        onClick={apply}
        className="bg-green-500 hover:bg-green-400 text-white p-1 rounded-md"
      >
        Apply
      </button>
    </div>
  );
};

export default CancelApplyButton;
