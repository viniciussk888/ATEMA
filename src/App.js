// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
//REDUX
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <ThemeConfig>
      <ScrollToTop />
      <Router />
    </ThemeConfig>
    </PersistGate>
    </Provider>
  );
}
