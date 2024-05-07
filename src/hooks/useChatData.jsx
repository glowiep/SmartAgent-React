import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import ActionCable from "actioncable";
export const useChatData = () => {

  const {state, dispatch} = useAppContext();
  const currentAgentId = state.loggedInAgent.agent_id;
 

useEffect(() => {
  axios.get(`/api/v1/direct_chats/unread/${currentAgentId}`).then((response) => {
    dispatch({ type: "SET_UNREAD", payload: response.data });
  });

  const cable = ActionCable.createConsumer("ws://localhost:3000/cable");
  const suscription = cable.subscriptions.create("DirectChatChannel", {
    received: (response) => {
      console.log("Received a message:", response);
      if (response.receiver_id === Number(currentAgentId)) {
        dispatch({ type: "UPDATE_UNREAD", payload: [response] });
      }
    },
  });
  return () => {
    cable.subscriptions.remove(suscription);
  };
}, [currentAgentId]);

}