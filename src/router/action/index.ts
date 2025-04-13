import api, { authApi } from "@/api";
import { queryClient } from "@/api/query";
import useAuthStore, { Status } from "@/store/authStore";
import { AxiosError } from "axios";
import { ActionFunctionArgs, redirect } from "react-router";

export const getErrorMessage = (error: unknown, defaultMsg: string): string => {
  if (error instanceof AxiosError) {
    return error.response?.data || { message: defaultMsg };
  } else throw error;
};

export const loginFormAction = async ({ request }: ActionFunctionArgs) => {
  const auth = useAuthStore.getState();
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
    auth.setUser(res.data.userInfo);
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

export const otpAction = async ({ request }: ActionFunctionArgs) => {
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
export const verifyOtpAction = async ({ request }: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();
  if (!authStore.phone || !authStore.token) {
    return {
      error: "Authentication data is missing. Please restart the process.",
    };
  }
  const formData = await request.formData();
  const otp = formData.get("otp");
  if (!otp) return { message: "OTP is required" };
  try {
    const res = await authApi.post("verify", {
      phone: authStore.phone,
      otp,
      token: authStore.token,
    });
    if (res.status !== 200) {
      return { message: res.data || "Verifying OTP failed!" };
    }
    authStore.setAuth(res.data.phone, res.data.token, Status.reset);
    return redirect("/forget-password/new-password");
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

export const newPasswordAction = async ({ request }: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();
  if (!authStore.phone || !authStore.token) {
    return {
      error: "Authentication data is missing. Please restart the process.",
    };
  }

  const formData = await request.formData();
  const password = formData.get("password");
  if (!password) {
    return { message: "Password is required." };
  }

  try {
    const res = await authApi.post("reset-password", {
      phone: authStore.phone,
      password,
      token: authStore.token,
    });
    if (res.status !== 200) {
      return { message: res.data || "Changing password failed!" };
    }
    authStore.clearAuth();
    return redirect("/");
  } catch (error) {
    return getErrorMessage(error, "Changing password failed!");
  }
};

export const forgetPasswordAction = async ({ request }: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  try {
    const response = await authApi.post("forget-password", credentials);
    if (response.status !== 200) {
      return { message: response.data || "Sending OTP Failed!" };
    }
    authStore.setAuth(response.data.phone, response.data.token, Status.verify);
    return redirect("/forget-password/verify");
  } catch (error) {
    return getErrorMessage(error, "Sending OTP Failed!");
  }
};

export const updatePasswordAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const credentails = Object.fromEntries(formData);

  try {
    const response = await api.post("update-password", credentails);
    if (response.status !== 200) {
      console.log(response);
      return { error: response.data.message || "Update Password Failed!" };
    }

    await api.post("logout");
    return redirect("/login");
  } catch (error) {
    return getErrorMessage(error, "Update Password Failed!");
  }
};

export const favoriteAction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const productId = params.productId;

  if (!productId) {
    throw new Error("No product ID provided");
  }

  const data = {
    productId: productId,
    favorite: formData.get("favorite") === "true",
  };

  try {
    const res = await api.patch("users/products/toggle-favorite", data);
    if (res.status !== 200) {
      return { message: res.data || "Setting favorite failed!" };
    }

    await queryClient.invalidateQueries({
      queryKey: ["products", "detail", productId],
    });

    return null;
  } catch (error) {
    return getErrorMessage(error, "Setting favorite failed!");
  }
};
