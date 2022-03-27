import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PageSwitcher from './PageSwitcher';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GameContextProvider } from './contrext/GameContext';
import { BrowserRouter } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#FFFFFF',
      dark: '#ba000d',
      contrastText: '#000',
    },
    error: {
      main: '#cf6679',
      color: '#cf6679'
    }
  },
  overrides: {
    TextField: {
      
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GameContextProvider>
          <PageSwitcher/>
        </GameContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
//<Welcome />
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
