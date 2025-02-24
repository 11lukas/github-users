import Devtools from '@core/devtools';
import theme from '@core/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { Toaster } from 'react-hot-toast';

export const Route = createRootRoute({
  component: RootComponent,
})

const queryCache = new QueryCache();

const queryClient = new QueryClient({
  queryCache, defaultOptions: {
    queries: {
      retry: 0,
    },
  },
})

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Outlet />
        <Toaster />
      </ThemeProvider>
      {import.meta.env.MODE === 'development' ? <Devtools /> : null}
    </QueryClientProvider>
  )
}
