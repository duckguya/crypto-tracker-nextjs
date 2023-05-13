import { GetCoins } from "@/api";
import Coins from "@/components/Coins";
import axios from "axios";
import Head from "next/head";
import styled from "styled-components";

export default function Home({ datas }: any) {
  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        <BodyWrapper>
          <div />
          {/* <Select onChange={onChanged} onClick={() => refetch}>
              <option value="rank">랭크순</option>
              <option value="asc">오름차순</option>
              <option value="desc">내림차순</option>
            </Select> */}
        </BodyWrapper>

        <CoinWrapper>
          <Card>
            <Coins datas={datas[0].coin} type={"coin"} />
          </Card>
          <Card>
            <Coins datas={datas[0].token} type={"token"} />
          </Card>
        </CoinWrapper>
      </>
    </Container>
  );
}

export async function getServerSideProps() {
  try {
    const response = await GetCoins("rank");
    return {
      props: {
        datas: response,
      },
    };
  } catch (error) {
    // console.log("error: ", error);
    return error;
  }
}

const Container = styled.div`
  padding: 100px 20px 0 20px;
  width: 100vw;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
`;
const BodyWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 98%;
`;

const CoinWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100vw;
`;
const Select = styled.select`
  border: 1px solid #333740;
  border-radius: 5px;
  padding: 3px 10px;
  color: #333740;
`;
const Card = styled.div`
  width: 40%;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;
