import { sidePanelItems } from "../../../constants/side-panel-items"
import useApplicationData from "../../../hooks/useApplicationData";
import { useAppContext } from "../../../context/AppContext";
import { Link } from "react-router-dom";

function TicketSidePanel() {
  const { state } = useAppContext();
  const { setTicketManagerView } = useApplicationData();

  const getsidePanelItemClassName = (title) => {
    return title === state.ticketManagerView
      ? "ring-yellow-600/20 ml-2 mr-2 mb-1 pt-1 pb-1 pl-2 pr-2 bg-slate-600 dark:bg-slate-300 text-white dark:text-black font-bold rounded cursor-pointer"
      : "ring-yellow-600/20 ml-2 mr-2 mb-1 pt-1 pb-1 pl-2 pr-2 hover:bg-slate-600 hover:text-white font-bold rounded cursor-pointer";
  };

  return (
    <div className="bg-base-300 border-r-4 border-double mt-2">
      <div className="flex-1 p-3 mb-6">          
          <Link to="/" className="btn btn-ghost lg:text-3xl text-xl font-bold mb-8 dark:text-white">
            <img src="/SmartAgent-icon.svg" alt="SmartAgent icon" width="45" />SmartAgent
          </Link>
        </div>
      
      <h1 className="text-2xl font-bold mb-4 ml-4 mt-2">Tickets</h1>
      
      <div>
        <ul>
          {sidePanelItems.map((item, index) => (
            <li 
              key={index} 
              className={getsidePanelItemClassName(item.title)}
              onClick={() => setTicketManagerView(item.title)}
            >
              <span className="inline-flex items-center mr-2 rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                {state[item.count]}
              </span>
              <label className="cursor-pointer" htmlFor="status">{item.title}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TicketSidePanel;
