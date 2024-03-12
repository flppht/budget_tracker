import Auth from "./Auth";

import WalletIcon from "@mui/icons-material/Wallet";

const HomePage = () => {
  return (
    <div className="flex flex-col lg:flex-row md:space-x-5 mt-16 lg:mt-40 mb-52 lg:mb-40  items-center">
      <div className="welcomePage items-left mb-5 lg:mb-16 w-72 md:w-80 lg:w-96 lg:pr-8">
        <div className="flex flex-row mb-4 items-center text-gray-800 ">
          <div>
            <WalletIcon sx={{ fontSize: 45 }} />
          </div>

          <label className="text-2xl md:text-3xl font-bold">
            Budget tracker
          </label>
        </div>

        <label className="text-sm md:text-normal font-semibold text-gray-700">
          With Budget tracker app, you can easily keep track of where your money
          is going and make informed decisions to optimize your finances.
        </label>
      </div>
      <Auth />
    </div>
  );
};

export default HomePage;
