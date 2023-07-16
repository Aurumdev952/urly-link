import { getUsers } from "@/server/controllers";

export default async function Home() {
  const userrlist = await getUsers();
  return (
    <>
    <h1>test</h1>
      {userrlist.map((user) => (
        <p key={user.id}>{user.email}</p>
      ))}
    </>
  );
}
