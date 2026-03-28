import { Outlet } from 'react-router-dom';

import { Navigation } from '../../widgets/navigation';

export const AppLayout = () => {
  return (
    <div>
      <header>
        <h1>TinyMonitor</h1>
      </header>

      <Navigation />

      <section>
        <Outlet />
      </section>
    </div>
  );
};