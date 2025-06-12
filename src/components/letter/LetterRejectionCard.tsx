type LetterRejectionCardPropsType = {
  rejectedBy: string;
  reasonOfRejection: string;
};
const LetterRejectionCard = ({
  rejectedBy,
  reasonOfRejection,
}: LetterRejectionCardPropsType) => {
  return (
    <div className="bg-white text-darkContrast rounded-md p-2 ">
      <h1 className="font-semibold text-sm md:text-md">Rejection Info</h1>
      <p className="border border-gray-200 p-2 rounded-md break-words">
        <span className="">
          Rejected By: <span className="text-black">{rejectedBy}</span>
        </span>
        <br />
        <br />
        <span className="text-red-500">REASON OF REJECTION :</span> <br />
        {reasonOfRejection}
      </p>
    </div>
  );
};

export default LetterRejectionCard;
