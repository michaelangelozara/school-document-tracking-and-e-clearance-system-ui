type BackButtonPropsType = {
  onClick: () => void;
};
const ReturnButton = ({ onClick }: BackButtonPropsType) => {
  return (
    <button
      className="underline mb-2 text-[13px] text-darkContrast"
      onClick={onClick}
    >
      Return
    </button>
  );
};

export default ReturnButton;
