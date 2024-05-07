import { useEffect, useRef } from "react";
import { ACTIONS, useAppContext } from "../../context/AppContext";
import axios from "axios";
import ActionCable from "actioncable";

const useFetchInboxTickets = (setIsLoading) => {
  const { state, dispatch } = useAppContext();
  const inboxTicketsRef = useRef(state.inboxTickets);
  const API_URL = "api/v1/tickets";

  useEffect(() => {
    inboxTicketsRef.current = state.inboxTickets;
  }, [state.inboxTickets]);

  useEffect(() => {
    fetchData();
  }, [state.ticketManagerView, state.ticketUpdated]); // Added state.ticketManagerView to the dependency array

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [setIsLoading]);
  const fetchData = async () => {
    try {
      let response = await axios.get(API_URL);
      let inboxTickets = [];

      switch (state.ticketManagerView) {
        case "Assigned to Me":
          inboxTickets = response.data.filter(
            (ticket) =>
              ticket.agent_id === state.loggedInAgent.agent_id
          );
          break;
        case "Triage":
          inboxTickets = response.data.filter(
            (ticket) => ticket.status_id === 1 && ticket.agent_id === 1
          );
          break;
        case "All Open Tickets":
          inboxTickets = response.data.filter(
            (ticket) => ticket.status_id === 1
          );
          break;
        case "All Answered Tickets":
          inboxTickets = response.data.filter(
            (ticket) => ticket.status_id === 2
          );
          break;
        case "All Resolved Tickets":
          inboxTickets = response.data.filter(
            (ticket) => ticket.status_id === 3
          );
          break;
        case "All Tickets":
          inboxTickets = response.data;
          break;
        default:
          break;
      }

      dispatch({
        type: ACTIONS.GET_INBOX_TICKETS,
        payload: inboxTickets,
      });
    } catch (error) {
      console.error("Error fetching inbox tickets:", error);
    }
  };

  useEffect(() => {
    const cable = ActionCable.createConsumer("ws://localhost:3000/cable");
    const subscription = cable.subscriptions.create("TicketsChannel", {
      received: (data) => {
        const ticketInInbox = inboxTicketsRef.current.find(
          (t) => t.id === data.id
        );

        if (data.deleted) {
          dispatch({ type: ACTIONS.DELETE_INBOX_TICKET, payload: data.id });
        } else if (ticketInInbox) {
          dispatch({ type: ACTIONS.UPDATE_INBOX_TICKET, payload: data });
        } else {
          dispatch({ type: ACTIONS.ADD_INBOX_TICKET, payload: data });
        }
      },
    });

    return () => {
      cable.subscriptions.remove(subscription);
    };
  }, [dispatch]);

  return null; // or you can return any JSX element if needed
};

export default useFetchInboxTickets;
