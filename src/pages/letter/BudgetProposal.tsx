import React, { useState } from "react";
import {
  IBudgetProposalRequest,
  IExpectedExpensesRequest,
} from "../../types/letter/BudgetProposal";
import NDTC_LOGO from "../../assets/icon/png/NDTC-300x279.png";
import CancelApplyButton from "../../components/button/CancelApplyButton";
import { TypeOfBaseLetter } from "../../types/letter/BaseLetter";

const BudgetProposal = () => {
  const [budgetProposal, setBudgetProposal] = useState<IBudgetProposalRequest>({
    base_letter_request_body_type: TypeOfBaseLetter.BUDGET_PROPOSAL_LETTER,
    type: TypeOfBaseLetter.BUDGET_PROPOSAL_LETTER,
    name_of_activity: "",
    venue: "",
    source_of_fund: "",
    amount_allotted: 0,
    expected_expenses: [],
  });
  const [expectedExpense, setExpectedExpense] =
    useState<IExpectedExpensesRequest>({
      name: "",
      amount: 0,
    });
  const [isESignatureLoading, setIsESignatureLoading] =
    useState<boolean>(false);

  const addItemHandler = () => {
    if (expectedExpense.name !== "" && expectedExpense.amount !== 0) {
      setBudgetProposal((prev) => ({
        ...prev,
        expected_expenses: [...prev.expected_expenses, expectedExpense],
      }));

      // reset the expected expense object
      setExpectedExpense({
        name: "",
        amount: 0,
      });
    }
  };
  const removeItemHandler = (i: number) => {
    setBudgetProposal((prev) => ({
      ...prev,
      expected_expenses: prev.expected_expenses.filter(
        (_, index) => index !== i
      ),
    }));
  };

  return (
    <div className="bg-background p-3">
      <div className="flex flex-col rounded-md gap-2 p-2 bg-white text-darkContrast overflow-auto">
        <div className="flex flex-col justify-center items-center">
          <img className="size-14" src={NDTC_LOGO} alt="NDTC Logo" />
          <h1 className="font-semibold">Budget Proposal Application</h1>
        </div>
        <div className="text-sm">
          <div>
            <h1>
              Name of Activity <span className="text-red-600">*</span>
            </h1>
            <input className="border border-gray-200 rounded-md pl-2 placeholder:text-gray-400 outline-darkContrast" />
          </div>
          <div>
            <h1>
              Venue <span className="text-red-600">*</span>
            </h1>
            <input className="border border-gray-200 rounded-md pl-2 placeholder:text-gray-400 outline-darkContrast" />
          </div>

          <div>
            <h1>
              Source of Fund <span className="text-red-600">*</span>
            </h1>
            <input className="border border-gray-200 rounded-md pl-2 placeholder:text-gray-400 outline-darkContrast" />
          </div>

          <div>
            <h1>
              Amount Allotted <span className="text-red-600">*</span>
            </h1>
            <input className="border border-gray-200 rounded-md pl-2 placeholder:text-gray-400 outline-darkContrast" />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="border border-gray-300 h-[6rem] overflow-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-300">
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
                {budgetProposal?.expected_expenses.length > 0 &&
                  budgetProposal.expected_expenses.map((element, index) => (
                    <tr key={index} className="text-nowrap">
                      <td className="pl-2 border-r border-gray-300">
                        {element.name}
                      </td>
                      <td className="pl-2 border-r border-gray-300">
                        {element.amount}
                      </td>
                      <td className="flex justify-center items-center">
                        <button
                          onClick={() => removeItemHandler(index)}
                          className="text-darkContrast underline"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                <tr className="text-nowrap">
                  <td className="border-r border-gray-300">
                    <input
                      value={expectedExpense.name || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setExpectedExpense((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="border pl-2 border-gray-200 w-full placeholder:text-gray-400 outline-darkContrast"
                    />
                  </td>
                  <td className="border-r border-gray-300">
                    <input
                      value={expectedExpense.amount || ""}
                      type="number"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setExpectedExpense((prev) => ({
                          ...prev,
                          amount: Number(e.target.value),
                        }))
                      }
                      className="border pl-2 border-gray-200 w-full placeholder:text-gray-400 outline-darkContrast"
                    />
                  </td>
                  <td className="flex justify-center items-center">
                    <button
                      onClick={addItemHandler}
                      className="text-darkContrast underline"
                    >
                      Add
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="italic">
              Upload your E-Signature here{" "}
              <span className="text-red-600">*</span>
            </h1>
            {true ? (
              <img
                className="w-[200px] h-[80px] border border-gray-300"
                src=""
                alt="E-Signature"
              />
            ) : (
              <div className="w-[200px] h-[80px] flex justify-center items-center border border-gray-300">
                <h1 className="italic">No E-Signature</h1>
              </div>
            )}
          </div>
          <div>
            <button className="p-2 bg-primary text-darkContrast rounded-md cursor-pointer">
              {isESignatureLoading ? "Uploading ..." : "Upload"}
            </button>
          </div>
        </div>
        <CancelApplyButton cancel={() => null} apply={() => null} />
      </div>
    </div>
  );
};

export default BudgetProposal;
