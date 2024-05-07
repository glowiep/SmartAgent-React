import { CgCheckO } from "react-icons/cg";
import { IoIosMailOpen } from "react-icons/io";
import { LuArrowLeftRight } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import ReactTimeAgo from "react-time-ago";
import PropTypes from "prop-types";

export default function Ticket({
  ticket,
  getTicketRowClassName,
  setTicketView,
  state,
  inputValue,
  setInputValue,
  setSubmitNote,
  setAddNoteVisible,
  setTransferToAgentId,
  agents,
  createNote,
  newNoteBody,
  closeModal,
  deleteTicket,
  resolveTicket,
  openTicket,
  transferTicket,
  setNewNoteBody,
  addNoteVisible,
  submitNote,
  transferToAgentId,
  setShowToast,
}) {
  return (
    <tr
      key={ticket.id}
      className={getTicketRowClassName(ticket)}
      onClick={() => setTicketView(ticket.id)}
    >
      {/* Request title */}
      <th scope="row" className="px-6 py-4 font-bold whitespace-wrap">
        {ticket.title}
      </th>

      {/* Customer name */}
      <td className="px-6 py-4">{ticket.customer_name}</td>

      {/* Ticket ID */}
      <td className="px-2 py-4">{ticket.id}</td>

      {/* Status */}
      <td className="px-6 py-4">{ticket.status?.description}</td>

      {/* Created At */}
      <td className="px-6 py-4">
        {ticket && !isNaN(Date.parse(ticket.created_at)) && (
          <ReactTimeAgo date={Date.parse(ticket.created_at)} locale="en-US" />
        )}
      </td>

      {/* Assigned to agent */}
      <td className="py-4 flex">
        {ticket.agent && state.loggedInAgent.agent_id === ticket.agent.id
          ? <b>Me</b>
          : ticket.agent
            ? ticket.agent.full_name
            : ""}
      </td>

      {/* Actions */}
      <td className="px-6">
        <div className="flex flex-row hover:ring-slate-300 items-center">
          <div
            className="flex flex-col justify-center px-3 py-4"
            onClick={(event) => {
              event.stopPropagation();
              document
                .getElementById(`transfer_modal_${ticket.id}`)
                .showModal();
            }}
          >
            <li className="tooltip tooltip-right" data-tip="Transfer">
              <LuArrowLeftRight size="1.5rem" />
              {/* Transfer Modal starts here */}
              <dialog
                id={`transfer_modal_${ticket.id}`}
                className="modal text-black dark:text-white"
              >
                <div className="modal-box">
                  <div className="flex flex-col items-center">
                    <h3 className="text-4xl font-bold dark:text-white">
                      Transfer Ticket
                    </h3>

                    <div>
                      <div className="pt-6 text-2xl mb-2 dark:text-white flex flex-col items-center justify-center gap-2">
                        Currently Assigned to:
                        <p className="font-bold">
                          {Number(state.loggedInAgent?.agent_id) ===
                          ticket.agent?.id
                            ? " Me"
                            : ticket.agent?.full_name
                              ? ` ${ticket.agent?.full_name}`
                              : ""}
                        </p>
                        <LuArrowLeftRight />
                        Transfer to:
                      </div>

                      <input
                        value={inputValue}
                        list="agents"
                        placeholder="Transfer to..."
                        className="input input-bordered dark:text-white"
                        onFocus={() => setSubmitNote(false)}
                        onChange={(event) => {
                          setInputValue(event.target.value);
                          const agent = agents.find(
                            (agent) => agent.full_name === event.target.value
                          );
                          if (agent) {
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
                  <div>
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

                    <div
                      className={`mt-5 ${submitNote ? "visible" : "invisible"}`}
                    >
                      <div
                        role="alert"
                        className={`alert alert-success ${
                          submitNote ? "" : "hidden"
                        }`}
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

                    <div className="flex flex-row justify-center items-center">
                      {/* Transfer button */}
                      {addNoteVisible && (
                        <button
                          className="btn btn-primary ml-2"
                          onClick={() => {
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
                            setShowToast(true);
                            setTimeout(() => {
                              closeModal();
                            }, 1000);
                            setTimeout(() => {
                              setShowToast(false);
                            }, 3000);
                          }}
                        >
                          Transfer Ticket
                        </button>
                      )}

                      {/* View ticket button */}
                      {/* <button
          className="btn btn-primary btn-outline ml-2"
          onClick={() => setTicketView(ticket.id)}
        >
          View Ticket
        </button> */}

                      {/* Close modal x button */}
                      <form method="dialog">
                        <button
                          className="modal-action ml-2"
                          onClick={closeModal}
                        >
                          <label
                            htmlFor={`transfer_modal_${ticket.id}`}
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 dark:text-white"
                          >
                            ✕
                          </label>
                        </button>
                      </form>

                      {/* Close modal button */}
                      <form method="dialog">
                        <button
                          id="close-modal"
                          type="submit"
                          className="modal-action pb-6"
                          onClick={closeModal}
                        >
                          <label
                            htmlFor={`transfer_modal_${ticket.id}`}
                            className="btn bg-gray dark:bg-neutral"
                          >
                            Close
                          </label>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                {/* Close the modal when clicking on the backdrop */}
                <form method="dialog" className="modal-backdrop">
                  <button onClick={closeModal}>close</button>
                </form>
              </dialog>
              {/* Transfer Modal ends here */}
            </li>
          </div>

          {/* Show the open ticket icon if the ticket is open */}
          {ticket.status?.description !== "Resolved" ? (
            <li
              className="tooltip tooltip-right px-3 py-4"
              data-tip="Resolve"
              onClick={(event) => {
                event.stopPropagation();
                resolveTicket(ticket.id);
              }}
            >
              <CgCheckO size="1.5rem" />
            </li>
          ) : (
            // Otherwise show resolve icon

            <li
              className="tooltip tooltip-right px-3 py-4"
              data-tip="Reopen"
              onClick={(event) => {
                event.stopPropagation();
                openTicket(ticket.id);
              }}
            >
              <IoIosMailOpen size="1.5rem" />
            </li>
          )}

          <li
            className="tooltip tooltip-right px-3 py-4"
            data-tip="Delete Ticket"
            onClick={(event) => {
              event.stopPropagation();
              document.getElementById(`delete_modal_${ticket.id}`).showModal();
            }}
          >
            <MdDelete size="1.5rem" />

            {/* Delete Modal starts here */}
            <dialog id={`delete_modal_${ticket.id}`} className="modal">
              <div className="modal-box pb-1  flex flex-col items-center">
                <h3 className="text-lg font-bold dark:text-white">
                  This action is reversible!
                </h3>
                <p className="pt-4 dark:text-white">
                  Are you sure you want to delete this ticket?
                </p>

                <div
                  className="modal-action m-0"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  {/* Close modal x button */}
                  <form method="dialog">
                    <button
                      className="modal-action m-0"
                      onClick={() =>
                        document.getElementById("modal-box").Modal.close()
                      }
                    >
                      <label
                        htmlFor={`delete_modal_${ticket.id}`}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 dark:text-white"
                      >
                        ✕
                      </label>
                    </button>
                  </form>
                </div>

                <div className="flex flex-row justify-center items-center gap-10">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      deleteTicket(ticket.id);
                      console.log("deleteTicket");
                    }}
                  >
                    Delete
                  </button>

                  <form method="dialog">
                    <button
                      className="modal-action pb-6"
                      onClick={(event) => {
                        event.stopPropagation();
                        document.getElementById("modal-box").Modal.close();
                      }}
                    >
                      <label
                        htmlFor={`delete_modal_${ticket.id}`}
                        className="btn bg-gray dark:bg-neutral"
                      >
                        Close
                      </label>
                    </button>
                  </form>
                </div>
              </div>
              {/* Close the modal when clicking on the backdrop */}
              <form method="dialog" className="modal-backdrop">
                <button onClick={closeModal}>close</button>
              </form>
            </dialog>
            {/* Delete Modal ends here */}
            {/* <DeleteConfirmationModal ticket_id={ticket.id} /> - old*/}
          </li>
        </div>
      </td>
    </tr>
  );
}

Ticket.propTypes = {
  ticket: PropTypes.object.isRequired,
  getTicketRowClassName: PropTypes.func.isRequired,
  setTicketView: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
  setSubmitNote: PropTypes.func.isRequired,
  setAddNoteVisible: PropTypes.func.isRequired,
  setTransferToAgentId: PropTypes.func.isRequired,
  agents: PropTypes.array.isRequired,
  createNote: PropTypes.func.isRequired,
  newNoteBody: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  deleteTicket: PropTypes.func.isRequired,
  resolveTicket: PropTypes.func.isRequired,
  openTicket: PropTypes.func.isRequired,
  transferTicket: PropTypes.func.isRequired,
  showToast: PropTypes.bool.isRequired,
  setNewNoteBody: PropTypes.func.isRequired,
  addNoteVisible: PropTypes.bool.isRequired,
  submitNote: PropTypes.bool.isRequired,
  transferToAgentId: PropTypes.string.isRequired,
  setShowToast: PropTypes.func.isRequired,
};
