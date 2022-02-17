import { useQuery } from "react-query";
import { apiCoinHistory } from "../api";
import styled, { keyframes } from "styled-components";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ApexChart from "react-apexcharts";
import { useRecoilState } from "recoil";
import { themeToggleState } from "../atoms/atoms";

const Title = styled.h1`
  margin-top: 20px;
  margin-bottom: 20px;
`;
const rotata = keyframes`
from{
  transform: rotate(0deg);
}
to{
  transform: rotate(360deg);
}
`;

const IsLoading = styled(AiOutlineLoading3Quarters)`
  height: 100vh;
  justify-self: center;
  animation: ${rotata} 2s linear infinite;
`;

const ChartWrapper = styled.div`
  width: 100%;
`;

interface IChartProps {
  coinId: string;
}
interface ICoinChartOHLC {
  close: number;
  high: number;
  low: number;
  market_cap: number;
  open: number;
  time_close: string;
  time_open: string;
  volume: number;
}

const Chart = ({ coinId }: IChartProps) => {
  // eslint-disable-next-line
  const [isDarkMode, _] = useRecoilState(themeToggleState);

  const { isLoading, data: chartData } = useQuery<ICoinChartOHLC[]>(
    ["coinChart", coinId],
    () => apiCoinHistory(coinId!)
  );
  return (
    <>
      <Title>{`CHART`}</Title>
      {isLoading ? (
        <IsLoading>
          <AiOutlineLoading3Quarters />
        </IsLoading>
      ) : (
        <ChartWrapper>
          <ApexChart
            type="candlestick"
            series={[
              {
                data: chartData?.map((ohlc) => ({
                  x: new Date(ohlc.time_open),
                  y: [ohlc.open, ohlc.high, ohlc.low, ohlc.close],
                })),
              },
            ]}
            options={{
              theme: { mode: "light" },
              chart: { width: "100%", height: "100%" },
              title: {
                text: "CandleStick Chart",
                align: "left",
                style: {
                  fontSize: "14px",
                  // fontFamily: "Helvetica, Arial, sans-serif",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: "light",
                  color: "silver",
                },
              },
              xaxis: {
                type: "datetime",
                labels: {
                  show: true,
                  datetimeUTC: true,
                  datetimeFormatter: {
                    year: "yyyy",
                    month: "MMM 'yy",
                    day: "dd MMM",
                    hour: "HH:mm",
                  },
                  style: {
                    colors: isDarkMode ? "white" : "black",
                  },
                },
              },
              yaxis: {
                show: true,
                tooltip: {
                  enabled: true,
                },
                labels: {
                  show: true,
                  style: {
                    colors: isDarkMode ? "white" : "black",
                  },
                  formatter: (value) => {
                    return value.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      // maximumFractionDigits: 4,
                    });
                  },
                },
              },
            }}
          />
        </ChartWrapper>
      )}
    </>
  );
};
export default Chart;
