import { useNavigate } from "react-router-dom";

const SignatoryCard = () => {
  return (
    <div className="flex flex-col p-1 text-xs bg-white shadow-sm border border-gray-200 rounded-xl">
      <h1>
        Status: <span className="text-yellow-500">Pending</span>
      </h1>
      <h1>
        Last Modified: <span className="text-darkContrast">Unknown</span>
      </h1>
      <h1>
        Signatory: <span className="text-darkContrast"></span>
      </h1>
      <img src="" alt="Signature" />
    </div>
  );
};

const MyClearanceModal = () => {
  const navigation = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="w-[95%] h-[95%] bg-background flex flex-col rounded-lg shadow-xl overflow-hidden">
        <div className="grid grid-cols-3">
          <span className="text-md text-darkContrast col-start-2 text-center ">
            My Clearance
          </span>
          <button
            onClick={() => navigation("/home")}
            className=" text-lg font-bold hover:text-red-500 hover:cursor-pointer col-start-3 justify-self-end"
          >
            ✖
          </button>
          <div></div>
        </div>

        <div className="overflow-scroll">
          <div className="w-full flex-1 grid grid-cols-2 grid-rows-6 p-1 gap-1">
            <SignatoryCard />
            <SignatoryCard />
            <SignatoryCard />
            <SignatoryCard />
            <SignatoryCard />
            <SignatoryCard />
            <SignatoryCard />
            <SignatoryCard />
            <SignatoryCard />
            <SignatoryCard />
            <SignatoryCard />
            <SignatoryCard />
            <SignatoryCard />
            <SignatoryCard />
            <SignatoryCard />
            <SignatoryCard />
            <SignatoryCard />
            <SignatoryCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyClearanceModal;
