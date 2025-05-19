import React from "react";
import NDTC_LOGO from "../../assets/icon/png/NDTC-300x279.png";

type LetterHeaderPropsType = {
  title: string;
};
const LetterHeader = ({ title }: LetterHeaderPropsType) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img className="size-14 md:size-16" src={NDTC_LOGO} alt="NDTC Logo" />
      <h1 className="font-semibold md:text-lg lg:text-xl">{title}</h1>
    </div>
  );
};

export default LetterHeader;
