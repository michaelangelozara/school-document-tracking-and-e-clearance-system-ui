import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CLEARANCE_ICON from "../../assets/icon/svg/section_card/clearance-icon-svgrepo-com.svg";

import PaginationButtons from "../shared/PaginationButton";
import { Page } from "../../types/Pagination";
import { useAuth } from "../../context/AuthContext";
import { IUserSummaryResponse } from "../../types/user/User";
import ConfirmationModal from "../shared/ConfirmationModal";
import { findAll, request } from "../../service/ClearanceService";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/Store";
import { open } from "../../store/slice/MessageSlice";
import { getErrorMessage } from "../../helper/AxiosHelper";
import { useWebSocket } from "../../context/WebsocketContext";
import { IMessage } from "@stomp/stompjs";
import {
  ClearanceFilterBody,
  ClearanceSummaryProjection,
} from "../../types/clearance/Clearance";
import { useDebounce } from "../../hook/useDebounce";

type TablePropsType = {
  onClick: () => void;
  clearances: ClearanceSummaryProjection[];
};

const Table = ({ onClick, clearances }: TablePropsType) => {
  return (
    <table className="w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-200 border-b border-gray-300 text-nowrap">
          <th className="sticky top-0 p-2 border-r border-gray-300 bg-gray-200">
            No.
          </th>
          <th className="sticky top-0 p-2 border-r border-gray-300 bg-gray-200">
            Name
          </th>
          <th className="sticky top-0 p-2 border-r border-gray-300 bg-gray-200">
            Type
          </th>
          <th className="sticky top-0 p-2 border-r border-gray-300 bg-gray-200">
            Status
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
        {clearances &&
          clearances.map((element, index) => (
            <tr key={index} className="border-b border-gray-300 text-nowrap">
              <td className="p-2 border-r border-gray-300 text-center">1</td>
              <td className="p-2 border-r border-gray-300 text-center">
                {element.name}
              </td>
              <td className="p-2 border-r border-gray-300 text-center">
                {element.type}
              </td>
              <td className="p-2 border-r border-gray-300 text-center">
                {element.status}
              </td>
              <td className="p-2 border-r border-gray-300 text-center">
                {element.applied_at}
              </td>
              <td className="p-2 border-r border-gray-300 text-center">
                {element.last_modified_at ? element.applied_at : "N/A"}
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
          ))}
      </tbody>
    </table>
  );
};

const isStudent = (user: IUserSummaryResponse | null): boolean => {
  if (user?.authorities.length === 1 && user?.authorities.includes("STUDENT")) {
    return true;
  } else {
    return false;
  }
};

const ClearanceModal = () => {
  const [clearances, setClearances] = useState<ClearanceSummaryProjection[]>(
    []
  );
  const navigate = useNavigate();
  const [isViewClicked, setIsViewClicked] = useState<boolean>(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);

  const homeNavigationHandler = () => {
    navigate("/home");
  };

  const [page, setPage] = useState<Page>({
    totalPage: 0,
    currentPage: 1,
  });

  const [filterBody, setFilterBody] = useState<ClearanceFilterBody>({
    search_query: "",
    status: "ALL",
    type_of_clearance: "ALL",
  });

  const { user } = useAuth();

  const prevPageHandler = () => {
    setPage((prev) => ({ ...prev, currentPage: (prev.currentPage -= 1) }));
  };
  const nextPageHandler = () => {
    setPage((prev) => ({ ...prev, currentPage: (prev.currentPage += 1) }));
  };

  const dispatch = useDispatch<AppDispatch>();
  const { apiClient } = useAuth();
  const requestClearanceHandler = async () => {
    try {
      const response = await request(apiClient);
      dispatch(open(response));
    } catch (error: any) {
      if (error.status === 403) {
        const errorMessage = getErrorMessage(error);
        dispatch(open(errorMessage));
      }
    } finally {
      setIsConfirmationModalOpen(false);
    }
  };

  const typeOfClearanceHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterBody((prev) => ({ ...prev, type_of_clearance: e.target.value }));
  };

  const statusHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterBody((prev) => ({ ...prev, status: e.target.value }));
  };

  const searchClearanceUserHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterBody((prev) => ({ ...prev, search_query: e.target.value }));
  };

  const updateListOfClearance = (newClearance: ClearanceSummaryProjection) => {
    setClearances((prev) => {
      const index = prev.findIndex(
        (clearance) =>
          clearance.id.toString().trim().toLowerCase() ===
          newClearance.id.toString().trim().toLowerCase()
      );

      if (index !== -1) {
        const updatedClearances = [...prev];
        updatedClearances[index] = newClearance;
        return updatedClearances;
      } else {
        return [newClearance, ...prev];
      }
    });
  };

  const debouceFilterBody = useDebounce(filterBody, 300); // set the delay of debounce
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await findAll(
          apiClient,
          debouceFilterBody,
          page.currentPage
        );
        setClearances(response.content);
        setPage((prev) => ({
          ...prev,
          totalPage: response.totalPages,
        }));
      } catch (error) {}
    };

    fetchData();
  }, [debouceFilterBody]);

  const { subscribe } = useWebSocket();
  useEffect(() => {
    subscribe("/user/queue/clearance/update", (msg: IMessage) => {
      // update the listed letters
      updateListOfClearance(JSON.parse(msg.body) as ClearanceSummaryProjection);
    });
  }, []);

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      {/* Modal Content */}
      <div className="w-[95%] h-[95%] max-h-[95%] bg-background flex flex-col rounded-lg shadow-xl relative">
        {/* Header Layer */}
        <div className="flex justify-between rounded-tl-lg rounded-tr-lg bg-primary text-darkContrast p-1 text-md">
          <div className="flex justify-center items-center gap-2">
            <img
              src={CLEARANCE_ICON}
              alt="Department Icon"
              className="size-6 sm:size-7"
            />
            <span className="text-darkContrast">Clearance Section</span>
          </div>
          <button
            onClick={homeNavigationHandler}
            className="font-bold hover:text-red-500 hover:cursor-pointer"
          >
            ✖
          </button>
        </div>
        {/* Modal Body */}
        <div className="bg-background w-full flex-1 p-4 flex flex-col overflow-auto">
          {!isStudent(user) ? (
            <div
              className={`bg-white rounded-tl-lg rounded-tr-lg pb-1 grid gap-1 grid-rows-2 grid-cols-[2fr_1fr] md:grid-rows-[35px_35px]`}
            >
              <input
                className={`w-full border border-gray-200 rounded-md pl-2 placeholder:text-gray-400 outline-darkContrast`}
                type="text"
                placeholder="Search"
                onChange={searchClearanceUserHandler}
              />
              <select
                className="w-full pl-1.5 text-darkContrast border border-gray-200 outline-darkContrast rounded"
                onChange={statusHandler}
              >
                <option value="">All</option>
                <option value="PENDING">Pending</option>
                <option value="COMPLETED">Completed</option>
              </select>

              <select
                className={`w-full pl-1.5 text-darkContrast border border-gray-200 outline-darkContrast rounded`}
                onChange={typeOfClearanceHandler}
              >
                <option value="">All</option>
                <option value="STUDENT">Student</option>
                <option value="ACADEMIC_PERSONNEL">Academic Personnel</option>
                <option value="NON_ACADEMIC_PERSONNEL">
                  Non Academic Personnel
                </option>
                <option value="ALL_PERSONNEL">All Personnel</option>
              </select>

              <div className="w-full flex justify-end items-center">
                <button
                  onClick={() => setIsConfirmationModalOpen(true)}
                  className="bg-darkContrast text-white p-1 rounded-md hover:bg-secondary"
                >
                  Request
                </button>
              </div>
            </div>
          ) : (
            <>
              <div
                className={`bg-white rounded-tl-lg rounded-tr-lg pb-1 grid grid-rows-1 grid-cols-1`}
              >
                <div className="w-full flex justify-end items-center">
                  <button
                    onClick={() => setIsConfirmationModalOpen(true)}
                    className="bg-darkContrast text-white p-1 rounded-md hover:bg-secondary"
                  >
                    Request
                  </button>
                </div>
              </div>
            </>
          )}
          <div className="bg-white flex-1 overflow-auto">
            {isViewClicked ? (
              <>
                <h1>Clearance is currently unavailable</h1>
              </>
            ) : (
              <Table
                onClick={() => setIsViewClicked((v) => !v)}
                clearances={clearances}
              />
            )}
          </div>
          <PaginationButtons
            page={page}
            onNext={nextPageHandler}
            onPrev={prevPageHandler}
          />
        </div>
      </div>

      {isConfirmationModalOpen && (
        <ConfirmationModal
          message="Are you sure you want to request a new clearance?"
          cancel={() => setIsConfirmationModalOpen(false)}
          confirm={requestClearanceHandler}
        />
      )}
    </div>
  );
};

export default ClearanceModal;
