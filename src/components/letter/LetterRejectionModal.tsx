import React, { ChangeEvent } from "react";

type LetterRejectionModalPropsType = {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  cancel: () => void;
  confirm: () => void;
};
const LetterRejectionModal = ({
  cancel,
  confirm,
  onChange,
}: LetterRejectionModalPropsType) => {
  return (
    <div className="fixed inset-0 bg-black/25 flex justify-center items-center z-60 text-darkContrast">
      <div className="bg-white w-[18rem] gap-1 rounded-md grid grid-cols-1 p-2 grid-rows-[1fr_6fr_1fr] md:w-[23rem] lg:grid-rows-[1fr_7fr_1fr]">
        <h1 className="text-md text-center font-semibold">
          Are you sure you want to reject this letter?
        </h1>
        <textarea
          className="border border-gray-300 resize-none w-full p-1"
          onChange={onChange}
        ></textarea>
        <div className="flex justify-center items-center gap-2">
          <button
            className="text-xm w-[4.5rem] h-[2rem] bg-darkContrast text-white hover:bg-secondary p-1 pl-3 pr-3 font-semibold rounded-md"
            onClick={cancel}
          >
            Cancel
          </button>
          <button
            className="text-xm w-[5rem] h-[2rem] bg-darkContrast text-white hover:bg-secondary p-1 pl-3 pr-3 font-semibold rounded-md"
            onClick={confirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default LetterRejectionModal;
