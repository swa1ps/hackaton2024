import { Card, Col, Row, Skeleton, Typography } from "antd";
import { useEffect, useState } from "react";
import { API } from "./const";
import { createStyles } from "antd-style";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

const useStyles = createStyles(({ token, css }) => ({
  video: {
    width: "100%",
  },
  card: {
    marginBottom: 16,
    minHeight: 303,
  },
}));
const List = () => {
  const { styles, cx } = useStyles();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/videos`)
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setList(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <>
        <Skeleton.Input block style={{ marginBottom: 20 }} />
        <Row gutter={16}>
          <Col sm={8} md={12}>
            <Skeleton />
          </Col>
          <Col sm={8} md={12}>
            <Skeleton />
          </Col>
          <Col sm={8} md={12}>
            <Skeleton />
          </Col>
          <Col sm={8} md={12}>
            <Skeleton />
          </Col>
        </Row>
      </>
    );
  }
  return (
    <>
      <Title level={1}>Список видеоконференций</Title>
      <Row gutter={16}>
        {list.map((item) => {
          const date = dayjs(item.start_at).format("DD.MM.YY HH:mm");
          return (
            <Col sm={8} md={12}>
              <Link to={`/videos/${item.id}`}>
                <Card size="small" className={styles.card} hoverable>
                  <video src={item.filepath} className={styles.video}></video>
                  <Title level={5}>{item.title}</Title>
                  <Paragraph type="secondary">{date}</Paragraph>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default List;
