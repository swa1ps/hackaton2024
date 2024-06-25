import {
  Affix,
  Button,
  Card,
  Col,
  Row,
  Skeleton,
  Typography,
  Flex,
  Popover,
} from "antd";
import Player from "./Player";
import Dialog from "./Dialog";
import { useEffect, useState } from "react";
import { API } from "./const";
import { Link, useParams } from "react-router-dom";
import { DownloadOutlined, ShareAltOutlined } from "@ant-design/icons";
const { Title, Paragraph, Text } = Typography;

const mock = {
  //   url: "http://127.0.0.1:9999/videos/video2/output.mpd",
  url: "https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd",
  uid: "9e87a515-f6c2-4850-9c2f-6b10960de865",
  text: " Мы сегодня с вами, Роман, беседуем по нашей вакансии Java разработчикам, удаленный формат работы, все верно? Да, все верно. Хорошо. Буквально немного по структуре пройдусь, больше с вами, с вашим опытом познакомлюсь, и в дальнейшем уже перейду к рассказу о компании вакансии и об условиях. Если у вас, конечно же, останутся ко мне какие-то вопросы, то обязательно задавайте. По времени сориентирую минут на 15-20. Хорошо? Да. Здорово. Поделитесь, пожалуйста, почему вы сейчас находитесь в поиске работы, рассматриваете для себя, Роман, другие предложения. Искать я из резюме на хабре по-настоящему время трудоустроено? Да, все верно. Я на данный момент работаю в компании INITI-PB.IT, Наушним Женером Центра. Я являюсь ведущим разработчиком на Initi-PB.IT.",
  topics: [
    {
      title: "Вступление",
      segments: [
        {
          start: 0,
          end: 6,
          text: " Мы сегодня с вами, Роман, беседуем по нашей вакансии Java разработчикам, удаленный формат работы, все верно?",
        },
        {
          start: 6,
          end: 8,
          text: " Да, все верно.",
        },
        {
          start: 8,
          end: 12,
          text: " Хорошо. Буквально немного по структуре пройдусь, больше с вами, с вашим опытом познакомлюсь,",
        },
        {
          start: 12,
          end: 16,
          text: " и в дальнейшем уже перейду к рассказу о компании вакансии и об условиях.",
        },
      ],
    },
    {
      title: "Формат встречи",
      segments: [
        {
          start: 16,
          end: 20,
          text: " Если у вас, конечно же, останутся ко мне какие-то вопросы, то обязательно задавайте.",
        },
        {
          start: 20,
          end: 23,
          text: " По времени сориентирую минут на 15-20. Хорошо?",
        },
        {
          start: 23,
          end: 24,
          text: " Да.",
        },
      ],
    },
    {
      title: "Ответы на вопросы",
      segments: [
        {
          start: 24,
          end: 25,
          text: " Здорово.",
        },
        {
          start: 25,
          end: 29,
          text: " Поделитесь, пожалуйста, почему вы сейчас находитесь в поиске работы,",
        },
        {
          start: 29,
          end: 31,
          text: " рассматриваете для себя, Роман, другие предложения.",
        },
        {
          start: 31,
          end: 35,
          text: " Искать я из резюме на хабре по-настоящему время трудоустроено?",
        },
      ],
    },
    {
      title: "Заключение",
      segments: [
        {
          start: 35,
          end: 42,
          text: " Да, все верно. Я на данный момент работаю в компании INITI-PB.IT, Наушним Женером Центра.",
        },
        {
          start: 42,
          end: 45,
          text: " Я являюсь ведущим разработчиком на Initi-PB.IT.",
        },
      ],
    },
  ],
};
const DetailPage = () => {
  const [pageData, setPageData] = useState<any>(mock);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const [currentTime, setCurrentTime] = useState(0);
  const [playerRef, setPlayerRef] = useState<dashjs.MediaPlayerClass | null>(
    null
  );
  useEffect(() => {
    try {
      fetch(`${API}/videos/${id}`)
        .then((data) => data.json())
        .then((data) => {
          setPageData(data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (e) {}
  }, []);
  const onInitPlayer = (player: dashjs.MediaPlayerClass) => {
    setPlayerRef(player);
  };

  if (loading) {
    return (
      <>
        <Skeleton.Input block style={{ marginBottom: 20 }} />
        <Row gutter={16}>
          <Col md={12}>
            <Skeleton />
          </Col>
          <Col md={12}>
            <Skeleton />
          </Col>
        </Row>
      </>
    );
  }

  return (
    <>
      <Title level={1}>{pageData.title}</Title>
      <Row gutter={16}>
        <Col md={12}>
          <Affix offsetTop={16}>
            <Card size="small" style={{ marginBottom: 8 }}>
              <Player
                url={pageData.filepath_mpd}
                // url={"https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd"}
                onInit={onInitPlayer}
                onTimeUpdate={setCurrentTime}
              />
            </Card>
            <Card size="small" style={{ marginBottom: 8 }}>
              <Flex justify="space-between">
                <Link to="/">
                  <Button>Назад</Button>
                </Link>
                <Flex gap={8}>
                  <a target="_blank" href={pageData.filepath}>
                    <Button type="primary" icon={<DownloadOutlined />} />
                  </a>
                  <Popover
                    content={
                      <Paragraph
                        copyable={{
                          text: window.location.href,
                          tooltips: ["Скопировать", "Скопированно!"],
                        }}
                      >
                        Поделиться ссылкой
                      </Paragraph>
                    }
                  >
                    <Button type="primary" icon={<ShareAltOutlined />} />
                  </Popover>
                </Flex>
              </Flex>
            </Card>
            <Card size="small">
              <Title level={4}>Краткое содержание</Title>
              <Paragraph>{pageData.summary_text}</Paragraph>
            </Card>
          </Affix>
        </Col>
        <Col md={12}>
          <Card size="small">
            <Title level={4}>Расшифровка встречи</Title>
            <Dialog
              topics={pageData.topics}
              currentTime={currentTime}
              playerRef={playerRef}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DetailPage;
