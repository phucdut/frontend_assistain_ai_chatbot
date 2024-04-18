import { cookies } from "next/headers";

export async function POST(request: Request) {
  const res = await request.json();
  const sessionToken = res.payload?.access_token;
  if (!sessionToken) {
    return Response.json(
      { message: "không nhận đc token" },
      {
        status: 400,
      }
    );
  }
  return Response.json(
    res.payload,
    {
      status: 200,
      headers: { "Set-Cookie": `sessionToken=${sessionToken}; Path=/` },
    }
  );
}
