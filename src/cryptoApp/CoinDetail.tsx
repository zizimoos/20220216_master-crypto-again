import {
  Route,
  Routes,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { AiOutlineLeftCircle, AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link } from "react-router-dom";

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
import { useQuery } from "react-query";
import { apiCoinInfo, apiCoinPrice } from "../api";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding-right: 10px;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media (min-width: 1000px) {
    margin: 0 auto;
    width: 900px;
  }
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

const Tabs = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Tab = styled.div<{ isActive: boolean }>`
  height: 36px;
  border-radius: 10px;
  font-size: 14px;
  flex-basis: 48%;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${(props) =>
    props.isActive
      ? props.theme.colors.subTextColor
      : props.theme.colors.mainTextColor};
  a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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
  const coinId = params.coinId;
  // eslint-disable-next-line
  const location = useLocation();
  const nestInfo = useMatch(`/${params.coinId}/info`);
  const nestChart = useMatch(`/${params.coinId}/chart`);

  const { isLoading: infoLoading, data: coinInfo } = useQuery<ICoinInfo>(
    ["coinInfo", coinId],
    () => apiCoinInfo(coinId!)
  );
  const { isLoading: priceLoading, data: coinPrice } = useQuery<ICoinPrice>(
    ["coinPrice", coinId],
    () => apiCoinPrice(coinId!),
    { refetchInterval: 1000 }
  );

  let isLoading = infoLoading || priceLoading;
  const forHelmet = coinInfo?.name;
  return (
    <HelmetProvider>
      <Container>
        <Helmet>
          <title>
            {`${forHelmet}`} | {`CoinDetail`}
          </title>
        </Helmet>
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
                <span>Max Supply</span>
                <span>{coinPrice?.max_supply.toLocaleString("en-US")}</span>
              </OverviewItem>
            </Overview>

            <Tabs>
              <Tab isActive={nestChart !== null}>
                <Link to={`/${params.coinId}/chart`}>Chart</Link>
              </Tab>
              <Tab isActive={nestInfo !== null}>
                <Link to={`/${params.coinId}/info`}>Information</Link>
              </Tab>
            </Tabs>

            <Routes>
              <Route path="chart" element={<Chart coinId={params.coinId!} />} />
              <Route path="info" element={<Info />} />
            </Routes>
          </>
        )}
      </Container>
    </HelmetProvider>
  );
};

export default CoinDetail;
