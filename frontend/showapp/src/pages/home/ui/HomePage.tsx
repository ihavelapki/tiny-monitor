export const HomePage = () => {
  return (
    <main className="page">
      <div className="page__header">
        <h1 className="page__title">Home</h1>
        <p className="page__description">
          Welcome to TinyMonitor frontend. This page can be used as an overview dashboard for the
          monitoring system.
        </p>
      </div>

      <section className="page__section">
        <h2 className="page__section-title">System overview</h2>

        <div className="surface-grid">
          <div className="surface-card">
            <h3>Servers</h3>
            <p>
              This block can later show the total number of monitored servers and their current
              status.
            </p>
          </div>

          <div className="surface-card">
            <h3>Metrics</h3>
            <p>
              This block can later show a short summary of CPU and RAM usage across all servers.
            </p>
          </div>

          <div className="surface-card">
            <h3>Alerts</h3>
            <p>
              This block can later display warning and critical events detected by TinyMonitor.
            </p>
          </div>
        </div>
      </section>

      <section className="page__section">
        <h2 className="page__section-title">Quick start</h2>

        <div className="surface-card surface-card--muted">
          <p>
            Start by opening the Metrics page to view charts, or the Servers page to inspect the
            monitored hosts.
          </p>
        </div>
      </section>
    </main>
  );
};