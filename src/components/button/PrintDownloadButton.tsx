type PrintDownloadButtonPropsType = {
  placement: string;
};
const PrintDownloadButton = ({ placement }: PrintDownloadButtonPropsType) => {
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
      <button className="p-1 rounded-sm bg-darkContrast text-white">
        Download
      </button>
      <button className="p-1 rounded-sm bg-darkContrast text-white">
        Print
      </button>
    </div>
  );
};

export default PrintDownloadButton;
