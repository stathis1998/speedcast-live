import { useEffect, useState } from "react";
import { useUsers } from "./hooks/useUsers";
import { flattenObject } from "./utils/dataUtils";
import { User } from "./types/UserDto";

const AddressTable = () => {
  const { users } = useUsers();
  const [mutatedUsers, setMutatedUsers] = useState<any[]>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [sortKey, setSortKey] = useState<{ key: string; order: boolean }>();

  useEffect(() => {
    const mutated = users?.map((user) => flattenObject(user.address));
    setMutatedUsers(mutated);
  }, [users]);

  function getHeaders(users?: User[]) {
    if (!users) return [];

    return Object.keys(users[0]);
  }

  function filterUser(user) {
    if (!searchValue) return true;

    let found = false;

    Object.keys(user).forEach((key) => {
      if (
        user[key].toString().toLowerCase().includes(searchValue.toLowerCase())
      ) {
        found = true;
      }
    });

    return found;
  }

  return (
    <>
      <h2>Address Table</h2>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            {getHeaders(mutatedUsers).map((key) => (
              <th
                key={key}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  setSortKey({
                    key,
                    order: !sortKey?.order,
                  })
                }
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mutatedUsers
            ?.filter(filterUser)
            .sort((a, b) => {
              if (!sortKey) return 0;

              if (a[sortKey.key] < b[sortKey.key]) {
                return sortKey.order ? -1 : 1;
              }
            })
            .map((user, index) => (
              <tr key={index}>
                {Object.keys(user).map((key) => (
                  <td key={key}>{user[key]}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default AddressTable;
