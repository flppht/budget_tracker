import Auth from "./Auth";

import WalletIcon from "@mui/icons-material/Wallet";

const HomePage = () => {
  return (
    <div className="flex flex-row space-x-5 mt-40">
      <div className="welcomePage justify-left">
        <div className="flex flex-row mb-4 items-center text-gray-800 ">
          <div>
            <WalletIcon sx={{ fontSize: 55 }} />
          </div>

          <label className="text-4xl font-bold">Budget tracker</label>
        </div>

        <label className="text-lg font-semibold text-gray-700">
          Budget tracking is the process of monitoring your income and expenses
          to gain insight into your financial habits and ultimately achieve your
          financial goals. With Budget tracker app, you can easily keep track of
          where your money is going and make informed decisions to optimize your
          finances.
        </label>
      </div>
      <Auth />
    </div>
  );
};

export default HomePage;
