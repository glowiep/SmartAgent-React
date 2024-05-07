import { ACTIONS, useAppContext } from "../context/AppContext";
import axios from "axios";
import useFetchData from "./useFetchData";
import useFetchAgents from "./useFetchAgents";

const useApplicationData = () => {
  const { state, dispatch } = useAppContext();

  /**
   * This sets the view of the Ticket Manager
   * @function
   * @returns {void}
   */
  const setTicketManagerView = (view) => {
    dispatch({ type: ACTIONS.SET_VIEW, payload: view });
  };

  /**
   * This sets the Ticket information view
   * @function
   * @returns {void}
   */
  const setTicketView = (ticket_id) => {
    dispatch({ type: ACTIONS.VIEW_TICKET, payload: ticket_id });
    console.log("setTicketView");
  };

  /**
   * This gets the ticket counts on the tickets sidebar
   * @function
   * @returns {void}
   */
  const getTicketCounts = () => {
    useFetchData("api/v1/tickets");
  };

  /**
   * This deletes the ticket
   * DELETE /tickets/:id
   * @function
   * @returns {void}
   */
  const deleteTicket = (ticket_id) => {
    axios
      .delete(`api/v1/tickets/${ticket_id}`)
      .then(() => {
        dispatch({ type: ACTIONS.SET_VIEW, payload: "All Tickets" });
      })
      .catch((error) => {
        console.error("Error fetching requests", error);
      });
  };

  /**
   * This resolves the ticket
   * PATCH /tickets/:id/:status_id
   * @function
   * @returns {void}
   */
  const resolveTicket = (ticket_id) => {
    axios
      .patch(`api/v1/tickets/${ticket_id}`, { status_id: 3 })
      .then(() => {
        dispatch({ type: ACTIONS.SET_VIEW, payload: state.ticketManagerView });
      })
      .catch((error) => {
        console.error("Error fetching requests", error);
      });
  };

  /**
   * This sets the ticket status as answered
   * PATCH /tickets/:id/:status_id
   * @function
   * @returns {void}
   */
  const answeredTicket = (ticket_id) => {
    axios
      .patch(`api/v1/tickets/${ticket_id}`, { status_id: 2 })
      .then(() => {
        // dispatch({ type: ACTIONS.SET_VIEW, payload: state.ticketManagerView });
      })
      .catch((error) => {
        console.error("Error fetching requests", error);
      });
  };

  /**
   * This transfers the ticket
   * PATCH /tickets/:id/:status_id
   * @function
   * @returns {void}
   */
  const transferTicket = (ticket_id, agent_id) => {
    console.log(state.ticketData.agent_id)
    axios
      .patch(`api/v1/tickets/${ticket_id}`, { agent_id })
      .then(() => {
        console.log(state.ticketData.agent_id)
        // dispatch({ type: ACTIONS.SET_VIEW, payload: state.ticketManagerView });
      })
      .catch((error) => {
        console.error("Error fetching requests", error);
      });
  };

  /**
   * This opens a resolved ticket
   * PATCH /tickets/:id/:status_id
   * @function
   * @returns {void}
   */
  const openTicket = (ticket_id) => {
    axios
      .patch(`api/v1/tickets/${ticket_id}`, { status_id: 1 })
      .then(() => {
        dispatch({ type: ACTIONS.SET_VIEW, payload: state.ticketManagerView });
      })
      .catch((error) => {
        console.error("Error fetching requests", error);
      });
  };

  const sendRespond = (ticket_id, message, attachments,agent_id,agent_name) => {
    let formData = new FormData();
    formData.append("response", message);
    formData.append("agent_id", agent_id);
    formData.append("agent_name", agent_name);
    if (attachments) {
      Array.from(attachments).forEach((file, index) => {
        formData.append(`attachments[${index}]`, file);
      });
    }
    axios
      .post(`api/v1/tickets/${ticket_id}/respond`,formData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then(() => {
        dispatch({ type: ACTIONS.VIEW_TICKET, payload: ticket_id });
      })
      .catch((error) => {
        console.error("Error fetching requests", error);
      });
  };
   
    /**
   * This stores the logged in agent in state
   * @function
   * @returns {void}
   */
    const setLoggedInAgent = (data) => {
      dispatch({ type: ACTIONS.SET_AGENT, payload: data });
    };

  /**
   * This sets the agents in context state. GET api/v1/agents
   * @function
   * @returns {void}
   */
  const getAgents = () => {
    useFetchAgents("api/v1/agents", dispatch);
  };

  return {
    setTicketManagerView,
    setTicketView,
    deleteTicket,
    getTicketCounts,
    getAgents,
    resolveTicket,
    answeredTicket,
    transferTicket,
    openTicket,
    sendRespond,
    setLoggedInAgent,
  };
};

export default useApplicationData;