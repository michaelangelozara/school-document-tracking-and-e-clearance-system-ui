import React, { ChangeEvent, useEffect, useState } from "react";
import { IPermitToEnterRequestDTO } from "../../../types/letter/PermitToEnter";
import ApplyUpdateButton from "../../button/ApplyUpdateButton";
import SignatureCard from "../../signature/SignatureCard";
import { IUserNameAndIdOnly } from "../../../types/user/User";
import LetterHeader from "../apply-update-header/LetterHeader";
import { Page, PaginationResponse } from "../../../types/Pagination";
import { BaseResponse } from "../../../types/response/Response";
import { debounce } from "lodash";
import { useAuth } from "../../../context/AuthContext";
import UserSearchedCard from "../UserSearchedCard";
import PaginationButton from "../../shared/PaginationButton";
import { ModeType } from "../../../types/letter/BaseLetter";

type PermitToEnterPropsType = {
  permitToEnter: IPermitToEnterRequestDTO;
  setPermitToEnter: React.Dispatch<
    React.SetStateAction<IPermitToEnterRequestDTO>
  >;
  studentMap: React.RefObject<Map<string, IUserNameAndIdOnly>>;
  onSubmit: () => void;
  mode: ModeType;
};
const PermitToEnterForm = ({
  permitToEnter,
  setPermitToEnter,
  studentMap,
  onSubmit,
  mode,
}: PermitToEnterPropsType) => {
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
        {mode === "apply" && (
          <div className="flex flex-col gap-4">
            <SignatureCard />
          </div>
        )}
        <ApplyUpdateButton apply={onSubmit} mode={mode} />
      </div>
    </div>
  );
};

export default PermitToEnterForm;
