import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { ThemeProvider } from '@/components/theme-provider'
import '@/index.css'

import { routes } from '@/routes'

import { Toaster } from '@/components/ui/sonner'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryClient'

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
