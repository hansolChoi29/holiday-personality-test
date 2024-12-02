import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClient client={queryClient}>
      <App />
    </QueryClient>
  </StrictMode>
);
