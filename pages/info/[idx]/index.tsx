import React from "react";
import axios from "axios";
import { GetCoins, fetchCoinInfo, fetchCoinTickers } from "@/api";
import Coin from "@/components/Coin";
import { ICoinList, IInfoData, IPriceData } from "@/interface";
import { useRouter } from "next/router";

interface IProps {
  info: IInfoData;
  tickers: IPriceData;
  coins: ICoinList[];
  type: string;
  coinId: string;
}
const Page = (data: IProps) => (
  <div>
    <Coin {...data} />
  </div>
);

export async function getServerSideProps(context: any) {
  try {
    // const { req, res, query, params } = context;
    const {
      query: { idx, type },
    } = context;
    const info = await fetchCoinInfo(idx);
    const tickers = await fetchCoinTickers(idx);
    const coins = await GetCoins("rank");

    return {
      props: {
        info,
        tickers,
        coins,
        type,
        coinId: idx,
      },
    };
  } catch (error) {
    // console.log("error", error);
    return error;
  }
}

export default Page;
