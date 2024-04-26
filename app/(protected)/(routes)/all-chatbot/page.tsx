import envConfig from "@/app/config";
import AllChatbotForm from "@/components/all-chatbot-form";
import { cookies } from "next/headers";

export default async function ProfilePage() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  //   console.log(sessionToken);
  // Vì dùng cookie nên api này không được cached trên server
  // https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#opting-out-of-data-caching

  const result = await fetch(
    `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/api/v1/chatbot/get_all`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken?.value}`,
      },
    }
  ).then(async (res) => {
    const payload = await res.json();
    const data = {
      status: res.status,
      payload,
    };
    if (!res.ok) {
      throw data;
    }
    return data;
  });
  return (
    <div>
      <h1 className=" flex justify-center">PROFILE</h1>
      <span></span>

      <div>
        <p>Thông tin {result.payload.total}</p>
      </div>
      <AllChatbotForm />
    </div>
  );
}
