"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function APITestPage() {
  const [session, setSession] = useState<Record<string, string> | undefined>();

  const handleClick = () => {
    fetch("/api/whoami")
      .then((res) => res.json())
      .then((data) => setSession(data));
  }

  return (
    <div>
      <p>
        API Route From <span className="font-bold underline">Client</span>
      </p>
      <Button onClick={handleClick}>
        Get my session
      </Button>
      <p>Session: </p>
      {session && Object.keys(session).map(key => (
        <p key={key}>
          {key}: {session[key]}
        </p>
      ))}
    </div>
  );
}