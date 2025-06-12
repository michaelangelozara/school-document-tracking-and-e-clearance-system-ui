import React, { ChangeEvent, useEffect, useState } from "react";
import {
  IBaseLetterResponseDTO,
  IRejectionResponseDTO,
  StatusOfBaseLetter,
} from "../../../types/letter/BaseLetter";
import { useAuth } from "../../../context/AuthContext";
import ReturnDownloadButton from "../../../components/button/ReturnDownloadButton";
import LetterRejectButton from "../../../components/button/LetterRejectButton";
import SignatoryCardContainer from "../../../components/signatory/SignatoryCardContainer";
import { useNavigate } from "react-router-dom";
import LetterRejectionModal from "../../../components/letter/LetterRejectionModal";
import {
  getRejectionByLetterId,
  rejectLetterById,
} from "../../../service/LetterService";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/Store";
import { open } from "../../../store/slice/MessageSlice";
import { getErrorMessage } from "../../../helper/AxiosHelper";
import LetterInfoFactory from "../../../components/infrastructure/factory/letter/view/LetterInfoFactory";
import LetterRejectionCard from "../../../components/letter/LetterRejectionCard";

type BaseLetterWrapperPropsType<T extends IBaseLetterResponseDTO> = {
  letter: T;
};

const BaseLetterWrapper = <T extends IBaseLetterResponseDTO>({
  letter,
}: BaseLetterWrapperPropsType<T>) => {
  const [letterRejection, setLetterRejection] =
    useState<IRejectionResponseDTO | null>(null);
  const [isRejecting, setIsRejecting] = useState<boolean>(false);
  const [reasonOfRejection, setReasonOfRejection] = useState<string | null>(
    null
  );

  const reasonOfRejectionHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReasonOfRejection(e.target.value);
  };

  const { user, apiClient } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const rejectionConfirmed = async () => {
    try {
      const response = await rejectLetterById(
        apiClient,
        letter.id,
        reasonOfRejection
      );
      dispatch(open(response));
    } catch (error: any) {
      if (
        error.status === 400 ||
        error.status === 404 ||
        error.status === 403
      ) {
        const errorMessage = getErrorMessage(error);
        dispatch(open(errorMessage));
      }
    } finally {
      setIsRejecting(false);
      setReasonOfRejection(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRejectionByLetterId(apiClient, letter.id);
        setLetterRejection(response);
      } catch (error) {
        console.log(error);
      }
    };

    if (letter.id !== "" && letter.status === StatusOfBaseLetter.REJECTED) {
      fetchData();
    }
  }, [letter.id]);

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
            <h1>{letter.type}</h1>
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

        {/* Letter Info */}
        <LetterInfoFactory<T> type={letter.type} data={letter} />

        <div className="p-2 bg-white rounded-sm">
          <h1 className="font-semibold text-darkContrast mb-3">Signatories</h1>
          <SignatoryCardContainer data={letter.current_signatories} />
          {user?.authorities.includes("STUDENT") ? (
            <ReturnDownloadButton
              onClickDownload={() => null}
              onClickReturn={() => navigate("/home/letters")}
              placement="right"
            />
          ) : (
            <div className="flex justify-between">
              <LetterRejectButton onClickReject={() => setIsRejecting(true)} />
              <ReturnDownloadButton
                onClickDownload={() => null}
                onClickReturn={() => navigate("/home/letters")}
                placement="right"
              />
            </div>
          )}
        </div>

        {letter.status === StatusOfBaseLetter.REJECTED && letterRejection && (
          <LetterRejectionCard letterRejection={letterRejection} />
        )}

        {isRejecting && (
          <LetterRejectionModal
            onChange={reasonOfRejectionHandler}
            cancel={() => setIsRejecting(false)}
            confirm={rejectionConfirmed}
          />
        )}
      </div>
    </div>
  );
};

export default BaseLetterWrapper;
