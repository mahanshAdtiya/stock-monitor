import { Link } from "react-router-dom";

import { Button } from ".";
import { userProfileData } from "../data";
import { useStateContext } from "../contexts/ContextProvider";
import { MdOutlineSupervisorAccount } from "react-icons/md";

const UserProfile = () => {
  const { currentColor } = useStateContext();

  return (
    <div className="nav-item absolute right-1 top-16 bg-white p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-bold text-lg text-gray-600">User Profile</p>
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <div className="text-4xl rounded-[50%] p-2 bg-cyan-100 text-sky-500">
          <MdOutlineSupervisorAccount />
        </div>
        <div>
          <p className="font-semibold text-xl text-gray-600">
            {" "}
            Mahansh Aditya{" "}
          </p>
          <p className="text-gray-500 text-sm font-semibold">
            {" "}
            mahansh21334@iiitd.ac.in{" "}
          </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="flex gap-4 border-b-1 border-color p-2 hover:bg-light-gray cursor-pointer"
          >
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-l rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>

            {/* <div className="flex items-center">
              <p className="font-semibold dark:text-gray-200">{item.title}</p>
            </div> */}
            <div>
              <p className="font-semibold dark:text-gray-200">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                {" "}
                {item.desc}{" "}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-5">
        <Button
          color="white"
          bgColor={currentColor}
          text="Logout"
          borderRadius="10px"
          width="full"
          // customFunc={logout}
        />
      </div>
    </div>
  );
};

export default UserProfile;
