import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import { useEffect, useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import axios from "axios";
import { BsFillEnvelopeCheckFill, BsEnvelopeOpenFill, BsFillSendCheckFill } from "react-icons/bs";
import { useAppContext } from "../../context/AppContext";
import { useChatData } from "../../hooks/useChatData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  useChatData();

  const [tickets, setTickets] = useState([]); // State to store tickets
  const { state } = useAppContext(); // Accessing state from AppContext
  const agentsNames = state.agents.map((agent) => agent.full_name); // Extracting agent names from state
  const agentsIds = state.agents.map((agent) => agent.id); // Extracting agent IDs from state
  const agentId = localStorage.getItem("agent_id"); // Getting agent ID from local storage
  const agentName = localStorage.getItem("full_name"); // Getting agent name from local storage

  useEffect(() => {
    // Fetching tickets from API
    axios
      .get("/api/v1/tickets")
      .then((response) => {
        setTickets(response.data); // Updating tickets state with fetched data
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const agentTickets = tickets.filter(
    (ticket) => ticket.agent_id === Number(agentId) // Filtering tickets based on agent ID
  );
  const resolvedTickets = agentTickets.filter(
    (ticket) => ticket.status_id === 3 // Filtering resolved tickets
  ).length;
  const openTickets = agentTickets.filter(
    (ticket) => ticket.status_id === 1 // Filtering open tickets
  ).length;
  const answeredTickets = agentTickets.filter(
    (ticket) => ticket.status_id === 2 // Filtering answered tickets
  ).length;
  const allResolvedTickets = tickets.filter((ticket) => ticket.status_id === 3); // Filtering all resolved tickets
  const resolvedTicketsPerAgent = agentsIds.map((agent) => {
    return allResolvedTickets.filter((ticket) => ticket.agent_id === agent)
      .length; // Counting resolved tickets per agent
  });
  const loginAgent = state.agents.find((agent) => agent.id === Number(agentId)); // Finding the logged-in agent from state
  const data = {
    labels: [...agentsNames], // Labels for the chart
    datasets: [
      {
        label: "Resolved Tickets",
        data: resolvedTicketsPerAgent, // Data for the chart
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Tickets per Agent",
      },
    },
    scales: {
      y: {
        min: 0,
        ticks: {
            stepSize: 1
        }
      },
  },
  };
  const data2 = {
    labels: [`Open Tickets (${openTickets})`, `Answered Tickets (${answeredTickets})`, `Resolved Tickets (${resolvedTickets})`],
    datasets: [
      {
        data: [openTickets, answeredTickets, resolvedTickets], // Data for the doughnut chart
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="min-h-screen flex items-center justify-center w-[95%]">
      <div className="grid grid-cols-4 gap-4 cursor-pointer">
        {/* Profile panel */}
      <div className="flex flex-row justify-center bg-white shadow-lg rounded-xl col-span-1 row-span-3 ">
          <div className="flex flex-col justify-center items-center mb-10">
            <div className="avatar">
              <div className="w-24 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <h2 className="text-2xl mt-3">{agentName}</h2>
            {loginAgent ? (
              <p className="lg:text-lg text-sm text-slate-400">{loginAgent.email}</p>
            ) : (
              <p></p>
            )}
            <div className="h-44 w-72 mt-5 flex flex-col items-center justify-center">
              <Doughnut data={data2} />
            </div>
          </div>
        </div>
        {/* Open Tickets */}
        <div className=" bg-white shadow-lg rounded-xl col-span-1 h-44 flex flex-col items-center justify-center">
          <div className="flex mt-3">
            <BsEnvelopeOpenFill className="w-5 h-5 mx-3 text-blue-600" />
            <p className="text-2xl text-blue-600">
              <span>{openTickets}</span>
            </p>
          </div>
          <h2 className="text-2xl">Open Tickets</h2>
        </div>
        {/* Answered Tickets */}
        <div className=" bg-white shadow-lg rounded-xl col-span-1 h-44  flex flex-col items-center justify-center">
          <div className="flex mt-3">
            <BsFillSendCheckFill className="w-5 h-5 mx-3 text-blue-600" />
            <p className="text-2xl text-blue-600">
              <span>{answeredTickets}</span>
            </p>
          </div>
          <h2 className="text-2xl">Answered Tickets</h2>
        </div>
        {/* Resolved Tickets */}
        <div className=" bg-white shadow-lg rounded-xl col-span-1 h-44  flex flex-col items-center justify-center">
          <div className="flex mt-3">
            <BsFillEnvelopeCheckFill className="w-5 h-5 mx-3 text-blue-600" />
            <p className="text-2xl text-blue-600">
              <span>{resolvedTickets}</span>
            </p>
          </div>
          <h2 className="text-2xl">Resolved Tickets</h2>
        </div>
        {/* Agent tickets line graph */}
        <div className="flex flex-row justify-center bg-white shadow-lg rounded-xl col-span-3 h-96 row-span-2 pl-2 pr-5">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
