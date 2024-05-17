import { useState } from "react";

import { CiMoneyCheck1 } from "react-icons/ci";
import { Grid, Paper, Typography } from "@mui/material";

import { Header, SearchBar } from "../components";
import api from "../services/api";
import request from "../services/requests";
import homescreen from "/svg/homescreen.svg";

interface WatchList {
  name: string;
  symbol: string;
}

function HomeScreen() {
  const [selectedWatchList, setSelectedWatchList] = useState<WatchList | null>(null);
  const [stockName, setstockName] = useState<string>('');
  const [stockSymbol, setstockSymbol] = useState<string>('');


  const handleSelectedWatchList = (WatchList: WatchList) => {
    setSelectedWatchList(WatchList);
    setstockName(WatchList.symbol);
    setstockSymbol(WatchList.name);
    console.log(WatchList);
  };

  const createWatchList = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!selectedWatchList) {
      alert("No WatchList selected.");
      return;
    }

    try {
      console.log(request.get_watchList);
      const response = await api.post(request.get_watchList, {stockSymbol,stockName});
      if (response.status === 201) {
        alert("WatchList created!");
      } else {
        alert("Failed to create WatchList.");
      }
      setSelectedWatchList(null);

    } catch (error) {
      console.error("Error creating WatchList:", error);
      alert("An error occurred while creating the WatchList.");
    }
  };

  const deleteSelectedWatchList = () => {
    setSelectedWatchList(null);
  };

  return (
    <div className="relative m-2 md:m-10 mt-20 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Favourite" title="Search the Stocks you wanna monitor" />
      <div className="relative">
        <div className="mb-10">
          <SearchBar selectedWatchList={handleSelectedWatchList} />
        </div>
        <Grid container spacing={3} className="relative z-10">
          {selectedWatchList && (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Paper
                elevation={0}
                style={{
                  borderRadius: "1rem",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
                className="p-4 shadow-sm mb-6"
              >
                <div className="flex items-center">
                  <div className="text-3xl rounded-[20%] p-4 bg-cyan-100 text-cyan-500">
                    <CiMoneyCheck1 />
                  </div>

                  <div className="ml-4">
                    <Typography variant="h6">{selectedWatchList.symbol}</Typography>

                    <div className="space-x-2 mt-1">
                      <button
                        className="bg-teal-500 hover:bg-teal-600 text-white text-sm py-0.5 px-2 rounded"
                        onClick={createWatchList}
                      >
                        Added
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white text-sm py-0.5 px-2 rounded"
                        onClick={deleteSelectedWatchList}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>

                <Typography
                  variant="body1"
                  style={{ marginTop: "1rem" }}
                  className="text-gray-600 mt-4"
                >
                  {selectedWatchList.name}
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>

        <img src={homescreen} alt="Home Screen" className="w-full h-auto" />
      </div>
    </div>
  );
}

export default HomeScreen;
