import { useEffect } from "react";
import { ACTIONS } from "../context/AppContext";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

const useFetchData = (API_URL) => {
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    axios
      .get(API_URL, {
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(res => {
        const countAll = res.data.length;
        const countTriage = res.data.filter(ticket => ticket.status_id === 1 && ticket.agent_id === 1).length;
        const countOpen = res.data.filter(ticket => ticket.status_id === 1).length;
        const countAnswered = res.data.filter(ticket => ticket.status_id === 2).length;
        const countClosed = res.data.filter(ticket => ticket.status_id === 3).length;
        const countAssignedToMe = res.data.filter(ticket => ticket.status_id !== 3 && ticket.agent_id === state.loggedInAgent.agent_id).length;

        dispatch({ type: ACTIONS.COUNT_ALL, payload: countAll });
        dispatch({ type: ACTIONS.COUNT_TRIAGE, payload: countTriage });
        dispatch({ type: ACTIONS.COUNT_OPEN, payload: countOpen });
        dispatch({ type: ACTIONS.COUNT_ANSWERED, payload: countAnswered });
        dispatch({ type: ACTIONS.COUNT_CLOSED, payload: countClosed });
        dispatch({ type: ACTIONS.COUNT_ASSIGNED_TO_ME, payload: countAssignedToMe });
      })
      .catch(error => {
        console.error('Error fetching requests', error);
      });
  }, [state.inboxTickets,API_URL,dispatch]) //state.countAssignedToMe, state.countTriage, state.countAll, state.countClosed
};

export default useFetchData;