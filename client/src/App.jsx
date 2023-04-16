import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar, Sidebar } from "./components";
import { CampaignDetails, CreateCampaign, Home, Profile } from "./pages";

const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar/>
      </div >
      {/* siddhu */}

      <div className="flex-1 max-sm:w-full max-2-[1280px] mx-auto sm:pr-5">
        <Navbar />
        
        {/* nandu */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
