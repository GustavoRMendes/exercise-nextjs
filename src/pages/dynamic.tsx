import { NextPage,  GetServerSideProps } from "next";
import { useEffect, useState, type ReactNode } from "react";
import { Col, Container, Row } from "reactstrap";
type ApiResponse = {
  name: string;
  timestamp: Date;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const serverSideData: ApiResponse = await fetch(
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
