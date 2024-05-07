import { useAppContext } from "../../../context/AppContext";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
// Icons
import { MdDelete, MdCancel } from "react-icons/md";
import { LuArrowLeftRight } from "react-icons/lu";
import { CgCheckO, CgNotes } from "react-icons/cg";
import { FaReply } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { IoIosMailOpen } from "react-icons/io";
import TransferConfirmationModal from "../Modal/TransferConfirmationModal";

// import { FaArrowsUpDown } from "react-icons/fa6";
import ActionCable from "actioncable";

// react-resizable-panels
// import {
//   getPanelElement,
//   getPanelGroupElement,
//   getResizeHandleElement,
//   Panel,
//   PanelGroup,
//   PanelResizeHandle,
// } from "react-resizable-panels";

// Components
import DraftEditor from "./DraftEditor";
import Conversation from "./Conversation";
import NotesSidePanel from "../SidePanel/NotesSidePanel";

// Hooks
import useFetchTicketData from "../../../hooks/useFetchTicketData";
import useApplicationData from "../../../hooks/useApplicationData";
import DeleteConfirmationModal from "../Modal/DeleteConfirmationModal";

function TicketInfo() {
  const { state, dispatch } = useAppContext();
  const { resolveTicket, openTicket, sendRespond, answeredTicket } = useApplicationData();
  const ticket_id = state.viewTicketId;
  const logAgentId = localStorage.getItem("agent_id")
  const logAgentName = localStorage.getItem("full_name")
  
  const [replyIsVisible, setReplyIsVisible] = useState(false);
  const [notesPanel, setNotesPanel] = useState(false);
  const [editorState, setEditorState] = useState();
  const [attachments, setAttachments] = useState([]);
  const [newNote, setNewNote] = useState(false);
  const conversationsEndRef = useRef(null);
  const [notes, setNotes] = useState([]);

  const scrollToBottom = () => {
    conversationsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    const cable = ActionCable.createConsumer("ws://localhost:3000/cable");
    const subscription = cable.subscriptions.create("NotesChannel", {
      received: (data) => {
        setNotes([data, ...notes]);
        setNewNote(true);
      },
    });
    return () => {
      cable.subscriptions.remove(subscription);
    };
  }, [notes]);

  useEffect(() => {
    axios.get("api/v1/notes").then((response) => {
      const filterNotes = response.data.filter(
        (note) => note.ticket_id === ticket_id
      );
      setNotes(filterNotes);
    });
  }, [ticket_id]);

  useEffect(scrollToBottom, [state.ticketData, replyIsVisible]);

  useFetchTicketData(`api/v1/tickets/${ticket_id}`, dispatch, ticket_id);
  const ticket = state.ticketData;
  console.log("agent", logAgentId);
  return (
    <section className="flex-col w-[97%] h-screen m-2 overflow-y-auto bg-base-200">
      <div
        id="ticket-info-header"
        className="flex flex-row justify-between items-center"
      >
        <h1 className="lg:text-4xl font-bold mb-4 text-gray-700 dark:text-white text-xl">
          {ticket.id && `${ticket.id}: ${ticket.title}`}
        </h1>
        {/* <div className="flex flex-row items-center">
          <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
            <li>
              <details className="dropdown">
                <summary className="btn font-bold text-gray-700 dark:text-white ">
                  {ticket.agent &&
                  Number(state.loggedInAgent.agent_id) === ticket.agent.id
                    ? "Assigned to: Me"
                    : ticket.agent
                      ? `Assigned to: ${ticket.agent.full_name}`
                      : ""}
                  <LuArrowLeftRight size="1.5rem" />
                </summary>
                <ul className="shadow menu dropdown-content rounded-box dark:text-gray-200">
                  {agents.map((agent) => (
                    <li
                      key={agent.id}
                      onClick={(event) => {
                        event.stopPropagation();
                        transferTicket(ticket.id, agent.id);
                      }}
                    >
                      <a>
                        {state.loggedInAgent.agent_id === agent.id
                          ? "Me"
                          : agent.full_name}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          </ul>
        </div> */}
        <div
          className="py-2 flex items-center justify-center"
          onClick={(event) => event.stopPropagation()}
        >
          <h1 className="font-bold lg:text-2xl text-gray-500 dark:text-white ">
            {ticket.agent &&
            Number(logAgentId) === ticket.agent.id
              ? "Assigned to: Me"
              : ticket.agent
                ? `Assigned to: ${ticket.agent.full_name}`
                : ""}
          </h1>
        </div>
      </div>
      {notesPanel && (
        <NotesSidePanel
          ticket_id={ticket_id}
          setNotesPanel={setNotesPanel}
          setNewNote={setNewNote}
          notes={notes}
          setNotes={setNotes}
        />
      )}
      <div className="bg-base-100 border-2  overflow-y-auto w-[100%] h-[86%]">
        {ticket.conversations &&
          ticket.conversations.map((conversation) => (
            <Conversation
              key={conversation.id}
              customer_name={ticket.customer_name}
              customer_email={ticket.from_email}
              from_customer={conversation.from_customer}
              created_at={conversation.created_at}
              body={conversation.body}
              attachments_urls={conversation.attachments_urls}
              agent_name={conversation.agent_name}
            />
          ))}

        {replyIsVisible && (
          <div className="overflow-y-auto p-2 dark:bg-neutral">
            <div className="reply-details mb-2 w-full">
              <div className="conversation-author flex flex-row items-center gap-2 font-bold text-gray-700 dark:text-white text-2xl mb-1">
                <div className="avatar placeholder">
                  <div className="bg-neutral dark:bg-gray-400 text-neutral-content dark:text-white rounded-full w-20">
                    <span>S</span>
                  </div>
                </div>
                <span className="lg:text-4xl font-bold mb-4 text-gray-700 dark:text-white text-xl">
                  SmartAgent <span className="font-normal">Reply</span>
                </span>
              </div>
              <div className="flex flex-row gap-5">
                <p>From: SmartAgent &lt;smartagents3@gmail.com&gt;</p>
                <p>|</p>
                <p>
                  To: {ticket.customer_name} &lt;{ticket.from_email}&gt;
                </p>
              </div>
              <p>Re: {ticket.title}</p>
            </div>

            {/* Body of conversation */}
            <div>
              <DraftEditor
                customer_name={ticket?.customer_name ?? ""}
                editorState={editorState}
                setEditorState={setEditorState}
              />
              <input
                type="file"
                multiple
                className="form-control block w-full py-2 mt-4 dark:text-white cursor-pointer font-normal text-gray-700"
                onChange={(event) => {
                  setAttachments(event.target.files);
                }}
              />
              <div className="flex flex-row items-center gap-4 mt-4">
                <button
                  className="btn btn-primary flex items-center gap-2"
                  onClick={() => {
                    sendRespond(
                      ticket_id,
                      editorState,
                      attachments,
                      logAgentId,
                      logAgentName
                    );
                    answeredTicket(ticket_id)
                    setReplyIsVisible(!replyIsVisible);
                  }}
                >
                  <IoSend size="1.5rem" />
                  Send
                </button>
                <button
                  className="btn btn-ghost flex items-center gap-2"
                  onClick={() => setReplyIsVisible(!replyIsVisible)}
                >
                  <MdCancel size="1.5rem" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        <div ref={conversationsEndRef} />
      </div>

      <div className="relative bottom-0">
        <ul className="menu menu-vertical sm:menu-horizontal bg-base-200 rounded-box gap-4">
          <li>
            <button
              className="btn btn-ghost flex items-center gap-2"
              onClick={() => setReplyIsVisible(!replyIsVisible)}
            >
              <FaReply size="1.5rem" />
              Reply
            </button>
          </li>
          {ticket.status_id !== 1 ? ( // Show the resolve ticket icon if the ticket is open
            <li>
              <button
                className="btn btn-ghost flex items-center gap-2"
                onClick={(event) => {
                  event.stopPropagation();
                  resolveTicket(ticket.id);
                  window.location.reload();
                }}
              >
                <CgCheckO size="1.5rem" /> Resolve
              </button>
            </li>
          ) : (
            // Show the open ticket icon if the ticket has been resolved
            <li>
              <button
                className="btn btn-ghost flex items-center gap-2"
                onClick={(event) => {
                  event.stopPropagation();
                  openTicket(ticket.id);
                  window.location.reload();
                }}
              >
                <IoIosMailOpen size="1.5rem" />
                Open
              </button>
            </li>
          )}

          {/* Notes button */}
          <li>
            <button
              onClick={() => {
                setNewNote(false);
                setNotesPanel((prev) => !prev);
              }}
              className="btn btn-ghost"
            >
              <div className="relative">
                {newNote ? (
                  <div>
                    <span className="absolute top-[-10px] left-[19px] w-[15px] h-[15px] bg-green-600 rounded-[50%] text-white">{notes.length}</span>{" "}
                    <CgNotes size="1.5rem" />
                  </div>
                ) : (
                  <div>
                    <span className="absolute top-[-10px] left-[19px] w-[15px] h-[15px] rounded-[50%]">{notes.length}</span>{" "}
                    <CgNotes size="1.5rem" />
                  </div>
                )}
              </div>
              Ticket Notes
            </button>
          </li>

          {/* Transfer button */}
          <li>
            <button className="btn btn-ghost">
              <label htmlFor="my_modal_11" className="flex items-center gap-2">
                <LuArrowLeftRight size="1.5rem" />
                Transfer Ticket
              </label>
            </button>
            <TransferConfirmationModal ticket={ticket} />
          </li>

          {/* Delete button */}
          <li>
            <button className="btn btn-ghost">
              <label htmlFor="my_modal_7" className="flex items-center gap-2">
                <MdDelete size="1.5rem" />
                Delete Ticket
              </label>
            </button>
            <DeleteConfirmationModal ticket_id={ticket.id} />
          </li>
        </ul>
      </div>
    </section>
  );
}

export default TicketInfo;
