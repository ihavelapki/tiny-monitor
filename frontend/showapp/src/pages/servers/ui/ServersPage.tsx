import { useEffect, useState } from 'react';
import { ServerCard } from '../../../entities/server';
import { getServerSnapshot } from '../../../entities/server';
import type { ServerSnapshot } from '../../../entities/server';
import {
  ServerScopeFilters,
  useServerScopeFilters,
} from '../../../features/server-scope-filters';
import { PageHeader } from '../../../shared/ui/page-header';

const environmentOptions = ['dev', 'test', 'stage', 'prod'];
const projectOptions = ['default', 'platform'];

const hostsByScope: Record<string, string[]> = {
  'dev:default': ['master', 'worker', 'database'],
  'test:platform': ['master'],
};

export const ServersPage = () => {
  const {
    filters,
    setEnvironment,
    setProject,
    setSelectedHosts,
    selectAllHosts,
    clearHosts,
  } = useServerScopeFilters();

  const [snapshot, setSnapshot] = useState<ServerSnapshot | null>(null);

  const scopeKey = `${filters.environment}:${filters.project}`;
  const hostOptions = hostsByScope[scopeKey] ?? [];

  useEffect(() => {
    const loadSnapshot = async () => {
      const result = await getServerSnapshot(filters);
      setSnapshot(result);
    };

    loadSnapshot();
  }, [filters]);

  return (
    <main className="page">
      <PageHeader
        title="Servers"
        description="Inventory and technical details for monitored servers in the selected scope."
      />

      <ServerScopeFilters
        environment={filters.environment}
        project={filters.project}
        selectedHosts={filters.selectedHosts}
        environmentOptions={environmentOptions}
        projectOptions={projectOptions}
        hostOptions={hostOptions}
        onEnvironmentChange={setEnvironment}
        onProjectChange={setProject}
        onHostsChange={setSelectedHosts}
        onSelectAllHosts={() => selectAllHosts(hostOptions)}
        onClearHosts={clearHosts}
      />

      {!snapshot ? (
        <div className="empty-state">No snapshot found for the selected scope.</div>
      ) : (
        <>
          <section className="page__section">
            <h2 className="page__section-title">Snapshot overview</h2>

            <div className="surface-grid">
              <div className="surface-card">
                <h3>Environment</h3>
                <p>{snapshot.environment}</p>
              </div>

              <div className="surface-card">
                <h3>Project</h3>
                <p>{snapshot.project}</p>
              </div>

              <div className="surface-card">
                <h3>Collected at</h3>
                <p>{snapshot.timestamp}</p>
              </div>

              <div className="surface-card">
                <h3>Total servers</h3>
                <p>{snapshot.servers.length}</p>
              </div>
            </div>
          </section>

          <section className="page__section">
            <h2 className="page__section-title">Server list</h2>

            <div className="surface-grid">
            {snapshot.servers.map((server) => (
              <ServerCard key={server.alias} server={server} />
            ))}
          </div>
          </section>
        </>
      )}
    </main>
  );
};