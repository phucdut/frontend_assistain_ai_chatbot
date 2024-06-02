"use client";

import ComponentCreateKnowledgeBase from "./component-create-knowledge-base";
import { Input } from "@/components/ui/input";
import { cn, handleErrorApi } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "@/app/globals.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Search, Trash2 } from "lucide-react";
import { KnowledgeBaseResListType } from "@/schemas/knowledge-base.schema";
import knowledgeBaseApiRequest from "@/app/apiRequests/knowledge-base";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type KnowledgeBaseProps = {
  id: string;
};

const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ id }) => {
  const [knowledgeBase, setKnowledgeBase] =
    useState<KnowledgeBaseResListType | null>(null);
  const { toast } = useToast();
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedKnowledgeBaseId, setSelectedKnowledgeBaseId] = useState<
    string | null
  >(null);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const result = await knowledgeBaseApiRequest.getAllKnowledgeBase(id);
        setKnowledgeBase(result.payload);
      } catch (error) {
        handleErrorApi({
          error,
        });
      }
    };
    fetchRequest();
  }, [id]);

  const handleDelete = async (id: string, knowledgeBase_id: string) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this imaginary file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Gọi API logout
          await knowledgeBaseApiRequest.deleteKnowledgeBase(
            id,
            knowledgeBase_id
          );
          const result = await knowledgeBaseApiRequest.getAllKnowledgeBase(id);
          toast({
            title: "Success",
            description: "Update successfully!",
          });
          router.refresh();
        } catch (error) {
          handleErrorApi({
            error,
          });
        }
      }
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredKnowledgeBase = knowledgeBase?.filter((knowledgeBaseItem) =>
    knowledgeBaseItem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Drawer>
      <div
        className={cn(
          "w-full h-full",
          "lg:rounded-3xl lg:p-7 overflow-y-auto custom-scroll py-3"
        )}
      >
        {/* <p>Chatbot ID: {id}</p> */}
        {/* <CreateKnowledgeBase id={id} /> */}
        <div className="flex items-center justify-start gap-3 w-full overflow-hidden">
          <div className="w-[879px] h-[50px] px-[15px] py-3.5 rounded-md border border-slate-300 inline-flex items-center gap-[15px]">
            <div className="flex items-center justify-between gap-4">
              <div className="w-4 h-6 relative ">
                <Search />
              </div>
            </div>
            <input
              value={searchTerm}
              onChange={handleInputChange}
              type="text"
              placeholder="Search"
              className="w-full text-sm font-normal leading-snug outline-none placeholder-opacity-50"
            />
          </div>
          <div className="">
            <div className=" flex items-center justify-between text-[14px] leading-[22px] ">
              <DrawerTrigger asChild>
                <Button type="submit" className="font-semibold w-36 h-12 gap-2">
                  <Image
                    src="/Fill - Add - Plus.svg"
                    alt="x"
                    width={16}
                    height={16}
                  ></Image>
                  Add content
                </Button>
              </DrawerTrigger>
            </div>
          </div>
          <DrawerContent className="pl-2 ">
            <div className="max-w-lg">
              <DrawerHeader>
                <div className="flex items-center justify-between text-[20px] leading-[30px]  gap-[10px]">
                  <span className=" text-custom-gray font-semibold text-right">
                    New Knowledge Base
                  </span>
                  <DrawerClose asChild>
                    <Image
                      src="/x 1.svg"
                      alt="x"
                      width={24}
                      height={24}
                      className="transition duration-500 ease-in-out hover:opacity-100 hover:scale-125"
                    ></Image>
                  </DrawerClose>
                </div>
              </DrawerHeader>
              <ComponentCreateKnowledgeBase id={id} />
            </div>
          </DrawerContent>
        </div>
        <div className="h-5"></div>
        <div className="pt-0 h-[500px] lg:rounded-3xl lg:py-7 overflow-y-auto custom-scroll ">
          <Table className="">
            <TableCaption></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Created at</TableHead>
                <TableHead>Latest updated</TableHead>
                <TableHead>File size</TableHead>
                <TableHead className="text-center">Character count</TableHead>
                <TableHead className="text-center">Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredKnowledgeBase?.map((knowledgeBaseItem) => (
                <TableRow key={knowledgeBaseItem.chatbot_id}>
                  <TableCell className="font-medium">
                    {knowledgeBaseItem.title}
                  </TableCell>
                  <TableCell className="font-medium">
                    {knowledgeBaseItem.content_type}
                  </TableCell>
                  <TableCell>
                    {new Date(knowledgeBaseItem.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(knowledgeBaseItem.updated_at).toLocaleString()}
                  </TableCell>
                  <TableCell>{knowledgeBaseItem.file_size} KB</TableCell>
                  <TableCell className="text-center">
                    {knowledgeBaseItem.character_count || 0}
                  </TableCell>
                  <TableCell className="flex justify-center">
                    <Button
                      variant="edit"
                      onClick={() => handleDelete(id, knowledgeBaseItem.id)}
                    >
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow></TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </Drawer>
  );
};

export default KnowledgeBase;
