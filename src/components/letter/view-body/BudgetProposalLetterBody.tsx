import { IBudgetProposalResponseDTO } from "../../../types/letter/BudgetProposal";

const BudgetProposalLetterBody = (letter: IBudgetProposalResponseDTO) => {
  return (
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
        <h1 className="min-w-[170px] text-darkContrast">Venue</h1>
        <h1>{letter.venue}</h1>
      </div>
      <div className="pt-2 pb-2 flex">
        <h1 className="min-w-[170px] text-darkContrast">Source of Fund</h1>
        <h1>{letter.source_of_fund}</h1>
      </div>
      <div className="pt-2 pb-2 flex">
        <h1 className="min-w-[170px] text-darkContrast">Amount Allotted</h1>
        <h1>{letter.amount_allotted}</h1>
      </div>
      <div className="pt-2 pb-2 flex">
        <h1 className="min-w-[170px] text-darkContrast">Status</h1>
        <h1>{letter.status}</h1>
      </div>

      <h1 className="text-darkContrast">Expected Expenses</h1>
      <div className="flex flex-col h-[200px] overflow-auto p-2 border border-gray-200 rounded-md">
        <div className="flex mb-2 border-b border-b-gray-200">
          <h1 className="text-darkContrast w-[10%] md:w-[7%]">No</h1>
          <h1 className="text-darkContrast w-[40%] md:w-[43%]">Name</h1>
          <h1 className="text-darkContrast w-[50%]">Amount</h1>
        </div>
        {letter.expected_expenses.map((element, index) => (
          <div key={index} className="flex">
            <h1 className="text-darkContrast w-[10%] md:w-[7%]">
              {index + 1}.
            </h1>
            <h1 className="w-[40%] md:w-[43%]">{element.name}</h1>
            <h1 className="w-[50%]">{element.amount}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetProposalLetterBody;
