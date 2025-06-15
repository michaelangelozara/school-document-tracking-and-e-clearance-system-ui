import { useNavigate } from "react-router-dom";
import DEPARTMENT_ICON from "../../assets/icon/svg/section_card/department-icon-svgrepo-com.svg";

const DepartmentModal = () => {
  const navigate = useNavigate();

  const navigationHandler = () => {
    navigate("/home");
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      {/* Modal Content */}
      <div className="w-[95%] h-[95%] bg-background flex flex-col rounded-lg shadow-xl relative">
        {/* Header Layer */}
        <div className="flex justify-between rounded-tl-lg rounded-tr-lg bg-primary text-darkContrast p-1">
          <div className="flex justify-center items-center gap-2">
            <img
              src={DEPARTMENT_ICON}
              alt="Department Icon"
              className="size-6 sm:size-7"
            />
            <span className="text-md text-darkContrast">
              Department Section
            </span>
          </div>
          <button
            onClick={navigationHandler}
            className="text-lg font-bold hover:text-red-500 hover:cursor-pointer"
          >
            ✖
          </button>
        </div>
        {/* Modal Body */}
        <div className="bg-background w-full flex-1 p-4">
          {/* Content Goes Here */}
        </div>
      </div>
    </div>
  );
};

export default DepartmentModal;
