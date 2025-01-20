import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  searchParams: Promise<{
    error?: string,
  }>,
};

const AuthErrorPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full text-center bg-gray-100">
      <Logo h={48} />
      <h1 className="text-4xl mt-4 text-gray-800">Error</h1>
      <div className="text-lg mt-2 mb-6 text-gray-700">
        <p className="py-6">
          Auth error: {params.error ?? "An unknown error has occurred."}
        </p>
        <p className="flex items-center text-base">
          If the issue persists, please contact:
            <Link href="mailto:admin@ny-go.org" className="text-inherit m-0 p-2 underline">
              admin@ny-go.org
            </Link>
        </p>
      </div>
      <Button>
        <Link href="/login">
          Back to Login
        </Link>
      </Button>
    </div>
  );
};

export default AuthErrorPage;
