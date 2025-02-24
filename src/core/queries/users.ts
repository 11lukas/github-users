import Constants from '@/constants';
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import toast from 'react-hot-toast';

const PAGE_LIMIT = 15;

const fetchUsers = async ({ pageParam = 1, queryKey }: { pageParam?: number; queryKey: readonly [string, string] }): Promise<UsersSearchResponse> => {
  const [, search] = queryKey;

  const response = await fetch(
    `${Constants.apiBaseUrl}?q=${search}&page=${pageParam}&per_page=${PAGE_LIMIT}`
  );

  if (!response.ok) {
    const { message } = await response.json()
    toast.error(message, { position: 'top-center', duration: 2000 })

    throw new Error(message);
  }

  return response.json();
};

export function useUsersSearch(search: string) {
  return useInfiniteQuery({
    queryKey: ["users", search] as const,
    queryFn: fetchUsers,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages): number | undefined => lastPage.items.length === PAGE_LIMIT ? allPages.length + 1 : undefined,
    enabled: !!search,
    placeholderData: keepPreviousData,
  });
}
