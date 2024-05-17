import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Paper, Typography, CircularProgress, Box } from "@mui/material";
import axios from "axios";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface StockChartProps {
  symbol: string;
}

const StockChart: React.FC<StockChartProps> = ({ symbol }) => {
  const [chartData, setChartData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=0WS1HYOMLB2IBHMC`);
        const data = response.data["Time Series (5min)"];
        const labels = Object.keys(data).reverse();
        const values = labels.map((label) => data[label]["1. open"]);

        const chartData = {
          labels,
          datasets: [
            {
              label: `Stock Price (${symbol})`,
              data: values,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: false,
              tension: 0.1,
            },
          ],
        };

        setChartData(chartData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setLoading(false);
      }
    };

    fetchStockData();
  }, [symbol]);

  return (
    <Paper elevation={3} className="p-4 m-4">
      <Typography variant="h6" gutterBottom>
        Stock Data for {symbol}
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <CircularProgress />
        </Box>
      ) : (
        <Line data={chartData} />
      )}
    </Paper>
  );
};

export default StockChart;
