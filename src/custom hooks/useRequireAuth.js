import { useEffect } from "react";

const useRequireAuth = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "http://medeg-eg.com/login";
    }
  }, []);
};

export default useRequireAuth;
