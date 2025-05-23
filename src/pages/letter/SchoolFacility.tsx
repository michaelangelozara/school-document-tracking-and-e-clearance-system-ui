import React, { ChangeEvent, useRef, useState } from "react";
import LetterHeader from "../../components/letter/LetterHeader";
import {
  ISchoolFacility,
  IFacilityOrEquipment,
} from "../../types/letter/SchoolFacility";
import { TypeOfBaseLetter } from "../../types/letter/BaseLetter";
import REMOVE_ICON from "../../assets/icon/svg/letter/remove-svgrepo-com.svg";
import CancelApplyButton from "../../components/button/CancelApplyButton";
import SignatureCard from "../../components/signature/SignatureCard";
import { useAuth } from "../../context/AuthContext";
import { AppDispatch, RootState } from "../../store/Store";
import { useDispatch, useSelector } from "react-redux";
import { open } from "../../store/slice/MessageSlice";
import { applying, stopApplying } from "../../store/slice/LetterSlice";
import { getErrorMessage } from "../../helper/AxiosHelper";
import { apply } from "../../service/LetterService";

type SelectedItemPropsType = {
  index: number;
  name: string;
  quantity: number;
  removeItem: (index: number) => void;
};
const SelectedItemCard = ({
  index,
  name,
  quantity,
  removeItem,
}: SelectedItemPropsType) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full gap-2">
        <div className="w-[50%]">
          <h1 className="border w-full border-gray-200 rounded-md p-1 pl-1 placeholder:text-gray-400 outline-darkContrast">
            {name}
          </h1>
        </div>
        <div className="flex items-center w-[50%]">
          <h1 className="border w-[70%] border-gray-200 rounded-md p-1 pl-1 placeholder:text-gray-400 outline-darkContrast">
            {quantity}
          </h1>
          <div
            onClick={() => removeItem(index)}
            className="flex-1 flex w-auto justify-center items-center"
          >
            <img className="size-6" src={REMOVE_ICON} alt="Remove Icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

const SchoolFacility = () => {
  const [schoolFacility, setSchoolFacility] = useState<ISchoolFacility>({
    base_letter_request_body_type: TypeOfBaseLetter.SCHOOL_FACILITY_LETTER,
    type: TypeOfBaseLetter.SCHOOL_FACILITY_LETTER,
    venue: "",
    date: "",
    time: "",
    facility_or_equipments: [],
  });

  const [equipment, setEquipment] = useState<IFacilityOrEquipment>({
    name: "",
    quantity: 0,
  });

  const addEquipment = () => {
    if (equipment.name === "" || equipment.quantity === 0) {
      return;
    }

    setSchoolFacility((prev) => ({
      ...prev,
      facility_or_equipments: [...prev.facility_or_equipments, equipment],
    }));

    // reset the state
    setEquipment({
      name: "",
      quantity: 0,
    });
  };

  const removeEquipment = (i: number) => {
    setSchoolFacility((prev) => ({
      ...prev,
      facility_or_equipments: prev.facility_or_equipments.filter(
        (_, index) => index !== i
      ),
    }));
  };

  const venueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSchoolFacility((prev) => ({ ...prev, venue: e.target.value }));
  };

  const dateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSchoolFacility((prev) => ({ ...prev, date: e.target.value }));
  };

  const timeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSchoolFacility((prev) => ({ ...prev, time: e.target.value }));
  };

  const reset = () => {
    setSchoolFacility({
      base_letter_request_body_type: TypeOfBaseLetter.SCHOOL_FACILITY_LETTER,
      type: TypeOfBaseLetter.SCHOOL_FACILITY_LETTER,
      venue: "",
      date: "",
      time: "",
      facility_or_equipments: [],
    });
  };
  const { apiClient } = useAuth();

  const { hasESignature } = useSelector((state: RootState) => state.eSignature);
  const dispatch = useDispatch<AppDispatch>();

  const submit = async () => {
    if (!hasESignature) {
      dispatch(open("Please attach you E-Signature."));
      return;
    }

    try {
      dispatch(applying());
      const response = await apply(schoolFacility, apiClient);
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
        <LetterHeader title="School Facility Letter Application" />
        <div className="flex flex-col gap-2 overflow-auto">
          <div>
            <h1>Venue</h1>
            <input
              value={schoolFacility.venue || ""}
              onChange={venueHandler}
              type="text"
              className="border border-gray-200 rounded-md p-1 pl-1 placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)]"
            />
          </div>
          <div>
            <h1>Date & Time</h1>
            <div className="flex gap-2">
              <input
                onChange={dateHandler}
                value={schoolFacility.date || ""}
                className="border p-1 border-gray-200 rounded-md outline-darkContrast md:h-[var(--input-height-md)]"
                type="date"
              />
              <input
                onChange={timeHandler}
                value={schoolFacility.time || ""}
                className="border p-1 border-gray-200 rounded-md outline-darkContrast md:h-[var(--input-height-md)]"
                type="time"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 h-[320px] mt-4">
            <h1 className="mb-1.5">Facilities/Equipment</h1>
            <div className="flex gap-2">
              <div className="w-[50%]">
                <h1>Name</h1>
              </div>
              <div className="w-[50%]">
                <h1>Quantity</h1>
              </div>
            </div>

            <div className="flex flex-col gap-2 h-[200px] overflow-auto">
              {schoolFacility?.facility_or_equipments?.map((element, index) => (
                <SelectedItemCard
                  index={index}
                  name={element.name}
                  quantity={element.quantity}
                  removeItem={() => removeEquipment(index)}
                />
              ))}

              <div className="flex flex-col gap-2">
                <div className="flex w-full gap-2">
                  <div className="w-[50%]">
                    <input
                      value={equipment.name || ""}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEquipment((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      type="text"
                      className="border w-full border-gray-200 rounded-md p-1 pl-1 placeholder:text-gray-400 outline-darkContrast"
                    />
                  </div>
                  <div className="flex items-center w-[50%]">
                    <input
                      value={equipment.quantity || ""}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEquipment((prev) => ({
                          ...prev,
                          quantity: Number(e.target.value),
                        }))
                      }
                      type="number"
                      className="border w-[70%] border-gray-200 rounded-md p-1 pl-1 placeholder:text-gray-400 outline-darkContrast"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={addEquipment}
              className="bg-secondary text-nowrap w-[5rem] p-1 rounded-md hover:bg-primary"
            >
              Add Item
            </button>
          </div>
          <SignatureCard />
          <CancelApplyButton apply={submit} />
        </div>
      </div>
    </div>
  );
};

export default SchoolFacility;
