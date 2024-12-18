import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import { validationSchema } from "./resolver";
import { useLoginMutation } from "@/services/authService";

import { toast } from "react-toastify";
import { useAuth } from "../ContextPage/AuthContext";
interface LoginFormInputs {
  username: string;
  password: string;
}
const LoginForm = () => {
  const { login } = useAuth();
  const [toLogin] = useLoginMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    const signin = await toLogin(data);
    if (signin.data) {
      const { tokens } = signin.data as {
        tokens: { accessToken: string; refreshToken: string };
      };

      localStorage.setItem("refreshToken", tokens.refreshToken);

      login(tokens.accessToken);
    } else {
      toast.error("Login Fail");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        name="username"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            sx={{
              height: "42px",
              color: "#C5C5C5",
              "& .MuiInputLabel-root": {
                color: "#C5C5C5",
                borderRadius: "9px",
              },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#485159",
              },
              "& input": {
                color: "#C5C5C5",
              },
              marginBottom: "12px",
            }}
            label="사용자 이름"
            variant="outlined"
            fullWidth
            error={!!errors.username}
            helperText={errors.username ? errors.username.message : ""}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            sx={{
              height: "42px",
              color: "#C5C5C5",
              "& .MuiInputLabel-root": {
                color: "#C5C5C5",
                borderRadius: "9px",
              },
              "& input": {
                color: "#C5C5C5",
              },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#485159",
              },
              marginBottom: "12px",
            }}
            type="password"
            label="비밀번호"
            variant="outlined"
            fullWidth
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
          />
        )}
      />

      <button
        type="submit"
        className="w-full h-[42px] flex items-center justify-center bg-[#5176FF] text-white mt-0 rounded-[9px]"
      >
        로그인
      </button>
    </form>
  );
};

export default LoginForm;
