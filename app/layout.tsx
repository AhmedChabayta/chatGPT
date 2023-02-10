import { Roboto } from "@next/font/google";
import {
  ClientProvider,
  Login,
  SessionProvider,
  Sidebar,
} from "@ui/components";
import { Children } from "@ui/Types/General";
import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});
const RootLayout = async ({ children }: { children: Children }) => {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <head />
      <body className={`${roboto.className} text-gray-200`}>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              <Sidebar />
              <ClientProvider />
              <main className="relative h-screen flex-1 overflow-y-scroll bg-gray-900">
                {children}
              </main>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
};
export default RootLayout;
