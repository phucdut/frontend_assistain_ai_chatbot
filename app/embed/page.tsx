
import ChatEmbed from "@/components/admin/chatbots/share-chatbot/chat";
import ChatbotEmbedForm from "@/components/admin/chatbots/share-chatbot/embed";
import Head from "next/head";
import React from "react";

const ChatbotEmbedPage = () => {
  return (
    <div>
      {/* <Head>
        <title>My Next.js App</title>
        <script src="/bubble-embed.js" defer></script>
      </Head> */}
      <ChatbotEmbedForm />
      {/* <ChatEmbed id="1d90c339-fb35-4c1a-9e9e-85451bb18fc8"></ChatEmbed> */}
    </div>
  );
};

export default ChatbotEmbedPage;
