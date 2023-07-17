import { useEffect } from "react";
import Router from "next/router";
import Cookies from "js-cookie";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export const registerUser = (username, email, password) => {
  if (typeof window === "undefined") {
    return;
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/register`, { username, email, password })
      .then((res) => {
        Cookies.set("token", res.data.jwt);
        resolve(res);
        Router.push("/");
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const login = (identifier, password) => {
  if (typeof window === "undefined") {
    return;
  }

  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/`, { identifier, password })
      .then((res) => {
        Cookies.set("token", res.data.jwt);
        resolve(res);
        Router.push("/");
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const logout = () => {
  Cookies.remove("token");
  delete window.__user;
  window.localStorage.setItem("logout", Date.now());
  Router.push("/");
};

export const createPayment = async (stripeToken, amount, dishes, { address, city, state }) => {
  try {
    const response = await axios.post(`${API_URL}/api/orders`, {
      amount,
      dishes,
      address,
      city,
      state,
      stripeToken
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    });

    return response;
  } catch (error) {
    console.error('An error occurred while creating a payment:', error);
    return null;
  }
};

export const withAuthSync = (Component) => {
  const Wrapper = (props) => {
    const syncLogout = (event) => {
      if (event.key === "logout") {
        Router.push("/login");
      }
    };

    useEffect(() => {
      window.addEventListener("storage", syncLogout);

      return () => {
        window.removeEventListener("storage", syncLogout);
        window.localStorage.removeItem("logout");
      };
    }, []);

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Wrapper.getInitialProps = Component.getInitialProps;
  }

  return Wrapper;
};
