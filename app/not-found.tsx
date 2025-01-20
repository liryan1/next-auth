import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full text-center bg-gray-100">
      <Logo h={48}/>
      <h1 className="text-4xl mt-4 text-gray-800">Oops! Page not found.</h1>
      <p className="text-lg mt-2 mb-6 text-gray-600">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Button>
        <Link href="/">
          Back to Homepage
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
