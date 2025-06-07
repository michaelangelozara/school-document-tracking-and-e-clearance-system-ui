import { useEffect, useState } from "react";
import {
  ICommunicationLetterResponseDTO,
  TypeOfCommunicationLetter,
} from "../../../types/letter/CommunicationLetter";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import ReturnDownloadButton from "../../../components/button/ReturnDownloadButton";
import Loading from "../../../components/shared/Loading";
import { findById } from "../../../service/LetterService";
import { typeOfLetterEnumToStringConverter } from "../../../helper/LetterHelper";
import SignatoryCardContainer from "../../../components/signatory/SignatoryCardContainer";
import { getErrorMessage } from "../../../helper/AxiosHelper";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/Store";
import { open } from "../../../store/slice/MessageSlice";
import { useWebSocket } from "../../../context/WebsocketContext";
import { IMessage } from "@stomp/stompjs";
import { IBaseLetterSummaryProjection } from "../../../types/letter/BaseLetter";

const TypeOfCommunicationLetterEnumConverter = (
  type: TypeOfCommunicationLetter | undefined
): string => {
  return type === TypeOfCommunicationLetter.IN_CAMPUS
    ? "In-Campus"
    : "Off-Campus";
};

const CommunicatioLetterView = () => {
  const [letter, setLetter] = useState<ICommunicationLetterResponseDTO>({
    id: "",
    status: undefined,
    type: undefined,
    current_signatories: [],
    reason_of_rejection: "",
    semester_and_school_year: "",
    created_at: "",
    last_modified_at: "",
    club_name: "",
    date: "",
    content: "",
    type_of_communication_letter: undefined,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navivage = useNavigate();

  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const { apiClient } = useAuth();
  useEffect(() => {
    const controller = new AbortController();
    const fetchDate = async () => {
      try {
        const response = (await findById(
          id,
          apiClient,
          controller
        )) as ICommunicationLetterResponseDTO;
        setLetter(response);
      } catch (error: any) {
        if (error.status === 404) {
          const errorMessage = getErrorMessage(error);
          dispatch(open(errorMessage));
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchDate();

    return () => controller.abort();
  }, [id]);

  const updateLetter = (updatedLetter: IBaseLetterSummaryProjection) => {
    setLetter((prev) => ({
      ...prev,
      status: updatedLetter.status,
      last_modified_at: updatedLetter.last_modified_at,
    }));
  };

  const { subscribe } = useWebSocket();
  useEffect(() => {
    subscribe("/user/queue/letter/update", (msg: IMessage) => {
      updateLetter(JSON.parse(msg.body) as IBaseLetterSummaryProjection);
    });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-background p-2">
      <div className="flex flex-col rounded-md gap-2 p-2 overflow-auto">
        <div className="p-2 bg-white rounded-sm overflow-auto">
          <h1 className="font-semibold text-darkContrast">Metadata</h1>
          <div className="pt-2 pb-2 flex">
            <h1 className="min-w-[170px] text-darkContrast">Applied Club</h1>
            <h1>{letter.club_name}</h1>
          </div>
          <div className="pt-2 pb-2 flex">
            <h1 className="min-w-[170px] text-darkContrast">Type</h1>
            <h1>{typeOfLetterEnumToStringConverter(letter.type)}</h1>
          </div>
          <div className="pt-2 pb-2 flex">
            <h1 className="min-w-[170px] text-darkContrast">Created at</h1>
            <h1 className="text-nowrap">{letter.created_at}</h1>
          </div>
          <div className="pt-2 pb-2 flex">
            <h1 className="min-w-[170px] text-darkContrast">
              Last modified at
            </h1>
            <h1 className="text-nowrap">{letter.last_modified_at || "N/A"}</h1>
          </div>
        </div>

        <div className="p-2 bg-white rounded-sm">
          <h1 className="font-semibold text-darkContrast">Letter Details</h1>
          <div className="pt-2 pb-2 flex">
            <h1 className="min-w-[170px] text-darkContrast">
              Semester/School Year
            </h1>
            <h1>{letter.semester_and_school_year}</h1>
          </div>
          <div className="pt-2 pb-2 flex">
            <h1 className="min-w-[170px] text-darkContrast">Date of Letter</h1>
            <h1>{letter.date}</h1>
          </div>
          <div className="pt-2 pb-2 flex">
            <h1 className="min-w-[170px] text-darkContrast">Type</h1>
            <h1>
              {TypeOfCommunicationLetterEnumConverter(
                letter.type_of_communication_letter
              )}
            </h1>
          </div>
          <div className="pt-2 pb-2 flex">
            <h1 className="min-w-[170px] text-darkContrast">Status</h1>
            <h1>{letter.status}</h1>
          </div>
          <div className="pt-2 pb-2 flex flex-col">
            <h1 className="min-w-[170px] mb-2 text-darkContrast">Content</h1>
            <textarea
              disabled
              defaultValue={letter.content}
              className="border border-gray-200 rounded-md p-2 h-[120px]"
            />
          </div>
        </div>

        <div className="p-2 bg-white rounded-sm">
          <h1 className="font-semibold text-darkContrast mb-3">Signatories</h1>
          <SignatoryCardContainer data={letter.current_signatories} />
          <ReturnDownloadButton
            onClickReturn={() => navivage("/home/letters")}
            onClickDownload={() => null}
            placement="right"
          />
        </div>
      </div>
    </div>
  );
};

export default CommunicatioLetterView;
