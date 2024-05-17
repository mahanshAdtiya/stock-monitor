import HomeIcon from "@mui/icons-material/Home";
import ClassIcon from '@mui/icons-material/Class';
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

export const links = [
  {
    title: "Dashboard",
    links: [
      {
        name: "homescreen",
        icon: <HomeIcon />,
      },
    ],
  },
  {
    title: "Stock Info",
    links: [
      {
        name: "watchlist",
        icon: <ClassIcon />,
      },
    ],
  },
];

export const userProfileData = [
  {
    icon: <ManageAccountsIcon />,
    title: "Update Profile",
    desc: "Edit your profile",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
    link: "/form",
  },
];

export const ACCESS_TOKEN = "access";
export const REFRESH_TOKEN = "refresh";
