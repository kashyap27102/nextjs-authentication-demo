import { LogginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-full flex-col justify-center items-center bg-sky-500">
      <div className=" space-y-6 text-center">
        <h1 className="text-6xl font-semibold text-white drop-shadow-md">
          🔐 Auth
        </h1>
        <p className="text-white text-lg">A simple Authentication Service</p>
        <div>
          <LogginButton>
            <Button variant="secondary" className="lg">
              Sign in
            </Button>
          </LogginButton>
        </div>
      </div>
    </main>
  );
}
