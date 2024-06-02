"use client";

import { useSearchParams } from "next/navigation";
import Head from "next/head";
import React from "react";
import ShareChatbot from "./share-chat";

const ChatbotEmbedPage = () => {
  const searchParams = useSearchParams();
  const chatbotId = searchParams.get("chatbot_id");
  const model = searchParams.get("modeltype");
  const smode = searchParams.get("smode");

  return (
    <>
      <Head>
        <title>Chatbot Embed Page</title>
      </Head>
      <div>
        {/* <h1>Chatbot Embed Page</h1>
        <h1>{chatbotId}</h1>
        <h1>{model}</h1>
        <h1>{smode}</h1> */}
        {chatbotId ? <ShareChatbot id={chatbotId} /> : null}
      </div>
    </>
  );
};

export default ChatbotEmbedPage;
