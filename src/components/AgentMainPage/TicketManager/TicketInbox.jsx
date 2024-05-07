import { useAppContext } from "../../../context/AppContext";
import "./skeleton.css";
// Date formatting
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

// Hooks
import useApplicationData from "../../../hooks/useApplicationData";
import useFetchInboxTickets from "../../../hooks/inbox/useFetchInboxTickets";

import { useState } from "react";
import axios from "axios";
import Ticket from "./Ticket";
import TicketSkeleton from "./TicketSkeleton";

function TicketInbox() {
  const {
    setTicketView,
    resolveTicket,
    transferTicket,
    openTicket,
    deleteTicket,
  } = useApplicationData();
  const { state } = useAppContext();
  const tickets = state.inboxTickets;
  const agents = state.agents;
  const [searchTerm, setSearchTerm] = useState("");
  const [transferToAgentId, setTransferToAgentId] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const agentFullName = localStorage.getItem("full_name");

  const closeModal = () => {
    setInputValue("");
    setNewNoteBody("");
    setSubmitNote(false);
    setAddNoteVisible(false);
    document.getElementById("modal-box")?.Modal.close();
  };

  // For Notes
  const [newNoteBody, setNewNoteBody] = useState("");
  const [submitNote, setSubmitNote] = useState(false);
  const [addNoteVisible, setAddNoteVisible] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const createNote = (value, ticket_id) => {
    if (value.trim() === "") return;
    axios
      .post("api/v1/notes", {
        ticket_id: ticket_id,
        body: value,
        agent_id: state.loggedInAgent.agent_id,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  useFetchInboxTickets(setIsLoading);

  const getTicketRowClassName = (ticket) => {
    switch (ticket.status?.description) {
      case "Open":
        return "bg-yellow-100 border-b dark:bg-gray-300 dark:border-gray-700 hover:bg-yellow-200  dark:hover:text-black dark:hover:bg-gray-100 rounded cursor-pointer dark:text-black";
      case "Answered":
        return "bg-white border-b dark:bg-gray-600 dark:border-gray-700 hover:bg-blue-50  dark:hover:text-black rounded cursor-pointer dark:text-gray-200";
      case "Resolved":
        return "bg-grey border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-50  dark:hover:text-black rounded cursor-pointer text-gray-500";
      default:
        break;
    }
  };

  return (
    <section className="flex flex-col">
      <section className="flex bg-base-100 shadow-md pl-5">
        <div className="flex-col items-start mt-2 w-[100%]">
          <div className="flex w-[100%] justify-between">
          <h1 className="text-2xl font-bold mb-4">{state.ticketManagerView} </h1>
          <h2 className="text-2xl font-bold mr-8">Logged in as: {agentFullName}</h2>
          </div>
          <div className="mb-4">
            <input
              type="search"
              name="search"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder=" Search"
              className="bg-slate-100 rounded-lg dark:bg-gray-700 dark:text-white dark:placeholder-gray-300 p-2 w-96 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-gray-500 dark:focus:ring-opacity-50"
            />
          </div>
        </div>
        {showToast && (
          <div className="toast toast-top toast-end">
            <div className="alert alert-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>The ticket has been transferred.</span>
            </div>
          </div>
        )}
      </section>
      <div className="relative">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3">
                Request
              </th>
              <th scope="col" className="px-6 py-3">
                Customer
              </th>
              <th scope="col" className="py-3">
                Ticket ID
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Created
              </th>
              <th scope="col" className="px-6 py-3">
                Assigned To
              </th>
              <th scope="col" className="px-9 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tickets
              .filter(
                (ticket) =>
                  ticket.title?.toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  ticket.customer_name?.toLowerCase()
                    .includes(searchTerm.toLowerCase())
              )
              .map((ticket) => {
                return isLoading ? (
                  <TicketSkeleton key={ticket.id} />
                ) : (
                  <Ticket
                    key={ticket.id}
                    ticket={ticket}
                    getTicketRowClassName={getTicketRowClassName}
                    setTicketView={setTicketView}
                    state={state}
                    setSubmitNote={setSubmitNote}
                    setInputValue={setInputValue}
                    inputValue={inputValue}
                    setAddNoteVisible={setAddNoteVisible}
                    setTransferToAgentId={setTransferToAgentId}
                    agents={agents}
                    createNote={createNote}
                    newNoteBody={newNoteBody}
                    closeModal={closeModal}
                    deleteTicket={deleteTicket}
                    resolveTicket={resolveTicket}
                    openTicket={openTicket}
                    transferTicket={transferTicket}
                    showToast={showToast}
                    addNoteVisible={addNoteVisible}
                    setNewNoteBody={setNewNoteBody}
                    submitNote={submitNote}
                    transferToAgentId={transferToAgentId}
                    setShowToast={setShowToast}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TicketInbox;
