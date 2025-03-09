import { QueryClient } from "@tanstack/react-query";
import api from ".";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 mins caching before making a new api recall
      // retry: 2
    },
  },
});

const getAllProducts = async (query?: string) => {
  const response = await api.get(`users/products${query ?? ""}`);
  return response.data;
};

export const productQuery = (query?: string) => ({
  queryKey: ["products", query],
  queryFn: () => getAllProducts(query),
});

const getAllPosts = (query?: string) =>
  api.get(`users/posts/infinite${query ?? ""}`).then((res) => res.data);

export const postQuery = (query?: string) => ({
  queryKey: ["posts", query],
  queryFn: () => getAllPosts(query),
});
