import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useQuery } from "react-query";
import { apiCoinList } from "../api";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  BsToggleOff,
  BsToggleOn,
  BsToggle2Off,
  BsToggle2On,
} from "react-icons/bs";
import { useRecoilState } from "recoil";
import { themeToggleState } from "../atoms/atoms";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${(props) => props.theme.colors.mainBackgroundColor};
  @media (min-width: 1000px) {
    margin: 0 auto;
    width: 900px;
  }
`;

const Header = styled.header`
  margin-top: 20px;
  padding: 20px;
`;

const ToggleBox = styled.div`
  width: 100%;
  height: 50px;
  margin-left: 50px;
  padding: 10px;
  justify-content: flex-start;
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

const CoinList = styled.div`
  width: 100%;
`;

const LinkBox = styled(Link)``;

const CoinBox = styled.div`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colors.boxLineColor};
  font-size: 14px;
  &:hover {
    color: #00c198;
  }
  div:first-child {
    display: flex;
    flex-direction: row;
    align-items: center;
    div:first-child {
      padding-right: 10px;
    }
  }
`;

interface ICoinList {
  id: "string";
  name: "string";
  symbol: "string";
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: "string";
}

const CryptoApp = () => {
  const [isDarkMode, setIsDarkMode] = useRecoilState(themeToggleState);
  const { isLoading, data: coinList } = useQuery<ICoinList[]>(
    "coinList",
    apiCoinList,
    { refetchInterval: 10000 }
  );
  const onToggle = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <HelmetProvider>
      <Container>
        <Helmet>
          <title>{`Crypto App`}</title>
        </Helmet>
        <ToggleBox onClick={onToggle}>
          {isDarkMode ? <BsToggle2Off /> : <BsToggle2On />}
        </ToggleBox>
        <Header>
          <Title>CRYPTO APP</Title>
        </Header>
        <>
          {isLoading ? (
            <IsLoading>
              <AiOutlineLoading3Quarters />
            </IsLoading>
          ) : (
            <CoinList>
              {coinList?.map((coin, index) => {
                return (
                  <div key={index}>
                    <LinkBox to={`/${coin.id}`} state={{ coinName: coin.name }}>
                      <CoinBox>
                        <div>
                          <div>
                            {
                              <img
                                src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                                alt="coin"
                                style={{ width: "20px", height: "20px" }}
                              />
                            }
                          </div>
                          <div>{coin.name}</div>
                        </div>
                        <div>
                          <div>price</div>
                        </div>
                      </CoinBox>
                    </LinkBox>
                  </div>
                );
              })}
            </CoinList>
          )}
        </>
      </Container>
    </HelmetProvider>
  );
};

export default CryptoApp;
