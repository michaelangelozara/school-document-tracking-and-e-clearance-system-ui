type ConfirmationModalPropsType = {
  message: string;
  cancel: () => void;
  confirm: () => void;
};
const ConfirmationModal = ({
  message,
  cancel,
  confirm,
}: ConfirmationModalPropsType) => {
  return (
    <div className="fixed inset-0 bg-black/25 flex justify-center items-center z-60 text-darkContrast">
      <div className="bg-white w-[18rem] gap-3 rounded-md grid grid-cols-1 grid-rows-2 p-2 ">
        <div className="row-span-2 flex justify-center items-center">
          <h1 className="text-md text-center font-semibold">
            {message}
            <br />
            <span className="text-xs font-normal">
              By clicking Confirm, you acknowledge that the information provided
              is accurate and you authorize this action. This action is final
              and cannot be undone.
            </span>
          </h1>
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={cancel}
            className="text-xm w-[4.5rem] h-[2rem] bg-darkContrast text-white hover:bg-secondary p-1 pl-3 pr-3 font-semibold rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={confirm}
            className="text-xm w-[5rem] h-[2rem] bg-darkContrast text-white hover:bg-secondary p-1 pl-3 pr-3 font-semibold rounded-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
