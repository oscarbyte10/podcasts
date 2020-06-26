import { NextPage, GetServerSideProps } from "next";
import Link from "next/link";
import { Layout } from "../components/Layout";

type Props = {
  channel: any;
  audioClips: any;
  series: any;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const channelId = query.id;

  const [reqChannel, reqAudioClip, reqSeries] = await Promise.all([
    fetch(`https://api.audioboom.com/channels/${channelId}`),
    fetch(`https://api.audioboom.com/channels/${channelId}/audio_clips`),
    fetch(`https://api.audioboom.com/channels/${channelId}/child_channels`),
  ]);

  const [
    {
      body: { channel },
    },
    dataAudioClips,
    dataSeries,
  ] = await Promise.all([
    reqChannel.json(),
    reqAudioClip.json(),
    reqSeries.json(),
  ]);

  const audioClips = dataAudioClips.body.audio_clips;

  const series = dataSeries.body.channels;

  return { props: { channel, audioClips, series } };
};

const Channel: NextPage<Props> = ({ channel, audioClips, series }) => {
  return (
    <>
      <Layout title={channel.title}>
        <h1>{channel.title}</h1>

        {series.length > 0 && (
          <div>
            <h2>Series</h2>
            <div className="channels">
              {series.map((serie: any) => (
                <Link href={`/channel?id=${serie.id}`} prefetch>
                  <a className="channel">
                    <img src={serie.urls.logo_image.original} alt="" />
                    <h2>{serie.title}</h2>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        )}

        <h2>Last Podcasts</h2>

        {audioClips.map((clip: any) => (
          <Link href={`/podcast?id=${clip.id}`} key={clip.id}>
            <a className="podcast">
              <h3>{clip.title}</h3>
              <div className="meta">
                {Math.ceil(clip.duration / 60)} minutes
              </div>
            </a>
          </Link>
        ))}
      </Layout>

      <style jsx>{`
        header {
          color: #fff;
          background: #8756ca;
          padding: 15px;
          text-align: center;
        }

        .banner {
          width: 100%;
          padding-bottom: 25%;
          background-position: 50% 50%;
          background-size: cover;
          background-color: #aaa;
        }

        .channels {
          display: grid;
          grid-gap: 15px;
          padding: 15px;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        }
        a.channel {
          display: block;
          margin-bottom: 0.5em;
          color: #333;
          text-decoration: none;
        }
        .channel img {
          border-radius: 3px;
          box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
          width: 100%;
        }
        h1 {
          font-weight: 600;
          padding: 15px;
        }
        h2 {
          padding: 5px;
          font-size: 0.9em;
          font-weight: 600;
          margin: 0;
          text-align: center;
        }

        .podcast {
          display: block;
          text-decoration: none;
          color: #333;
          padding: 15px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          cursor: pointer;
        }
        .podcast:hover {
          color: #000;
        }
        .podcast h3 {
          margin: 0;
        }
        .podcast .meta {
          color: #666;
          margin-top: 0.5em;
          font-size: 0.8em;
        }
      `}</style>

      <style jsx global>{`
        body {
          margin: 0;
          font-family: system-ui;
          background: white;
        }
      `}</style>
    </>
  );
};

export default Channel;
