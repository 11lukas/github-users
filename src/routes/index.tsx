import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <Suspense >
      <p>GitHub Users</p>
    </Suspense>
  )
}
