import { PageHeader } from '../../../shared/ui/page-header';

export const ServersPage = () => {
  return (
    <main className="page">
      <PageHeader
        title="Servers"
        description="List of monitored servers and their status."
      />

      <section className="page__section">
        <h2 className="page__section-title">Server list</h2>

        <div className="surface-grid">
          <div className="surface-card">
            <h3>Server 1</h3>
            <p>Status: unknown</p>
            <p>CPU: no data yet</p>
            <p>RAM: no data yet</p>
          </div>

          <div className="surface-card">
            <h3>Server 2</h3>
            <p>Status: unknown</p>
            <p>CPU: no data yet</p>
            <p>RAM: no data yet</p>
          </div>

          <div className="surface-card">
            <h3>Server 3</h3>
            <p>Status: unknown</p>
            <p>CPU: no data yet</p>
            <p>RAM: no data yet</p>
          </div>
        </div>
      </section>

      <section className="page__section">
        <h2 className="page__section-title">Details</h2>

        <div className="surface-card surface-card--muted">
          <p>
            Later this area can be replaced with a table, cards, or a detailed panel for the
            selected server.
          </p>
        </div>
      </section>
    </main>
  );
};