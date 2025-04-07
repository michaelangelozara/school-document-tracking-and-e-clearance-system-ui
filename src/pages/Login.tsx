import { NavLink, useNavigate } from "react-router-dom";
import NDTC_LOGO from "../assets/icon/png/NDTC-300x279.png";
import { useState } from "react";

import { authenticate } from "../service/UserService";
import { LoginType } from "../types/auth/Login";
import { BaseResponse } from "../types/response/Response";
import { getAxiosError } from "../util/AxiosUtil";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [login, setLogin] = useState<LoginType>({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { token, authSetter } = useAuth();

  const loginHandler = async () => {
    try {
      setIsLoading(true);
      const response = await authenticate(login);
      const data = response.data;
      authSetter(data);
      window.location.href = "/home";
    } catch (err) {
      const exception = getAxiosError(err).response?.data as BaseResponse<null>;
    } finally {
      setIsLoading(false);
    }
  };

  if (token !== null) {
    window.location.href = "/home";
    return;
  }

  return (
    <div className="bg-background w-full h-screen flex justify-center items-center">
      <div
        className="flex flex-col w-[420px] max-w-[90%] p-8 bg-white rounded-lg border border-gray-200 shadow-lg
      gap-4"
      >
        <div className="flex flex-col justify-start gap-4">
          <div className="flex items-center">
            <img
              src={NDTC_LOGO}
              className="size-8 sm:size-10"
              alt="NDTC Logo"
            />
            <span className="text-xl sm:text-2xl font-bold text-darkContrast">
              NDTC
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold">Sign in</h1>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-gray-600">User ID</h1>
          <input
            type="text"
            className="w-full bg-background h-10 border border-gray-200 rounded-md pl-3 placeholder:text-gray-400 outline-darkContrast"
            placeholder="A-0000-0000 or 123-1234-123"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLogin((prev) => ({ ...prev, username: e.target.value }))
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-gray-600">Password</h1>
          <input
            type="password"
            className="w-full bg-background h-10 border border-gray-200 rounded-md pl-3 placeholder:text-gray-400 outline-darkContrast"
            placeholder="********"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLogin((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={loginHandler}
            className={`w-full p-2 font-semibold rounded-md bg-darkContrast text-white hover:bg-secondary ${
              isLoading ? "flex justify-center p-0" : ""
            }`}
          >
            {isLoading ? "Signing in . . ." : "Sign in"}
          </button>
          <NavLink
            to={"/forgot-password"}
            className="p-1 text-sm hover:underline text-darkContrast"
          >
            Forgot your password?
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export const loginLoader = async () => {};

export default Login;
