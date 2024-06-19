"use client";
import chatbotApiRequest from "@/app/apiRequests/chatbot";
import { handleErrorApi } from "@/lib/utils";
import { ChatbotResListType } from "@/schemas/chatbot.schema";
import React, { useEffect, useState } from "react";

type Props = {
  user_id: string;
};

const ShowTotalTokensChatbot: React.FC<Props> = ({ user_id }) => {
    const [chatbot, setChatbot] = useState<ChatbotResListType | null>(null);
    const [totalTokens, setTotalTokens] = useState<number>(0);
  
    useEffect(() => {
      const fetchRequest = async () => {
        try {
          const result = await chatbotApiRequest.chatbotClient(user_id);
          setChatbot(result.payload);
    
          // Tính tổng số tin nhắn từ tất cả chatbot
          if (result.payload.results && Array.isArray(result.payload.results)) {
            let sumTotalTokens = 0;
            result.payload.results.forEach(chatbot => {
              if (chatbot.total_tokens) {
                sumTotalTokens += chatbot.total_tokens;
              }
            });
            setTotalTokens(sumTotalTokens);
          }
        } catch (error) {
          handleErrorApi({ error });
        }
      };
      fetchRequest();
    }, [user_id]);
  return (
    <div>
      <div>{totalTokens}</div>
    </div>
  );
};

export default ShowTotalTokensChatbot;
