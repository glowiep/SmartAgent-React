import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import "./styles.css";
import loginImg from "../../assets/loginImg.svg";
import useApplicationData from "../../hooks/useApplicationData";

function Login() {
  const {login} = useContext(AuthContext);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setLoggedInAgent } = useApplicationData();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password
    });
    console.log(response.data);
    setLoggedInAgent(response.data); // {logged_in: true, agent_id: 3,full_name: 'Gloria lim'}
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('full_name', response.data.full_name);
    localStorage.setItem('agent_id', response.data.agent_id);
    navigate("/main");
    login();
  } catch (error) {
    console.error(error);
  }
}
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        {/* Left side */}
      <div className="relative background__card rounded-s-2xl ">
          <img
            src={loginImg}
            alt="login image"
            className="h-[90%] hidden rounded-r-2xl lg:block object-cover"
          />
        </div>
        {/* Right side */}
        <form
          className="flex flex-col justify-center p-8 md:p-14"
          action="/submit-your-login-form"
          method="POST"
          onSubmit={handleLogin}
        >
          <h1 className="mb-3 text-4xl font-bold">Welcome back</h1>
          <p className="font-light text-gray-400 mb-8">
            Welcome back! Please enter your details.
          </p>
          <div className="py-4">
            <label htmlFor="email" className="mb-2 text-md">
              Email
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="email"
              id="email"
              required
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="py-4">
            <label htmlFor="pass" className="mb-2 text-md">
              Password
            </label>
            <input
              type="password"
              name="pass"
              id="pass"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between w-full py-4">
            <div className="mr-24">
              <input type="checkbox" name="ch" id="ch" className="mr-2" />
              <label htmlFor="ch" className="text-md">
                Remember me
              </label>
            </div>
            <span className="font-bold text-md">Forgot password</span>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full p-2 rounded-lg my-6"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
