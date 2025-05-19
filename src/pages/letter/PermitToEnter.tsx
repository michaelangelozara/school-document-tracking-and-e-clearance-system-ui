import { ChangeEvent, useEffect, useRef, useState } from "react";
import { IPermitToEnter } from "../../types/letter/PermitToEnter";
import { TypeOfBaseLetter } from "../../types/letter/BaseLetter";
import { IUserNameAndIdOnly } from "../../types/user/User";
import CancelApplyButton from "../../components/button/CancelApplyButton";
import LetterHeader from "../../components/letter/LetterHeader";

type SearchedUserCardPropsType = {
  user: IUserNameAndIdOnly;
  onChange: (user: IUserNameAndIdOnly, value: boolean) => void;
};
const SearchedUserCard = ({ user, onChange }: SearchedUserCardPropsType) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <div>
      <div className="flex items-center gap-3 p-2">
        <img
          className="size-9 rounded-full md:size-12"
          src={user.profile || ""}
          alt="User Image"
        />
        <h1 className="md:text-sm">{user.name}</h1>
        <input
          className="md:size-4"
          type="checkbox"
          checked={isChecked}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setIsChecked(e.target.checked);
            onChange(user, e.target.checked);
          }}
        />
      </div>
    </div>
  );
};

const PermitToEnter = () => {
  const [permitToEnter, setPermitToEnter] = useState<IPermitToEnter>({
    base_letter_request_body_type: TypeOfBaseLetter.PERMIT_TO_ENTER_LETTER,
    type: TypeOfBaseLetter.PERMIT_TO_ENTER_LETTER,
    activity: "",
    date: "",
    time: "",
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

  const isStudentSelected = (id: string): boolean => {
    if (studentMap.current.get(id) !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  const onChangeHandler = (userDetails: IUserNameAndIdOnly, value: boolean) => {
    console.log(userDetails);
  };

  useEffect(() => {
    try {
    } catch (error) {}
  }, []);

  const submit = () => {};

  return (
    <div className="bg-background p-3">
      <div className="flex flex-col rounded-md gap-4 p-2 bg-white text-darkContrast overflow-auto lg:text-md">
        <LetterHeader title="Permit To Enter Letter Application" />

        <div className="flex gap-2">
          <div className="border rounded-lg border-gray-300 outline-darkContrast lg:flex lg:gap-4">
            <h1>
              Date <span className="text-red-600">*</span>
            </h1>
            <input
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
          <div className="border rounded-lg border-gray-300 outline-darkContrast lg:flex lg:gap-4">
            <h1>
              Time <span className="text-red-600">*</span>
            </h1>
            <input
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
                type="text"
                placeholder="Search student name"
                className="border border-gray-200 rounded-md p-1.5 placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)]"
              />
            </div>
            <div className="h-[12rem] overflow-auto">
              {searchedStudents?.map((element, _) => (
                <SearchedUserCard
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

        <CancelApplyButton apply={submit} />
      </div>
    </div>
  );
};

export default PermitToEnter;
