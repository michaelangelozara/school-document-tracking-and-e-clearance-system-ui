import { IRejectionResponseDTO } from "../../types/letter/BaseLetter";

type LetterRejectionCardPropsType = {
  letterRejection: IRejectionResponseDTO;
};
const LetterRejectionCard = ({
  letterRejection,
}: LetterRejectionCardPropsType) => {
  return (
    <div className="bg-white text-darkContrast rounded-md p-2 ">
      <h1 className="font-semibold text-sm md:text-md">Rejection Info</h1>
      <p className="border border-gray-200 p-2 rounded-md break-words">
        <span className="">
          Rejected By:{" "}
          <span className="text-black">{letterRejection.rejected_by}</span>
        </span>
        <br />
        <br />
        <span className="text-red-500">REASON OF REJECTION :</span> <br />
        {letterRejection.reason_of_rejection}
      </p>
    </div>
  );
};

export default LetterRejectionCard;
