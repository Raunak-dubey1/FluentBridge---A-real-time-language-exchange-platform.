import { Route, Routes } from "react-router";
import HomePage from "./pages/Homepage.jsx";
import SignUpPage from "./pages/Signuppage.jsx";
import LoginPage from "./pages/Loginpage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import OnboardingPage from "./pages/Onboardingpage.jsx";

import { Toaster,toast } from "react-hot-toast";
import { axiosInstance } from "./lib/axios.js";
import { useQuery } from "@tanstack/react-query";

const App = () => {
  return (
    <div className="h-screen" data-theme="coffee">
      

console.log(data);
     {/* <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/notifications" element={<NotificationPage />}></Route>
        <Route path="/chat" element={<ChatPage />}></Route>
        <Route path="/call" element={<CallPage />}></Route>
        <Route path="/onboarding" element={<OnboardingPage />}></Route>
      </Routes> */}
      <Toaster />
    </div>
  );
};

export default App;



 
