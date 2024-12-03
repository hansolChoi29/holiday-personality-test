
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './router/Router';
import { GlobalStyle } from './styles/GlobalStyle';
const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Router />
    </QueryClientProvider>

  );
};

export default App;
