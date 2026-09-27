import { useState } from 'react'
import { NavLink, Outlet, useLoaderData, useNavigate } from 'react-router'
import {
	Calendar,
	CalendarClock,
	CircleCheck,
	CircleSmall,
	Inbox,
	LogOut,
	Moon,
	Pencil,
	Plus,
	Rocket,
	Settings,
	Sun,
	Trash,
	User,
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
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
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupAction,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarInset,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarHeader,
	SidebarTrigger,
} from '@/components/ui/sidebar'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'

import { CreateListDialog } from '@/components/common/CreateListDialog'
import { DeleteListDialog } from '@/components/common/DeleteListDialog'
import { EditListDialog } from '@/components/common/EditListDialog'
import SettingsDialog from '@/components/common/SettingsDialog'
import { useTheme } from '@/components/theme-provider'
import { useSidebarData } from '@/hooks/useSidebarData'
import { queryClient } from '@/lib/queryClient'
import type { appLoader } from '@/routes/loaders/appLoader'
import { removeToken } from '@/services/auth/storage'
import type { List } from '@/types/list'

function AppLayout() {

  const { user } = useLoaderData<typeof appLoader>()
  const { theme, setTheme } = useTheme()

  const [editDialog, setEditDialog] = useState(false)
  const [selectedList, setSelectedList] = useState<List | null>(null)

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

  const navigate = useNavigate()
  
  return (
    <SidebarProvider>
      <Sidebar collapsible='icon'>
       <SidebarHeader>
          <SidebarMenu className='pt-2'>
            <SidebarMenuItem>
              <SidebarMenuButton className='hover:bg-transparent'>
                <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                  <Rocket size={16} />
                </div>
                <h1 className='font-semibold tracking-tight text-xl'>Rocket Tasks</h1>
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
                  <SidebarMenuButton tooltip={{ children: item.label }} render={<NavLink to={item.to}/>}>
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
            <CreateListDialog
              trigger={
                <SidebarGroupAction>
                  <Plus />
                </SidebarGroupAction>
              }
            />
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
                    <SidebarMenuAction
                        showOnHover
                        render={<div />}
                      >
                      <DropdownMenu>
                        <DropdownMenuTrigger className='cursor-pointer'>
                          <Pencil className='h-4 w-4' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side='right' align='start'>
                          <DropdownMenuItem onClick={() => {
                            setSelectedList(list)
                            setEditDialog(true)
                          }
                          }>
                            <Pencil /> Edit
                          </DropdownMenuItem>
                          <DeleteListDialog
                            listId={list.id}
                            trigger={
                              <DropdownMenuItem variant='destructive' closeOnClick={false}>
                                <Trash /> Delete
                              </DropdownMenuItem>
                            }/>
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
                    <SettingsDialog
                      trigger={
                        <DropdownMenuItem closeOnClick={false}>
                          <Settings/>Settings
                        </DropdownMenuItem>
                        
                      }/>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator/>
                  <DropdownMenuGroup>
                    <DropdownMenuItem 
                      variant={'destructive'} 
                      onClick={() => {
                        removeToken()
                        navigate('/login')
                        queryClient.clear()
                      }}>
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
        <header className='sticky top-0 z-10 flex  gap-2 h-12 items-center justify-between bg-background/80 px-4 backdrop-blur'>
          <SidebarTrigger />
          <Tooltip>
            <TooltipTrigger render={
              <Button variant='ghost' size='icon' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                {theme === 'dark' ? <Sun className='size-4' /> : <Moon className='size-4' />}
              </Button>
            }>
            </TooltipTrigger>
            <TooltipContent>Toggle theme</TooltipContent>
          </Tooltip>
        </header>
        
        <main className='mx-auto w-full max-w-4xl space-y-6 px-4 py-8 pb-24'>
          <Outlet />
        </main>
      </SidebarInset>

    
      {selectedList && (
        <EditListDialog
          list={selectedList}
          open={editDialog}
          onOpenChange={setEditDialog}
        />
      )}

    </SidebarProvider>
  )
}

export default AppLayout