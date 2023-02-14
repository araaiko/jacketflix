import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* reset css */
  * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  html {
      /* 360px未満ではviewport固定の時に必要 */
      -webkit-text-size-adjust: 100%;
  }

  html,
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ul,
  ol,
  dl,
  li,
  dt,
  dd,
  p,
  div,
  span,
  img,
  a,
  button,
  table,
  tr,
  th,
  td {
      margin: 0;
      padding: 0;
      border: 0;
      font-weight: normal;
      font-size: 100%;
      vertical-align: baseline;
      font: inherit;
  }

  header,
  footer,
  nav,
  section,
  article,
  aside,
  figure,
  figcaption {
      display: block;
  }

  body {
      line-height: 1;
  }

  ol,
  ul {
      list-style: none;
      list-style-type: none;
  }

  a {
      cursor: pointer;
      text-decoration: none;
  }

  img {
      border: none;
      vertical-align: bottom;
  }

  input[type="submit"],
  input[type="button"],
  input[type="reset"] {
      border-radius: 0;
      -webkit-appearance: none;
  }
  
  /* base */
  body {
    background-color: #000;
    color: #fff;
    line-height: 1.3;
    padding-bottom: 80px;

    @media (min-width: 768px) {
        padding-bottom: 120px;
    }
  }
`;
