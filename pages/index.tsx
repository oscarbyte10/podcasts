import { NextPage, GetServerSideProps } from "next";
import { ChannelGrid } from "../components/ChannelGrid";
import { Layout } from "../components/Layout";

type Props = {
  channels: any;
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const data = await fetch(`https://api.audioboom.com/channels/recommended`);
    const { body: channels } = await data.json();
    return { props: { channels } };
  } catch (e) {
    return { props: { channels: null } };
  }
};

const Index: NextPage<Props> = ({ channels }) => (
  <>
    {}
    <Layout title="Podcasts">
      <ChannelGrid channels={channels} />
    </Layout>
  </>
);

export default Index;
