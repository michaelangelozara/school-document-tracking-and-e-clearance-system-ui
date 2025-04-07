import { useState } from "react";

type PaginationTypes = {
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
};

const PaginationButtons = ({
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
    <div className="bg-yellow-500 h-[1rem] p-4 flex justify-center items-center gap-3">
      <button onClick={handlePrev} disabled={currentPage === 1}>
        Prev
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default PaginationButtons;
