import React, { useState } from "react";

import LETTER_ICON from "../../assets/icon/svg/section_card/letter-icon-svgrepo-com.svg";
import { Outlet, useNavigate } from "react-router-dom";
import PaginationButtons from "../PaginationButton";
import BUDGET_PROPOSAL_ICON from "../../assets/icon/png/budget_proposal_letter_icon.png";
import COMMUNICATION_ICON from "../../assets/icon/png/communication_icon.png";
import IMPLEMENATION_LETTER_IN_CAMPUS_ICON from "../../assets/icon/png/implementation_in_campus_icon.png";
import IMPLEMENATION_LETTER_OFF_CAMPUS_ICON from "../../assets/icon/png/implementation_off_campus_icon.png";
import PERMIT_TO_ENTER_ICON from "../../assets/icon/png/permit_to_enter_icon.png";
import SCHOOL_FACILITY_ICON from "../../assets/icon/png/school_facility_icon.png";
import { TypeOfBaseLetter } from "../../types/letter/BaseLetter";
import Loading from "../Loading";
import { Page } from "../../types/Pagination";

type TablePropsType = {
  onClick: () => void;
};

const Table = ({ onClick }: TablePropsType) => {
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
            Current Office/s
          </th>
          <th className="sticky top-0 p-2 border-r border-gray-300 bg-gray-200">
            Requested Date
          </th>
          <th className="sticky top-0 p-2 border-r border-gray-300 bg-gray-200">
            Last Modified
          </th>
          <th className="sticky top-0 p-2 bg-gray-200">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-gray-300 text-nowrap">
          <td className="p-2 border-r border-gray-300 text-center">1</td>
          <td className="p-2 border-r border-gray-300 text-center">Pending</td>
          <td className="p-2 border-r border-gray-300 text-center">
            Budget Proposal
          </td>
          <td className="p-2 border-r border-gray-300 text-center">DSA</td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 10:00 am
          </td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
        <tr className="border-b border-gray-300 text-nowrap">
          <td className="p-2 border-r border-gray-300 text-center">2</td>
          <td className="p-2 border-r border-gray-300 text-center">
            Completed
          </td>
          <td className="p-2 border-r border-gray-300 text-center">
            Budget Proposal
          </td>
          <td className="p-2 border-r border-gray-300 text-center">Dean</td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 10:00 am
          </td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
        <tr className="border-b border-gray-300 text-nowrap">
          <td className="p-2 border-r border-gray-300 text-center">2</td>
          <td className="p-2 border-r border-gray-300 text-center">
            Completed
          </td>
          <td className="p-2 border-r border-gray-300 text-center">
            Budget Proposal
          </td>
          <td className="p-2 border-r border-gray-300 text-center">Dean</td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 10:00 am
          </td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
        <tr className="border-b border-gray-300 text-nowrap">
          <td className="p-2 border-r border-gray-300 text-center">2</td>
          <td className="p-2 border-r border-gray-300 text-center">
            Completed
          </td>
          <td className="p-2 border-r border-gray-300 text-center">
            Budget Proposal
          </td>
          <td className="p-2 border-r border-gray-300 text-center">Dean</td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 10:00 am
          </td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
        <tr className="border-b border-gray-300 text-nowrap">
          <td className="p-2 border-r border-gray-300 text-center">2</td>
          <td className="p-2 border-r border-gray-300 text-center">
            Completed
          </td>
          <td className="p-2 border-r border-gray-300 text-center">
            Budget Proposal
          </td>
          <td className="p-2 border-r border-gray-300 text-center">Dean</td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 10:00 am
          </td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
        <tr className="border-b border-gray-300 text-nowrap">
          <td className="p-2 border-r border-gray-300 text-center">2</td>
          <td className="p-2 border-r border-gray-300 text-center">
            Completed
          </td>
          <td className="p-2 border-r border-gray-300 text-center">
            Budget Proposal
          </td>
          <td className="p-2 border-r border-gray-300 text-center">Dean</td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 10:00 am
          </td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
        <tr className="border-b border-gray-300 text-nowrap">
          <td className="p-2 border-r border-gray-300 text-center">2</td>
          <td className="p-2 border-r border-gray-300 text-center">
            Completed
          </td>
          <td className="p-2 border-r border-gray-300 text-center">
            Budget Proposal
          </td>
          <td className="p-2 border-r border-gray-300 text-center">Dean</td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 10:00 am
          </td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
        <tr className="border-b border-gray-300 text-nowrap">
          <td className="p-2 border-r border-gray-300 text-center">2</td>
          <td className="p-2 border-r border-gray-300 text-center">
            Completed
          </td>
          <td className="p-2 border-r border-gray-300 text-center">
            Budget Proposal
          </td>
          <td className="p-2 border-r border-gray-300 text-center">Dean</td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 10:00 am
          </td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
        <tr className="border-b border-gray-300 text-nowrap">
          <td className="p-2 border-r border-gray-300 text-center">2</td>
          <td className="p-2 border-r border-gray-300 text-center">
            Completed
          </td>
          <td className="p-2 border-r border-gray-300 text-center">
            Budget Proposal
          </td>
          <td className="p-2 border-r border-gray-300 text-center">Dean</td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 10:00 am
          </td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
        <tr className="border-b border-gray-300 text-nowrap">
          <td className="p-2 border-r border-gray-300 text-center">2</td>
          <td className="p-2 border-r border-gray-300 text-center">
            Completed
          </td>
          <td className="p-2 border-r border-gray-300 text-center">
            Budget Proposal
          </td>
          <td className="p-2 border-r border-gray-300 text-center">Dean</td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 10:00 am
          </td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
        <tr className="border-b border-gray-300 text-nowrap">
          <td className="p-2 border-r border-gray-300 text-center">2</td>
          <td className="p-2 border-r border-gray-300 text-center">
            Completed
          </td>
          <td className="p-2 border-r border-gray-300 text-center">
            Budget Proposal
          </td>
          <td className="p-2 border-r border-gray-300 text-center">Dean</td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 10:00 am
          </td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
        <tr className="border-b border-gray-300 text-nowrap">
          <td className="p-2 border-r border-gray-300 text-center">2</td>
          <td className="p-2 border-r border-gray-300 text-center">
            Completed
          </td>
          <td className="p-2 border-r border-gray-300 text-center">
            Budget Proposal
          </td>
          <td className="p-2 border-r border-gray-300 text-center">Dean</td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 10:00 am
          </td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
        <tr className="border-b border-gray-300 text-nowrap">
          <td className="p-2 border-r border-gray-300 text-center">2</td>
          <td className="p-2 border-r border-gray-300 text-center">
            Completed
          </td>
          <td className="p-2 border-r border-gray-300 text-center">
            Budget Proposal
          </td>
          <td className="p-2 border-r border-gray-300 text-center">Dean</td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 10:00 am
          </td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
        <tr className="border-b border-gray-300 text-nowrap">
          <td className="p-2 border-r border-gray-300 text-center">2</td>
          <td className="p-2 border-r border-gray-300 text-center">
            Completed
          </td>
          <td className="p-2 border-r border-gray-300 text-center">
            Budget Proposal
          </td>
          <td className="p-2 border-r border-gray-300 text-center">Dean</td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 10:00 am
          </td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
        <tr className="border-b border-gray-300 text-nowrap">
          <td className="p-2 border-r border-gray-300 text-center">2</td>
          <td className="p-2 border-r border-gray-300 text-center">
            Completed
          </td>
          <td className="p-2 border-r border-gray-300 text-center">
            Budget Proposal
          </td>
          <td className="p-2 border-r border-gray-300 text-center">Dean</td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 10:00 am
          </td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
        <tr className="border-b border-gray-300 text-nowrap">
          <td className="p-2 border-r border-gray-300 text-center">2</td>
          <td className="p-2 border-r border-gray-300 text-center">
            Completed
          </td>
          <td className="p-2 border-r border-gray-300 text-center">
            Budget Proposal
          </td>
          <td className="p-2 border-r border-gray-300 text-center">Dean</td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 10:00 am
          </td>
          <td className="p-2 border-r border-gray-300 text-center">
            10-Sep-2025 11:23 am
          </td>
          <td>
            <div className="flex justify-center">
              <button
                onClick={onClick}
                className="bg-primary p-1 rounded-lg font-medium text-darkContrast hover:text-white"
              >
                View
              </button>
            </div>
          </td>
        </tr>
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
          {listOfLetters?.map((element) => (
            <RequestModalIcon
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
    currentPage: 0,
  });
  const navigate = useNavigate();
  const [isRequestButtonClicked, setIsRequestButtonClicked] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigationHandler = () => {
    navigate("/home");
  };

  const requestButtonHandler = () => {
    setIsRequestButtonClicked((v) => !v);
  };

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
          <div className="grid grid-cols-2 grid-rows-2 gap-2 sm:grid-rows-1 sm:grid-cols-3 bg-white">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-200 rounded-md pl-2 placeholder:text-gray-400 outline-darkContrast"
            />
            <select className="pl-1.5 justify-self-center text-darkContrast border border-gray-200 outline-darkContrast rounded sm:justify-self-start">
              <option value="">All</option>
              <option value="">Draft</option>
              <option value="">Pending Review</option>
              <option value="">Under Review</option>
              <option value="">Approved</option>
              <option value="">Rejected</option>
              <option value="">Expired</option>
              <option value="">Cancelled</option>
            </select>
            <div className="sm:justify-self-end">
              <button
                onClick={requestButtonHandler}
                className="bg-primary text-darkContrast pl-2 pr-2 rounded-md hover:text-white md:pl-4 md:pr-4 md:pt-1 md:pb-1"
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
            {isLoading ? <Loading /> : <Table onClick={() => null} />}
          </div>
          <PaginationButtons
            page={page}
            onNext={() => null}
            onPrev={() => null}
          />
        </div>
        {isRequestButtonClicked && (
          <RequestModal onClick={requestButtonHandler} />
        )}
        {/* <Outlet /> */}
      </div>
    </div>
  );
};

export default LetterModal;
