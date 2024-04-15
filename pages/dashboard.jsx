import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import Header from "../components/header";
import useLogout from "../hooks/useLogout";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    const props = {};
    if (user) {
      props.user = req.session.user;
      props.isLoggedIn = true;
    } else {
      props.isLoggedIn = false;
    }
    return { props };
  },
  sessionOptions
);

export default function Dashboard(props) {
  const router = useRouter();
  const logout = useLogout();
  return (
    <div className={styles.dashboardHero}>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header isLoggedIn={props.isLoggedIn} username={props.user.username} />

      <main className={styles.main}>
        <div >
          <div class="jumbotron">
            <p className={styles.text}>
              Hi, it's Ditto, your personal wedding assistant! <br/>
              Let's make a plan and start jotting down the vision. <br/>
              Start putting down whatever you have in mind if budget wasn't a thing. <br/>
              Then, make the changes as you go through the timeline. <br/>
              Good luck using half of your brain on wedding planning from now until your wedding day!
              
            </p>
              <img className={styles.ditto} src="./ditto.png" alt="pokemon ditto icon"/>
              <p className={styles.description}>
              Status:{" "}
              <code className={styles.code}>
                {!props.isLoggedIn && " Not"} Logged In
              </code>
          </p>
            <div className={styles.grid}>
              <Link href="/notes" class="btn btn-warning btn-lg">
                <h2> Start planning! &rarr;</h2>
              </Link>

              <Link href="/weddingplan" class="btn btn-info btn-lg">
                <h2>Current plan &rarr;</h2>
              </Link>

              <div
                onClick={logout}
                style={{ cursor: "pointer" }}
                class="btn btn-danger btn-lg"
              >
                <h2>Logout &rarr;</h2>
              </div>
            </div>
            </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
