import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { modalState } from "../atoms/modalAtom";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import styles from "../styles/Home.module.css";
import brand from "../images/Mygram.png";
import DummySidebar from "../components/DummySidebar";
import BottomNav from "../components/BottomNav";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className={styles.container}>
      <Head>
        <title>Mygram</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* HEADER WHEN THE USER IS NOT LOGGED IN */}
      {!session && (
        <div className="hidden items-center justify-center mt-5 md:flex">
          <Image src={brand} width={200} alt="brand-pic" />
        </div>
      )}
      {/* HEADER SECTION FOR MOBILE VIEW */}
      <div className="md:hidden block">
        <Header />
      </div>
      <div className="flex items-start">
        {session ? (
          <div className="hidden md:block">
            {" "}
            <Sidebar />
          </div>
        ) : (
          <div className="hidden md:block">
            {" "}
            <DummySidebar />
          </div>
        )}
        {/* FEED */}
        <div className="flex items-center justify-center">
          <Feed />
        </div>{" "}
      </div>
      {/* MODAL SECTION */}
      <Modal />
      <div>
        <a
          target="_blank"
          href="https://www.amazon.in/ASUS-Battery-i5-13450HX-Windows-G614JJ-N3086WS/dp/B0CJ35G6B3/ref=sr_1_1_sspa?keywords=gaming+laptop&amp;sr=8-1-spons&amp;sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&amp;psc=1&_encoding=UTF8&tag=amzanshassoci-21&linkCode=ur2&linkId=396f7bf1a42c931aa8fa5834e72ea4a1&camp=3638&creative=24630"
        >
          Get This Amazing Deal
        </a>
      </div>
      <BottomNav />
    </div>
  );
}
