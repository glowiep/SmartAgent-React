import useApplicationData from "../../../hooks/useApplicationData";
import { useAppContext } from "../../../context/AppContext";
import { useState } from "react";
import axios from "axios";

import { LuArrowLeftRight } from "react-icons/lu";

function TransferConfirmationModal({ ticket }) {
  const { state } = useAppContext();
  const { transferTicket } = useApplicationData();

  const agents = state.agents;

  // For input
  const [inputValue, setInputValue] = useState("");
  const [transferToAgentId, setTransferToAgentId] = useState("");

  const closeModal = () => {
    setInputValue("");
    setNewNoteBody("");
    setSubmitNote(false);
    document.getElementById("modal-box")?.Modal.close();
  };

  // For Notes
  const [newNoteBody, setNewNoteBody] = useState("");
  const [submitNote, setSubmitNote] = useState(false);
  const [addNoteVisible, setAddNoteVisible] = useState(false);

  const createNote = (value, ticket_id, agent_id) => {
    if (value.trim() === "") return;
    axios
      .post("api/v1/notes", {
        ticket_id: ticket_id,
        body: value,
        agent_id: agent_id,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <div className="m-0 p-0">
      <input type="checkbox" id="my_modal_11" className="modal-toggle" />
      <div className="modal" role="dialog">
        {/* Close the modal when clicking on the backdrop */}
        <label
          className="modal-backdrop"
          htmlFor="my_modal_11"
          onClick={closeModal}
        >
          Close
        </label>

        <div className="modal-box pb-1">
          <div className="flex flex-col items-center">
            <h3 className="text-4xl font-bold dark:text-white">
              Transfer Ticket
            </h3>
            <p className="pt-6 text-2xl mb-2 dark:text-white flex flex-col items-center justify-center gap-2">
              Currently Assigned to:
              <p className="font-bold">
                {Number(state.loggedInAgent?.agent_id) === ticket.agent?.id
                  ? " Me"
                  : ticket.agent?.full_name
                    ? ` ${ticket.agent?.full_name}`
                    : ""}
              </p>
              <LuArrowLeftRight />
            </p>
            <div>
              <input
                value={inputValue}
                list="agents"
                placeholder="Transfer to..."
                className="input input-bordered dark:text-white"
                onChange={(event) => {
                  setInputValue(event.target.value);
                  const agent = agents.find(
                    (agent) => agent.full_name === event.target.value
                  );
                  if (agent) {
                    // transferTicket(ticket.id, agent.id);
                    setInputValue(event.target.value);
                    setTransferToAgentId(agent.id);
                    setAddNoteVisible(true);
                  }
                }}
              />
              <datalist id="agents">
                <option key="empty" value=" " />
                {agents.map((agent) => (
                  <option key={agent.id} value={agent.full_name}>
                    {state.loggedInAgent.agent_id === agent.id
                      ? "Me"
                      : agent.full_name}
                  </option>
                ))}
              </datalist>
              <button
                className="btn btn-neutral ml-2"
                onClick={() => {
                  setInputValue("");
                  setAddNoteVisible(false);
                }}
              >
                Clear
              </button>
            </div>
          </div>

          {/* Form fields */}
          <div className="flex flex-col justify-center items-center gap-2 mt-5">
            {addNoteVisible && (
              <textarea
                id="note"
                name="note"
                value={newNoteBody}
                onChange={(e) => {
                  setNewNoteBody(e.target.value);
                  setSubmitNote(false);
                }}
                placeholder="Add a note"
                className="textarea textarea-bordered textarea-lg mt-4 w-full max-w-xs dark:text-white"
                component="textarea"
                rows="2"
              />
            )}

            <div className={`mt-5 ${submitNote ? "visible" : "invisible"}`}>
              <div
                role="alert"
                className={`alert alert-success ${submitNote ? "" : "hidden"}`}
              >
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
                <span>The ticket has been transferred!</span>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-center items-center gap-10">
            {/* Add Note button */}
            <button
              className="btn btn-primary"
              onClick={() => {
                // createNote(newNoteBody, ticket.id, state.loggedInAgent.agent_id);
                // setNewNoteBody("");
                // setSubmitNote(true);
                createNote(
                  newNoteBody,
                  ticket.id,
                  state.loggedInAgent.agent_id
                );
                setSubmitNote(true);
                transferTicket(ticket.id, transferToAgentId);
                setNewNoteBody("");
                setAddNoteVisible(false);
                setInputValue("");
                setTimeout(() => {
                  closeModal();
                }, 3000);
              }}
            >
              Transfer Ticket
            </button>

            {/* Close modal x button */}
            <form method="dialog">
              <button className="modal-action m-0" onClick={closeModal}>
                <label
                  htmlFor="my_modal_11"
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 dark:text-white"
                >
                  ✕
                </label>
              </button>
            </form>

            <form method="dialog">
              <button
                type="submit"
                className="modal-action pb-6"
                onClick={closeModal}
              >
                <label
                  htmlFor="my_modal_11"
                  className="btn bg-gray dark:bg-neutral"
                >
                  Close
                </label>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransferConfirmationModal;
