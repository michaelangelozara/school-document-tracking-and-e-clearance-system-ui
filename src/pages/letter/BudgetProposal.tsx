import React, { ChangeEvent, useState } from "react";
import {
  IBudgetProposalRequest,
  IExpectedExpensesRequest,
} from "../../types/letter/BudgetProposal";
import NDTC_LOGO from "../../assets/icon/png/NDTC-300x279.png";
import CancelApplyButton from "../../components/button/CancelApplyButton";
import { TypeOfBaseLetter } from "../../types/letter/BaseLetter";
import SignatureCard from "../../components/signature/SignatureCard";

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

  const submit = () => {
    if (
      budgetProposal.base_letter_request_body_type === null ||
      budgetProposal.type === null
    ) {
      return;
    }

    if (
      budgetProposal.name_of_activity === "" ||
      budgetProposal.venue === "" ||
      budgetProposal.source_of_fund === "" ||
      budgetProposal.amount_allotted === 0
    ) {
      return;
    }

    console.log(budgetProposal);
  };

  return (
    <div className="bg-background p-3">
      <div className="flex flex-col rounded-md gap-2 p-2 bg-white text-darkContrast overflow-auto">
        <div className="flex flex-col justify-center items-center">
          <img className="size-14 md:size-16" src={NDTC_LOGO} alt="NDTC Logo" />
          <h1 className="font-semibold md:text-lg lg:text-xl">
            Budget Proposal Letter Application
          </h1>
        </div>
        <div className="flex flex-col gap-2 text-sm md:text-md md:gap-4">
          <div>
            <h1>
              Name of Activity <span className="text-red-600">*</span>
            </h1>
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setBudgetProposal((prev) => ({
                  ...prev,
                  name_of_activity: e.target.value,
                }))
              }
              className="w-[85%] border border-gray-200 rounded-md pl-2 placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)]"
            />
          </div>
          <div>
            <h1>
              Venue <span className="text-red-600">*</span>
            </h1>
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setBudgetProposal((prev) => ({
                  ...prev,
                  venue: e.target.value,
                }))
              }
              className="w-[85%] border border-gray-200 rounded-md pl-2 placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)]"
            />
          </div>

          <div>
            <h1>
              Source of Fund <span className="text-red-600">*</span>
            </h1>
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setBudgetProposal((prev) => ({
                  ...prev,
                  source_of_fund: e.target.value,
                }))
              }
              className="w-[85%] border border-gray-200 rounded-md pl-2 placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)]"
            />
          </div>

          <div>
            <h1>
              Amount Allotted <span className="text-red-600">*</span>
            </h1>
            <input
              type="number"
              placeholder="₱0.00"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setBudgetProposal((prev) => ({
                  ...prev,
                  amount_allotted: Number(e.target.value),
                }))
              }
              className="w-[85%] border border-gray-200 rounded-md pl-2 placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)]"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-center font-semibold md:font-bold md:text-[1.2rem]">
            Expected Expenses
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
                {budgetProposal?.expected_expenses?.map((element, index) => (
                  <tr
                    key={index}
                    className="text-nowrap md:text-md md:h-[var(--input-height-md)]"
                  >
                    <td className="pl-2 border-r border-b border-gray-300 md:text-[1.2rem]">
                      {element.name}
                    </td>
                    <td className="pl-2 border-r border-b border-gray-300 md:text-[1.2rem]">
                      {element.amount}
                    </td>
                    <td className="flex justify-center items-center border-b border-gray-300">
                      <button
                        onClick={() => removeItemHandler(index)}
                        className="text-darkContrast underline md:h-[2.5rem]"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="text-nowrap">
                  <td className="border-r border-gray-300">
                    <input
                      placeholder="Name of Item"
                      value={expectedExpense.name || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setExpectedExpense((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="border pl-2 border-gray-200 w-full placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)] md:text-[1.2rem]"
                    />
                  </td>
                  <td className="border-r border-gray-300">
                    <input
                      placeholder="Amount of Item"
                      value={expectedExpense.amount || ""}
                      type="number"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setExpectedExpense((prev) => ({
                          ...prev,
                          amount: Number(e.target.value),
                        }))
                      }
                      className="border pl-2 border-gray-200 w-full placeholder:text-gray-400 outline-darkContrast md:h-[var(--input-height-md)] md:text-[1.2rem]"
                    />
                  </td>
                  <td className="flex justify-center items-center md:h-[var(--input-height-md)]">
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
          <SignatureCard />
        </div>
        <CancelApplyButton apply={submit} />
      </div>
    </div>
  );
};

export default BudgetProposal;
