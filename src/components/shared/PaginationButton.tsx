import NEXT_ICON from "../../assets/icon/svg/next-svgrepo-com.svg";
import { Page } from "../../types/Pagination";

type PaginationTypes = {
  page: Page;
  onPrev: () => void;
  onNext: () => void;
};
const PaginationButton = ({ page, onPrev, onNext }: PaginationTypes) => {
  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-2">
        <button
          className="hover:text-white hover:bg-secondary rounded-sm"
          onClick={onPrev}
          disabled={page.currentPage === 1}
        >
          <img className="size-9 rotate-[180deg]" src={NEXT_ICON} alt="" />
        </button>
        <span>
          Page {page.currentPage} of {page.totalPage}
        </span>
        <button
          className="hover:text-white hover:bg-secondary rounded-sm"
          onClick={onNext}
          disabled={page.currentPage === page.totalPage}
        >
          <img className="size-9" src={NEXT_ICON} alt="" />
        </button>
      </div>
    </div>
  );
};

export default PaginationButton;
