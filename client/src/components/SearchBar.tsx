import { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

interface Stock {
  symbol: string;
  name: string;
}

interface SearchBarProps {
  selectedWatchList: (note: Stock) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ selectedWatchList }) => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Stock[]>([]);

  const fetchData = async (value: string) => {
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=0WS1HYOMLB2IBHMC`
      );
      console.log(response.data);
      const data: Stock[] = response.data.bestMatches.map((match: any) => ({
        symbol: match["1. symbol"],
        name: match["2. name"],
      }));

      setResults(data);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  const handleSelectStock = (stock: Stock) => {
    selectedWatchList(stock);
    setInput("");
    setResults([]);
  };

  const handleChange = (value: string) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="w-full">
      <div className="flex w-full">
        <TextField
          id="search-bar"
          variant="outlined"
          placeholder="Search..."
          size="small"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="search"
                onClick={() => fetchData(input)}
                edge="end"
              >
                <SearchIcon />
              </IconButton>
            ),
          }}
          style={{ flex: 1 }}
        />
      </div>
      {results.map((stock) => (
        <MenuItem
          key={stock.symbol}
          onClick={() => handleSelectStock(stock)}
          className="text-gray-800"
        >
          {stock.name} ({stock.symbol})
        </MenuItem>
      ))}
    </div>
  );
};

export default SearchBar;
