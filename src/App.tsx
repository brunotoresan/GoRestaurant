import { BrowserRouter as Router } from 'react-router-dom';
import { FoodsProvider } from './hooks/useFoods';

import Routes from './routes';

import GlobalStyle from './styles/global';

export function App() {
  return (
    <FoodsProvider>
      <GlobalStyle />
      <Router>
        <Routes />
      </Router>
    </FoodsProvider>
  )
}
