import { authApi } from "@/api";
import { postQuery, productQuery, queryClient } from "@/api/query";
import useAuthStore, { Status } from "@/store/authStore";
import { redirect } from "react-router";

// export const homeLoader = async () => {
//   try {
//     const products = await api.get("users/products?limit=8");
//     const posts = await api.get("users/posts/infinite?limit=3");
// const [products, posts] = await Promise.all([
//   api.get("users/products?limit=8"),
//   api.get("users/posts/infinite?limit=3"),
// ]);

//     return { productsData: products.data, postsData: posts.data };
//   } catch (error) {
//     console.log("HomeLoader error:", error);
//   }
// };

export const homeLoader = async () => {
  await queryClient.ensureQueryData(productQuery("?limit=8"));
  await queryClient.ensureQueryData(postQuery("?limit=3"));
  return null;
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
