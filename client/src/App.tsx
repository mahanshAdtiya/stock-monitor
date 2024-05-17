import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';


import { ProtectedRoute} from "./components";
import { Error404, LogIn, SignIn, HomeScreen,WatchList} from "./pages";

import CircularProgress from '@mui/material/CircularProgress';

function App() {

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 500);
  }, []);

  if (!isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<LogIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="*" element={<Error404 />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Navigate to="/homescreen" />} />
        <Route path="/homescreen" element={<HomeScreen />} />
        <Route path="/watchlist" element={<WatchList />} />
      </Route>
    </Routes>
  );
}

export default App;
