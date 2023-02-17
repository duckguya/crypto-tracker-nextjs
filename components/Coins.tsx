// https://api.coinpaprika.com/#tag/Tags/paths/~1tags/get
import React from "react";
// import { Link, useLocation } from "react-router-dom";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import Link from "next/link";
import styled from "styled-components";
import { CategoryState } from "../atoms";
import { ICoin } from "../interface";

interface IProps {
  data?: ICoin[];
  type: string;
}

function Coins({ data, type }: IProps) {
  // 첫 랜더 시 로딩이 보이고 그 이후부턴 로딩이 안보이는 이유(detail페이지 갔다와도) : react query가 데이터를 캐시에 저장해둔다.

  // console.log(category);
  //   const location = useLocation();
  //   const params = new URLSearchParams(location.search);
  //   const listType = params.get("type");
  return (
    <>
      {type && <Title>{type.toUpperCase()}</Title>}
      {data &&
        data.map((coin, index) => (
          <CoinWrapper key={coin.id}>
            <Link href={`/${coin.id}?type=${type}`}>
              <Rank>{coin.rank}</Rank>
              <Img
                src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
              />
              <CoinNameWrapper>
                <div>{coin.name}</div>
                <Symbol>{coin.symbol}</Symbol>
              </CoinNameWrapper>
            </Link>
          </CoinWrapper>
        ))}
    </>
  );
}

const CoinWrapper = styled.div`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid white;
  box-shadow: ${(props) => props.theme.shadowColor};
  list-style: none;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;
const Font = styled.div`
  font-size: 15px;
  color: #a7b2c8;
`;
const Rank = styled(Font)`
  padding-left: 20px;
`;
const Symbol = styled(Font)`
  padding-left: 10px;
`;

const CoinNameWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 40px;
  color: ${(props) => props.theme.textColor};

  padding-bottom: 20px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin: 0 20px;
`;

export default Coins;
