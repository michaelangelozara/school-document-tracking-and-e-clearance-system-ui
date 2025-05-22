import React, { useState } from "react";
import NEXT_ICON from "../assets/icon/svg/next-svgrepo-com.svg";

type PaginationTypes = {
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
};
const PaginationButton = ({
  totalPages,
  nextPage,
  prevPage,
}: PaginationTypes) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      prevPage();
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      nextPage();
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-2">
        <button
          className="hover:text-white hover:bg-secondary rounded-sm"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          <img className="size-9 rotate-[180deg]" src={NEXT_ICON} alt="" />
        </button>
        <span>
          Page {0} of {0}
        </span>
        <button
          className="hover:text-white hover:bg-secondary rounded-sm"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <img className="size-9" src={NEXT_ICON} alt="" />
        </button>
      </div>
    </div>
  );
};

export default PaginationButton;
