import { Link, NavLink } from "react-router-dom";

import { useStateContext } from "../contexts/ContextProvider";
import { links } from "../data";
import { Button } from "../components";

import Logo from "/images/Logo.png";

function Sidebar() {
  const { activeMenu, setActiveMenu, screenSize, currentColor, logout } = useStateContext()!;

  
  const handleCloseSideBar = () => {
    if (screenSize !== undefined && activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
  "flex items-center gap-5 pl-3 pt-3 pb-2.5 rounded-lg text-white text-md m-2 font-poppins";
  const normalLink =
  "flex items-center gap-5 pl-3 pt-3 pb-2.5 rounded-lg text-md text-gray-700 hover:bg-light-gray m-2 font-poppins";

  return (
    // <div
    //   className={`ml-3 h-screen overflow-auto pb-10 ${
    //   screenSize && screenSize <= 900 ? "md:overflow-hidden" : "md:overflow-auto"
    // }`}>
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">

      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/homescreen"
              onClick={handleCloseSideBar}
              className="items-center gap-3 mt-4 flex text-xl font-extrabold tracking-tigh text-slate-900"
            >
              <img src={Logo} alt="Logo" className="h-8 w-auto" />
              <span className="text-2xl">StockRev</span>
            </Link>
          </div>
          <div className="mt-10">
            {links.map((section) => (
              <div key={section.title}>
                <p className="text-gray-500 m-3 mt-4 uppercase font-poppins">
                  {section.title}
                </p>
                {section.links.map((link) => {
                  const toPath = `/${link.name
                    .replace(/\s+/g, "")
                    .toLowerCase()}`;
                  return (
                    <NavLink
                      to={toPath}
                      key={link.name}
                      onClick={handleCloseSideBar}
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? currentColor : "",
                      })}
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                    >
                      {link.icon}
                      <span className="capitalize ">{link.name}</span>
                    </NavLink>
                  );
                })}
                </div>
              ))}
          </div>
          <div className="absolute bottom-5 w-full">
              <div className="pr-6">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Log out"
                  width="full"
                  borderRadius="10px"
                  customFunc={logout}
                />
              </div>
            </div>
        </>
      )}
    </div>
    
  );
};

export default Sidebar;