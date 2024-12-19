"use client";

import RegistrationFunction from "@/components/RegistationFunction";
import { useAddress } from "@thirdweb-dev/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AdminLogin = () => {
  const wallet = useAddress();
  const router = useRouter();
  const [error, setError] = useState();
  const handle = async (e) => {
    e.preventDefault();
    setError("");
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const response = await signIn("credentials", {
        wallet: wallet,
        email,
        password,
        callbackUrl: "/admin/dashboard",
        redirect: false,
      });
      if (response?.status) {
        router.push("/admin/dashboard");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError(error?.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh] bg-blue-800">
      <h2 onClick={() => signOut()} className="btn">
        Logout
      </h2>
      <div className="mx-auto w-[90%] md:w-full max-w-md space-y-5 rounded-lg border text-white p-2 md:p-7 shadow-lg dark:border-zinc-700 dark:bg-zinc-900 bg-blue-600">
        <h1 className=" text-xl md:text-3xl font-semibold tracking-tight text-white">
          Welcome to Istimate Pro
        </h1>
        <div className="space-y-3">
          <RegistrationFunction />
          <form onSubmit={handle} className="space-y-4">
            <div className="space-y-2 text-sm">
              <label
                htmlFor="username"
                className="block  dark:text-zinc-300 font-medium"
              >
                Email
              </label>
              <input
                className="flex h-10 w-full text-black rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                id="username"
                placeholder="Enter email"
                name="email"
                type="email"
                required
              />
            </div>
            <div className="space-y-2 text-sm">
              <label
                htmlFor="password"
                className="block  dark:text-zinc-300 font-medium"
              >
                Password
              </label>
              <input
                className="flex h-10 w-full text-black rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                id="password"
                placeholder="Enter password"
                name="password"
                type="password"
                required
              />
              <div className="flex justify-end text-xs">
                <h2 href="#" className="hover:underline text-white">
                  Forgot Password?
                </h2>
              </div>
            </div>
            <button
              disabled={!wallet}
              className={` ${
                wallet && "cursor-pointer hover:bg-blue-900"
              } rounded-md bg-blue-800 px-4 py-2 text-white transition-colors w-full`}
            >
              Login
            </button>

            <h2 className="text-red-500 font-semibold text-sm">{error}</h2>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
