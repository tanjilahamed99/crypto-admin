"use client";

import Image from "next/image";
import Link from "next/link";
import RegistrationFunction from "./RegistationFunction";
import { useAddress } from "@thirdweb-dev/react";
import axios from "axios";
import { BASE_URL } from "@/constant/constant";
import { useRouter } from "next/navigation";
import { signIn, useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

const RegisterForm = ({ refer }) => {
  const address = useAddress();
  const router = useRouter();
  const url = `${BASE_URL}/register`;
  const { data: user } = useSession();
  const date = Date();

  const register = async () => {
    const { data } = await axios?.post(url, {
      wallet: "20937498273592635826353kr2ou3n27592752bn429n",
      referBy: refer ? refer : "1097473",
      joined: date,
    });

    if (data?.status) {
      try {
        const response = await signIn("credentials", {
          wallet: "20937498273592635826353kr2ou3n27592752bn429n",
          callbackUrl: "/profile",
          redirect: false,
        });

        if (response?.status) {
          router.push("/profile");
        }
      } catch (error) {
        console.error("Error logging in:", error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      // router.push('/profile');
    }
  }, [user]);

  return (
    <div className="border border-primary text-white p-5 rounded-lg">
      <h2 className="text-2xl font-bold leading-none tracking-tight text-center">
        Registering for Istimate-Pro
      </h2>
      <Image
        src={"https://i.ibb.co.com/9bQnXmF/images-3.jpg"}
        width={500}
        height={500}
        alt="image not found"
        className="h-32 w-32 rounded-full mx-auto mt-5"
      />
      <h2 className="text-center text-lg font-semibold">Istimate-Pro</h2>

      <button
        className="btn btn-outline text-white border-white"
        onClick={register}
      >
        Register
      </button>
      <button
        className="btn btn-outline text-white border-white"
        onClick={() => signOut()}
      >
        logout
      </button>

      {/* form */}
      <div>
        <h2>Reffer by</h2>
        <input
          className="bg-black border border-gray-600 w-full  p-2 rounded-md mt-2"
          placeholder="refer code"
          defaultValue={refer ? refer : "09364"}
          disabled
        />

        <h2 className="my-4">This is Istimate-Pro Main Id</h2>

        <div className="flex items-start gap-2">
          <input type="checkbox" className="w-5 h-5" />
          <div className="space-y-2">
            <p>Conneted to Wallet</p>
            <RegistrationFunction />
          </div>
        </div>
        <button
          onClick={register}
          className="btn border-none bg-primary w-full my-5 "
          disabled={address ? false : true}
        >
          Register
        </button>

        <Link href={"/"} className="text-primary font-bold">
          Go To Home
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;