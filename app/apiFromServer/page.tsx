import { headers } from "next/headers";

export default async function APIFromServer() {
  const session = await fetch("http://localhost:3003/api/whoami", {
    method: "GET",
    headers: await headers(),
  }).then((res) => res.json());

  return (
    <div>
      <p>
        API Route From <span className="font-bold underline">Server</span>
      </p>
      <p>Session: </p>
      {session && Object.keys(session).map(key => (
        <p key={key}>
          {key}: {session[key]}
        </p>
      ))}
    </div>
  );
}
