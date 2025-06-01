import { ISignatoryResponseDTO } from "../../types/signatory/Signatory";
import { useState } from "react";
import ConfirmationModal from "../ConfirmationModal";
import { signBySignatoryId } from "../../service/LetterService";
import { useAuth } from "../../context/AuthContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/Store";
import { open } from "../../store/slice/MessageSlice";
import { getErrorMessage } from "../../helper/AxiosHelper";

type SignatoryCardPropsType = {
  id: string;
  authority: string;
  currentSignatory: boolean;
  date_and_time_of_signature: string;
  name: string;
  signature: string;
  signed: boolean;
};
const SignatoryCard = ({
  id,
  authority,
  currentSignatory,
  date_and_time_of_signature,
  name,
  signature,
  signed,
}: SignatoryCardPropsType) => {
  const [isSignatureButtonClicked, setIsSignatureButtonClicked] =
    useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const { apiClient } = useAuth();
  const signatureConfirmed = async () => {
    try {
      const response = await signBySignatoryId(id, apiClient);
      dispatch(open(response));
    } catch (error: any) {
      if (error.status === 400 || error.status === 403) {
        const errorMessage = getErrorMessage(error);
        dispatch(open(errorMessage));
      }
    } finally {
      setIsSignatureButtonClicked(false);
    }
  };

  return (
    <div className="flex flex-col max-h-[250px] border border-gray-200 p-2 rounded-md sm:w-[280px]">
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
          className="w-[200px] h-[80px] border border-gray-200"
          src={signature}
          alt="Signature"
        />
      ) : (
        <div
          onClick={() => setIsSignatureButtonClicked(true)}
          className="w-[200px] h-[80px] border border-gray-200 flex justify-center items-center cursor-pointer"
        >
          <span>Sign Here</span>
        </div>
      )}
      <h1 className="text-darkContrast">
        Status:{" "}
        <span className={`${signed ? "text-green-400" : "text-red-400"}`}>
          {signed ? "Signed" : "Pending"}
        </span>
      </h1>

      {isSignatureButtonClicked && (
        <ConfirmationModal
          message="Are you sure you want to sign?"
          cancel={() => setIsSignatureButtonClicked(false)}
          confirm={signatureConfirmed}
        />
      )}
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
          id={element.id}
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
