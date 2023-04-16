import React from "react";

const CustomButton = ({ address, btnType, title, handleClick, styles }) => {
  return (
    <button
      type={btnType}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] selection:text-[#8c6dfd] ${styles} brightness`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
