import React, { useState } from "react";
import { SignatoryCardPropsType } from "../../types/signatory/Signatory";
import ConfirmationModal from "../shared/ConfirmationModal";

const ClearanceSignatoryCard = ({
  id,
  authority,
  currentSignatory,
  date_and_time_of_signature,
  name,
  signature,
  signed,
}: SignatoryCardPropsType) => {
  const [isSignatureButtonClicked, setIsSignatureButtonClicked] =
    useState<boolean>(false);

  const signatureConfirmed = () => {};

  return (
    <div className="w-full flex flex-col border border-gray-200 p-2 rounded-md">
      <h1 className="text-darkContrast">
        Authority: <span className="text-black">{authority}</span>
      </h1>
      <h1 className="text-darkContrast">
        Current Signatory:{" "}
        <span className="text-black">{currentSignatory ? "Yes" : "No"}</span>
      </h1>
      <h1 className="text-darkContrast">
        Date & Time:{" "}
        <span className="text-black">{date_and_time_of_signature}</span>
      </h1>
      <h1 className="text-darkContrast">
        Name: <span className="text-black">{name}</span>
      </h1>
      {signed ? (
        <img
          className="w-full h-[60px] border border-gray-200"
          src={signature}
          alt="Signature"
        />
      ) : (
        <div
          onClick={() => setIsSignatureButtonClicked(true)}
          className="w-full h-[60px] border border-gray-200 flex justify-center items-center cursor-pointer"
        >
          <span>Sign Here</span>
        </div>
      )}
      <h1 className="text-darkContrast">
        Status:{" "}
        <span className={`${signed ? "text-green-400" : "text-red-400"}`}>
          {signed ? "Signed" : "Pending"}
        </span>
      </h1>

      {isSignatureButtonClicked && (
        <ConfirmationModal
          message="Are you sure you want to sign?"
          cancel={() => setIsSignatureButtonClicked(false)}
          confirm={signatureConfirmed}
        />
      )}
    </div>
  );
};

export default ClearanceSignatoryCard;
