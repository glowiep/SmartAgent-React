import { useAppContext } from "../../../context/AppContext";

function TicketManagerNav() {
  const { state } = useAppContext();
  return (
    <>
        {state.ticketInboxView ? 
          <section className="flex bg-base-100 shadow-md pl-5">
            <div className="flex-col items-start mt-2">
              <h1 className="text-2xl font-bold mb-4">{state.ticketManagerView}</h1>
              <div className="mb-4">       
                <input type="search" name="search" id="search" placeholder=" Search" className="bg-slate-100"/>
              </div>
            </div> 
          </section> :
          <>
          {/* <h1 className="text-2xl font-bold mb-4">Ticket Assigned to: </h1> */}
          </>
        }
   </>
  )
}

export default TicketManagerNav;
