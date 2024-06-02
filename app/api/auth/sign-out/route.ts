import authApiRequest from "@/app/apiRequests/auth";
import { HttpError } from "@/lib/http";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const res = await request.json();
  const force = res.force as boolean | undefined;
  if (force) {
    return Response.json(
      {
        message: "Logged out successfully!",
      },
      {
        status: 200,
        headers: {
          // Xóa cookie sessionToken
          "Set-Cookie": `sessionToken=; Path=/; HttpOnly; Max-Age=0`,
        },
      }
    );
  }
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  if (!sessionToken) {
    return Response.json(
      { message: "Unable to receive session token!" },
      {
        status: 401,
      }
    );
  }
  try {
    const result = await authApiRequest.logoutFromNextServerToServer();
    return Response.json(result.payload, {
      status: 200,
      headers: {
        // Xóa cookie sessionToken
        "Set-Cookie": `sessionToken=; Path=/; HttpOnly; Max-Age=0`,
      },
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      return Response.json(
        {
          message: "Undefined error!",
        },
        {
          status: 500,
        }
      );
    }
  }
}
