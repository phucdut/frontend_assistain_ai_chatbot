// import { currentRole } from "@/lib/auth";
// import { UserRole } from "@prisma/client";
// import { NextResponse } from "next/server";

// export async function GET() {
//   const role = await currentRole();

//   if (role === UserRole.ADMIN) {
//     return new NextResponse(null, { status: 200 });
//   }

//   return new NextResponse(null, { status: 403 });
// }

import { cookies } from "next/headers";

export async function POST(request: Request) {
  const res = await request.json();
  const conversation_id = res.conversation_id as string;
  const expiresAt = res.expiresAt as string;
  // console.log(sessionToken);
  if (!conversation_id) {
    return Response.json(
      { message: "Cannot receive conversation id!" },
      {
        status: 400,
      }
    );
  }
  const expiresDate = new Date(expiresAt).toUTCString();
  return Response.json(res, {
    status: 200,
    headers: {
      "Set-Cookie": `conversation_id=${conversation_id}; Path=/; HttpOnly; Expires=${expiresDate}; SameSite=Lax; Secure`,
    },
  });
}