import { useEffect } from "react";

const useRequireAuth = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "http://localhost:5174/login";
    }
  }, []);
};

export default useRequireAuth;
