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
    type: "Url",
    createdAt: "10/09/2023, 10:00",
    latestUpdated: "10/09/2023, 10:00",
    author: "David Michael",
    active: "Credit Card",
    status: "Draft",
    remark: "Text",
  },
];

const KnowledgeBase = () => {
  return (
    <div
      className={cn(
        "bg-custom-gray-4 h-[calc(100vh-180px)] w-[1130px]",
        "lg:rounded-3xl lg:p-7"
      )}
    >
      <CreateKnowledgeBase />
      <div className="pt-5">
        <Table>
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Latest  updated</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((name) => (
              <TableRow key={name.name}>
                 <TableCell className="font-medium">{name.name}</TableCell>
                <TableCell className="font-medium">{name.type}</TableCell>
                <TableCell>{name.createdAt}</TableCell>
                <TableCell>{name.latestUpdated}</TableCell>
                <TableCell>{name.author}</TableCell>
                <TableCell>{name.active}</TableCell>
                <TableCell>{name.status}</TableCell>
                <TableCell>{name.remark}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default KnowledgeBase;
