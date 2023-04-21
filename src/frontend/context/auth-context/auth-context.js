import { createContext, useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [isAuthorized, setAuthorized] = useState({
    authtoken: localStorage.getItem("AuthToken")
      ? localStorage.getItem("AuthToken")
      : "",
    status: localStorage.getItem("AuthToken") ? true : false,
  });

  const [authErr, setAuthErr] = useState(false);

  const loginHandler = async (email, password) => {
    try {
      const response = await axios.post(`/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("AuthToken", response.data.encodedToken);
      setAuthorized({ status: true, authtoken: response.data.encodedToken });
      setAuthErr(false);
      navigate("/notes");
    } catch (error) {
      console.error(error, "ERR occoured in signin auth");
      setAuthErr(true);
    }
  };

  const signupHandler = async ({ firstName, lastName, email, password }) => {
    try {
      const response = await axios.post(`/api/auth/signup`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
      localStorage.setItem("AuthToken", response.data.encodedToken);
      setAuthorized({ status: true, authtoken: response.data.encodedToken });
      navigate("/notes");
    } catch (error) {
      console.error(error, "ERR occoured in signup auth");
      setAuthErr(true);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthorized,
        authErr,
        setAuthorized,
        signupHandler,
        loginHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
