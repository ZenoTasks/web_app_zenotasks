import { getServerSession } from "next-auth";
import options from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(options);
  let response;

  if (session) {
      response = await fetch('http://api:8000/api/user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${session.user.idToken}`,
      },
    }).then(res => res.json());
  }
  console.log("user",response)
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      hola
    </div>
  );
}
