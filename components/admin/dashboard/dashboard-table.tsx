import React from "react";
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

const DashboardTableForm = () => {
  return (
    <div className="w-[1050px] h-[277px] bg-white rounded-xl border border-slate-300">
      <div className="w-full flex justify-start gap-14 py-5 pl-4">
        <div className="flex justify-start relative">
          <div className="text-zinc-900 text-[13px] font-normal leading-tight  w-14">
            Configs
          </div>
          <div className="text-zinc-900 text-2xl font-semibold leading-[34px] absolute left-14 top-[-8px]">
            3
          </div>
        </div>
        <div className="flex justify-start relative">
          <div className="text-zinc-900 text-[13px] font-normal leading-tight w-[78px]">
            Datapoints
          </div>
          <div className="text-zinc-900 text-2xl font-semibold leading-[34px] absolute left-[78px] top-[-8px]">
            1028
          </div>
        </div>
      </div>
      <div className="pt-0 w-full h-[500px] lg:pb-7 overflow-auto custom-scroll ">
        <TableDashboard className="border border-slate-300">
          <TableCaption></TableCaption>
          <TableHeader className="bg-gray-50 ">
            <TableRow>
              <TableHead className="text-zinc-900 text-[13px] font-semibold leading-tight">
                Name
              </TableHead>
              <TableHead className="text-zinc-900 text-[13px] font-semibold leading-tight">
                Model
              </TableHead>
              <TableHead className="text-zinc-900 text-[13px] font-semibold leading-tight">
                Datapoints
              </TableHead>
              <TableHead className="text-zinc-900 text-[13px] font-semibold leading-tight">
                Latest updated
              </TableHead>
              <TableHead className="text-zinc-900 text-[13px] font-semibold leading-tight">
                File size
              </TableHead>
              <TableHead className="text-center text-zinc-900 text-[13px] font-semibold leading-tight">
                Valid JSON
              </TableHead>
              <TableHead className="text-center text-zinc-900 text-[13px] font-semibold leading-tight">
                Date create
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableCell className="flex justify-start items-center gap-3">
              <input
                type="checkbox"
                className="w-6 h-6 left-0 top-0 bg-white rounded-md border border-slate-300"
              ></input>
              <div className="text-zinc-900 text-[13px] font-normal leading-tight">
                Lorem ipsum dosit amet
              </div>
            </TableCell>
            <TableCell>
              <div className="text-zinc-900 text-[13px] font-normal leading-tight">
                gpt-4
              </div>
            </TableCell>
            {/* {knowledgeBase?.map((knowledgeBaseItem) => (
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
                <TableCell>{knowledgeBaseItem.file_size}</TableCell>
                <TableCell className="text-center">
                  {knowledgeBaseItem.character_count}
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
            ))} */}
          </TableBody>
          <TableFooter>
            <TableRow></TableRow>
          </TableFooter>
        </TableDashboard>
      </div>
    </div>
  );
};

export default DashboardTableForm;
