/* eslint-disable @typescript-eslint/no-unused-vars */
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

export const productsQuery = (query?: string) => ({
  queryKey: ["products", query],
  queryFn: () => getAllProducts(query),
});

const getAllPosts = (query?: string) =>
  api.get(`users/posts/infinite${query ?? ""}`).then((res) => res.data);

export const postsQuery = (query?: string) => ({
  queryKey: ["posts", query],
  queryFn: () => getAllPosts(query),
});

const fetchInfinitePosts = async ({ pageParam = null }) => {
  const query = pageParam ? `?limit=6&cursor=${pageParam}` : "?limit=6";
  const response = await api.get(`users/posts/infinite${query}`);
  return response.data;
};

export const postInfiniteQuery = () => ({
  queryKey: ["products", "infinite"],
  queryFn: fetchInfinitePosts,
  initialPageParam: null, // start with no cursor
  // @ts-expect-error notype
  // able to access data from api response
  getNextPageParam: (lastPage, pages) => lastPage.nextCursor ?? undefined,
  // getPreviousPageParam : (firstPage,pages) => firstPage.prevCursor ?? undefined
  // maxPages : 6
});

const fetchOnePost = async (id: number) => {
  const response = await api.get(`users/posts/${id}`);
  if (!response) {
    throw new Response("", { status: 404, statusText: "Not Found" });
  }
  return response.data;
};

export const onePostQuery = (id: number) => ({
  queryKey: ["posts", "detail", id],
  queryFn: () => fetchOnePost(id),
});
