import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
// import ApexCharts from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import styled from "styled-components";
import { ICoinList } from "../interface";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import chart from "@/pages/api/chart";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

interface IProps {
  data: IHistorical[];
  isLoading: boolean;
  isError: boolean;
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
function Chart({ data, isLoading, isError }: IProps) {
  //   const { coinId } = useOutletContext<IChartProps>();
  //   const location = useLocation();
  //   const params = new URLSearchParams(location.search);
  const isDark = useRecoilValue(isDarkAtom);

  // const { isLoading, data, isError } = useQuery<IHistorical[]>(
  //   ["ohlcv", coinId],
  //   () => fetchCoinHistory(coinId),
  //   { enabled: !!coinId }
  // );

  console.log("chart data: ", data);
  useEffect(() => {
    // console.log(data);
  }, []);

  return (
    <>
      <div>
        {isError && "해당 암호화폐는 차트가 지원되지 않습니다."}
        {isLoading && "Loading chart..."}
        {data && (
          <ApexCharts
            width={"100%"}
            height={150}
            type="candlestick"
            series={[
              {
                data:
                  data?.map((p) => ({
                    x: p.time_close,
                    y: [p.open, p.low, p.high, p.close],
                  })) ?? [],
              },
            ]}
            options={{
              chart: {
                type: "candlestick",
                height: 350,
                // width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              theme: {
                mode: isDark ? "dark" : "light",
              },
              grid: { show: true },

              // stroke: {
              //   curve: "smooth",
              //   width: 3,
              // },
              yaxis: {
                show: true,
              },
              xaxis: {
                axisBorder: { show: true },
                axisTicks: { show: true },
                labels: { show: true },
                type: "datetime",
                categories: data?.map((price) => price.time_close),
              },
              // fill: {
              //   type: "gradient",
              //   gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
              // },
              // colors: ["#0fbcf9"],
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`,
                },
              },
            }}
          />
        )}
      </div>
    </>
  );
}

const CoinListWrapper = styled.div``;

export default Chart;
