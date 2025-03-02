import api, { authApi } from "@/api";
import { AxiosError } from "axios";
import { ActionFunctionArgs, redirect } from "react-router";

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
      return { error: res.data || "Login failed!" };
    }

    const redirectTo = new URL(request.url).searchParams.get("redirect") || "/";
    return redirect(redirectTo);
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "Login failed!" };
    } else throw error;
  }
};

export const logoutAction = async () => {
  try {
    await api.post("logout");
    return redirect("/login");
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "Logout failed!" };
    } else throw error;
  }
};
