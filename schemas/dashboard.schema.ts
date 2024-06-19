import z from "zod";

export const ConversationAndChatbotRes = z
  .object({
    visitor_cost: z.number(),
    rating_average: z.number(),
  })
  .strict();

export type ConversationAndChatbotResType = z.TypeOf<typeof ConversationAndChatbotRes>;

export const RvenueRes = z
  .object({
    revenue: z.number(),
  })
  .strict();

export type RvenueResType = z.TypeOf<typeof RvenueRes>;


export type InboxesAndLatencyListType = {
    time_point: number;
    inbox_cost: number;
    latency_average: number;
  }[];

export type VisitorAndRatingListType = {
    time_point: number;
    visitor_cost: number;
    rating_average: number;
  }[];