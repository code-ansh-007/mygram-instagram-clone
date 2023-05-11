import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  // ! wrapping the entire web app to access the login or signup state of the user throughout the application
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        {/* surrounding the entire app with recoil so as to make the state variables and reducer functions are available all round the application*/}
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
