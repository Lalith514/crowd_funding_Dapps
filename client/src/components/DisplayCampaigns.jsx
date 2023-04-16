import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loader } from "../assets";
import { daysLeft } from "../utils";
import FundCard from "./FundCard";

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    const remainingDays = daysLeft(campaign.deadline);

    if (parseInt(remainingDays) === 0) {
      toast.error("This campaign is closed.", {
        style: {
          background: "#8c6dfd", //#1dc071
          color: "white",
        },
      });
      return false;
    } else {
      navigate(`/campaign-details/${campaign.title}`, {
        state: {
          campaign,
          length: campaigns.length,
        },
      });
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loading"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campaigns yet. 😥
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <FundCard
              key={campaign.pId}
              {...campaign}
              handleClick={() => {
                handleNavigate(campaign);
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
