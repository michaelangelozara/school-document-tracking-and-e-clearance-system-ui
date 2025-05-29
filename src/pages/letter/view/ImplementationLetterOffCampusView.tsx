import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../../store/Store";
import { useAuth } from "../../../context/AuthContext";
import { findById } from "../../../service/LetterService";
import { IImplementationLetterOffCampusResponseDTO } from "../../../types/letter/ImplementationLetterOffCampus";
import { getErrorMessage } from "../../../helper/AxiosHelper";
import { open } from "../../../store/slice/MessageSlice";
import Loading from "../../../components/Loading";
import { typeOfLetterEnumToStringConverter } from "../../../helper/LetterHelper";
import SignatoryContainer from "../../../components/signatory/SignatoryCardContainer";
import ReturnDownloadButton from "../../../components/button/ReturnDownloadButton";
import LetterRejectionCard from "../../../components/letter/LetterRejectionCard";

const ImplementationLetterOffCampusView = () => {
  const [letter, setLetter] =
    useState<IImplementationLetterOffCampusResponseDTO>({
      id: "",
      status: undefined,
      type: undefined,
      current_signatories: [],
      reason_of_rejection: "",
      semester_and_school_year: "",
      created_at: "",
      last_modified_at: "",
      club_name: "",
      name_of_activity: "",
      description: "",
      reason: "",
      date_and_time: "",
      program_or_flow: "",
      committees: [],
    });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navivage = useNavigate();

  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const { apiClient } = useAuth();
  useEffect(() => {
    const controller = new AbortController();
    const fetchDate = async () => {
      try {
        const response = (await findById(
          id,
          apiClient,
          controller
        )) as IImplementationLetterOffCampusResponseDTO;
        setLetter(response);
        console.log(response);
      } catch (error: any) {
        if (error.status === 404) {
          const errorMessage = getErrorMessage(error);
          dispatch(open(errorMessage));
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchDate();

    return () => controller.abort();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="bg-background p-2">
      <div className="flex flex-col rounded-md gap-2 p-2 overflow-auto">
        <div className="p-2 bg-white rounded-sm overflow-auto">
          <h1 className="font-semibold text-darkContrast text-sm md:text-md">
            Metadata
          </h1>
          <div className="pt-2 pb-2 flex">
            <h1 className="min-w-[170px] text-darkContrast">Applied Club</h1>
            <h1>{letter.club_name}</h1>
          </div>
          <div className="pt-2 pb-2 flex">
            <h1 className="min-w-[170px] text-darkContrast">Type</h1>
            <h1>{typeOfLetterEnumToStringConverter(letter.type)}</h1>
          </div>
          <div className="pt-2 pb-2 flex">
            <h1 className="min-w-[170px] text-darkContrast">Created at</h1>
            <h1 className="text-nowrap">{letter.created_at}</h1>
          </div>
          <div className="pt-2 pb-2 flex">
            <h1 className="min-w-[170px] text-darkContrast">
              Last modified at
            </h1>
            <h1 className="text-nowrap">{letter.last_modified_at || "N/A"}</h1>
          </div>
        </div>

        <div className="p-2 bg-white rounded-sm">
          <h1 className="font-semibold text-darkContrast text-sm md:text-md">
            Letter Details
          </h1>
          <div className="pt-2 pb-2 flex">
            <h1 className="min-w-[170px] text-darkContrast">
              Semester/School Year
            </h1>
            <h1>{letter.semester_and_school_year}</h1>
          </div>
          <div className="pt-2 pb-2 flex">
            <h1 className="min-w-[170px] text-darkContrast">Activity</h1>
            <h1>{letter.name_of_activity}</h1>
          </div>
          <div className="pt-2 pb-2 flex">
            <h1 className="min-w-[170px] text-darkContrast">
              Date & Time of Letter
            </h1>
            <h1>{letter.date_and_time}</h1>
          </div>
          <div className="pt-2 pb-2 flex">
            <h1 className="min-w-[170px] text-darkContrast">Reason</h1>
            <h1>{letter.reason}</h1>
          </div>
          <div className="pt-2 pb-2 flex">
            <h1 className="min-w-[170px] text-darkContrast">Status</h1>
            <h1>{letter.status}</h1>
          </div>
          <div className="pt-2 pb-2 flex flex-col">
            <h1 className="min-w-[170px] text-darkContrast">Description</h1>
            <p className="h-[300px] overflow-auto border border-gray-200 rounded-md p-2">
              {letter.description}
            </p>
          </div>

          <h1 className="text-darkContrast">Committees</h1>
          <div className="overflow-auto flex flex-col h-[300px] p-2 border border-gray-200 rounded-md">
            <table>
              <thead>
                <tr className="text-nowrap border-b border-gray-200 text-left">
                  <th className="text-darkContrast pr-4 md:pr-0">No</th>
                  <th className="text-darkContrast pr-4 md:pr-0">Name</th>
                  <th className="text-darkContrast pr-4 md:pr-0">Activity</th>
                  <th className="text-darkContrast pr-4 md:pr-0">Objective</th>
                  <th className="text-darkContrast">Expected Output</th>
                </tr>
              </thead>
              <tbody>
                {letter.committees.map((element, index) => (
                  <tr>
                    <td className="text-darkContrast pr-4 md:pr-0">
                      {index + 1}.
                    </td>
                    <td className="text-nowrap pr-4 md:pr-0">{element.name}</td>
                    <td className="text-nowrap pr-4 md:pr-0">
                      {element.activity}
                    </td>
                    <td className="text-nowrap pr-4 md:pr-0">
                      {element.objective}
                    </td>
                    <td className="text-nowrap">{element.expected_output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* <div className="flex flex-col h-[200px] overflow-auto p-2 border border-gray-200 rounded-md">
            <div className="w-[500px] flex mb-2 border-b gap-2 border-b-gray-200">
              <h1 className="text-darkContrast">No</h1>
              <h1 className="text-darkContrast">Name</h1>
              <h1 className="text-darkContrast">Activity</h1>
              <h1 className="text-darkContrast">Objective</h1>
              <h1 className="text-darkContrast">Expected Output</h1>
            </div>
            {letter.committees.map((element, index) => (
              <div key={index} className="flex ">
                <h1 className="text-darkContrast w-[10%] md:w-[7%]">
                  {index + 1}.
                </h1>
                <h1 className="text-nowrap">{element.name}</h1>
                <h1 className="text-nowrap">{element.activity}</h1>
                <h1 className="text-nowrap">{element.objective}</h1>
                <h1 className="text-nowrap">{element.expected_output}</h1>
              </div>
            ))}
          </div> */}
        </div>

        <div className="p-2 bg-white rounded-sm">
          <h1 className="font-semibold text-darkContrast mb-3 text-sm md:text-md">
            Signatories
          </h1>
          <SignatoryContainer data={letter.current_signatories} />
          <ReturnDownloadButton
            onClickDownload={() => null}
            onClickReturn={() => navivage("/home/letters")}
            placement="right"
          />
        </div>

        <LetterRejectionCard
          status={letter.status}
          reasonOfRejection={letter.reason_of_rejection}
        />
      </div>
    </div>
  );
};

export default ImplementationLetterOffCampusView;
