import { mockServerSnapshot } from '../../../entities/server';
import { PageHeader } from '../../../shared/ui/page-header';

export const ServersPage = () => {
  const { environment, project, timestamp, servers } = mockServerSnapshot;

  return (
    <main className="page">
      <PageHeader
        title="Servers"
        description="Inventory and technical details for monitored servers in the selected environment."
      />

      <section className="page__section">
        <h2 className="page__section-title">Snapshot overview</h2>

        <div className="surface-grid">
          <div className="surface-card">
            <h3>Environment</h3>
            <p>{environment}</p>
          </div>

          <div className="surface-card">
            <h3>Project</h3>
            <p>{project}</p>
          </div>

          <div className="surface-card">
            <h3>Collected at</h3>
            <p>{timestamp}</p>
          </div>

          <div className="surface-card">
            <h3>Total servers</h3>
            <p>{servers.length}</p>
          </div>
        </div>
      </section>

      <section className="page__section">
        <h2 className="page__section-title">Server list</h2>

        <div className="page__section">
          {servers.map((server) => {
            const { alias, hostname, ipAddress, systemInfo } = server;
            const { os, hardware, software, network } = systemInfo;
            const { memory, cpuCount, disks } = hardware;
            const docker = software.docker;
            const kernel = os.kernel;
            const swap = memory.swap;

            return (
              <article key={alias} className="surface-card">
                <div className="page__section">
                  <div>
                    <h3>{alias}</h3>
                    <p>{hostname}</p>
                    <p>{ipAddress}</p>
                  </div>

                  <div className="surface-grid">
                    <div className="surface-card surface-card--muted">
                      <h4>Operating system</h4>
                      <p>OS: {os.prettyName}</p>
                      <p>Architecture: {os.architecture}</p>
                      <p>Virtualization: {os.virtualization}</p>
                      <p>Kernel: {kernel?.version ?? 'unknown'}</p>
                      <p>max_map_count: {kernel?.maxMapCount ?? 'unknown'}</p>
                    </div>

                    <div className="surface-card surface-card--muted">
                      <h4>Hardware</h4>
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

                    <div className="surface-card surface-card--muted">
                      <h4>Network</h4>
                      <p>MTU: {network?.mtu ?? 'unknown'}</p>
                    </div>

                    <div className="surface-card surface-card--muted">
                      <h4>Docker</h4>
                      <p>Version: {docker?.version ?? 'not installed'}</p>
                      <p>Compose version: {docker?.composeVersion ?? 'not installed'}</p>
                      <p>Buildx version: {docker?.buildxVersion ?? 'not installed'}</p>
                      <p>Buildx driver: {docker?.buildxDriver ?? 'not installed'}</p>
                      <p>
                        Rootless:{' '}
                        {docker?.rootless === undefined ? 'unknown' : docker.rootless ? 'yes' : 'no'}
                      </p>
                      <p>Home dir: {docker?.homeDir ?? 'not installed'}</p>
                      <p>Platforms: {docker?.buildxPlatforms.join(', ') ?? 'not installed'}</p>
                    </div>
                  </div>

                  <div className="page__section">
                    <h4>Disks</h4>

                    <div className="surface-grid">
                      <div className="surface-card surface-card--muted">
                        <h5>root</h5>
                        <p>Mountpoint: {disks.root.mountpoint}</p>
                        <p>State: {disks.root.state}</p>
                        <p>Size: {disks.root.size}</p>
                        <p>Filesystem: {disks.root.fstype}</p>
                        <p>Available: {disks.root.available}</p>
                      </div>

                      <div className="surface-card surface-card--muted">
                        <h5>home</h5>
                        <p>Mountpoint: {disks.home.mountpoint}</p>
                        <p>State: {disks.home.state}</p>
                        <p>Size: {disks.home.size}</p>
                        <p>Filesystem: {disks.home.fstype}</p>
                        <p>Available: {disks.home.available}</p>
                      </div>

                      <div className="surface-card surface-card--muted">
                        <h5>opt</h5>
                        <p>Mountpoint: {disks.opt.mountpoint}</p>
                        <p>State: {disks.opt.state}</p>
                        <p>Size: {disks.opt.size}</p>
                        <p>Filesystem: {disks.opt.fstype}</p>
                        <p>Available: {disks.opt.available}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
};