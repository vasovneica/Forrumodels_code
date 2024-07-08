import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { BrowserRouter } from 'eact-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import './index.scss';
import store from './redux/store';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    <CssBaseline />

    <ThemeProvider theme={theme}>

      <BrowserRouter>

        <Provider store={store}>
          <App />
        </Provider>

      </BrowserRouter>

    </ThemeProvider>
  </>
);
