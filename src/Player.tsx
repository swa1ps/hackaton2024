import dashjs from "dashjs";
import { FC, useEffect, useRef } from "react";
import { createStyles } from "antd-style";

interface IPlayerProps {
  url: string;
  onTimeUpdate: (time: number) => void;
  onInit: (player: dashjs.MediaPlayerClass) => void;
}
const useStyles = createStyles(({ token, css }) => ({
  video: {
    width: "100%",
  },
}));
const Player: FC<IPlayerProps> = ({ url, onInit, onTimeUpdate }) => {
  const { styles, cx } = useStyles();
  const videoRef = useRef(null);
  const playerRef = useRef(dashjs.MediaPlayer().create());

  useEffect(() => {
    playerRef.current.initialize(videoRef.current!, url, true);
    playerRef.current.on("streamInitialized", () => {
        onInit(playerRef.current);
    //   playerRef.current.seek(45);
    });
    playerRef.current.on("playbackTimeUpdated", () => {
      const currentTime = playerRef.current.time();
      onTimeUpdate(currentTime);
    });
  }, []);
  const play = () => {
    playerRef.current.play();
  };
  const pause = () => {
    playerRef.current.pause();
  };

  return (
    <video
      autoPlay
      id="videoPlayer"
      controls
    //   width="640"
    //   height="360"
      ref={videoRef}
      className={styles.video}
    ></video>
  );
};
{
  /* <button onClick={play}>play</button>
        <button onClick={pause}>pause</button> */
}
{
  /* <div>
            {
                markers.map(m => (
                    <button onClick={() => {
                        playerRef.current.seek(m);
                        play();
                    }}>{m}</button>
                ))
            }
        </div> */
}
export default Player;
