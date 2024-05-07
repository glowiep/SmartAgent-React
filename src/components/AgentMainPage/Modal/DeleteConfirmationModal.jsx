import useApplicationData from "../../../hooks/useApplicationData";

function DeleteConfirmationModal({ ticket_id }) {
  const { deleteTicket } = useApplicationData();

  return (
    <div className="m-0 p-0">
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        {/* Close the modal when clicking on the backdrop */}
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>

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
            <button
              onClick={() => document.getElementById("modal-box").Modal.close()}
            >
              <label
                htmlFor="my_modal_7"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 dark:text-white"
              >
                ✕
              </label>
            </button>
          </div>

          <div className="flex flex-row justify-center items-center gap-10">
            <button
              className="btn btn-primary"
              onClick={(event) => {
                // event.stopPropagation();
                deleteTicket(ticket_id);
              }}
            >
              Delete
            </button>

            <button
              className="modal-action pb-6"
              onClick={(event) => {
                event.stopPropagation();
                document.getElementById("modal-box").Modal.close();
              }}
            >
              <label htmlFor="my_modal_7" className="btn bg-gray dark:bg-neutral">
                Close
              </label>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
