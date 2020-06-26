import { NextPage, GetServerSideProps } from "next";
import Layout from "next";
import Link from "next/link";

type Props = {
  channels: any;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetch(`https://api.audioboom.com/channels/recommended`);
  const { body: channels } = await data.json();
  return { props: { channels } };
};

const Index: NextPage<Props> = ({ channels }) => (
  <>
    <header>Podcasts</header>
    <section className="channels">
      {channels.map((channel: any) => (
        <Link href={`/channel?id=${channel.id}`} key={channel.id}>
          <div className="channel">
            <img src={channel.urls.logo_image.original} alt="" />
            <h2>{channel.title}</h2>
          </div>
        </Link>
      ))}
    </section>

    <style jsx>
      {`
        :global(body) {
          margin: 0;
          font-family: system-ui;
          text-align: center;
        }
        header {
          color: #fff;
          background: #8756ca;
          padding: 15px;
        }
        .channels {
          display: grid;
          grid-gap: 15px;
          padding: 15px;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        }
        .channel {
          display: block;
          border-radius: 3px;
          box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
          margin-bottom: 0.5em;
        }
        .channel img {
          width: 100%;
        }
        h2 {
          padding: 5px;
          font-size: 0.9em;
          font-weight: 600;
          margin: 0;
          text-align: center;
        }
      `}
    </style>
  </>
);

export default Index;
