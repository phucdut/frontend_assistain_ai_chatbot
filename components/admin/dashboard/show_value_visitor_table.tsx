"use client";

import React, { useEffect, useState } from "react";
import "@/app/globals.css";

import {
  TableDashboard,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table-dashboard";
import withReactContent from "sweetalert2-react-content";
import { useSidebarStore } from "@/stores/sidebar-stores";
import { ChatbotResListType } from "@/schemas/chatbot.schema";
import { AccountResType } from "@/schemas/account.schema";
import { useRouter } from "next/navigation";
import accountApiRequest from "@/app/apiRequests/account";
import { handleErrorApi } from "@/lib/utils";
import chatbotApiRequest from "@/app/apiRequests/chatbot";
import dashboardApiRequest from "@/app/apiRequests/dashboard";
import { ConversationAndChatbotResType } from "@/schemas/dashboard.schema";

type FormData = {
  type: string;
  date: string;
};

type Props = {
  formData: FormData;
  chatbot_id: string;
};

const ShowValueVisitorTable = ({ formData, chatbot_id }: Props) => {
  const { isMinimal, handleClose } = useSidebarStore();
  const [chatbot, setChatbot] = useState<ChatbotResListType | null>(null);
  const [selectedChatbotId, setSelectedChatbotId] = useState<string | null>(
    null
  );
  const [editChatbotId, setEditChatbotId] = useState<string | null>(null);
  const [account, setAccount] = useState<AccountResType | null>(null);
  const [conversationDashboard, setConversationDashboard] =
    useState<ConversationAndChatbotResType | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const result = await accountApiRequest.accountClient();
        setAccount(result.payload);
        // console.log(result);
      } catch (error) {
        handleErrorApi({
          error,
        });
        router.push("/");
        router.refresh(); // Chuyển hướng người dùng về trang landing
      }
    };
    fetchRequest();
  }, [router]);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const result =
          await dashboardApiRequest.dashboardConversationValueClient(
            formData.type,
            formData.date,
            chatbot_id
          );
        setConversationDashboard(result.payload);
        // console.log(result);
      } catch (error) {
        handleErrorApi({
          error,
        });
        router.push("/");
        router.refresh(); // Chuyển hướng người dùng về trang landing
      }
    };
    fetchRequest();
  }, [router, formData.type, formData.date, chatbot_id]);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        if (account?.id) {
          const result = await chatbotApiRequest.chatbotClient(account?.id);
          setChatbot(result.payload);
          // console.log(result.payload);
        }
      } catch (error) {
        handleErrorApi({ error });
      }
    };
    fetchRequest();
  }, [account?.id]);
  return (
    <div>
      {conversationDashboard?.visitor_cost !== null &&
      conversationDashboard?.visitor_cost !== undefined
        ? conversationDashboard?.visitor_cost
        : 0}
    </div>
  );
};

export default ShowValueVisitorTable;
