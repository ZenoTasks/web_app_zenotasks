import {
    Navbar, 
    NavbarBrand, 
    NavbarContent, 
    NavbarItem, 
  } from "@nextui-org/navbar";

  import { getServerSession } from "next-auth";

  import { Link, Button } from "@nextui-org/react";
  import Image from "next/image";
  import zenoLogo from "@/assets/zenoTasks.svg";
import options from "@/app/api/auth/[...nextauth]/options";

export default async function ZenoBar() {

    const session = await getServerSession(options);
    console.log("arraz",session)

    return (
    <Navbar>
        <NavbarBrand>
          <Image src={zenoLogo} alt="zenoLogo" width={80} height={80}/>
          <p className="font-bold text-inherit">ZenoTasks</p>
        </NavbarBrand>
        {session ? (
          <NavbarContent justify="end">
            <NavbarItem>
              <p className="font-bold text-inherit">{session.user?.name}</p>
            </NavbarItem>
            <NavbarItem>
              <img src={session.user?.image as string} alt="profile" className="w-10 h-10 rounded-full" fetchPriority="low" loading="lazy" decoding="async" referrerPolicy="no-referrer"/>
            </NavbarItem>
            <NavbarItem>
              <Link href="/api/auth/signout">Logout</Link>
            </NavbarItem>
          </NavbarContent>
        ) : (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="/api/auth/signin">Login</Link>
          </NavbarItem>
        </NavbarContent>
        )}
      </Navbar>
    );
}