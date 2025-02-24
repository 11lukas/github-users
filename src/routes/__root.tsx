import Devtools from '@core/devtools'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

const queryClient = new QueryClient()

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      {import.meta.env.MODE === 'development' ? <Devtools /> : null}
    </QueryClientProvider>
  )
}
