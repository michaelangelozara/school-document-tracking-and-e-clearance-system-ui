import { useNavigate } from "react-router-dom";
import ClearanceSignatoryCard from "./ClearanceSignatoryCard";

const MyClearanceModal = () => {
  const navigation = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="w-[95%] h-[95%] bg-background flex flex-col rounded-lg shadow-xl overflow-hidden">
        <div className="grid grid-cols-3">
          <span className="text-md font-semibold text-darkContrast col-start-2 text-center ">
            My Clearance
          </span>
          <button
            onClick={() => navigation(-1)}
            className=" text-lg font-bold hover:text-red-500 hover:cursor-pointer col-start-3 justify-self-end"
          >
            ✖
          </button>
          <div></div>
        </div>

        <div className="text-center">
          <p className="text-xs">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable.
          </p>
        </div>

        <div className="overflow-scroll">
          <div className="w-full grid grid-cols-2 p-1 gap-2">
            <ClearanceSignatoryCard
              id=""
              authority=""
              currentSignatory={false}
              date_and_time_of_signature=""
              name=""
              signature=""
              signed={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyClearanceModal;
