import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  useEffect(() => {
    async function checkAuth() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setMessage("Welcome guest");
          return;
        }
        const res = await axios.get(
          (import.meta.env.VITE_BASE_URL as string) + "/api/v1/home",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.msg == "welcome") {
          navigate("/dashboard");
        } else setMessage("Welcome Guest");
      } catch (err) {
        localStorage.removeItem("token");
        setMessage("Welcome Guest");
      }
    }
    checkAuth();
  }, [navigate]);
  return (
    <div>
      <h1>This is our website</h1>
      <h4>{message}</h4>
    </div>
  );
};

export default HomePage;
