import { menuItems } from "../../../constants/sidebar-menu-items";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { GrLogout } from "react-icons/gr";
import { useAppContext } from "../../../context/AppContext";
import { MdMarkChatUnread } from "react-icons/md";




function IconSidebar() {
  const { logout } = useContext(AuthContext);
  const {state, dispatch} = useAppContext();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete("http://localhost:3000/logout");
      console.log(response.data);
      logout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-between">
      <ul className=" flex flex-col items-center bg-base-100 dark:bg-slate-700 dark:text-white border-r-8 border-double h-full m-1 pr-2">
        {menuItems.map((item, index) => (
          <li key={index}> 
          {state.unreadMessages.some(message => message.read ===false) && item.path === '/chat' ? <Link
              to= '/chat'
              className="tooltip tooltip-right mt-10"
              data-tip='Chat'
            >
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <MdMarkChatUnread className="w-[30px] h-[30px] text-green-600"/>
              </div>
            </Link> : <Link
              to={item.path}
              className="tooltip tooltip-right mt-10"
              data-tip={item.tooltip}
            >
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                {item.icon}
              </div>
            </Link>}
            
          </li>
        ))}
        <li className="absolute bottom-20">
          <div className="flex-none gap-2">
            <div className="dropdown dropdown-right">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <GrLogout className="w-[30px] h-[30px]" />
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default IconSidebar;
