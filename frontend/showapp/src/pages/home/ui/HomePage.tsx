export const HomePage = () => {
  return (
    <main className="page">
      <div className="page__header">
        <h1 className="page__title">Home</h1>
        <p className="page__description">
          Welcome to TinyMonitor frontend. This page can be used as an overview dashboard.
        </p>
      </div>

      <section className="page__section">
        <div className="surface-grid">
          <div className="surface-card">Summary card 1</div>
          <div className="surface-card">Summary card 2</div>
        </div>
      </section>
    </main>
  );
};