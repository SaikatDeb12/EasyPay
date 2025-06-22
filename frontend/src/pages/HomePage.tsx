import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function checkAuth() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setMessage("Welcome guest");
          setIsLoading(false);
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
          navigate("/landing");
        } else {
          setMessage("Welcome Guest");
          setIsLoading(false);
        }
      } catch (err) {
        localStorage.removeItem("token");
      } finally {
        setMessage("Welcome Guest");
      }
      setIsLoading(false);
    }
    checkAuth();
  }, [navigate]);
  return (
    <div>
      {!isLoading ? (
        <h3>{`This is our website.. ${message}`}</h3>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default HomePage;
