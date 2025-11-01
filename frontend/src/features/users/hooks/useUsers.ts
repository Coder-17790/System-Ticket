import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/getUsers";
import { User } from "@/types";

export function useUsersQuery() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 5, // cache 5 phút
  });
}
