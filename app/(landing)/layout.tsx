import ChatEmbed from "@/components/admin/chatbots/share-chatbot/chat";
import React from "react";

const lanDingLayout = (props: { children: React.ReactNode }) => {
  return (
    <div>
      {props.children}
      <ChatEmbed id="1d90c339-fb35-4c1a-9e9e-85451bb18fc8"></ChatEmbed>
    </div>
  );
};

export default lanDingLayout;
