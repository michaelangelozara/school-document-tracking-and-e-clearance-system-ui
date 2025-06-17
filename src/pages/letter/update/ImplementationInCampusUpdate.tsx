import { useEffect, useRef, useState } from "react";
import { IUserNameAndIdOnly } from "../../../types/user/User";
import { findById, update } from "../../../service/LetterService";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/Store";
import { useAuth } from "../../../context/AuthContext";
import { IImplementationLetterInCampusRequestDTO } from "../../../types/letter/ImplementationLetterInCampus";
import { TypeOfBaseLetter } from "../../../types/letter/BaseLetter";
import { applying, stopApplying } from "../../../store/slice/LetterSlice";
import { open } from "../../../store/slice/MessageSlice";
import { getErrorMessage } from "../../../helper/AxiosHelper";
import { useParams } from "react-router-dom";
import ImplementationInCampusForm from "../../../components/letter/apply-update-form/ImplementationInCampusForm";
import Loading from "../../../components/shared/Loading";
import { parseDateTimeForInput } from "../../../util/DateAndTimeUtils";
import { IImplementationLetterInCampusResponseDTO } from "../../../types/letter/ImplementationLetterInCampus";

const mapToImplementationLetter = (
  implementationLetter: IImplementationLetterInCampusResponseDTO,
  studentMap: React.RefObject<Map<string, IUserNameAndIdOnly>>
): IImplementationLetterInCampusRequestDTO => {
  const date = parseDateTimeForInput(
    implementationLetter.date_and_time,
    "date"
  );
  const time = parseDateTimeForInput(
    implementationLetter.date_and_time,
    "time"
  );

  const participant_ids = implementationLetter.participants.map(
    (participant) => participant.id
  );

  // set to map the current participants
  implementationLetter.participants.map((participant) =>
    studentMap.current.set(participant.id, {
      id: participant.id,
      name: participant.name,
      profile: participant.profile,
    })
  );

  return {
    base_letter_request_body_type: implementationLetter.type,
    type: implementationLetter.type,
    name_of_activity: implementationLetter.name_of_activity,
    venue: implementationLetter.venue,
    date: date,
    time: time,
    expected_output: implementationLetter.expected_output,
    objective: implementationLetter.objective,
    projected_expenses: implementationLetter.projected_expenses,
    source_of_fund: implementationLetter.source_of_fund,
    rationale: implementationLetter.rationale,
    participant_ids: participant_ids,
  } as IImplementationLetterInCampusRequestDTO;
};

const ImplementationInCampusUpdate = () => {
  const [implementationLetter, setImplementationLetter] =
    useState<IImplementationLetterInCampusRequestDTO>({
      base_letter_request_body_type:
        TypeOfBaseLetter.IMPLEMENTATION_LETTER_IN_CAMPUS,
      type: TypeOfBaseLetter.IMPLEMENTATION_LETTER_IN_CAMPUS,
      name_of_activity: "",
      venue: "",
      date: "",
      time: "",
      expected_output: "",
      objective: "",
      projected_expenses: "",
      source_of_fund: "",
      rationale: "",
      participant_ids: [],
    });

  const [tempImplementationLetter, setTempImplementationLetter] =
    useState<IImplementationLetterInCampusRequestDTO>({
      base_letter_request_body_type:
        TypeOfBaseLetter.IMPLEMENTATION_LETTER_IN_CAMPUS,
      type: TypeOfBaseLetter.IMPLEMENTATION_LETTER_IN_CAMPUS,
      name_of_activity: "",
      venue: "",
      date: "",
      time: "",
      expected_output: "",
      objective: "",
      projected_expenses: "",
      source_of_fund: "",
      rationale: "",
      participant_ids: [],
    });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const studentMap = useRef<Map<string, IUserNameAndIdOnly>>(new Map()); // this holds all the selected participants

  const reset = () => {
    setImplementationLetter({
      base_letter_request_body_type:
        TypeOfBaseLetter.IMPLEMENTATION_LETTER_IN_CAMPUS,
      type: TypeOfBaseLetter.IMPLEMENTATION_LETTER_IN_CAMPUS,
      name_of_activity: "",
      venue: "",
      date: "",
      time: "",
      expected_output: "",
      objective: "",
      projected_expenses: "",
      source_of_fund: "",
      rationale: "",
      participant_ids: [],
    });
    studentMap.current = new Map();
  };

  const dispatch = useDispatch<AppDispatch>();
  const { apiClient } = useAuth();
  const { id } = useParams();
  const submit = async () => {
    if (id === undefined) {
      return;
    }

    try {
      dispatch(applying());
      const response = await update(tempImplementationLetter, id, apiClient);
      dispatch(open(response));
      reset();
    } catch (error: any) {
      if (error.status === 400) {
        const errorMessage = getErrorMessage(error);
        dispatch(open(errorMessage));
      }
    } finally {
      dispatch(stopApplying());
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await findById(id, apiClient, controller);
        const responseImplementationLetter =
          response as IImplementationLetterInCampusResponseDTO;
        setImplementationLetter(
          mapToImplementationLetter(responseImplementationLetter, studentMap)
        );
        setTempImplementationLetter(
          mapToImplementationLetter(responseImplementationLetter, studentMap)
        );
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
        setIsLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ImplementationInCampusForm
      implementationLetter={tempImplementationLetter}
      setImplementationLetter={setTempImplementationLetter}
      studentMap={studentMap}
      onsubmit={submit}
      mode="update"
    />
  );
};

export default ImplementationInCampusUpdate;
