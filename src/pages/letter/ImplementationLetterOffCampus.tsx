import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import LetterHeader from "../../components/letter/LetterHeader";
import SignatureCard from "../../components/signature/SignatureCard";
import CancelApplyButton from "../../components/button/CancelApplyButton";
import EDIT_ICON from "../../assets/icon/svg/letter/edit-pensil-svgrepo-com.svg";
import REMOVE_ICON from "../../assets/icon/svg/letter/remove-svgrepo-com.svg";
import {
  ICommittee,
  IImplementationLetterOffCampusRequestDTO,
} from "../../types/letter/ImplementationLetterOffCampus";
import { TypeOfBaseLetter } from "../../types/letter/BaseLetter";
import { IUserNameAndIdOnly } from "../../types/user/User";
import PaginationButton from "../../components/shared/PaginationButton";
import { Page, PaginationResponse } from "../../types/Pagination";
import { useAuth } from "../../context/AuthContext";
import { debounce } from "lodash";
import { BaseResponse } from "../../types/response/Response";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { applying, stopApplying } from "../../store/slice/LetterSlice";
import { open } from "../../store/slice/MessageSlice";
import { apply } from "../../service/LetterService";
import { getErrorMessage } from "../../helper/AxiosHelper";

type SearchedUserCard = {
  id: string;
  profile: string;
  name: string;
  isSelected: boolean;
  selectUser: (selectedUser: IUserNameAndIdOnly) => void;
};
const SearchedUserCard = ({
  id,
  profile,
  name,
  isSelected,
  selectUser,
}: SearchedUserCard) => {
  return (
    <button
      key={id}
      disabled={isSelected}
      onClick={() => selectUser({ id, profile, name })}
      className={`flex border border-gray-200 items-center p-2 gap-2 text-darkContrast ${
        isSelected ? "bg-gray-300" : ""
      }`}
    >
      <img
        className="size-9 rounded-full md:size-12"
        src={profile}
        alt="User Icon"
      />
      <h1>{name}</h1>
    </button>
  );
};

type AssigningActivityModalPropsType = {
  addCommittee: (committee: ICommittee) => void;
  isCommitteeSelected: (id: string) => boolean;
  cancel: () => void;
  listOfCommittees: ICommittee[];
  removeCommittee: (id: string) => void;
  updateCommittee: (committee: ICommittee) => void;
};

const AssigningActivityModal = ({
  addCommittee,
  isCommitteeSelected,
  cancel,
  listOfCommittees,
  removeCommittee,
  updateCommittee,
}: AssigningActivityModalPropsType) => {
  const [searchedStudents, setSearchedStudents] = useState<
    IUserNameAndIdOnly[]
  >([]);

  const [page, setPage] = useState<Page>({
    totalPage: 0,
    currentPage: 0,
  });

  const studentMap = useRef<Map<string, IUserNameAndIdOnly>>(new Map());
  // this adds the selected user from the searched users to the map
  const addStudentToMap = () => {
    studentMap.current.set(selectedUser.id, selectedUser);
  };

  // this returns the user's info that will be updating
  const getSelectedUserToUpdate = (id: string): IUserNameAndIdOnly => {
    const selectedUser = studentMap.current.get(id);
    return selectedUser !== undefined
      ? selectedUser
      : ({ id: "", name: "", profile: "" } as IUserNameAndIdOnly);
  };

  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const isUpdatingHandler = () => {
    setIsUpdating((prev) => !prev);
  };

  const [selectedUser, setSelectedUser] = useState<IUserNameAndIdOnly>({
    id: "",
    name: "",
    profile: "",
  });

  const [newCommittee, setNewCommittee] = useState<ICommittee>({
    student_id: "",
    activity: "",
    objective: "",
    expected_output: "",
  });

  const selectUser = ({ id, name, profile }: IUserNameAndIdOnly) => {
    setSelectedUser({
      id: id,
      name: name,
      profile: profile,
    });

    setNewCommittee((prev) => ({ ...prev, student_id: id }));
  };

  const addNewCommittee = () => {
    addCommittee(newCommittee);
    resetCommittee();
  };

  const updateNewCommittee = () => {
    updateCommittee(newCommittee);
    resetCommittee();
  };

  const resetCommittee = () => {
    setSelectedUser({
      id: "",
      name: "",
      profile: "",
    });
    setNewCommittee({
      student_id: "",
      activity: "",
      objective: "",
      expected_output: "",
    });
  };

  const [searchTerm, setSearchTerm] = useState<string>("");

  const { apiClient } = useAuth();

  // Debounced search function (no need for useCallback if using useEffect)
  const debouncedSearch = debounce(
    async (query: string, currentPage: number) => {
      if (!query.trim() || query.length < 3) {
        setPage({ currentPage: 0, totalPage: 0 });
        setSearchedStudents([]);
        return;
      }

      const response = await apiClient.get(
        `/students/search?q=${query}&page=${currentPage - 1}&size=5`
      );
      const { data } = response.data as BaseResponse<
        PaginationResponse<IUserNameAndIdOnly>
      >;
      setSearchedStudents(data.content);
      setPage((prev) => ({ ...prev, totalPage: data.totalPages }));
    },
    300
  );

  // Trigger API call when searchTerm or page changes
  useEffect(() => {
    debouncedSearch(searchTerm, page.currentPage);
    return () => debouncedSearch.cancel(); // Cleanup on unmount
  }, [searchTerm, page.currentPage]);

  const searchTermHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage((prev) => ({ ...prev, currentPage: 1 })); // Reset to page 1 on new search
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-60 text-darkContrast">
      <div className="flex flex-col bg-white p-2 gap-2 w-[90%] h-[80%] overflow-auto rounded-md">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg">Assign Activity</h1>
          <div className="flex flex-col border border-gray-300 w-full rounded-md p-2 ">
            <div className="border-b border-gray-300 p-1.5">
              <input
                onChange={searchTermHandler}
                type="text"
                placeholder="Search student name"
                className="border border-gray-200 rounded-md p-1.5 placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)]"
              />
            </div>
            <div className="flex flex-col gap-1 h-[12rem] overflow-auto">
              {/* list of searched student */}
              {searchedStudents?.map((element, _) => (
                <SearchedUserCard
                  id={element.id}
                  profile={element.profile}
                  name={element.name}
                  isSelected={isCommitteeSelected(element.id)}
                  selectUser={selectUser}
                />
              ))}
            </div>
          </div>
          <div>
            <PaginationButton
              page={page}
              onNext={() => null}
              onPrev={() => null}
            />
          </div>
          <div>
            <h1>
              <span className="font-semibold">Selected: </span>
              {selectedUser.name}
            </h1>
          </div>
          <div>
            <h1>
              Activity <span className="text-red-600">*</span>
            </h1>
            <input
              value={newCommittee.activity || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewCommittee((prev) => ({
                  ...prev,
                  activity: e.target.value,
                }))
              }
              type="text"
              className="w-[85%] border border-gray-200 rounded-md pl-2 placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)]"
            />
          </div>
          <div>
            <h1>
              Objective <span className="text-red-600">*</span>
            </h1>
            <input
              value={newCommittee.objective || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewCommittee((prev) => ({
                  ...prev,
                  objective: e.target.value,
                }))
              }
              type="text"
              className="w-[85%] border border-gray-200 rounded-md pl-2 placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)]"
            />
          </div>
          <div>
            <h1>
              Expected Output <span className="text-red-600">*</span>
            </h1>
            <input
              value={newCommittee.expected_output || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewCommittee((prev) => ({
                  ...prev,
                  expected_output: e.target.value,
                }))
              }
              type="text"
              className="w-[85%] border border-gray-200 rounded-md pl-2 placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)]"
            />
          </div>
          <div className="flex flex-col p-2">
            <button
              onClick={() => {
                if (isUpdating) {
                  isUpdatingHandler();
                  updateNewCommittee();
                } else {
                  addNewCommittee();
                  addStudentToMap();
                }
              }}
              className="bg-secondary p-1 rounded-md font-semibold hover:bg-primary"
            >
              {isUpdating ? "Update" : "Assign Activity"}
            </button>
            <button
              onClick={resetCommittee}
              className="p-1 rounded-md font-semibold "
            >
              Clear Form
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg">Assigned Activities</h1>
          <div className="overflow-auto h-[150px]">
            <table className="w-full rounded-tr-md rounded-tl-md">
              <thead>
                <tr className="bg-gray-200 top-0 sticky border-t-gray-400 border-l-gray-400 border-r-gray-400 text-nowrap">
                  <th className="p-1 bg-gray-200">User ID</th>
                  <th className="p-1 bg-gray-200">Activity</th>
                  <th className="p-1 bg-gray-200">Objective</th>
                  <th className="p-1 bg-gray-200">Expected Output</th>
                  <th className="p-1 bg-gray-200">Action</th>
                </tr>
              </thead>
              <tbody className="border border-gray-200">
                {listOfCommittees?.map((element, index) => (
                  <tr key={index}>
                    <td className="break-words p-1">
                      {element.student_id.slice(0, 9)}
                    </td>
                    <td className="p-1">{element.activity}</td>
                    <td className="p-1">{element.objective}</td>
                    <td className="p-1">{element.expected_output}</td>
                    <td>
                      <div className="flex-1 flex w-auto justify-center items-center gap-1">
                        <img
                          onClick={() => {
                            isUpdatingHandler();
                            const userWillBeUpdated = getSelectedUserToUpdate(
                              element.student_id
                            );

                            // re-set the fields
                            setNewCommittee({
                              student_id: userWillBeUpdated.id,
                              activity: element.activity,
                              objective: element.objective,
                              expected_output: element.expected_output,
                            });

                            setSelectedUser(userWillBeUpdated);
                            // setNewCommittee((prev) => ({
                            //   ...prev,
                            //   student_id: userWillBeUpdated.id,
                            // }));
                          }}
                          className="size-6"
                          src={EDIT_ICON}
                          alt="Remove Icon"
                        />
                        <img
                          onClick={() => removeCommittee(element.student_id)}
                          className="size-6"
                          src={REMOVE_ICON}
                          alt="Remove Icon"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex p-1 justify-end md:text-lg">
          <button
            onClick={cancel}
            className="bg-secondary p-1 rounded-md text-white hover:bg-primary cursor-pointer md:p-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const ImplementationLetterOffCampus = () => {
  const [implementationLetter, setImplementationLetter] =
    useState<IImplementationLetterOffCampusRequestDTO>({
      base_letter_request_body_type:
        TypeOfBaseLetter.IMPLEMENTATION_LETTER_OFF_CAMPUS,
      type: TypeOfBaseLetter.IMPLEMENTATION_LETTER_OFF_CAMPUS,
      name_of_activity: "",
      description: "",
      reason: "",
      date_of_implementation: "",
      time_of_implementation: "",
      program_or_flow: "",
      committees: [],
    });

  const committeeMap = useRef<Map<string, ICommittee>>(new Map());

  const addCommittee = (committee: ICommittee) => {
    if (
      committee.student_id === "" ||
      committee.objective === "" ||
      committee.expected_output === "" ||
      committee.activity === ""
    ) {
      return;
    }

    setImplementationLetter((prev) => ({
      ...prev,
      committees: [...prev.committees, committee],
    }));

    committeeMap.current.set(committee.student_id, committee);
  };

  const removeCommittee = (id: string) => {
    setImplementationLetter((prev) => ({
      ...prev,
      committees: prev.committees.filter(
        (committee) => committee.student_id !== id
      ),
    }));

    committeeMap.current.delete(id);
  };

  const updateCommittee = (committee: ICommittee) => {
    removeCommittee(committee.student_id); // remove first

    addCommittee(committee); // then add the updated committee

    committeeMap.current.set(committee.student_id, committee);
  };

  const [isAssignmentClicked, setIsAssignmentClicked] =
    useState<boolean>(false);

  const assignmentButtonHandler = () => {
    setIsAssignmentClicked((prev) => !prev);
  };

  const isUserSelected = (id: string): boolean => {
    return committeeMap.current.has(id);
  };

  const reset = () => {
    setImplementationLetter({
      base_letter_request_body_type:
        TypeOfBaseLetter.IMPLEMENTATION_LETTER_OFF_CAMPUS,
      type: TypeOfBaseLetter.IMPLEMENTATION_LETTER_OFF_CAMPUS,
      name_of_activity: "",
      description: "",
      reason: "",
      date_of_implementation: "",
      time_of_implementation: "",
      program_or_flow: "",
      committees: [],
    });
  };

  const { hasESignature } = useSelector((state: RootState) => state.eSignature);
  const dispatch = useDispatch<AppDispatch>();
  const { apiClient } = useAuth();

  const submit = async () => {
    if (!hasESignature) {
      dispatch(open("Please attach you E-Signature."));
      return;
    }
    try {
      dispatch(applying());
      const response = await apply(implementationLetter, apiClient);
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

  return (
    <div className="bg-background p-3">
      <div className="flex flex-col rounded-md gap-4 p-2 bg-white text-darkContrast overflow-auto lg:text-md">
        <LetterHeader title="Implementation Off Campus Letter Application" />
        <div className="flex flex-col gap-2">
          <div>
            <h1>
              Name of Activity <span className="text-red-600">*</span>
            </h1>
            <input
              value={implementationLetter.name_of_activity || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setImplementationLetter((prev) => ({
                  ...prev,
                  name_of_activity: e.target.value,
                }))
              }
              type="text"
              className="w-[85%] border border-gray-200 rounded-md pl-2 placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)]"
            />
          </div>
          <div>
            <div className="flex gap-2">
              <div className="border rounded-lg border-gray-300 outline-darkContrast md:h-[var(--input-height-md)] lg:flex lg:gap-4">
                <h1>
                  Date <span className="text-red-600">*</span>
                </h1>
                <input
                  value={implementationLetter.date_of_implementation || ""}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setImplementationLetter((prev) => ({
                      ...prev,
                      date_of_implementation: e.target.value,
                    }))
                  }
                  className="cursor-pointer"
                  type="date"
                />
              </div>
              <div className="border rounded-lg border-gray-300 outline-darkContrast md:h-[var(--input-height-md)] lg:flex lg:gap-4">
                <h1>
                  Time <span className="text-red-600">*</span>
                </h1>
                <input
                  value={implementationLetter.time_of_implementation || ""}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setImplementationLetter((prev) => ({
                      ...prev,
                      time_of_implementation: e.target.value,
                    }))
                  }
                  className="cursor-pointer"
                  type="time"
                />
              </div>
            </div>
          </div>
          <div>
            <div>
              <h1>
                Reason <span className="text-red-600">*</span>
              </h1>
              <input
                value={implementationLetter.reason || ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setImplementationLetter((prev) => ({
                    ...prev,
                    reason: e.target.value,
                  }))
                }
                type="text"
                className="w-[85%] border border-gray-200 rounded-md pl-2 placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)]"
              />
            </div>
          </div>
          <div>
            <div>
              <h1>
                Program or Flow <span className="text-red-600">*</span>
              </h1>
              <input
                value={implementationLetter.program_or_flow || ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setImplementationLetter((prev) => ({
                    ...prev,
                    program_or_flow: e.target.value,
                  }))
                }
                type="text"
                className="w-[85%] border border-gray-200 rounded-md pl-2 placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)]"
              />
            </div>
          </div>
          <div>
            <h1>
              Description <span className="text-red-600">*</span>
            </h1>
            <textarea
              value={implementationLetter.description || ""}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setImplementationLetter((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="border rounded-lg border-gray-300 outline-darkContrast w-full h-[12rem] p-2 lg:h-[18rem]"
            />
          </div>
          <div>
            <h1
              className="text-blue-500 italic underline cursor-pointer"
              onClick={assignmentButtonHandler}
            >
              Assignment
            </h1>
            {isAssignmentClicked && (
              <AssigningActivityModal
                cancel={assignmentButtonHandler}
                addCommittee={addCommittee}
                isCommitteeSelected={isUserSelected}
                listOfCommittees={implementationLetter.committees}
                removeCommittee={removeCommittee}
                updateCommittee={updateCommittee}
              />
            )}
          </div>
          <div>
            <SignatureCard />
          </div>
          <CancelApplyButton apply={submit} />
        </div>
      </div>
    </div>
  );
};

export default ImplementationLetterOffCampus;
