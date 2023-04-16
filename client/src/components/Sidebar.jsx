import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import { logo, sun } from "../assets";
import { navlinks } from "../constants";
// 위의 파일 내용을 통해 이미지와 링크 url을 불러와서 사용

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive && isActive === name && "bg-[#2c2f32] hover:bg-[#2c2f32]"
    } flex justify-center items-center ${
      !disabled && "cursor-pointer"
    } hover:bg-[#2c2f32] transition duration-200 ease-in
    } ${styles}`} // #4acd8d
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
      />
    )}
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {/* navlinks는 배열 형태로 만들어졌기 때문에 map 함수 적용이 가능 */}
          {navlinks.map((link) => (
            <Tooltip
              key={link.name}
              placement="right"
              title={link.name.replace(/^[a-z]/, (char) => char.toUpperCase())}
              // 첫 글자 대문자 작업
              color={"#4acd8d"}
              overlayInnerStyle={{
                color: "white",
                fontWeight: "bold",
                textShadow: "0 0 5px black",
              }}
            >
              <div
                key={link.name}
                className="rounded-[10px] transition duration-200 ease-in"
              >
                <Icon
                  key={link.name}
                  {...link}
                  isActive={isActive}
                  handleClick={() => {
                    if (!link.disabled) {
                      setIsActive(link.name);
                      navigate(link.link);
                    }
                  }}
                />
              </div>
            </Tooltip>
          ))}
        </div>
        <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} />
      </div>
    </div>
  );
};

export default Sidebar;
