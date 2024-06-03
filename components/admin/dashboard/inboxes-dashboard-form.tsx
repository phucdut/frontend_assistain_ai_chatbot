"use client";
import React from "react";
import Image from "next/image";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

type Props = {};

const data = [
  { date: "13/06", data1: 10, data2: 5 },
  { date: "15/06", data1: 10, data2: 5 },
  { date: "19/06", data1: 12, data2: 9 },
  { date: "23/06", data1: 12, data2: 10 },
  { date: "26/06", data1: 18, data2: 6 },
  { date: "29/06", data1: 18, data2: 10 },
  { date: "02/07", data1: 15, data2: 9 },
  { date: "13/07", data1: 20, data2: 7 },
];

const DatapointDashboardForm = ({}: Props) => {
  return (
    <div className="w-full h-full shadow rounded-xl relative">
      <div className="text-zinc-900 text-base font-semibold leading-normal py-5 pl-5">
        Inboxes
      </div>
      <div className="absolute right-6 top-6">
        <Image
          src="/icons/OL - Fullscreen.svg"
          alt="x"
          width={14.5}
          height={14.5}
          className=" transition duration-500 ease-in-out hover:opacity-100 hover:scale-125"
        />
      </div>
      <div>
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={data}>
            <CartesianGrid vertical={false} />
            {/* <ReferenceLine y={7} stroke="#cccccc" strokeDasharray="3 3" /> */}
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              stroke="#888888"
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              stroke="#888888"
              fontSize={12}
            />
            <Tooltip formatter={(value) => `${value}`} />
            {/* <Legend /> */}
            <Line
              type="linear"
              dataKey="data1"
              stroke="#09C068"
              strokeWidth={1.5}
              dot={{ r: 4, fill: "#FFF" }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="linear"
              dataKey="data2"
              stroke="#930CFD"
              strokeWidth={1.5}
              dot={{ r: 4, fill: "#FFF" }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DatapointDashboardForm;
