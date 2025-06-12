type LetterRejectButtonPropsType = {
  onClickReject: () => void;
};
const LetterRejectButton = ({ onClickReject }: LetterRejectButtonPropsType) => {
  return (
    <button
      onClick={onClickReject}
      className="p-1 rounded-sm bg-darkContrast text-white hover:bg-secondary"
    >
      Reject
    </button>
  );
};

export default LetterRejectButton;
