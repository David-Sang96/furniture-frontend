import api, { authApi } from "@/api";
import useAuthStore, { Status } from "@/store/authStore";
import { redirect } from "react-router";

export const homeLoader = async () => {
  try {
    const response = await api.get("users/products");
    return response.data;
  } catch (error) {
    console.log("HomeLoader error:", error);
  }
};

export const authCheckLoader = async () => {
  try {
    const res = await authApi.get("auth-check");
    if (res.status !== 200) {
      return null;
    }
    return redirect("/");
  } catch (error) {
    console.log("loginLoader error:", error);
  }
};

export const otpLoader = () => {
  const authStore = useAuthStore.getState();
  if (authStore.status !== Status.otp) {
    return redirect("/register");
  }
  return null;
};

export const confirmPaswordLoader = () => {
  const authStore = useAuthStore.getState();
  if (authStore.status !== Status.confirm) {
    return redirect("/register");
  }
  return null;
};
