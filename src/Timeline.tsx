import { createStyles, keyframes } from "antd-style";
import cn from "classnames";
import { FC } from "react";

const grow = keyframes`
  0% {
    height: 0%;
  }

  100% {
   height: 100%;
  }
`;

const useStyles = createStyles(({ token, css }) => ({
  time: css``,
  content: css`
    padding-bottom: 16px;
  `,
  lineContainer: css`
    position: relative;
  `,
  grid: css`
    display: grid;
    grid-template-columns: 40px 30px auto;
  `,
  row: css`
    color: red;
    position: relative;
  `,
  line: css`
    width: 2px;
    background: #52c41a;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 18px;
    height: 0%;
    z-index: 1;
    transition: all linear 0.2s;
  `,
  linebg: css`
    width: 2px;
    background: #d9d9d9;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 18px;
    height: 100%;
  `,
  dot: css`
    width: 10px;
    height: 10px;
    background: #d9d9d9;
    border-radius: 50%;
    position: absolute;
    z-index: 2;
    left: 50%;
    transform: translateX(-50%);
    top: 8px;
    transition: background linear 0.2s;
  `,
  dotTopic: css`
    width: 14px;
    height: 14px;
    top: 8px;
    border: #fff 2px solid;
    box-shadow: #d9d9d9 0px 0px 0px 2px;
  `,
  dotTopicActive: css`
    border: #fff 2px solid;
    box-shadow: #52c41a 0px 0px 0px 2px;
  `,
}));

const inter = (start: number, end: number, x: number) =>
  1 - (end - x) / (end - start);

interface ITimelineProps {
  items: any[];
  currentTime: number;
}

const Timeline: FC<ITimelineProps> = ({ items = [], currentTime }) => {
  const { styles } = useStyles();
  return (
    <div className={styles.grid}>
      {items.map((item, i) => {
        let end = i + 1 >= items.length ? item.end : items[i + 1].start;
        const round = Math.round(inter(item.start, end, currentTime) * 100);
        const grZero = Math.max(round, 0);
        const progress = Math.min(grZero, 100);
        return (
          <>
            <div className={styles.time}>{item.label}</div>
            <div className={styles.lineContainer}>
              <div
                className={cn({
                  [styles.dot]: true,
                  [styles.dotTopic]: item.isTopic,
                  [styles.dotTopicActive]: item.isTopic && currentTime > item.start,
                })}
                style={{
                  background: currentTime > item.start ? "#52C41A" : "#d9d9d9",
                }}
              ></div>
              {i !== items.length - 1 && (
                <>
                  <div className={styles.linebg}></div>
                  <div
                    className={styles.line}
                    style={{
                      height: `${progress}%`,
                    }}
                  ></div>
                </>
              )}
            </div>
            <div className={styles.content}>{item.children}</div>
          </>
        );
      })}
    </div>
  );
};

export default Timeline;
