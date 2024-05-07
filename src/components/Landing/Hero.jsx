import { Link } from "react-router-dom";
import RequestForm from "./RequestForm";
import Footer from "../Footer/Footer";
import { BubbleChat } from 'flowise-embed-react'
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

function Hero() {
  const CHATFLOW_ID = import.meta.env.VITE_CHATFLOW_ID;
  const API_HOST = import.meta.env.VITE_API_HOST;

  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div className="flex-col">
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1711356042156-da2e7ae500eb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-7xl font-bold text-slate-200">Welcome to SmartAgent</h1>
            <div className="flex items-center justify-center">
              <img src="/SmartAgent-icon.svg" alt="SmartAgent icon" width="140" />
            </div>
            <p className="mb-5 text-4xl font-bold text-slate-300">
              Are you a
            </p>
            <div className="flex items-center justify-center gap-5">
              <a href="#customer-request-form" className="btn btn-primary w-[40%]">
              Customer
              </a>
              <Link to={isAuthenticated ? "/main" : "/login"} className="btn btn-primary w-[40%]">
              SmartAgent
              </Link>
            </div>
          </div>
        </div>
      </div>
        
      <div id="customer-request-form">
        <RequestForm />
      </div>
      <BubbleChat 
        chatflowid={CHATFLOW_ID} 
        apiHost={API_HOST}
        theme={{
          button: {
              backgroundColor: "#3B81F6",
              right: 50,
              bottom: 20,
              size: "large",
              iconColor: "white",
              customIconSrc: "https://raw.githubusercontent.com/glowiep/SmartAgent/c52ad7bca41042bbb63371377b9e3c2666a7ef74/frontend/public/SmartAgent-icon.svg",
          },
          chatWindow: {
              welcomeMessage: "Hello! Feel free to ask me anything about SmartAgent.",
              backgroundColor: "#ffffff",
              height: 700,
              width: 500,
              fontSize: 16,
              poweredByTextColor: "#ffffff",
              botMessage: {
                  backgroundColor: "#f7f8ff",
                  textColor: "#303235",
                  showAvatar: true,
                  avatarSrc: "https://raw.githubusercontent.com/glowiep/SmartAgent/c52ad7bca41042bbb63371377b9e3c2666a7ef74/frontend/public/SmartAgent-icon.svg",
              },
              userMessage: {
                  backgroundColor: "#3B81F6",
                  textColor: "#ffffff",
                  showAvatar: true,
                  avatarSrc: "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png",
              },
              textInput: {
                  placeholder: "Type your question",
                  backgroundColor: "#ffffff",
                  textColor: "#303235",
                  sendButtonColor: "#3B81F6",
              }
          }
      }} />
      <Footer />
    </div>
  );
}

export default Hero;
