import { Button, Space, Typography } from "antd";
import * as dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { FC, useState } from "react";
import { createStyles } from "antd-style";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import Timeline from "./Timeline";
dayjs.extend(duration);

const { Title } = Typography;

const useStyles = createStyles(({ token, css }) => ({
  btn: css`
    padding: 0;
    color: #1677ff;
    &:hover {
      color: #1677ff;
      background: none;
    }
  `,
  title: css`
    padding: 0;
    &:hover {
      color: #1677ff !important;
      background: none !important;
    }
    &:hover h5 {
      color: #1677ff;
    }
    h5 {
      margin-bottom: 4px;
    }
  `,
  timeline: {
    transform: "translateX(calc(-50% + 55px))",
  },
}));

interface IDialogProps {
  topics: any[];
  currentTime: number;
  playerRef: dashjs.MediaPlayerClass | null;
}

const Dialog: FC<IDialogProps> = ({ topics, currentTime, playerRef }) => {
  const { styles, cx } = useStyles();
  const [data, setData] = useState(
    topics.map((t, i) => ({
      ...t,
      id: i,
      isCollapse: true,
    }))
  );

  const jump = (start: number) => {
    playerRef?.seek(start);
  };

  const toggleCollapse = (i: number) => {
    console.log(i);
    const newTopics = data.map((t) => {
      if (t.id === i) {
        return {
          ...t,
          isCollapse: !t.isCollapse,
        };
      } else {
        return t;
      }
    });
    setData(newTopics);
  };
  const items = data
    .map((t, i) => {
      return [
        {
          t: t,
          isTopic: true,
          color: currentTime < t.segments[0].start ? "gray" : "green",
          start: t.segments[0].start,
          end: t.segments[0].end,
          label: (
            <Button
              className={styles.btn}
              type="link"
              size="small"
              onClick={() => {
                jump(t.segments[0].start);
              }}
            >
              {dayjs.duration(t.segments[0].start * 1000).format("mm:ss")}
            </Button>
          ),
          children: (
            <Space align="start">
              <Button
                type="text"
                onClick={() => {
                  toggleCollapse(i);
                }}
                className={styles.title}
              >
                <Title level={5}>{t.title}</Title>
                {t.isCollapse ? <DownOutlined /> : <UpOutlined />}
              </Button>
            </Space>
          ),
        },
        ...(t.isCollapse
          ? []
          : t.segments.map((s: any) => ({
              s: s,
              color: currentTime < s.start ? "gray" : "green",
              start: s.start,
              end: s.end,
              label: (
                <Button
                  className={styles.btn}
                  type="link"
                  size="small"
                  onClick={() => {
                    jump(s.start);
                  }}
                >
                  {dayjs.duration(s.start * 1000).format("mm:ss")}
                </Button>
              ),
              children: <Space align="start">{s.text}</Space>,
            }))),
      ];
    })
    .flat();
  return (
    <div>
      <Timeline items={items} currentTime={currentTime} />
    </div>
  );
};

export default Dialog;
