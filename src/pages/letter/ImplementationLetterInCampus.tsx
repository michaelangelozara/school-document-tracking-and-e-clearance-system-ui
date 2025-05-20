import { useRef, useState } from "react";
import CancelApplyButton from "../../components/button/CancelApplyButton";
import LetterHeader from "../../components/letter/LetterHeader";
import SignatureCard from "../../components/signature/SignatureCard";
import { IImplementationLetterInCampusRequest } from "../../types/letter/ImplementationLetterInCampus";
import { TypeOfBaseLetter } from "../../types/letter/BaseLetter";
import { IUserNameAndIdOnly } from "../../types/user/User";
import UserSearchedCard from "../../components/letter/UserSearchedCard";

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

  const studentMap = useRef<Map<string, IUserNameAndIdOnly>>(new Map()); // this holds all the selected participants

  const selectStudent = ({ id, name, profile }: IUserNameAndIdOnly) => {
    studentMap.current.set(id, { id: id, name: name, profile: profile });
  };

  const removeStudent = (id: string) => {
    studentMap.current.delete(id);
  };

  const selectedStudentList: IUserNameAndIdOnly[] = Array.from(
    studentMap.current.values()
  );

  const onChangeHandler = () => {};

  const submit = () => {};

  return (
    <div className="bg-background p-3">
      <div className="flex flex-col rounded-md gap-4 p-2 bg-white text-darkContrast overflow-auto lg:text-md">
        <LetterHeader title="Implementation In Campus Letter Application" />
        <div className="flex flex-col gap-2 text-darkContrast">
          <div>
            <h1>Name of Activity</h1>
            <input
              type="text"
              className="w-[85%] border border-gray-200 rounded-md pl-2 placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)]"
            />
          </div>
          <div className="flex gap-2">
            <div className="border rounded-lg border-gray-300 outline-darkContrast md:h-[var(--input-height-md)] lg:flex lg:gap-4">
              <h1>
                Date <span className="text-red-600">*</span>
              </h1>
              <input className="cursor-pointer" type="date" />
            </div>
            <div className="border rounded-lg border-gray-300 outline-darkContrast md:h-[var(--input-height-md)] lg:flex lg:gap-4">
              <h1>
                Time <span className="text-red-600">*</span>
              </h1>
              <input className="cursor-pointer" type="time" />
            </div>
          </div>
          <div>
            <h1>Venue</h1>
            <input
              type="text"
              className="w-[85%] border border-gray-200 rounded-md pl-2 placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)]"
            />
          </div>
          <div>
            <h1>Expected Output</h1>
            <input
              type="text"
              className="w-[85%] border border-gray-200 rounded-md pl-2 placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)]"
            />
          </div>
          <div>
            <h1>Objective</h1>
            <input
              type="text"
              className="w-[85%] border border-gray-200 rounded-md pl-2 placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)]"
            />
          </div>
          <div>
            <h1>Projected Expenses</h1>
            <input
              type="text"
              className="w-[85%] border border-gray-200 rounded-md pl-2 placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)]"
            />
          </div>
          <div>
            <h1>Source of Fund</h1>
            <input
              type="text"
              className="w-[85%] border border-gray-200 rounded-md pl-2 placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)]"
            />
          </div>
          <div>
            <h1>Rationale</h1>
            <input
              type="text"
              className="w-[85%] border border-gray-200 rounded-md pl-2 placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)]"
            />
          </div>
          <div>
            <h1>Participant(s)</h1>
            <div className="flex flex-col border border-gray-300 w-full rounded-md p-2 ">
              <div className="border-b border-gray-300 p-1.5">
                <input
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
