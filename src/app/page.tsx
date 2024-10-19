import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import Image from "next/image";
import { Button } from "@nextui-org/react";

export default async function Home() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      hola
    </div>
  );
}
