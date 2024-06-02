import http from "@/lib/http";
import {
  ForgotPasswordBodyType,
  ForgotPasswordResType,
  SignInBodyType,
  SignInResType,
  SignUpBodyType,
  SignUpResType,
  SlideSessionResType,
} from "@/schemas";
import { MessageResType } from "@/schemas/common.schema";

const authApiRequest = {
  signIn: (body: SignInBodyType) =>
    http.post<SignInResType>("/api/v1/auth/sign-in", body),
  signUp: (body: SignUpBodyType) =>
    http.post<SignUpResType>("/api/v1/auth/sign-up", body),
  auth: (body: { sessionToken: string }) =>
    http.post("/api/auth/[...nextauth]", body, {
      baseUrl: "",
    }),
  forgotPassword: (body: ForgotPasswordBodyType) =>
    http.post<ForgotPasswordResType>("/api/v1/auth/forgot-password", body),
  logoutFromNextServerToServer: () => http.get("/api/v1/auth/sign-out"),
  logoutFromNextClientToNextServer: (
    force?: boolean | undefined,
    signal?: AbortSignal | undefined
  ) =>
    http.post<MessageResType>(
      "/api/auth/sign-out",
      {
        force,
      },
      {
        baseUrl: "",
        signal,
      }
    ),
  //   slideSessionFromNextServerToServer: (sessionToken: string) =>
  //     http.post<SlideSessionResType>(
  //       '/auth/slide-session',
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${sessionToken}`
  //         }
  //       }
  //     ),
  //   slideSessionFromNextClientToNextServer: () =>
  //     http.post<SlideSessionResType>(
  //       '/api/auth/slide-session',
  //       {},
  //       { baseUrl: '' }
  //     )
  // }
};
export default authApiRequest;
