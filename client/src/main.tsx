import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { QueryClientProvider } from '@tanstack/react-query'

import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { routes } from '@/routes'
import { queryClient } from '@/lib/queryClient'

import '@/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme' >
        <RouterProvider router={routes} />
        <Toaster position='top-center'/>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
)
