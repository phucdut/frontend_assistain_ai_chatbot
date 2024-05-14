"use client";

import BuildButton from "@/components/ui/build-button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

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
import CreateKnowledgeBase from "./create-knowledge-base";

const invoices = [
  {
    name: "Name 1",
    type: "Pdf",
    createdAt: "10/09/2023, 10:00",
    latestUpdated: "10/09/2023, 10:00",
    fileSize: "71.2 kB",
    characterCount: "2665",
  },
];

type KnowledgeBaseProps = {
  id: string;
};

const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ id }) => {
  React.useEffect(() => {
    if (id) {
      // Gọi API với id
      console.log("Chatbot ID:", id);
      // Your API call logic here
    }
  }, [id]);

  return (
    <div
      className={cn("bg-custom-gray-4 h-full w-full", "lg:rounded-3xl lg:p-7")}
    >
      <p>Chatbot ID: {id}</p>
      <CreateKnowledgeBase id={id}/>
      <div className="pt-5">
        <Table>
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Latest updated</TableHead>
              <TableHead>File size</TableHead>
              <TableHead className="text-center">Character count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((name) => (
              <TableRow key={name.name}>
                <TableCell className="font-medium">{name.name}</TableCell>
                <TableCell className="font-medium">{name.type}</TableCell>
                <TableCell>{name.createdAt}</TableCell>
                <TableCell>{name.latestUpdated}</TableCell>
                <TableCell>{name.fileSize}</TableCell>
                <TableCell className="text-center">
                  {name.characterCount}
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
  );
};

export default KnowledgeBase;
