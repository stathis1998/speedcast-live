import { useEffect, useState } from "react";
import { makeApiCall } from "../utils/apiUtils";
import { User } from "../types/UserDto";

export function useUsers() {
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    makeApiCall<User[]>({
      url: "https://jsonplaceholder.typicode.com/users",
      method: "GET",
    }).then((data) => setUsers(data));
  }, []);

  return { users };
}
