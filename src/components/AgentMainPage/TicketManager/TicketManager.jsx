import { useAppContext } from "../../../context/AppContext";

// Components
import TicketInbox from "./TicketInbox";
import TicketInfo from "./TicketInfo";
import useApplicationData from "../../../hooks/useApplicationData";

function TicketManager() {
  const { state } = useAppContext();
  const { getTicketCounts } = useApplicationData();
  getTicketCounts();
  return (
    <section className="flex flex-col overflow-x-auto w-[100%]">
      {state.ticketInboxView ? <TicketInbox /> : <TicketInfo />}
    </section>
  );
}

export default TicketManager;
