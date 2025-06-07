import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { IPermitToEnter } from "../../types/letter/PermitToEnter";
import { TypeOfBaseLetter } from "../../types/letter/BaseLetter";
import { IUserNameAndIdOnly } from "../../types/user/User";
import CancelApplyButton from "../../components/button/CancelApplyButton";
import LetterHeader from "../../components/letter/LetterHeader";
import UserSearchedCard from "../../components/letter/UserSearchedCard";
import { useAuth } from "../../context/AuthContext";
import { debounce } from "lodash";
import PaginationButton from "../../components/shared/PaginationButton";
import { Page, PaginationResponse } from "../../types/Pagination";
import { BaseResponse } from "../../types/response/Response";
import { applying, stopApplying } from "../../store/slice/LetterSlice";
import { getErrorMessage } from "../../helper/AxiosHelper";
import { apply } from "../../service/LetterService";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { open } from "../../store/slice/MessageSlice";
import SignatureCard from "../../components/signature/SignatureCard";

const PermitToEnter = () => {
  const [permitToEnter, setPermitToEnter] = useState<IPermitToEnter>({
    base_letter_request_body_type: TypeOfBaseLetter.PERMIT_TO_ENTER_LETTER,
    type: TypeOfBaseLetter.PERMIT_TO_ENTER_LETTER,
    activity: "",
    date: "",
    time: "",
    participant_ids: [],
  });

  const [page, setPage] = useState<Page>({
    currentPage: 0,
    totalPage: 0,
  });

  const [searchedStudents, setSearchedStudents] = useState<
    IUserNameAndIdOnly[]
  >([]);

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

  const studentMap = useRef<Map<string, IUserNameAndIdOnly>>(new Map()); // this holds all the selected participants

  const selectStudent = (selected: IUserNameAndIdOnly) => {
    studentMap.current.set(selected.id, selected);
    setPermitToEnter((prev) => ({
      ...prev,
      participant_ids: [...prev.participant_ids, selected.id],
    }));
  };

  const removeStudent = (id: string) => {
    studentMap.current.delete(id);
    setPermitToEnter((prev) => ({
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

  const reset = () => {
    setPermitToEnter({
      base_letter_request_body_type: TypeOfBaseLetter.PERMIT_TO_ENTER_LETTER,
      type: TypeOfBaseLetter.PERMIT_TO_ENTER_LETTER,
      activity: "",
      date: "",
      time: "",
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
      const response = await apply(permitToEnter, apiClient);
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
        <LetterHeader title="Permit To Enter Letter Application" />

        <div className="flex gap-2">
          <div className="border rounded-lg border-gray-300 outline-darkContrast md:h-[var(--input-height-md)] lg:flex lg:gap-4">
            <h1>
              Date <span className="text-red-600">*</span>
            </h1>
            <input
              value={permitToEnter.date || ""}
              className="cursor-pointer"
              type="date"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPermitToEnter((prev) => ({
                  ...prev,
                  date: e.target.value,
                }))
              }
            />
          </div>
          <div className="border rounded-lg border-gray-300 outline-darkContrast md:h-[var(--input-height-md)] lg:flex lg:gap-4">
            <h1>
              Time <span className="text-red-600">*</span>
            </h1>
            <input
              value={permitToEnter.time || ""}
              className="cursor-pointer"
              type="time"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPermitToEnter((prev) => ({
                  ...prev,
                  time: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <div>
          <h1>
            Name of Activity <span className="text-red-600">*</span>
          </h1>
          <input
            value={permitToEnter.activity || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPermitToEnter((prev) => ({
                ...prev,
                activity: e.target.value,
              }))
            }
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
          <PaginationButton
            page={page}
            onPrev={() =>
              setPage((prev) => ({
                ...prev,
                currentPage: prev.currentPage - 1,
              }))
            }
            onNext={() =>
              setPage((prev) => ({
                ...prev,
                currentPage: prev.currentPage + 1,
              }))
            }
          />
        </div>
        <SignatureCard />
        <CancelApplyButton apply={submit} />
      </div>
    </div>
  );
};

export default PermitToEnter;
