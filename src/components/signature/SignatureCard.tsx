import React, { useState } from "react";

const SignatureCard = () => {
  const [isESignatureLoading, setIsESignatureLoading] =
    useState<boolean>(false);

  const [eSignature, setESignature] = useState<string | null>(null);

  const getESignature = async () => {
    try {
      setIsESignatureLoading(true);
    } catch (error) {
    } finally {
      setIsESignatureLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="italic">
          Upload your E-Signature here <span className="text-red-600">*</span>
        </h1>
        {eSignature ? (
          <img
            className="w-[200px] h-[80px] border border-gray-300"
            src={eSignature}
            alt="E-Signature"
          />
        ) : (
          <div className="w-[200px] h-[80px] flex justify-center items-center border border-gray-300">
            <h1 className="italic">No E-Signature</h1>
          </div>
        )}
      </div>
      <div>
        <button
          onClick={getESignature}
          className="p-2 bg-secondary text-darkContrast hover:bg-primary rounded-md cursor-pointer"
        >
          {isESignatureLoading ? "Uploading ..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default SignatureCard;
