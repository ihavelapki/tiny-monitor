import { useEffect, useState } from 'react';

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
              {snapshot.servers.map((server) => {
                const { alias, hostname, ipAddress, systemInfo } = server;
                const { os, hardware, software, network } = systemInfo;
                const { memory, cpuCount, disks } = hardware;
                const docker = software.docker;
                const kernel = os.kernel;
                const swap = memory.swap;

                return (
                  <article key={alias} className="surface-card server-card">
                    <div className="server-card__header">
                      <h3 className="server-card__title">{alias}</h3>
                      <p className="server-card__meta">{hostname}</p>
                      <p className="server-card__meta">{ipAddress}</p>
                    </div>

                    <div className="server-card__section">
                      <h4 className="server-card__section-title">Operating system</h4>
                      <div className="server-card__details">
                        <p>OS: {os.prettyName}</p>
                        <p>Architecture: {os.architecture}</p>
                        <p>Virtualization: {os.virtualization}</p>
                        <p>Kernel: {kernel?.version ?? 'unknown'}</p>
                        <p>max_map_count: {kernel?.maxMapCount ?? 'unknown'}</p>
                      </div>
                    </div>

                    <div className="server-card__section">
                      <h4 className="server-card__section-title">Hardware</h4>
                      <div className="server-card__details">
                        <p>CPU count: {cpuCount}</p>
                        <p>Memory total: {memory.totalBytes}</p>
                        <p>Swap enabled: {swap?.enabled ? 'yes' : 'no'}</p>
                        <p>Swap total: {swap?.total ?? 'unknown'}</p>
                        <p>Swap free: {swap?.free ?? 'unknown'}</p>
                        <p>
                          Balloon driver:{' '}
                          {memory.balloonDriverInstalled ? 'installed' : 'not installed'}
                        </p>
                      </div>
                    </div>

                    <div className="server-card__section">
                      <h4 className="server-card__section-title">Network</h4>
                      <div className="server-card__details">
                        <p>MTU: {network?.mtu ?? 'unknown'}</p>
                      </div>
                    </div>

                    <div className="server-card__section">
                      <h4 className="server-card__section-title">Docker</h4>
                      <div className="server-card__details">
                        <p>Version: {docker?.version ?? 'not installed'}</p>
                        <p>Compose: {docker?.composeVersion ?? 'not installed'}</p>
                        <p>Buildx: {docker?.buildxVersion ?? 'not installed'}</p>
                        <p>Driver: {docker?.buildxDriver ?? 'not installed'}</p>
                        <p>
                          Rootless:{' '}
                          {docker?.rootless === undefined
                            ? 'unknown'
                            : docker.rootless
                              ? 'yes'
                              : 'no'}
                        </p>
                        <p>Home dir: {docker?.homeDir ?? 'not installed'}</p>
                        <p>
                          Platforms:{' '}
                          {docker?.buildxPlatforms.join(', ') ?? 'not installed'}
                        </p>
                      </div>
                    </div>

                    <div className="server-card__section">
                      <h4 className="server-card__section-title">Disks</h4>

                      <div className="server-card__disk-list">
                        <div className="server-card__disk-item">
                          <div className="server-card__disk-name">root</div>
                          <div className="server-card__disk-details">
                            <span>{disks.root.mountpoint}</span>
                            {disks.root.state === 'mounted' ? (
                              <>
                                <span>{disks.root.size}</span>
                                <span>{disks.root.fstype}</span>
                                <span>{disks.root.available} free</span>
                              </>
                            ) : (
                              <span>not mounted</span>
                            )}
                          </div>
                        </div>

                        <div className="server-card__disk-item">
                          <div className="server-card__disk-name">home</div>
                          <div className="server-card__disk-details">
                            <span>{disks.home.mountpoint}</span>
                            {disks.home.state === 'mounted' ? (
                              <>
                                <span>{disks.home.size}</span>
                                <span>{disks.home.fstype}</span>
                                <span>{disks.home.available} free</span>
                              </>
                            ) : (
                              <span>not mounted</span>
                            )}
                          </div>
                        </div>

                        <div className="server-card__disk-item">
                          <div className="server-card__disk-name">opt</div>
                          <div className="server-card__disk-details">
                            <span>{disks.opt.mountpoint}</span>
                            {disks.opt.state === 'mounted' ? (
                              <>
                                <span>{disks.opt.size}</span>
                                <span>{disks.opt.fstype}</span>
                                <span>{disks.opt.available} free</span>
                              </>
                            ) : (
                              <span>not mounted</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </>
      )}
    </main>
  );
};