import React from "react";

import {
  IAcademicPersonnelResponse,
  INonAcademicPersonnelResponse,
  IStudentResponse,
  TypeOfBaseUser,
} from "../../../../types/user/User";

const StudentAcademicInfo = (data: IStudentResponse) => {
  return (
    <div className="bg-white rounded-md p-2 flex flex-col gap-2 shadow">
      <h1 className="font-bold border-b border-gray-200 md:text-md">
        Academic Info
      </h1>
      <div className="grid grid-cols-2 gap-2">
        {/* if student */}

        <h1 className="text-black">Year Level</h1>
        <h1>{data.year_level}</h1>

        <h1 className="text-black">Course</h1>
        <h1>
          {data.course_name} ({data.course_short_name})
        </h1>

        <h1 className="text-black">Department</h1>
        <h1>
          {data.department_name} ({data.department_short_name})
        </h1>

        <h1 className="text-black">Departmental Club</h1>
        <h1>
          {data.department_club_name} ({data.department_club_short_name})
        </h1>

        <h1 className="text-black">Social Club</h1>
        <h1>
          {data.social_club_name} ({data.social_club_short_name})
        </h1>
      </div>
    </div>
  );
};

const AcademicPersonnelAcademicInfo = (data: IAcademicPersonnelResponse) => {
  return (
    <div className="bg-white rounded-md p-2 flex flex-col gap-2 shadow">
      <h1 className="font-bold border-b border-gray-200 md:text-md">
        Academic Info
      </h1>
      <div className="grid grid-cols-2 gap-2">
        {/* if student */}

        <h1 className="text-black">Course</h1>
        <h1>
          {data.course_name} ({data.course_short_name})
        </h1>

        <h1 className="text-black">Department</h1>
        <h1>
          {data.department_name} ({data.department_short_name})
        </h1>

        <h1 className="text-black">Club</h1>
        <h1>
          {data.club_name} ({data.club_short_name})
        </h1>
      </div>
    </div>
  );
};

const NonAcademicPersonnelAcademicInfo = (
  data: INonAcademicPersonnelResponse
) => {
  return (
    <div className="bg-white rounded-md p-2 flex flex-col gap-2 shadow">
      <h1 className="font-bold border-b border-gray-200 md:text-md">
        Academic Info
      </h1>
      <div className="grid grid-cols-2 gap-2">
        {/* if student */}
        <h1 className="text-black">Club</h1>
        <h1>
          {data.club_name && data.club_short_name
            ? `${data.club_name} (${data.club_short_name})`
            : "N/A"}
        </h1>
      </div>
    </div>
  );
};

// Define the props type that all academic info components will receive
type AcademicInfoComponentProps =
  | IStudentResponse
  | IAcademicPersonnelResponse
  | INonAcademicPersonnelResponse
  | null;

// Create a type that maps user types to their corresponding props
type ComponentMap = {
  [TypeOfBaseUser.STUDENT]: React.ComponentType<IStudentResponse>;
  [TypeOfBaseUser.ACADEMIC_PERSONNEL]: React.ComponentType<IAcademicPersonnelResponse>;
  [TypeOfBaseUser.NON_ACADEMIC_PERSONNEL]: React.ComponentType<INonAcademicPersonnelResponse>;
};

// Create the component factory map
const componentMap: ComponentMap = {
  [TypeOfBaseUser.STUDENT]: StudentAcademicInfo,
  [TypeOfBaseUser.ACADEMIC_PERSONNEL]: AcademicPersonnelAcademicInfo,
  [TypeOfBaseUser.NON_ACADEMIC_PERSONNEL]: NonAcademicPersonnelAcademicInfo,
};

type AcademicInfoPropsType = {
  type: TypeOfBaseUser | undefined;
  data: AcademicInfoComponentProps;
};
const AcademicInfo = ({ type, data }: AcademicInfoPropsType) => {
  if (type === undefined) {
    return <div>No academic info component found for user type: {type}</div>;
  }

  // Get the appropriate component from the map
  const Component = componentMap[type];

  if (!Component) {
    return <div>No academic info component found for user type: {type}</div>;
  }

  // Cast the data to the appropriate type - TypeScript will ensure this is safe
  return <Component {...(data as any)} />;
};

export default AcademicInfo;
