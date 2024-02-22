import { NextPage, type GetServerSideProps } from "next";
import { useEffect, useState, type ReactNode } from "react";
import { Col, Container, Row } from "reactstrap";

interface ApiResponse {
  name: string;
  timestamp: Date;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const serverSideData = await fetch(
    `${process.env.NEXT_PUBLIC_APIURL}/api/hello`
  ).then((res) => res.json());
  return {
    props: {
      serverSideData,
    },
  };
};

const Dynamic: NextPage = (props: {
  children?: ReactNode;
  serverSideData?: ApiResponse;
}) => {
  const [clientSideData, setClientSideData] = useState<ApiResponse>();

  const fetchData = async () => {
    const data = await fetch("api/hello").then((res) => res.json());
    setClientSideData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Container tag="main">
        <h1 className="my-5">Como funcionam as renderizações do Next.js</h1>
        <Row>
          <Col>
            <h3>Gerado no servidor:</h3>
            {props.serverSideData?.timestamp.toString()}
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

export default Dynamic;
