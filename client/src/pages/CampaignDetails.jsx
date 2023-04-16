import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { thirdweb } from "../assets";
import { CounterBox, CustomButton, Loader } from "../components";
import { useStateContext } from "../context";
import { calculateBarPercentage, daysLeft } from "../utils";

const CampaignDetails = () => {
  const { state } = useLocation();
  // DisplayCampaigns 컴포넌트에서 state 값으로 보낸 값을 사용
  const { donate, getDonations, contract, address } = useStateContext();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.campaign.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.campaign.pId);

    setDonators(data);
  };

  useEffect(() => {
    if (contract) {
      fetchDonators();
    }
  }, [contract, address]);

  const handleDonate = async () => {
    setIsLoading(true);

    await donate(state.campaign.pId, amount);

    navigate("/");
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <div className="overflow-hidden rounded-xl">
            <img
              src={state.campaign.image}
              alt="campaign_image"
              className="w-full h-[410px] object-cover rounded-xl hover:scale-[103%] transition duration-200 ease-in"
            />
          </div>

          <div className="relative w-full h-[8px] bg-[#3a3a43] mt-2 rounded">
            <div
              className="absolute h-full bg-[#4acd8d]"
              style={{
                width: `${calculateBarPercentage(
                  state.campaign.target,
                  state.campaign.amountCollected
                )}%`,
                maxWidth: "100%",
              }}
            />
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CounterBox title="Days Left" value={remainingDays} />
          <CounterBox
            title={`Raised of ${state.campaign.target}`}
            value={state.campaign.amountCollected}
          />
          <CounterBox title="Total Backers" value={donators.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Creator
            </h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img
                  src={thirdweb}
                  alt="user_icon"
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>

              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                  {state.campaign.owner}
                </h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">
                  {state.length} Campaingns
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Story
            </h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {state.campaign.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Donators
            </h4>

            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="flex justify-between items-center gap-4"
                  >
                    <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-all">
                      {index + 1}.&nbsp;{item.donator}
                    </p>
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-all">
                      {item.donation} ETH
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  No donators yet. 😥
                  <br />
                  Be the first one!
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
            Fund
          </h4>

          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Fund the Campaign
            </p>

            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white rounded-[10px] text-[18px] leading-[30px] placeholder:text-[#4b5264]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                  Back it because you believe in it.
                </h4>

                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                  Support the project for no reward, just because it speaks to
                  you.
                </p>
              </div>

              <CustomButton
                btnType="button"
                title="Fund Campaign"
                styles="w-full bg-[#8c6dfd]"
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
