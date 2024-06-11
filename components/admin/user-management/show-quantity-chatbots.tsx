"use client";
import chatbotApiRequest from "@/app/apiRequests/chatbot";
import { handleErrorApi } from "@/lib/utils";
import { ChatbotResListType } from "@/schemas/chatbot.schema";
import React, { useEffect, useState } from "react";

type Props = {
  user_id: string;
};

const ShowQuantityChatbots: React.FC<Props> = ({ user_id }) => {
  const [chatbot, setChatbot] = useState<ChatbotResListType | null>(null);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const result = await chatbotApiRequest.chatbotClient(user_id);
        setChatbot(result.payload);
      } catch (error) {
        handleErrorApi({ error });
      }
    };
    fetchRequest();
  }, [user_id]);

  return (
    <div>
      <div>{chatbot?.total}</div>
    </div>
  );
};

export default ShowQuantityChatbots;
