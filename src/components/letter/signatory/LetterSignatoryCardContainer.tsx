import {
  ISignatoryResponseDTO,
  SignatoryCardPropsType,
} from "../../../types/signatory/Signatory";
import { useEffect, useState } from "react";
import ConfirmationModal from "../../shared/ConfirmationModal";
import { signBySignatoryId } from "../../../service/LetterService";
import { useAuth } from "../../../context/AuthContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/Store";
import { open } from "../../../store/slice/MessageSlice";
import { getErrorMessage } from "../../../helper/AxiosHelper";
import { useWebSocket } from "../../../context/WebsocketContext";
import { IMessage } from "@stomp/stompjs";

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
const LetterSignatoryCardContainer = ({
  data,
}: SignatoryContainerPropsType) => {
  const [signatories, setSignatories] = useState<ISignatoryResponseDTO[]>(data);

  const updateSignatories = (updatedSignatory: ISignatoryResponseDTO) => {
    setSignatories((prev) => {
      const index = prev.findIndex(
        (signatory) =>
          signatory.id.toString().trim().toLowerCase() ===
          updatedSignatory.id.toString().trim().toLowerCase()
      );

      if (index !== -1) {
        const updatedSignatories = [...prev];
        updatedSignatories[index] = updatedSignatory;
        return updatedSignatories;
      } else {
        return prev;
      }
    });
  };

  const { subscribe } = useWebSocket();
  useEffect(() => {
    subscribe("/user/queue/letter/signatory/updated", (msg: IMessage) => {
      updateSignatories(JSON.parse(msg.body) as ISignatoryResponseDTO);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 border border-gray-200 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 h-[400px] overflow-auto mb-4">
      {signatories?.map((element, index) => (
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

export default LetterSignatoryCardContainer;
