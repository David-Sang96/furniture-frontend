import api, { authApi } from "@/api";
import { redirect } from "react-router";

export const homeLoader = async () => {
  try {
    const response = await api.get("users/products");
    return response.data;
  } catch (error) {
    console.log("HomeLoader error:", error);
  }
};

export const loginLoader = async () => {
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
