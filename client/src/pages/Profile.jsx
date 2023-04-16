import React, { useEffect, useState } from "react";
import { DisplayCampaigns } from "../components";
import { useStateContext } from "../context";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaigns } = useStateContext();

  const ferchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) {
      ferchCampaigns();
    }
  }, [address, contract]);

  return (
    <div>
      {!address ? (
        <>
          <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
            Did you connect your account?
          </h1>
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You must connect acount first! 😥
          </p>
        </>
      ) : (
        <DisplayCampaigns
          title="Your Campaigns"
          isLoading={isLoading}
          campaigns={campaigns}
        />
      )}
    </div>
  );
};

export default Profile;
