import api, { authApi } from "@/api";
import useAuthStore, { Status } from "@/store/authStore";
import { AxiosError } from "axios";
import { ActionFunctionArgs, redirect } from "react-router";

const getErrorMessage = (error: unknown, defaultMsg: string): string => {
  if (error instanceof AxiosError) {
    return error.response?.data || { message: defaultMsg };
  } else throw error;
};

export const loginFormAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  // const authData = {
  //   phone: formData.get("phone"),
  //   password: formData.get("password"),
  // };
  const credentials = Object.fromEntries(formData);

  try {
    // await fetch(import.meta.env.VITE_API_URL + "login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     body: JSON.stringify(credentials),
    //     credentails: "include",
    //   },
    // });

    const res = await authApi.post("login", credentials);
    if (res.status !== 200) {
      return { message: res.data || "Login failed!" };
    }

    const redirectTo = new URL(request.url).searchParams.get("redirect") || "/";
    return redirect(redirectTo);
  } catch (error) {
    return getErrorMessage(error, "Login failed!");
  }
};

export const logoutAction = async () => {
  try {
    await api.post("logout");
    return redirect("/login");
  } catch (error) {
    return getErrorMessage(error, "Logout failed!");
  }
};

export const registerPhoneAction = async ({ request }: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();
  const formData = await request.formData();
  const data = { phone: formData.get("phone") };
  try {
    const res = await authApi.post("register", data);
    if (res.status !== 200) {
      return { message: res.data || "Sending OTP failed!" };
    }

    // client state management
    authStore.setAuth(res.data.phone, res.data.token, Status.otp);
    return redirect("/register/otp");
  } catch (error) {
    return getErrorMessage(error, "Sending OTP failed!");
  }
};

export const registerOTPAction = async ({ request }: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();
  if (!authStore.phone || !authStore.token) {
    return {
      error: "Authentication data is missing. Please restart the process.",
    };
  }

  const formData = await request.formData();
  const otp = formData.get("otp")?.toString();

  if (!otp) return { message: "OTP is required" };

  try {
    const res = await authApi.post("verify-otp", {
      phone: authStore.phone,
      otp,
      token: authStore.token,
    });
    if (res.status !== 200) {
      return { message: res.data || "Verifying OTP failed!" };
    }

    // client state management
    authStore.setAuth(res.data.phone, res.data.token, Status.confirm);
    return redirect("/register/confirm-password");
  } catch (error) {
    return getErrorMessage(error, "Verifying OTP failed!");
  }
};

export const registerConfirmPasswordAction = async ({
  request,
}: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();
  if (!authStore.phone || !authStore.token) {
    return {
      error: "Authentication data is missing. Please restart the process.",
    };
  }

  const formData = await request.formData();
  const password = formData.get("password")?.toString();

  if (!password) {
    return { message: "Password is required." };
  }

  try {
    const res = await authApi.post("confirm-password", {
      phone: authStore.phone,
      password,
      token: authStore.token,
    });
    if (res.status !== 201) {
      return { message: res.data || "Registration failed!" };
    }

    // client state management
    authStore.clearAuth();
    return redirect("/");
  } catch (error) {
    return getErrorMessage(error, "Registration failed!");
  }
};
