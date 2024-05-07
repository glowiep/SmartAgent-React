// import Navbar from "./Navbar"
// import IconSidebar from "./SidePanel/IconSidebar"
import { useChatData } from "../../hooks/useChatData";
import TicketSidePanel from "./SidePanel/TicketSidePanel"
import TicketManager from "./TicketManager/TicketManager"
function AgentMainPage() {
  useChatData();

  return (
    <div className="h-screen flex flex-col w-[100%]">
      {/* <Navbar /> */}
      <div className="flex flex-row flex-grow h-full">
        {/* <IconSidebar /> */}
        <TicketSidePanel/>
        <TicketManager />
      </div>
    </div>
  )
}

export default AgentMainPage
