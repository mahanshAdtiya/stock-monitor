import React, { useState, createContext, useContext, FC, Dispatch, SetStateAction } from 'react';

interface UserData {
    name: string;
    email: string;
}

interface State {
  activeMenu: boolean;
  isClicked: {
      userProfile: boolean;
      notification: boolean;
  };
  screenSize: number | undefined;
  currentColor: string;
  isLoggedIn: boolean;
  userData: UserData;

  setActiveMenu: Dispatch<SetStateAction<boolean>>;
  setIsClicked: Dispatch<
      SetStateAction<{
          userProfile: boolean;
          notification: boolean;
      }>
  >;
  handleClick: (clicked: keyof State["isClicked"]) => void;
  setScreenSize: Dispatch<SetStateAction<number | undefined>>;
  logout: () => void;
  setUserData: Dispatch<SetStateAction<UserData>>;
  setColor: (color: string) => void;
  updateAuthStatus: (status: boolean) => void;
  setUserState: (details: Partial<UserData>) => void;
}

const initialState = {
    userProfile: false,
    notification: false,
};

const StateContext = createContext<State | undefined>(undefined);

export const ContextProvider: FC<{
    userData: UserData;
    setUserData: Dispatch<SetStateAction<UserData>>;
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
    children: React.ReactNode; 
}> = ({ children, userData, setUserData, isLoggedIn, setIsLoggedIn }) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);
    const [screenSize, setScreenSize] = useState<number | undefined>(undefined);
    const [currentColor, setCurrentColor] = useState("#296DB4");

    // useEffect (() =>{
    //   const fetchData = async () =>{
    //     try{
    //       const token = localStorage.getItem("token");
    //       if(token){
    //         setIsLoggedIn(true);
    //       }
    //       else{
    //         setIsLoggedIn(false);
    //         console.log("No Token Found")
    //       }
    //     }catch (error) {
    //       console.error("Error:", error);
    //     }
    //   };
    //   fetchData();
    // },[isLoggedIn])

    const setColor = (color: string) => {
      setCurrentColor(color);
      localStorage.setItem("colorMode", color);
    };

    const handleClick = (clicked: keyof State["isClicked"]) => {
      setIsClicked((prevState) => ({
        ...prevState,
        [clicked]: !prevState[clicked],
      }));
    };

    const logout = () => {
      console.log("LogOut button is pressed");
      localStorage.clear();
      setIsLoggedIn(false);
    };

    const updateAuthStatus = (status: boolean) => {
      setIsLoggedIn(status);
    };

    const setUserState = (details: Partial<UserData>) =>{
      setUserData((prevDetails) => ({
        ...prevDetails,
        ...details,
      }));
    }

    const value: State = {
        activeMenu,
        isClicked,
        screenSize,
        currentColor,
        isLoggedIn,
        userData,
        setUserData,
        setActiveMenu,
        setIsClicked,
        setScreenSize,
        setColor,
        handleClick,
        logout,
        updateAuthStatus,
        setUserState,

    };
    return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
}

export const useStateContext = () => {
    const context = useContext(StateContext);
    if (context === undefined) {
      throw new Error("useStateContext must be used within a StateContextProvider");
    }
    return context;
};
