import { useState, useEffect } from "react";
import { CiMoneyCheck1 } from "react-icons/ci";
import { Grid, Paper, Typography } from "@mui/material";

import { Header } from "../components";

import api from "../services/api";
import request from "../services/requests";

import watchList from "/svg/watchList.svg";

import {Stockchart} from "../components";

interface WatchList {
    id: number;
    stockName: string;
    stockSymbol: string;
  }

function WatchList() {
    const [watchLists, setWatchLists] = useState<WatchList[]>([]);
    const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
          const response = await api.get(request.get_watchList);
          setWatchLists(response.data);
          console.log(response.data);
        } catch (err) {
          console.error("Error fetching Watchlist:", err);
        }
      };
      const deleteWatchList = async (id: number) => {
        console.log(id);
        try {
            const res = await api.delete(`/api/watchlist/delete/${id}/`);
            if (res.status === 204) {
                alert("Watchlist deleted!");
                fetchData(); 
            } else {
                alert("Failed to delete Watchlist.");
            }
        } catch (error) {
          console.error("Error Deleting Watchlist:", error);
        }
    };
    

    return (
        <div className="relative m-2 md:m-10 mt-20 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="WatchList" title="Your Favourite Stocks" />
            <Grid container spacing={3} className="relative z-10">
            {watchLists.map((watchList, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
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
                    <Typography variant="h6">{watchList.stockName}</Typography>

                    <div className="space-x-2 mt-1">
                        <button className="bg-teal-500 hover:bg-teal-600 text-white text-sm py-0.5 px-2 rounded"
                        onClick={() => setSelectedSymbol(watchList.stockName)}>
                          Show Data
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white text-sm py-0.5 px-2 rounded"
                          onClick={() => deleteWatchList(watchList.id)}
                      >
                          Delete
                      </button>

                    </div>
                    </div>
                </div>

                <Typography
                    variant="body1"
                    style={{ marginTop: "1rem" }}
                    className="text-gray-400 mt-4"
                >
                    {watchList.stockSymbol}
                </Typography>
                </Paper>
            </Grid>
            ))}
        </Grid>
        {selectedSymbol && <Stockchart symbol={selectedSymbol} />}
        {!selectedSymbol && (<img src={watchList} alt="Home Screen" className="w-full h-auto" />)}
        </div>
    );
}

export default WatchList;
