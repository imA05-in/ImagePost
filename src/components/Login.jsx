import { Input, Button } from "./index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import authService from "../appwrite/Auth";
import { toggleLoginRedux } from "../store/AuthSlice";
import { useState } from "react";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [err, setErr] = useState("");
  async function googleSubmit() {
    await authService.createOAuth2Session();
  }
  async function submit(data) {
    try {
      setErr("");
      authService.createEPSession({
        email: data.email,
        password: data.password,
      });
      const userData = await authService.getAccount();
      if (userData) {
        dispatch(toggleLoginRedux(userData));
        console.log(userData);

        navigate("/home");
      }
    } catch (error) {
      setErr(error.message);
      console.log("/src/components/login.jsx: ", error);
    }
  }

  return (
    <div className="border rounded p-2 m-2 w-full flex flex-col gap-6 justify-center items-center">
      {err && <p className="text-red-500">{err}</p>}
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col gap-10 border rounded justify-center items-center w-full p-2 m-4 py-6"
      >
        {errors.email && (
          <p className="text-red-500 ">{errors.email.message}</p>
        )}
        <Input
          label={`username`}
          type="text"
          {...register("email", {
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email format",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <Input
          label={`password`}
          type="password"
          {...register("password", {
            required: true,
            minLength: {
              value: 8,
              message: "password must be more than 8 digits",
            },
          })}
        />
        <Button />
      </form>
      <div>
        <Button
          onclick={googleSubmit}
          label="Continue with Google"
          clssName={`px-3 bg-red-500 mb-3`}
        />
      </div>
    </div>
  );
}
