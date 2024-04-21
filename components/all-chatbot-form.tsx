'use client';

import { useAppContext } from "@/app/app-provider";
import envConfig from "@/app/config";
import { useEffect } from "react";

const AllChatbotForm = () => {
  const { sessionToken } = useAppContext();

  useEffect(() => {
    const fetchRequest = async () => {
      const result = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/api/v1/chatbot/get_all`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken}`,
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
      console.log(result);
    };

    fetchRequest();
  }, [sessionToken]);

  return (
    <div>
      <div>AllChatbotForm</div>
    </div>
  );
};

export default AllChatbotForm;
