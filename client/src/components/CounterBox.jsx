import React from "react";

const CounterBox = ({ title, value }) => {
  return (
    <div className="flex flex-col items-center w-[150px]">
      <h4 className="font-epilogue font-bold text-[30px] text-white p-3 pt-5 bg-[#1c1c24] rounded-t-[10px] w-full text-center truncate">
        <span className="animate-pulse">{value}</span>
      </h4>
      <p className="font-epilogue font-semibold text-[16px] text-[#808191] bg-[#28282e] px-3 py-2 w-full rounded-b-[10px] text-center truncate">
        {title}
      </p>
    </div>
  );
};

export default CounterBox;
