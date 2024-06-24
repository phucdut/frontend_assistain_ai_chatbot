"use client";
import adminApiRequest from "@/app/apiRequests/admin";
import chatbotApiRequest from "@/app/apiRequests/chatbot";
import { useToast } from "@/components/ui/use-toast";
import { handleErrorApi } from "@/lib/utils";
import { AccountResType } from "@/schemas/account.schema";
import { ChatbotResListType } from "@/schemas/chatbot.schema";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

type Props = {
  user_id: string;
};

const BanUser: React.FC<Props> = ({ user_id }) => {
  const [isBanting, setIsBanting] = useState(true);
  const MySwal = withReactContent(Swal);
  const [user, setUser] = useState<AccountResType | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const result = await adminApiRequest.detailUser(user_id);
        setUser(result.payload);
        setIsBanting(result.payload.is_active);
        // console.log(result);
      } catch (error) {
        handleErrorApi({
          error,
        });
      }
    };
    fetchRequest();
  }, [user_id]);

  const handleBan = async (user_id: string) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to ban this person?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Ban it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (user?.user_role === "admin") {
            toast({
              title: "Error",
              description: "You can't ban an admin",
              variant: "destructive",
            });
            return;
          } else {
            await adminApiRequest.ban(user_id);
            setIsBanting(false);
            toast({
              title: "Success",
              description: "Ban successfully!",
            });
          }
        } catch (error) {
          handleErrorApi({
            error,
          });
        }
      }
    });
  };

  const handleUnBan = async (user_id: string) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to unban this person?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Unban it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await adminApiRequest.unBan(user_id);
          setIsBanting(true);
          toast({
            title: "Success",
            description: "Ban successfully!",
          });
        } catch (error) {
          handleErrorApi({
            error,
          });
        }
      }
    });
  };
  return (
    <div>
      <div>
        {isBanting ? (
          <h1
            className="w-20 h-10 bg-amber-500 rounded-lg flex justify-center items-center font-semibold uppercase text-[16px]"
            onClick={() => handleBan(user_id)}
          >
            Ban
          </h1>
        ) : (
          <h1
            className="w-20 h-10 bg-orange-500 rounded-lg flex justify-center items-center font-semibold uppercase text-[16px]"
            onClick={() => handleUnBan(user_id)}
          >
            UnBan
          </h1>
        )}
      </div>
    </div>
  );
};

export default BanUser;
