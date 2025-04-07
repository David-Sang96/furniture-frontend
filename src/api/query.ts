/* eslint-disable @typescript-eslint/no-unused-vars */
import { keepPreviousData, QueryClient } from "@tanstack/react-query";
import api from ".";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 mins caching before making a new api recall
      // retry: 2
    },
  },
});

/*-------------------------- Posts ------------------------------ */

const getAllPosts = (query?: string) =>
  api.get(`users/posts/infinite${query ?? ""}`).then((res) => res.data);

export const postsQuery = (query?: string) => ({
  queryKey: ["posts", query],
  queryFn: () => getAllPosts(query),
});

const fetchInfinitePosts = async ({
  pageParam = null,
}: {
  pageParam?: number | null;
}) => {
  const query = pageParam ? `?limit=6&cursor=${pageParam}` : "?limit=6";
  const response = await api.get(`users/posts/infinite${query}`);
  return response.data;
};

export const postInfiniteQuery = () => ({
  queryKey: ["posts", "infinite"],
  queryFn: fetchInfinitePosts,
  initialPageParam: null, // start with no cursor
  // @ts-expect-error notype
  // represents the response data from the previous API call
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

/*-------------------------- Products ------------------------------ */

const getAllProducts = async (query?: string) => {
  const response = await api.get(`users/products${query ?? ""}`);
  return response.data;
};

export const productsQuery = (query?: string) => ({
  queryKey: ["products", query],
  queryFn: () => getAllProducts(query),
});

const fetchCategoryAndType = async () =>
  api.get("users/products/filter-type").then((res) => res.data);

export const categoryAndTypeQuery = () => ({
  queryKey: ["category", "type"],
  queryFn: fetchCategoryAndType,
});

const fetchInfiniteProducts = async ({
  pageParam = null,
  categories = null,
  types = null,
}: {
  pageParam?: number | null;
  categories?: string | null;
  types?: string | null;
}) => {
  // let query = pageParam ? `?limit=6&${pageParam}` : "?limit=6";
  // if (categories) query += `&category=${categories}`;
  // if (types) query += `&type=${types}`;
  const params = new URLSearchParams({ limit: "6" });
  if (pageParam) params.append("cursor", pageParam.toString());
  if (categories) params.append("category", categories);
  if (types) params.append("type", types);

  const respose = await api.get(`users/products?${params.toString()}`);
  return respose.data;
};

export const productInfiniteQuery = (
  categories: string | null = null,
  types: string | null = null,
) => ({
  queryKey: [
    "products",
    "infinite",
    categories ?? undefined,
    types ?? undefined,
  ],
  queryFn: ({ pageParam }: { pageParam?: number | null }) =>
    fetchInfiniteProducts({ categories, types, pageParam }),
  // Prevents UI Flicker When Fetching New Pages.
  // Without placeholderData:
  // When fetching the next page, old data is cleared, causing a UI flicker.
  // With placeholderData: keepPreviousData:
  // Keeps the old data visible until the new data is fetched, creating a smoother experience.
  placeholderData: keepPreviousData,
  initialPageParam: null,
  // @ts-expect-error notype
  getNextPageParam: (lastPage, pages) => lastPage.nextCursor ?? undefined,
});

const fetchOneProduct = async (id: number) => {
  const response = await api.get(`users/products/${id}`);
  if (!response) {
    throw new Response("", { status: 404, statusText: "Not found" });
  }
  return response.data;
};

export const oneProductQuery = (id: number) => ({
  queryKey: ["products", "detail", id],
  queryFn: () => fetchOneProduct(id),
});
