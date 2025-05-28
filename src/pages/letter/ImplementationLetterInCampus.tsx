import { ChangeEvent, useEffect, useRef, useState } from "react";
import CancelApplyButton from "../../components/button/CancelApplyButton";
import LetterHeader from "../../components/letter/LetterHeader";
import SignatureCard from "../../components/signature/SignatureCard";
import { IImplementationLetterInCampusRequest } from "../../types/letter/ImplementationLetterInCampus";
import { TypeOfBaseLetter } from "../../types/letter/BaseLetter";
import { IUserNameAndIdOnly } from "../../types/user/User";
import UserSearchedCard from "../../components/letter/UserSearchedCard";
import { Page, PaginationResponse } from "../../types/Pagination";
import { useAuth } from "../../context/AuthContext";
import { BaseResponse } from "../../types/response/Response";
import { debounce } from "lodash";
import { AppDispatch, RootState } from "../../store/Store";
import { useDispatch, useSelector } from "react-redux";
import { open } from "../../store/slice/MessageSlice";
import { applying, stopApplying } from "../../store/slice/LetterSlice";
import { getErrorMessage } from "../../helper/AxiosHelper";
import { apply } from "../../service/LetterService";
import { findClubMember } from "../../service/UserService";

const ImplementationLetterInCampus = () => {
  const [implementationLetter, setImplementationLetter] =
    useState<IImplementationLetterInCampusRequest>({
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

  const [searchedStudents, setSearchedStudents] = useState<
    IUserNameAndIdOnly[]
  >([]);

  const [page, setPage] = useState<Page>({
    currentPage: 0,
    totalPage: 0,
  });

  const [searchTerm, setSearchTerm] = useState<string>("");

  const { apiClient } = useAuth();

  const studentMap = useRef<Map<string, IUserNameAndIdOnly>>(new Map()); // this holds all the selected participants

  // Debounced search function (no need for useCallback if using useEffect)
  const debouncedSearch = debounce(
    async (query: string, currentPage: number) => {
      if (!query.trim() || query.length < 3) {
        setPage({ currentPage: 0, totalPage: 0 });
        setSearchedStudents([]);
        return;
      }

      const data = await findClubMember({ apiClient, query, currentPage });
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

  const selectStudent = (selected: IUserNameAndIdOnly) => {
    studentMap.current.set(selected.id, selected);
    setImplementationLetter((prev) => ({
      ...prev,
      participant_ids: [...prev.participant_ids, selected.id],
    }));
  };

  const removeStudent = (id: string) => {
    studentMap.current.delete(id);
    setImplementationLetter((prev) => ({
      ...prev,
      participant_ids: prev.participant_ids.filter((i) => i !== id),
    }));
  };

  const isStudentSelected = (id: string): boolean => {
    return studentMap.current.has(id);
  };

  const onChangeHandler = (userDetails: IUserNameAndIdOnly, value: boolean) => {
    if (value) {
      selectStudent(userDetails);
    } else {
      removeStudent(userDetails.id);
    }
  };

  const activityHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setImplementationLetter((prev) => ({
      ...prev,
      name_of_activity: e.target.value,
    }));
  };

  const venueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setImplementationLetter((prev) => ({
      ...prev,
      venue: e.target.value,
    }));
  };

  const dateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setImplementationLetter((prev) => ({
      ...prev,
      date: e.target.value,
    }));
  };

  const timeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setImplementationLetter((prev) => ({
      ...prev,
      time: e.target.value,
    }));
  };

  const expectedOutputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setImplementationLetter((prev) => ({
      ...prev,
      expected_output: e.target.value,
    }));
  };

  const objectiveHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setImplementationLetter((prev) => ({
      ...prev,
      objective: e.target.value,
    }));
  };

  const projectedExpensesHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setImplementationLetter((prev) => ({
      ...prev,
      projected_expenses: e.target.value,
    }));
  };

  const sourcecOfFundHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setImplementationLetter((prev) => ({
      ...prev,
      source_of_fund: e.target.value,
    }));
  };

  const rationaleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setImplementationLetter((prev) => ({
      ...prev,
      rationale: e.target.value,
    }));
  };

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

  const { hasESignature } = useSelector((state: RootState) => state.eSignature);
  const dispatch = useDispatch<AppDispatch>();

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
        <LetterHeader title="Implementation In Campus Letter Application" />
        <div className="flex flex-col gap-2 text-darkContrast">
          <div>
            <h1>Name of Activity</h1>
            <input
              onChange={activityHandler}
              value={implementationLetter.name_of_activity || ""}
              type="text"
              className="w-[85%] border border-gray-200 rounded-md pl-2 placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)]"
            />
          </div>
          <div className="flex gap-2">
            <div className="border rounded-lg border-gray-300 outline-darkContrast md:h-[var(--input-height-md)] lg:flex lg:gap-4">
              <h1>
                Date <span className="text-red-600">*</span>
              </h1>
              <input
                onChange={dateHandler}
                value={implementationLetter.date || ""}
                className="cursor-pointer"
                type="date"
              />
            </div>
            <div className="border rounded-lg border-gray-300 outline-darkContrast md:h-[var(--input-height-md)] lg:flex lg:gap-4">
              <h1>
                Time <span className="text-red-600">*</span>
              </h1>
              <input
                onChange={timeHandler}
                value={implementationLetter.time || ""}
                className="cursor-pointer"
                type="time"
              />
            </div>
          </div>
          <div>
            <h1>Venue</h1>
            <input
              onChange={venueHandler}
              value={implementationLetter.venue || ""}
              type="text"
              className="w-[85%] border border-gray-200 rounded-md pl-2 placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)]"
            />
          </div>
          <div>
            <h1>Expected Output</h1>
            <input
              onChange={expectedOutputHandler}
              value={implementationLetter.expected_output || ""}
              type="text"
              className="w-[85%] border border-gray-200 rounded-md pl-2 placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)]"
            />
          </div>
          <div>
            <h1>Objective</h1>
            <input
              onChange={objectiveHandler}
              value={implementationLetter.objective || ""}
              type="text"
              className="w-[85%] border border-gray-200 rounded-md pl-2 placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)]"
            />
          </div>
          <div>
            <h1>Projected Expenses</h1>
            <input
              onChange={projectedExpensesHandler}
              value={implementationLetter.projected_expenses || ""}
              type="text"
              className="w-[85%] border border-gray-200 rounded-md pl-2 placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)]"
            />
          </div>
          <div>
            <h1>Source of Fund</h1>
            <input
              onChange={sourcecOfFundHandler}
              value={implementationLetter.source_of_fund || ""}
              type="text"
              className="w-[85%] border border-gray-200 rounded-md pl-2 placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)]"
            />
          </div>
          <div>
            <h1>Rationale</h1>
            <input
              onChange={rationaleHandler}
              value={implementationLetter.rationale || ""}
              type="text"
              className="w-[85%] border border-gray-200 rounded-md pl-2 placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)]"
            />
          </div>
          <div>
            <h1>Participant(s)</h1>
            <div className="flex flex-col border border-gray-300 w-full rounded-md p-2 ">
              <div className="border-b border-gray-300 p-1.5">
                <input
                  value={searchTerm || ""}
                  onChange={searchTermHandler}
                  type="text"
                  placeholder="Search student name"
                  className="border border-gray-200 rounded-md p-1.5 placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)]"
                />
              </div>
              <div className="h-[12rem] overflow-auto">
                {searchedStudents?.map((element, _) => (
                  <UserSearchedCard
                    onChange={onChangeHandler}
                    user={{
                      id: element.id,
                      name: element.name,
                      profile: element.profile,
                    }}
                    isSelected={isStudentSelected(element.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <SignatureCard />
        </div>
        <CancelApplyButton apply={submit} />
      </div>
    </div>
  );
};

export default ImplementationLetterInCampus;
