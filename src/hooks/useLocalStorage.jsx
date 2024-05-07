import { useEffect } from "react";
import { ACTIONS, useAppContext } from "../context/AppContext";

/**
 * A custom hook for setting agent name and ID in state based on memo data
 * @function
 */

const useLocalStorage = () => {
  const { dispatch } = useAppContext();

  // useEffect foe handling agent info stored in local storage
  useEffect(() => {
    const localAgentId = Number(window.localStorage.getItem("agent_id"));
    const localAgentFullName = window.localStorage.getItem("full_name")

    if (localAgentId && localAgentFullName) {
      // Set Agent data in state
      dispatch({ type: ACTIONS.SET_AGENT, payload: { agent_id: localAgentId, full_name: localAgentFullName }})
    }
  }, [])
};

export default useLocalStorage;