import { NextPage, GetStaticProps } from "next";
import { useEffect, useState, type ReactNode } from "react";
import { Col, Container, Row } from "reactstrap";

type ApiResponse = {
  name: string;
  timestamp: Date;
};

export const getStaticProps: GetStaticProps = async () => {
  const staticData = await fetch(
    `${process.env.NEXT_PUBLIC_APIURL}/api/hello`
  ).then((res) => res.json());
  return {
    props: {
      staticData,
    },
    revalidate: 10,
  };
};

const Static: NextPage = (props: {
  children?: ReactNode;
  staticData?: ApiResponse;
}) => {
  const [clientSideData, setClientSideData] = useState<ApiResponse>();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch("api/hello").then((res) => res.json());
    setClientSideData(data);
  };

  return (
    <>
      <Container tag="main">
        <h1 className="my-5">Como funcionam as renderizações do Next.js</h1>
        <Row>
          <Col>
            <h3>Gerado estaticamente durante a build: </h3>
            {props.staticData?.timestamp.toString()}
          </Col>
          <Col>
            <h3>Gerado no cliente:</h3>
            {clientSideData?.timestamp.toString()}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Static;
