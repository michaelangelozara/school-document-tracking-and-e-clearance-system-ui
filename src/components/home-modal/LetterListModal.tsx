import { ChangeEvent, useEffect, useRef, useState } from "react";

import LETTER_ICON from "../../assets/icon/svg/section_card/letter-icon-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import PaginationButtons from "../shared/PaginationButton";
import BUDGET_PROPOSAL_ICON from "../../assets/icon/png/budget_proposal_letter_icon.png";
import COMMUNICATION_ICON from "../../assets/icon/png/communication_icon.png";
import IMPLEMENATION_LETTER_IN_CAMPUS_ICON from "../../assets/icon/png/implementation_in_campus_icon.png";
import IMPLEMENATION_LETTER_OFF_CAMPUS_ICON from "../../assets/icon/png/implementation_off_campus_icon.png";
import PERMIT_TO_ENTER_ICON from "../../assets/icon/png/permit_to_enter_icon.png";
import SCHOOL_FACILITY_ICON from "../../assets/icon/png/school_facility_icon.png";
import Loading from "../shared/Loading";
import { Page, PaginationResponse } from "../../types/Pagination";
import {
  IBaseLetterFilterBody,
  IBaseLetterSummaryProjection,
  StatusOfBaseLetter,
  TypeOfBaseLetter,
} from "../../types/letter/BaseLetter";
import { useAuth } from "../../context/AuthContext";
import { BaseResponse } from "../../types/response/Response";
import { typeOfLetterEnumToStringURLConverter } from "../../helper/LetterHelper";
import { useWebSocket } from "../../context/WebsocketContext";
import { IMessage } from "@stomp/stompjs";
import { cancelLetterById } from "../../service/LetterService";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/Store";
import { open } from "../../store/slice/MessageSlice";
import ConfirmationModal from "../shared/ConfirmationModal";
import { getErrorMessage } from "../../helper/AxiosHelper";

type TablePropsType = {
  data: IBaseLetterSummaryProjection[];
  view: (type: string, id: string) => void;
  edit: (type: string, id: string) => void;
  cancel: (id: string) => void;
};

const Table = ({ data, view, edit, cancel }: TablePropsType) => {
  const { user } = useAuth();

  return (
    <table className="w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-200 border-b border-gray-300 text-nowrap">
          <th className="sticky top-0 p-2 border-r border-gray-300 bg-gray-200">
            ID
          </th>
          <th className="sticky top-0 p-2 border-r border-gray-300 bg-gray-200">
            Status
          </th>
          <th className="sticky top-0 p-2 border-r border-gray-300 bg-gray-200">
            Type
          </th>
          <th className="sticky top-0 p-2 border-r border-gray-300 bg-gray-200">
            Requested Date
          </th>
          <th className="sticky top-0 p-2 border-r border-gray-300 bg-gray-200">
            Last Modified
          </th>
          <th className="sticky top-0 p-2 bg-gray-200">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((element, index) => (
          <tr key={index} className="border-b border-gray-300 text-nowrap">
            <td className="p-2 border-r border-gray-300 text-center">
              {index + 1}
            </td>
            <td className="p-2 border-r border-gray-300 text-center">
              {element.status}
            </td>
            <td className="p-2 border-r border-gray-300 text-center">
              {element.type}
            </td>
            <td className="p-2 border-r border-gray-300 text-center">
              {element.created_at}
            </td>
            <td className="p-2 border-r border-gray-300 text-center">
              {element.last_modified_at !== null
                ? element.last_modified_at
                : "N/A"}
            </td>
            <td>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() =>
                    view(
                      typeOfLetterEnumToStringURLConverter(element.type),
                      element.id
                    )
                  }
                  className="bg-darkContrast p-1 rounded-lg text-white hover:bg-secondary"
                >
                  View
                </button>
                {user?.type === "STUDENT" &&
                  element.status === StatusOfBaseLetter.DRAFT && (
                    <button
                      onClick={() =>
                        edit(
                          typeOfLetterEnumToStringURLConverter(element.type),
                          element.id
                        )
                      }
                      className="bg-darkContrast p-1 rounded-lg text-white hover:bg-secondary"
                    >
                      Edit
                    </button>
                  )}
                {user?.type === "STUDENT" &&
                  element.status === StatusOfBaseLetter.DRAFT && (
                    <button
                      onClick={() => cancel(element.id)}
                      className="bg-darkContrast p-1 rounded-lg text-white hover:bg-secondary"
                    >
                      Cancel
                    </button>
                  )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export type RequestModalIconPropsType = {
  name: string;
  icon: string;
  type: string;
};
const RequestModalIcon = ({ name, icon, type }: RequestModalIconPropsType) => {
  const navigate = useNavigate();

  const navigationHandler = () => {
    navigate(`/letters/apply/${type}`);
  };

  return (
    <div
      onClick={navigationHandler}
      className="rounded-md bg-white border border-gray-200 shadow-md min-h-[6rem] hover:scale-93 transition-transform duration-300 ease-in-out cursor-pointer
      flex flex-col p-2 overflow-hidden md:min-h-[6.5rem] md:text-sm
    "
    >
      <img className="size-10" src={icon} alt={name + " Icon"} />
      <span className="text-darkContrast">{name}</span>
    </div>
  );
};

const listOfLetters: RequestModalIconPropsType[] = [
  {
    name: "Budget Proposal Letter",
    icon: BUDGET_PROPOSAL_ICON,
    type: "budget-proposal",
  },
  {
    name: "Communication Letter",
    icon: COMMUNICATION_ICON,
    type: "communication",
  },
  {
    name: "Implementation Letter In Campus",
    icon: IMPLEMENATION_LETTER_IN_CAMPUS_ICON,
    type: "implementation-letter-in-campus",
  },
  {
    name: "Implementation Letter Off Campus",
    icon: IMPLEMENATION_LETTER_OFF_CAMPUS_ICON,
    type: "implementation-letter-off-campus",
  },

  {
    name: "Permit To Enter Leter",
    icon: PERMIT_TO_ENTER_ICON,
    type: "permit-to-enter",
  },
  {
    name: "School Facility Letter",
    icon: SCHOOL_FACILITY_ICON,
    type: "school-facility",
  },
];

type RequestModalPropsType = {
  onClick: () => void;
};
const RequestModal = ({ onClick }: RequestModalPropsType) => {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-60">
      <div className="w-[20rem] h-[20rem] bg-white rounded-md flex flex-col overflow-hidden md:w-[25rem] md:h-[25rem]">
        <div className="bg-primary text-darkContrast text-center p-0.5 grid grid-cols-3 md:text-md">
          <span className="col-start-2">Select Letter</span>
          <div className="flex justify-end pr-2">
            <button className="hover:cursor-pointer" onClick={onClick}>
              ✖
            </button>
          </div>
        </div>
        <div className="grid gap-2 p-2 grid-cols-2 auto-rows-auto flex-1 bg-white overflow-auto text-xs">
          {listOfLetters?.map((element, index) => (
            <RequestModalIcon
              key={index}
              name={element.name}
              icon={element.icon}
              type={element.type}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const LetterModal = () => {
  const [page, setPage] = useState<Page>({
    totalPage: 0,
    currentPage: 1,
  });
  const navigate = useNavigate();
  const [isRequestButtonClicked, setIsRequestButtonClicked] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCancelButtonClicked, setIsCancelButtonClicked] =
    useState<boolean>(false);

  const [fetchedLetter, setFetchedLetter] = useState<
    IBaseLetterSummaryProjection[]
  >([]);
  const [filterBody, setFilterBody] = useState<IBaseLetterFilterBody>({
    type: "",
    status: "",
  });
  const letterIdWillBeCanceled = useRef<string | null>(null);

  const { apiClient, user } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  // Trigger API call when searchTerm or page changes
  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response = await apiClient.get(
          `/letters?page=${page.currentPage - 1}&size=10&status=${
            filterBody.status
          }&type=${filterBody.type}`
        );
        const { data } = response.data as BaseResponse<
          PaginationResponse<IBaseLetterSummaryProjection>
        >;
        setFetchedLetter(data.content);
        setPage((prev) => ({ ...prev, totalPage: data.totalPages }));
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchedData();
  }, [page.currentPage, filterBody.status, filterBody.type]);

  const navigationHandler = () => {
    navigate("/home");
  };

  const letterViewNavigationHandler = (type: string, id: string) => {
    navigate(`/letters/view/${type}/${id}`);
  };

  const setIdOfLetterThatWillBeCanceled = async (id: string) => {
    letterIdWillBeCanceled.current = id;
    setIsCancelButtonClicked(true);
  };

  const letterCancellationConfirmed = async () => {
    if (letterIdWillBeCanceled.current === null) {
      return;
    }

    try {
      const response = await cancelLetterById(
        apiClient,
        letterIdWillBeCanceled.current
      );
      dispatch(open(response));
    } catch (error: any) {
      if (error.status === 404 || error.status === 403) {
        const errorMessage = getErrorMessage(error);
        dispatch(open(errorMessage));
      }
    } finally {
      letterIdWillBeCanceled.current = null;
      setIsCancelButtonClicked(false); // close the confirmation modal
    }
  };

  const letterEditHandler = (type: string, id: string) => {
    navigate(`/letters/update/${type}/${id}`);
  };

  const requestButtonHandler = () => {
    setIsRequestButtonClicked((v) => !v);
  };

  const prevPageHandler = () => {
    setPage((prev) => ({ ...prev, currentPage: (prev.currentPage -= 1) }));
  };
  const nextPageHandler = () => {
    setPage((prev) => ({ ...prev, currentPage: (prev.currentPage += 1) }));
  };

  const updateListOfLetter = (updatedLetter: IBaseLetterSummaryProjection) => {
    setFetchedLetter((prev) => {
      const index = prev.findIndex(
        (letter) =>
          letter.id.toString().trim().toLowerCase() ===
          updatedLetter.id.toString().trim().toLowerCase()
      );

      if (index !== -1) {
        const updatedLetters = [...prev];
        updatedLetters[index] = updatedLetter;
        return updatedLetters;
      } else {
        return [updatedLetter, ...prev];
      }
    });
  };

  const { subscribe } = useWebSocket();
  useEffect(() => {
    subscribe("/user/queue/letter/update", (msg: IMessage) => {
      // update the listed letters
      updateListOfLetter(JSON.parse(msg.body) as IBaseLetterSummaryProjection);
    });
  }, []);

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      {/* Modal Content */}
      <div className="w-[95%] h-[95%] bg-background flex flex-col rounded-lg shadow-xl relative">
        {/* Header Layer */}
        <div className="flex justify-between rounded-tl-lg rounded-tr-lg bg-primary text-darkContrast p-1 text-md">
          <div className="flex justify-center items-center gap-2">
            <img
              src={LETTER_ICON}
              alt="Department Icon"
              className="size-6 sm:size-7"
            />
            <span className="text-darkContrast">Letter Section</span>
          </div>
          <button
            onClick={navigationHandler}
            className="font-bold hover:text-red-500 hover:cursor-pointer"
          >
            ✖
          </button>
        </div>
        {/* Modal Body */}
        <div className="flex flex-1 flex-col p-4 gap-2 overflow-auto">
          {/* Content Goes Here */}
          <div className="grid grid-cols-2 grid-rows-2 gap-1.5 sm:grid-rows-1 sm:grid-cols-3 bg-white">
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <h1>Type</h1>
              <select
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setFilterBody((prev) => ({ ...prev, type: e.target.value }))
                }
                className="w-[9rem] pl-1.5 justify-self-center text-darkContrast border border-gray-200 outline-darkContrast rounded sm:justify-self-start"
              >
                <option value="">All</option>
                <option value={TypeOfBaseLetter.BUDGET_PROPOSAL_LETTER}>
                  Budget Proposal Letter
                </option>
                <option value={TypeOfBaseLetter.COMMUNICATION_LETTER}>
                  Communication Letter
                </option>
                <option
                  value={TypeOfBaseLetter.IMPLEMENTATION_LETTER_IN_CAMPUS}
                >
                  Implementation Letter (In-Campus)
                </option>
                <option
                  value={TypeOfBaseLetter.IMPLEMENTATION_LETTER_OFF_CAMPUS}
                >
                  Implementation Letter (Off-Campus)
                </option>
                <option value={TypeOfBaseLetter.PERMIT_TO_ENTER_LETTER}>
                  Permit to Enter Letter
                </option>
                <option value={TypeOfBaseLetter.SCHOOL_FACILITY_LETTER}>
                  School Facility Letter
                </option>
              </select>
            </div>
            <div className="flex items-center gap-2 ">
              <h1>Status</h1>
              <select
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setFilterBody((prev) => ({ ...prev, status: e.target.value }))
                }
                className="pl-1.5 justify-self-center text-darkContrast border border-gray-200 outline-darkContrast rounded sm:justify-self-start"
              >
                <option value="">All</option>
                <option value={StatusOfBaseLetter.DRAFT}>Draft</option>
                <option value={StatusOfBaseLetter.IN_PROGRESS}>
                  In-Progress
                </option>
                <option value={StatusOfBaseLetter.APPROVED}>Approved</option>
                <option value={StatusOfBaseLetter.REJECTED}>Rejected</option>
                <option value={StatusOfBaseLetter.EXPIRED}>Expired</option>
                <option value={StatusOfBaseLetter.CANCELLED}>Cancelled</option>
              </select>
            </div>
            <div className="justify-self-end">
              <button
                onClick={requestButtonHandler}
                className={`${
                  user?.authorities.length === 1 &&
                  user?.authorities.includes("STUDENT")
                    ? ""
                    : "hidden"
                } bg-primary text-darkContrast pl-2 pr-2 rounded-md hover:text-white md:pl-4 md:pr-4 md:pt-1 md:pb-1`}
              >
                Request
              </button>
            </div>
          </div>
          <div
            className={`bg-white flex-1 ${
              isLoading ? "flex justify-center items-center" : ""
            } overflow-auto`}
          >
            {isLoading ? (
              <Loading />
            ) : (
              <Table
                edit={letterEditHandler}
                cancel={setIdOfLetterThatWillBeCanceled}
                view={letterViewNavigationHandler}
                data={fetchedLetter}
              />
            )}
          </div>
          <PaginationButtons
            page={page}
            onNext={nextPageHandler}
            onPrev={prevPageHandler}
          />
        </div>
        {isRequestButtonClicked && (
          <RequestModal onClick={requestButtonHandler} />
        )}
        {isCancelButtonClicked && (
          <ConfirmationModal
            message="Are you sure you want to cancel submission?"
            cancel={() => setIsCancelButtonClicked(false)}
            confirm={letterCancellationConfirmed}
          />
        )}
      </div>
    </div>
  );
};

export default LetterModal;
