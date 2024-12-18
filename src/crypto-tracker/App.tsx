import { createGlobalStyle } from "styled-components";
import Coins from "./Coins";
import { ThemeProvider } from 'styled-components';
// import { darkTheme, lightTheme } from "../theme";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";

export const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  body {
    line-height: 1;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Source Sans Pro, sans-serif';
    /* background-color: ${props => props.theme.bgColor}; */
    /* color: ${props => props.theme.textColor}; */
  }
  a {
    text-decoration: none;
    color: #18181a;
    &:active {
      color: #18181a;
    }
  }
  ul {
    list-style: none;
    padding-inline-start: 0;
  }
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <>
      {/* <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <ReactQueryDevtools initialIsOpen={true} />
        <GlobalStyle />
        <Coins />
      </ThemeProvider> */}
    </>
  );
}

export default App;