import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarFooter,
  SidebarRail,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'

import { NavLink, Outlet, useLoaderData, useMatches } from 'react-router'
import { useSidebarData } from '@/hooks/useSidebarData'
import { Calendar, CalendarClock, CircleCheck, CircleSmall, Inbox, Plus, Rocket, User, Settings, LogOut, Pencil, Moon, Sun, Trash} from 'lucide-react'
import type { appLoader } from '@/routes/loaders/appLoader'
import { Separator } from '@/components/ui/separator'
import type { RouteHandle } from '@/types/routeHandle'
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { useTheme } from "@/components/theme-provider"
import { ListDialog } from '@/components/ListDialog'

function AppLayout() {

  const { user } = useLoaderData<typeof appLoader>()
  const matches = useMatches()
  const match = matches.at(-1)
  const handle = match?.handle as RouteHandle | undefined
  const title = handle?.title || 'Rocket Tasks'
  const { theme, setTheme } = useTheme()
  
   const [
    { data: lists },
    { data: inbox },
    { data: today },
    { data: upcoming },
    { data: completed },
  ] = useSidebarData()
  
  const OVERVIEW_MENU_ITEMS = [
    { label: 'Inbox',     icon: <Inbox/>,         to: '',           badge: inbox.meta.total     },
    { label: 'Today',     icon: <Calendar/>,      to: '/today',     badge: today.meta.total     },
    { label: 'Upcoming',  icon: <CalendarClock/>, to: '/upcoming',  badge: upcoming.meta.total  },
    { label: 'Completed', icon: <CircleCheck/>,   to: '/completed', badge: completed.meta.total }
  ]
  
  return (
    <SidebarProvider>

      <Sidebar collapsible='icon' className='pt-2'>
       <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className='hover:bg-transparent'>
                <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                  <Rocket size={16} />
                </div>
                <h1 className='font-semibold tracking-tight text-lg'>Rocket Tasks</h1>
            </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        
        <SidebarContent>

          <SidebarGroup>
            <SidebarGroupLabel>Overview</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {OVERVIEW_MENU_ITEMS.map((item) =>(
                  <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton tooltip={{ children: item.label } } render={<NavLink to={item.to}/>}>
                      {item.icon}
                      {item.label}
                      </SidebarMenuButton>
                    <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Lists</SidebarGroupLabel>
            <SidebarGroupAction onClick={() => console.log('Click')}><Plus/></SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                {lists.map((list) =>(
                  <SidebarMenuItem key={list.id}>
                    <SidebarMenuButton tooltip={{ children: list.title }} render={<NavLink to={`list/${list.id}`} />}>
                      <CircleSmall
                        className='fill-current'
                        style={{
                          color: list.color || 'var(--muted-foreground)',
                        }}
                      />
                      {list.title}
                    </SidebarMenuButton>
                    <SidebarMenuAction showOnHover={true} >
                      <DropdownMenu>
                        <DropdownMenuTrigger className='cursor-pointer'>
                          <Pencil className='h-4 w-4' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side='right' align='start'>
                          <DropdownMenuItem>  
                            <Pencil /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem variant='destructive'>
                            <Trash /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </SidebarMenuAction>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <SidebarMenuButton size='lg' render={<DropdownMenuTrigger/>} className='cursor-pointer'>
                  <Avatar>
                    <AvatarImage src={user.avatarUrl ?? ''} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className='min-w-0 text-left leading-tight'>
                    <p className='truncate text-sm font-medium'>{user.name ?? 'Unnamed'}</p>
                    <p className='truncate text-xs text-muted-foreground'>{user.email}</p>
                  </div>
                </SidebarMenuButton>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuItem render={<NavLink to='/profile' />}>
                      <User/>Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings/>Settings
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator/>
                  <DropdownMenuGroup>
                    <DropdownMenuItem variant={'destructive'}>
                      <LogOut/>Log out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        
      </Sidebar>

      <SidebarInset>
        <header className='sticky top-0 z-10 flex h-12 items-center justify-between border-b bg-background/80 px-4 backdrop-blur'>
          <div className='flex items-center gap-2'>
            <SidebarTrigger />
            <Separator orientation='vertical' className='h-5' />
            <h1 className='text-sm font-semibold'>{title}</h1>
          </div>
          <div className='flex items-center gap-2'>
            <Tooltip>
              <TooltipTrigger render={
                <Button variant='ghost' size='icon' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                  {theme === 'dark' ? <Sun className='h-4 w-4' /> : <Moon className='h-4 w-4' />}
                </Button>
              }>
              </TooltipTrigger>
              <TooltipContent>Toggle theme</TooltipContent>
            </Tooltip>
          </div>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AppLayout