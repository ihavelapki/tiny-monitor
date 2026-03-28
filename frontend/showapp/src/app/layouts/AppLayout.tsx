import { Outlet } from 'react-router-dom';

import { Navigation } from '../../widgets/navigation';

export const AppLayout = () => {
  return (
    <div className="app-layout">
      <aside className="app-sidebar">
        <div className="app-sidebar__header">
          <h1 className="app-sidebar__title">TinyMonitor</h1>
        </div>

        <Navigation />
      </aside>

      <div className="app-content">
        <Outlet />
      </div>
    </div>
  );
};