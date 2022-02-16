export const apiCoinList = () => {
  return fetch("https://api.coinpaprika.com/v1/coins")
    .then((response) => response.json())
    .then((data) => data.slice(0, 100));
};

export const apiCoinPrice = (coinId: string) => {
  return fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
    .then((response) => response.json())
    .then((data) => data);
};
export const apiCoinInfo = (coinId: string) => {
  return fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
    .then((response) => response.json())
    .then((data) => data);
};

export const apiCoinHistory = (coinId: string) => {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 90;
  return fetch(
    `https://api.coinpaprika.com/v1/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}&interval=1d`
  )
    .then((res) => res.json())
    .then((data) => data);
};
