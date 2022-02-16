import { Route, Routes, useLocation, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { AiOutlineLeftCircle, AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  Contract,
  Links,
  LinksExtended,
  Tag,
  Team,
  Whitepaper,
  Parent,
  Quotes,
} from "./interface";
import Chart from "../components/Chart";
import Info from "../components/Info";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding-right: 10px;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const BackLink = styled(Link)`
  align-self: flex-start;
  padding: 10px;
`;
// const UiIcon = styled(AiOutlineLeftCircle)`
//   font-size: 30px;
// `;
const Header = styled.header`
  margin-top: 0px;
  padding-bottom: 30px;
`;

const Title = styled.h1``;

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

const Overview = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${(props) => props.theme.colors.subTextColor};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
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
  margin: 10px 0px;
  padding-right: 5px;
  padding-left: 5px;
  font-size: 14px;
  line-height: 1.3;
  ::first-letter {
    text-transform: uppercase;
    font-size: 24px;
    font-weight: 700;
  }
`;

interface ICoinInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  contracts: Contract[];
  parent: Parent;
  tags: Tag[];
  team: Team[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: Date;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: Links;
  links_extended: LinksExtended[];
  whitepaper: Whitepaper;
  first_data_at: Date;
  last_data_at: Date;
}

interface ICoinPrice {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: Date;
  last_updated: Date;
  quotes: Quotes;
}

const CoinDetail = () => {
  const params = useParams();
  // eslint-disable-next-line
  const location = useLocation();

  const [coinInfo, setCoinInfo] = useState<ICoinInfo>();
  const [coinPrice, setCoinPrice] = useState<ICoinPrice>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCoinInfo = async () => {
      const response = await fetch(
        `https://api.coinpaprika.com/v1/coins/${params.coinId}`
      );
      const result = await response.json();
      setCoinInfo(result);
      setIsLoading(false);
    };
    fetchCoinInfo();

    const fetchCoinPrice = async () => {
      const response = await fetch(
        `https://api.coinpaprika.com/v1/tickers/${params.coinId}`
      );
      const result = await response.json();
      setCoinPrice(result);
      setIsLoading(false);
    };
    fetchCoinPrice();
  }, [params.coinId]);
  console.log(coinInfo);
  console.log(coinPrice);

  return (
    <Container>
      <BackLink to={"/"}>
        <AiOutlineLeftCircle />
      </BackLink>
      <Header>
        <Title>{params.coinId}</Title>
      </Header>
      {isLoading ? (
        <IsLoading>
          <AiOutlineLoading3Quarters />
        </IsLoading>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank</span>
              <span>{coinInfo?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol</span>
              <span>{coinInfo?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>CURRENT PRICE</span>
              <span>
                $
                {coinPrice?.quotes.USD.price.toLocaleString("en-US", {
                  maximumFractionDigits: 4,
                })}
              </span>
            </OverviewItem>
          </Overview>
          <Description>{coinInfo?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply</span>
              <span>{coinPrice?.total_supply.toLocaleString("en-US")}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{coinPrice?.max_supply.toLocaleString("en-US")}</span>
            </OverviewItem>
          </Overview>

          {/* <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`} state={{ coinId }}>
                Chart
              </Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Information</Link>
            </Tab>
          </Tabs> */}

          <Routes>
            <Route path="chart" element={<Chart coinId={params.coinId!} />} />
            <Route path="price" element={<Info />} />
          </Routes>
        </>
      )}
    </Container>
  );
};

export default CoinDetail;
