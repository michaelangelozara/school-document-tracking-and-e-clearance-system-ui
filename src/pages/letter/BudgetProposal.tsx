import React, { ChangeEvent, useState } from "react";
import {
  IBudgetProposalRequest,
  IExpectedExpensesRequest,
} from "../../types/letter/BudgetProposal";
import CancelApplyButton from "../../components/button/CancelApplyButton";
import { TypeOfBaseLetter } from "../../types/letter/BaseLetter";
import SignatureCard from "../../components/signature/SignatureCard";
import LetterHeader from "../../components/letter/LetterHeader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { open } from "../../store/slice/MessageSlice";
import { apply } from "../../service/LetterService";
import { applying, stopApplying } from "../../store/slice/LetterSlice";
import { useAuth } from "../../context/AuthContext";
import { getErrorMessage } from "../../helper/AxiosHelper";

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

  const reset = () => {
    setBudgetProposal({
      base_letter_request_body_type: TypeOfBaseLetter.BUDGET_PROPOSAL_LETTER,
      type: TypeOfBaseLetter.BUDGET_PROPOSAL_LETTER,
      name_of_activity: "",
      venue: "",
      source_of_fund: "",
      amount_allotted: 0,
      expected_expenses: [],
    });
  };

  const { apiClient } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const { hasESignature } = useSelector((state: RootState) => state.eSignature);

  const submit = async () => {
    if (!hasESignature) {
      dispatch(open("Please attach you E-Signature."));
      return;
    }

    try {
      dispatch(applying());
      const response = await apply(budgetProposal, apiClient);
      dispatch(open(response));
      reset();
    } catch (error: any) {
      if (error.status === 400) {
        const errorMessage = getErrorMessage(error);
        dispatch(open(errorMessage));
      }
    } finally {
      dispatch(stopApplying());
    }
  };

  return (
    <div className="bg-background p-3">
      <div className="flex flex-col rounded-md gap-2 p-2 bg-white text-darkContrast overflow-auto">
        <LetterHeader title="Budget Proposal Letter Application" />

        <div className="flex flex-col gap-2 text-sm md:text-md md:gap-4">
          <div>
            <h1>
              Name of Activity <span className="text-red-600">*</span>
            </h1>
            <input
              value={budgetProposal.name_of_activity || ""}
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
              value={budgetProposal.venue || ""}
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
              value={budgetProposal.source_of_fund || ""}
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
              value={budgetProposal.amount_allotted || ""}
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
