import React, { ChangeEvent, useState } from "react";
import {
  IFacilityOrEquipment,
  ISchoolFacilityApplyRequestDTO,
} from "../../../types/letter/SchoolFacility";
import CancelApplyButton from "../../button/CancelApplyButton";
import SignatureCard from "../../signature/SignatureCard";
import LetterHeader from "../apply-update-header/LetterHeader";

type SchoolFacilityPropsType = {
  schoolFacility: ISchoolFacilityApplyRequestDTO;
  setSchoolFacility: React.Dispatch<
    React.SetStateAction<ISchoolFacilityApplyRequestDTO>
  >;
  onSubmit: () => void;
};
const SchoolFacilityForm = ({
  schoolFacility,
  setSchoolFacility,
  onSubmit,
}: SchoolFacilityPropsType) => {
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
              className="w-[85%] border border-gray-200 rounded-md pl-2 placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)]"
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
          <div className="flex flex-col">
            <h1 className="text-center font-semibold md:font-bold md:text-[1.2rem]">
              Facility/Equipment
            </h1>
            <div className="border border-gray-300 h-[6rem] md:h-[10rem] overflow-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-300 md:text-md">
                    <th className="sticky top-0 bg-gray-300 border-r border-gray-400">
                      Name
                    </th>
                    <th className="sticky top-0 bg-gray-300 border-r border-gray-400">
                      Amount
                    </th>
                    <th className="sticky top-0 bg-gray-300 border-r border-gray-400">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="border border-gray-300">
                  <tr className="text-nowrap">
                    <td className="border-r border-gray-300">
                      <input
                        value={equipment.name || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setEquipment((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="border pl-2 border-gray-200 w-full placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)] md:text-[1.2rem]"
                      />
                    </td>
                    <td className="border-r border-gray-300">
                      <input
                        value={equipment.quantity || ""}
                        type="number"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setEquipment((prev) => ({
                            ...prev,
                            quantity: Number(e.target.value),
                          }))
                        }
                        className="border pl-2 border-gray-200 w-full placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)] md:text-[1.2rem]"
                      />
                    </td>
                    <td className="flex border-b border-b-gray-200 justify-center items-center md:h-[var(--input-height-md)]">
                      <button
                        onClick={addEquipment}
                        className="text-darkContrast underline"
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                  {schoolFacility?.facility_or_equipments?.map(
                    (element, index) => (
                      <tr
                        key={index}
                        className="text-nowrap md:text-md md:h-[var(--input-height-md)]"
                      >
                        <td className="pl-2 border-r border-b border-gray-300 md:text-[1.2rem]">
                          {element.name}
                        </td>
                        <td className="pl-2 border-r border-b border-gray-300 md:text-[1.2rem]">
                          {element.quantity}
                        </td>
                        <td className="flex justify-center items-center border-b border-gray-300">
                          <button
                            onClick={() => removeEquipment(index)}
                            className="text-darkContrast underline md:h-[2.5rem]"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <SignatureCard />
          <CancelApplyButton apply={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default SchoolFacilityForm;
