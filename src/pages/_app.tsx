import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import type { AppProps } from 'next/app';

import { ThemeProvider } from '@mui/styles';
import theme from '../../theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
