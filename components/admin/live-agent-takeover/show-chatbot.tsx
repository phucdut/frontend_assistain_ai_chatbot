import chatbotApiRequest from '@/app/apiRequests/chatbot';
import { handleErrorApi } from '@/lib/utils';
import { ChatbotResType } from '@/schemas/chatbot.schema';
import React, { useEffect, useState } from 'react'

type ShowChatbotProps = {
    chatbot_id: string;
  };

const ShowChatbot: React.FC<ShowChatbotProps> = ({ chatbot_id }) => {
  const [chatbot, setChatbot] = useState<ChatbotResType | null>(null);

    useEffect(() => {
        const fetchRequest = async () => {
          try {
            if (chatbot_id) {
              const result = await chatbotApiRequest.chatbotIdClient(chatbot_id);
              setChatbot(result.payload);
            }
          } catch (error: any) {
            handleErrorApi({
              error,
            });
          }
        };
        fetchRequest();
      }, [chatbot_id]);
  return (
    <div>
      <div>{chatbot?.chatbot_name}</div>
    </div>
  )
}

export default ShowChatbot
