"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import React, { useState, useTransition, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import {
  KnowledgeBaseSchema,
  KnowledgeBaseBodyType,
} from "@/schemas/create-knowledge-base.schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Image from "next/image";
import "@/app/globals.css";

import { Input } from "@/components/ui/input";

import BuildButton from "@/components/ui/build-button";
import { Separator } from "@/components/ui/separator";
import LgButton from "@/components/ui/lg-button";
import { Button } from "@/components/ui/button";

import { FaFilePdf, FaFileWord, FaFileExcel } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import Dropzone from "./dropzone";
import LoadFile from "./load-file";
import knowledgeBaseApiRequest from "@/app/apiRequests/knowledge-base";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { handleErrorApi } from "@/lib/utils";

type ComponentCreateKnowledgeBaseProps = {
  id: string;
};

const ComponentCreateKnowledgeBaseCopy: React.FC<ComponentCreateKnowledgeBaseProps> = ({ id }) => {
  const [isPending, startTransition] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<KnowledgeBaseBodyType>();

  const form = useForm<KnowledgeBaseBodyType>({
    resolver: zodResolver(KnowledgeBaseSchema),
    defaultValues: {
      // nameKnowledgeBase: "",
      // uploadURL: "",
      uploadFiles: "",
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      form.setValue("uploadFiles", acceptedFiles[0]); // update the 'uploadFiles' field in the form
    },
    [form]
  );

  async function onSubmit(values: KnowledgeBaseBodyType) {
    if (loading) return;
    setLoading(true);

    if (files.length === 0) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", files[0]); // Add the file to FormData

    startTransition(true);


    try {
      const result = await knowledgeBaseApiRequest.createKnowledgeBase(formData, id);
      toast({
        title: "Success",
        description: "Knowledge base added successfully!",
      });
      router.push(`/chatbots/${id}`);
      router.refresh();
      console.log("result:", result);
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="">
        <Separator className=" bg-[#303034]" />
        {/* <p>Chatbot ID: {id}</p> */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 space-x-6"
          >
            {/* <div className="px-3"> */}
            <div className="pt-3 ">
              {/* <FormField
                  control={form.control}
                  // name="nameKnowledgeBase"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[14px] leading-[24px] text-custom-gray font-semibold">
                        Name your knowledge base
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Knowledge base name"
                          {...field}
                          disabled={isPending}
                          className="w-[400px] h-11 pl-[20px] text-[14px] font-normal leading-[20px]"
                        />
                      </FormControl>
                      <FormDescription>
                        {/* This is your public display email. */}
              {/* </FormDescription>
                      <FormMessage className="text-red-500 text-[14px] font-normal leading-[26px]" />
                    </FormItem>
                  )}
                />
              </div> */}
              {/* <div className="flex items-center justify-between pt-3">
                <FormField
                  control={form.control}
                  // name="uploadURL"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[14px] leading-[24px] text-custom-gray font-semibold">
                        Upload URL or Video
                      </FormLabel>
                      <FormControl>
                        <div className="relative flex items-center justify-between">
                          <div className="relative">
                            <Input
                              placeholder="Add your URL"
                              {...field}
                              disabled={isPending}
                              className="w-[340px] h-11 pl-[50px] text-[14px] font-normal leading-[20px] relative"
                            />
                            <Image
                              src="/Outline - Link.svg"
                              alt="Outline - Link"
                              width={20}
                              height={20}
                              className="absolute inset-x-4 inset-y-2.5"
                            />
                          </div>
                          <div className="absolute flex items-center justify-between text-[14px] leading-[22px] inset-x-[360px]  inset-y-2.5">
                            <Button
                              type="button"
                              className="text-[#161616]  font-semibold w-[44px] h-[44px]"
                              variant="outline"
                            >
                              1
                            </Button>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        {/* This is your public display email. */}
              {/* </FormDescription>
                      <FormMessage className="text-red-500 text-[14px] font-normal leading-[26px]" />
                    </FormItem>
                  )}
                />
              </div>  */}
              <div className=" flex items-center justify-between pt-3 text-[14px] leading-[22px] ">
                <LgButton
                  type="button"
                  className="text-[#161616]  font-semibold w-[400px] h-[50px]"
                >
                  Add another link
                </LgButton>
              </div>
              <div className="pt-3">
                <FormLabel className="text-[14px] leading-6  text-custom-gray font-semibold">
                  Bulk upload
                </FormLabel>
                <div className=" flex items-center justify-between pt-2 text-[14px] leading-[22px] ">
                  <LgButton
                    type="button"
                    className="text-[#161616]  font-semibold w-[400px] h-[50px]"
                  >
                    Select text file
                  </LgButton>
                </div>
              </div>
              <div className="text-[14px] leading-6 pt-2 text-custom-gray-5 font-normal">
                <FormLabel>Enter each URL on a new line</FormLabel>
              </div>
              <div className="pt-3 ">
                <FormField
                  control={form.control}
                  name="uploadFiles"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        {/* <div className="relative flex items-center justify-between">
                          <Input
                            placeholder="Drag and drop files here"
                            {...field}
                            disabled={isPending}
                            className="inputUpload w-[400px] h-[92px] pl-[20px] text-[14px] font-normal leading-[20px]"
                          />
                          <div className="absolute flex items-center justify-between text-[14px] leading-[22px] inset-x-[290px]  inset-y-2.5">
                            <Button
                              className="text-[#161616]  font-semibold w-[170px] h-[44px]"
                              variant="outline"
                            >
                              <Image
                                src="/Group (2).svg"
                                alt="x"
                                width={14}
                                height={14}
                                className="mr-2"
                              />
                              Upload
                            </Button>
                          </div>
                        </div> */}
                        <Dropzone onFileDrop={onDrop} />
                      </FormControl>
                      <FormDescription>
                        {/* This is your public display email. */}
                      </FormDescription>
                      <FormMessage className="text-red-500 text-[14px] font-normal leading-[26px]" />
                    </FormItem>
                  )}
                />
              </div>
              <div>{/* <LoadFile /> */}</div>
              <div className=" flex items-center justify-between py-16 text-[14px] leading-6 ">
                <BuildButton
                  type="submit"
                  className="btn-container font-semibold w-[400px] h-[50px]"
                >
                  <Image
                    src="/Fill - Add - Plus.svg"
                    alt="x"
                    width={16}
                    height={16}
                  ></Image>
                  Create
                </BuildButton>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ComponentCreateKnowledgeBaseCopy;
