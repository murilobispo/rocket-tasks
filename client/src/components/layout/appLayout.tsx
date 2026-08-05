import { Outlet } from 'react-router'

function AppLayout() {
  return (
    <div>
      <aside>Sidebar</aside>

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout