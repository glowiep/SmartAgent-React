import { useEffect } from "react";
import { ACTIONS } from "../context/AppContext";
import axios from "axios";


const useFetchAgents = (API_URL, dispatch) => {
  useEffect(() => {
    axios
      .get(API_URL, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        const agents = res.data;
        dispatch({type: ACTIONS.GET_AGENTS, payload: agents });
      })
      .catch((error) => {
        console.error("Error fetching ticket data", error);
      });
  }, [])
};

export default useFetchAgents;