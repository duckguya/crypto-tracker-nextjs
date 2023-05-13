import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { ICoinList, IInfoData, IPriceData } from "../interface";
import Coins from "./Coins";
import { useLocation } from "react-router-dom";
import Chart from "./Chart";
import { fetchCoinHistory } from "@/api";

// interface
interface ILocation {
  state: {
    name: string;
  };
}
interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
  error?: string;
}
interface IProps {
  info: IInfoData;
  tickers: IPriceData;
  coins: ICoinList[];
  type: string;
  coinId: string;
}

function Coin(datas: IProps) {
  const [info, setInfo] = useState<IInfoData>();
  const [tickers, setTickers] = useState<IPriceData>();
  const [coins, setCoins] = useState<ICoinList[]>();
  const [type, setType] = useState<string>();
  const [coinId, setCoinId] = useState<string>();

  const {
    isLoading: isLoadingChart,
    data: chartData,
    isError: IsErrorChart,
  } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId ? coinId : ""),
    { enabled: !!coinId }
  );

  useEffect(() => {
    setInfo(datas?.info);
    setTickers(datas?.tickers);
    setCoins(datas?.coins);
    setType(datas?.type);
    setCoinId(datas?.coinId);
  }, []);

  return (
    <Container>
      <DetailWrapper>
        <Header>
          <Link href={"/"}>
            <Arrow>&larr;</Arrow>
          </Link>
          <Title>
            {/* Coins.tsx에서 Link에 state로 담아서 보낸 내용이 있으면 state.name을 보여주고
          아니라면 로딩을 보여준다 근데 로딩이 false라면 info.name을 보여준다 (api호출해서 온 데이터) */}
            {info?.name}
          </Title>
        </Header>

        {false ? (
          <Loader> Loading...</Loader>
        ) : (
          <>
            <OverView>
              <OverViewItem>
                <span>rank:</span>
                <span>{info?.rank}</span>
              </OverViewItem>
              <OverViewItem>
                <span>symbol:</span>
                <span>${info?.symbol}</span>
              </OverViewItem>
              <OverViewItem>
                <span>price:</span>
                <span>{tickers?.quotes?.USD?.price?.toFixed(3)}</span>
              </OverViewItem>
            </OverView>
            <Description>{info?.description}</Description>
            <OverView>
              <OverViewItem>
                <span>total supply:</span>
                <span>{tickers?.total_supply}</span>
              </OverViewItem>
              <OverViewItem>
                <span>max supply:</span>
                <span>{tickers?.max_supply}</span>
              </OverViewItem>
            </OverView>

            {/* nested routes */}
            <TapWrapper>
              <Tap isActive={true}>
                chart
                {chartData && (
                  <Chart
                    data={chartData}
                    isLoading={isLoadingChart}
                    isError={IsErrorChart}
                  />
                )}
                {/* {coinId && <Chart coinId={coinId} />} */}
                {/* <Link href={`/${coinId}/chart?type=${type}`}>chart</Link> */}
              </Tap>
              <Tap isActive={false}>
                price
                {/* <Link href={`/${coinId}/price?type=${type}`}>price</Link> */}
              </Tap>
            </TapWrapper>
            {/* <Outlet context={{ coinId: coinId }} /> */}
          </>
        )}
      </DetailWrapper>
      <CoinListWrapper>
        {coins && type === "coin" && (
          <Coins datas={coins[0].coin} type={type} />
        )}
        {coins && type === "token" && (
          <Coins datas={coins[0].token} type={type} />
        )}
      </CoinListWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  width: 100vw;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const DetailWrapper = styled.div`
  margin: 60px 0 60px 0;
  padding: 30px 40px 0 40px;
  width: 50%;
  max-height: 1000px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.cardBgColor};
  box-shadow: ${(props) => props.theme.shadowColor};
  @media screen and (max-width: 768px) {
    width: 100%;
    margin-bottom: 40px;
  }
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: ${(props) => props.theme.textColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const TapWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0;
  gap: 10px;
`;

const Tap = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  /* background-color: rgba(0, 0, 0, 0.5); */
  border: 1px solid
    ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.textColor};
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

const OverView = styled.div`
  display: flex;
  justify-content: space-between;
  /* background-color: rgba(0, 0, 0, 0.5); */
  border: 1px solid ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.cardBgColor};
  border-radius: 10px;
  padding: 10px 20px;
`;
const OverViewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0;
  line-height: 130%;
`;

const Arrow = styled.div`
  /* text-align: center; */
  /* margin-top: 80px; */
  font-size: 30px;
  color: ${(props) => props.theme.textColor};
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
  &:active {
    color: ${(props) => props.theme.cardBgColor};
  }
`;

const CoinListWrapper = styled.div`
  margin-top: 60px;
`;
export default Coin;
