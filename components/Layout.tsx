import Link from "next/link";
import Head from "next/head";

type Props = {
  title: string;
};

export const Layout: React.FC<Props> = ({ title, children }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <header>
      <Link href="/">
        <a>Podcasts</a>
      </Link>
    </header>
    {children}
    <style jsx>
      {`
        :global(body) {
          margin: 0;
          font-family: system-ui;
        }
        header {
          color: #fff;
          background: #8756ca;
          padding: 15px;
          text-align: center;
        }
        header a {
          color: #fff;
          text-decoration: none;
        }
      `}
    </style>
  </>
);
