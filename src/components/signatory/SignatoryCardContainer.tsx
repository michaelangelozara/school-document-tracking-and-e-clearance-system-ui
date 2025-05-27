import { ISignatoryResponseDTO } from "../../types/signatory/Signatory";

const SignatoryCard = ({
  authority,
  currentSignatory,
  date_and_time_of_signature,
  name,
  signature,
  signed,
}: ISignatoryResponseDTO) => {
  return (
    <div className="flex flex-col border border-gray-200 p-2 sm:w-[300px]">
      <h1 className="text-darkContrast">
        Authority: <span className="text-black">{authority}</span>
      </h1>
      <h1 className="text-darkContrast">
        Current Signatory:{" "}
        <span className="text-black">{currentSignatory ? "Yes" : "No"}</span>
      </h1>
      <h1 className="text-darkContrast">
        Date & Time:{" "}
        <span className="text-black">{date_and_time_of_signature}</span>
      </h1>
      <h1 className="text-darkContrast">
        Name: <span className="text-black">{name}</span>
      </h1>
      {signed ? (
        <img
          className="w-[200px] h-[60px] border border-gray-200"
          src={signature}
          alt="Signature"
        />
      ) : (
        <div className="w-[200px] h-[60px] border border-gray-200 flex justify-center items-center">
          <span>Sign Here</span>
        </div>
      )}
      <h1 className="text-darkContrast">
        Status:{" "}
        <span className={`${signed ? "text-green-400" : "text-red-400"}`}>
          {signed ? "Signed" : "Pending"}
        </span>
      </h1>
    </div>
  );
};

type SignatoryContainerPropsType = {
  data: ISignatoryResponseDTO[];
};
const SignatoryContainer = ({ data }: SignatoryContainerPropsType) => {
  return (
    <div className="grid grid-cols-1 border border-gray-200 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 h-[400px] overflow-auto mb-4">
      {data?.map((element, index) => (
        <SignatoryCard
          key={index}
          authority={element.authority}
          currentSignatory={element.currentSignatory}
          date_and_time_of_signature={element.date_and_time_of_signature}
          name={element.name}
          signature={element.signature}
          signed={element.signed}
        />
      ))}
    </div>
  );
};

export default SignatoryContainer;
