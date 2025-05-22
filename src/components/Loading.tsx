import React from "react";
import LOADING_ICON from "../assets/icon/gif/loading.gif";

const Loading = () => {
  return (
    <div className="size-[5rem]">
      <img src={LOADING_ICON} alt="Loading Icon" />
    </div>
  );
};

export default Loading;
