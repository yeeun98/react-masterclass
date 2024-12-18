import { Link, Outlet, useLocation, useMatch, useParams } from 'react-router-dom';
import { Container, Header, Title, Main, Loader } from './Coins';
import styled from 'styled-components';
import { useQuery } from "@tanstack/react-query";
import { fetchCoinInfo, fetchCoinTickers } from './api';
import { Helmet } from 'react-helmet';

/**
 *
  coin id로 코인 받기 (Coins)
  https://api.coinpaprika.com/v1/coins/btc-bitcoin
  https://api.coinpaprika.com/#operation/getCoinById
 *
  coin id로 특정 코인에 대한 시세 정보 얻기 (Tickers)
  https://api.coinpaprika.com/v1/tickers/btc-bitcoin
  https://api.coinpaprika.com/#operation/getTickersById
 *
  Coinpaprika API 는 더이상 무료가 아닙니다. ㅠㅠ
  그래서 니꼬가 자체 API 를 만들었어요.
  자체 URL: https://ohlcv-api.nomadcoders.workers.dev

  사용을 위해서는. 파라미터로 coinId 를 추가하세요.
  https://ohlcv-api.nomadcoders.workers.dev?coinId=btc-bitcoin
 *
 **/

//#region interface
  interface RouteState {
    name: string;
  }
  
  
  interface ITag {
    id: string;
    name: string;
    coin_counter: number;
    ico_counter: number;
  }
  interface IInfoData {
    name: string;
    id: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    tags: ITag[];
    team: object;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    links: object;
    links_extended: object;
    whitepaper: object;
    first_data_at: string;
    last_data_at: string;
  }
  
  interface IPriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
      USD: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h:number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
      }
    };
  }
  //#endregion

//#region style-component
const BackButton = styled.button.attrs({ type: 'button' })`
  position: absolute;
  top: 43px;
  left: 20px;
  /* color: ${prop => prop.theme.textColor}; */
  font-weight: bold;
  font-size: 15px;
  background-color: transparent;
  border: none;
  width: 35px;
  height: 35px;
`;

const RowList = styled.ul`
  display: flex;
  justify-content: space-between;
  background-color: #415a77;
  border-radius: 12px;
  padding: 18px 25px;
  box-sizing: border-box;
`;

const RowItem = styled.li`
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  h3 {
    font-size: 12px;
  }
  span {
    font-size: 19px;
  }
`;

const Description = styled.p`
  /* color: ${prop => prop.theme.textColor}; */
  margin: 24px 0;
`;

const Tabs = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 30px 0;
  gap: 10px;
  list-style: none;
  padding-inline-start: 0;
`;
const Tab = styled.li<{isActive: boolean}>`
  text-align: center;
  background-color: #303a49;
  border-radius: 12px;
  padding: 10px 0;
  font-size: 14px;

  a {
    /* color: ${props => props.isActive ? props.theme.accentColor : '#fff'}; */
  }
`;
//#endregion

function Coin() {
  const { coinId } = useParams();
  const location = useLocation();
  const state = location.state as RouteState;
  const priceMatch = useMatch('/:coinId/price');
  const chartMatch = useMatch('/:coinId/chart');

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>({
    queryKey: ["info", coinId],
    queryFn: () => fetchCoinInfo(coinId ?? '')
  });
  const { isLoading: priceLoading, data: priceData } = useQuery<IPriceData>({
    queryKey: ["tickers", coinId],
    queryFn: () => fetchCoinTickers(coinId ?? ''),
    refetchInterval: 5000
  });

  return <Container>
    <Helmet>
      <title>
        {state?.name}
      </title>
    </Helmet>
    <Header>
      <BackButton>←</BackButton>
      <Title>{state?.name}</Title>
    </Header>

    <Main>
      {
        infoLoading ? <Loader>Loader...</Loader> : (
          <>
            <RowList>
              <RowItem>
                <h3>RANK :</h3>
                <span>{ infoData?.rank }</span>
              </RowItem>
              <RowItem>
                <h3>SYMBOL :</h3>
                <span>{ infoData?.symbol }</span>
              </RowItem>
              <RowItem>
                <h3>OPEN SOURCE :</h3>
                <span>Yes</span>
              </RowItem>
            </RowList>

            <Description>
              { infoData?.description }
            </Description>

            <RowList>
              <RowItem>
                <h3>TOTAL SUPLY :</h3>
                <span>{ priceData?.total_supply }</span>
              </RowItem>
              <RowItem>
                <h3>MAX SUPPLY :</h3>
                <span>{ priceData?.max_supply }</span>
              </RowItem>
            </RowList>

            <Tabs>
              <Tab isActive={chartMatch !== null}>
                <Link to="chart" state={{name: state.name}}>
                  CHART
                </Link>
              </Tab>
              <Tab isActive={priceMatch !== null}>
                <Link to="price" state={{name: state.name}}>
                  PRICE
                </Link>
              </Tab>
            </Tabs>
            <Outlet />
          </>
        )
      }
    </Main>
  </Container>;
}

export default Coin;