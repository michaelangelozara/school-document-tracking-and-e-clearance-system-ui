import React, { useState } from "react";

import { getMySignature } from "../../service/UserService";
import { useAuth } from "../../context/AuthContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/Store";
import { save, updateLoadingStatus } from "../../store/slice/ESignatureSlice";
import { getErrorMessage } from "../../helper/AxiosHelper";
import { open } from "../../store/slice/MessageSlice";

const SignatureCard = () => {
  const [isESignatureLoading, setIsESignatureLoading] =
    useState<boolean>(false);

  const [eSignature, setESignature] = useState<string | null>(null);
  const { apiClient } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const getESignature = async () => {
    try {
      setIsESignatureLoading(true);
      dispatch(updateLoadingStatus(true));
      const response = await getMySignature(apiClient);
      setESignature(response);
      dispatch(save(response));
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      dispatch(open(errorMessage));
    } finally {
      setIsESignatureLoading(false);
      dispatch(updateLoadingStatus(false));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="italic text-xs md:text-sm">
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
