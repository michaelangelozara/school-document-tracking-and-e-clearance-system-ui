import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { close } from "../store/slice/MessageSlice";

const MessageModal = () => {
  const { message, isOpen } = useSelector((state: RootState) => state.message);
  const dispatch = useDispatch<AppDispatch>();

  if (!isOpen) {
    return;
  }

  return (
    <div className="fixed inset-0 bg-black/25 flex justify-center items-center z-60 text-darkContrast">
      <div className="bg-white w-[15rem] h-[7rem] rounded-md grid grid-cols-1 grid-rows-3 p-2 md:w-[18rem] md:h-[8rem]">
        <div className="row-span-2 flex justify-center items-center">
          <h1 className="text-md text-center">{message}</h1>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => dispatch(close(null))}
            className="text-xm w-[4rem] bg-darkContrast text-white hover:bg-secondary p-1 pl-3 pr-3 font-semibold rounded-md"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
