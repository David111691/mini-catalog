import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #f3f4f6;
    font-family: 'Inter', sans-serif;
    color: #1f2937; 
  }

  button {
    font-family: inherit;
  }
`;

export default GlobalStyle;
