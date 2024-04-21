"use client";
// import { clientSessionToken } from '@/lib/http'
// import { AccountResType } from '@/schemas/account.schema'
import { createContext, useContext, useState } from "react";

// type User = AccountResType['data']

// const AppContext = createContext<{
//   user: User | null
//   setUser: (user: User | null) => void
// }>({
//   user: null,
//   setUser: () => {}
// })
const AppContext = createContext({
  sessionToken: "",
  setSessionToken: (sessionToken: string) => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
export default function AppProvider({
  children,
  inititalSessionToken = "",
}: // user: userProp
{
  children: React.ReactNode;
  inititalSessionToken?: string;
  // user: User | null
}) {
  // const [user, setUser] = useState<User | null>(userProp)
  // useState(() => {
  //   if (typeof window !== 'undefined') {
  //     clientSessionToken.value = inititalSessionToken
  //   }
  // })
  const [sessionToken, setSessionToken] = useState(inititalSessionToken);
  return (
    <AppContext.Provider
      value={{
        sessionToken,
        setSessionToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
