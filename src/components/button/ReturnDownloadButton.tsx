type PrintDownloadButtonPropsType = {
  onClickReturn: () => void;
  onClickDownload: () => void;
  placement: string;
};
const ReturnDownloadButton = ({
  onClickReturn,
  onClickDownload,
  placement,
}: PrintDownloadButtonPropsType) => {
  let position = "";

  if (placement === "left") {
    position = "start";
  } else if (placement === "center") {
    position = "center";
  } else if (placement === "right") {
    position = "end";
  }

  return (
    <div className={`flex gap-2 ${position !== "" && "justify-" + position}`}>
      <button
        onClick={onClickReturn}
        className="p-1 rounded-sm bg-darkContrast text-white hover:bg-secondary"
      >
        Return
      </button>
      <button
        onClick={onClickDownload}
        className="p-1 rounded-sm bg-darkContrast text-white hover:bg-secondary"
      >
        Download
      </button>
    </div>
  );
};

export default ReturnDownloadButton;
