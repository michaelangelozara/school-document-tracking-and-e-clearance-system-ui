import React, { useEffect, useState } from "react";
import { IPermitToEnterResponseDTO } from "../../../types/letter/PermitToEnter";
import Loading from "../../../components/shared/Loading";
import { useAuth } from "../../../context/AuthContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/Store";
import { useNavigate, useParams } from "react-router-dom";
import { getErrorMessage } from "../../../helper/AxiosHelper";
import { findById } from "../../../service/LetterService";
import { open } from "../../../store/slice/MessageSlice";
import { typeOfLetterEnumToStringConverter } from "../../../helper/LetterHelper";
import SignatoryCardContainer from "../../../components/signatory/SignatoryCardContainer";
import ReturnDownloadButton from "../../../components/button/ReturnDownloadButton";
import LetterRejectionCard from "../../../components/letter/LetterRejectionCard";
import { IBaseLetterSummaryProjection } from "../../../types/letter/BaseLetter";
import { useWebSocket } from "../../../context/WebsocketContext";
import { IMessage } from "@stomp/stompjs";

const PermitToEnterLetterView = () => {
  const [letter, setLetter] = useState<IPermitToEnterResponseDTO>({
    id: "",
    status: undefined,
    type: undefined,
    current_signatories: [],
    reason_of_rejection: "",
    semester_and_school_year: "",
    created_at: "",
    last_modified_at: "",
    club_name: "",
    activity: "",
    date_and_time: "",
    participants: [],
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
        )) as IPermitToEnterResponseDTO;
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
          <h1 className="font-semibold text-darkContrast text-sm md:text-md">
            Metadata
          </h1>
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
          <h1 className="font-semibold text-darkContrast text-sm md:text-md">
            Letter Details
          </h1>
          <div className="pt-2 pb-2 flex">
            <h1 className="min-w-[170px] text-darkContrast">
              Semester/School Year
            </h1>
            <h1>{letter.semester_and_school_year}</h1>
          </div>
          <div className="pt-2 pb-2 flex">
            <h1 className="min-w-[170px] text-darkContrast">Activity</h1>
            <h1>{letter.activity}</h1>
          </div>
          <div className="pt-2 pb-2 flex">
            <h1 className="min-w-[170px] text-darkContrast">
              Date & Time of Letter
            </h1>
            <h1>{letter.date_and_time}</h1>
          </div>
          <div className="pt-2 pb-2 flex">
            <h1 className="min-w-[170px] text-darkContrast">Status</h1>
            <h1>{letter.status}</h1>
          </div>

          <h1 className="text-darkContrast">Participants</h1>
          <div className="flex flex-col h-[200px] overflow-auto p-2 border border-gray-200 rounded-md">
            {letter.participants.map((element, index) => (
              <div key={index} className="flex gap-2">
                <h1 className="text-darkContrast">{index + 1}.</h1>
                <h1>{element.name}</h1>
              </div>
            ))}
          </div>
        </div>

        <div className="p-2 bg-white rounded-sm">
          <h1 className="font-semibold text-darkContrast mb-3 text-sm md:text-md">
            Signatories
          </h1>
          <SignatoryCardContainer data={letter.current_signatories} />
          <ReturnDownloadButton
            onClickDownload={() => null}
            onClickReturn={() => navivage("/home/letters")}
            placement="right"
          />
        </div>

        <LetterRejectionCard
          status={letter.status}
          reasonOfRejection={letter.reason_of_rejection}
        />
      </div>
    </div>
  );
};

export default PermitToEnterLetterView;
