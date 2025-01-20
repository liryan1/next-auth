"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

const ACTIVE_ROUTE = "py-1 px-2 text-gray-300 bg-gray-700";
const INACTIVE_ROUTE =
  "py-1 px-2 text-gray-500 hover:text-gray-300 hover:bg-gray-700";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="pl-1 text-xl">
        {session?.user?.name}
        <br />
        <Button size="sm" onClick={() => signOut({ callbackUrl: "/login"})}>Sign out</Button>
      </div>
    );
  }
  return (
    <div className="pl-1 text-xl">
      Not signed in
      <br />
      <Button size="sm">
        <Link href="/login">Sign In</Link>
      </Button>
    </div>
  );
}

export default function NavMenu() {
  const pathname = usePathname();
  return (
    <div>
      <AuthButton />
      <hr className="my-4" />
      <ul className="text-base">
        <Link href="/">
          <li className={pathname === "/" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
            Home
          </li>
        </Link>
        <Link href="/login">
          <li
            className={
              pathname === "/login" ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            Login
          </li>
        </Link>
        <Link href="/signup">
          <li
            className={
              pathname === "/signup" ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            Sign up
          </li>
        </Link>
        <Link href="/protected">
          <li
            className={
              pathname === "/protected" ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            Protected
          </li>
        </Link>
        <Link href="/apiFromClient">
          <li
            className={
              pathname === "/apiFromClient" ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            API from client
          </li>
        </Link>
        <Link href="/apiFromServer">
          <li
            className={
              pathname === "/apiFromServer" ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            API from server
          </li>
        </Link>
      </ul>
    </div>
  );
}