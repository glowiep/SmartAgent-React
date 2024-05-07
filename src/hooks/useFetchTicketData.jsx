import { useEffect } from "react";
import { ACTIONS } from "../context/AppContext";
import axios from "axios";
import ActionCable from "actioncable";
import { useAppContext } from "../context/AppContext";

const useFetchTicketData = (API_URL, dispatch, ticket_id) => {
  const { state } = useAppContext();
  useEffect(() => {

    if (API_URL && dispatch && ticket_id) {
    let ticketId = ticket_id;

    axios
      .get(API_URL, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log("Ticket data", res.data);
        const ticketData = res.data;
        dispatch({ type: ACTIONS.GET_TICKET_DATA, payload: ticketData });

        if (ticketId === ticket_id) {
          // Establish WebSocket connection after fetching ticket data
          const cable = ActionCable.createConsumer("ws://localhost:3000/cable");
          const subscription = cable.subscriptions.create(
            { channel: "TicketsChannel", ticket: ticket_id },
            {
              connected: () => {
                console.log("Connected to WebSocket");
              },
              received: (data) => {
                if (data.id === ticket_id) {
                  console.log(" after Received data", data);
                  dispatch({ type: ACTIONS.ADD_CONVERSATION, payload: data });
                }
                if (state.ticketData.agent_id !== data.agent_id) {
                  console.log(">>", data.agent_id)
                  dispatch({ type: ACTIONS.GET_TICKET_AFTER_TRANSFER, payload:data });
                }
              },
            }
          );

          // Clean up WebSocket connection when component unmounts
          return () => {
            cable.subscriptions.remove(subscription);
          };
        }
      })
      .catch((error) => {
        console.error("Error fetching ticket data", error);
      });
    }
  }, [API_URL, dispatch, ticket_id, state.ticketData.agent_id]);
};

export default useFetchTicketData;
