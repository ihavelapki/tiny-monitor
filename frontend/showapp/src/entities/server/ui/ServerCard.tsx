import type { ServerInfo } from '../model/types';
import { formatBytes } from '../../../shared/lib/formatBytes';

type ServerCardProps = {
  server: ServerInfo;
};

export const ServerCard = ({ server }: ServerCardProps) => {
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
            <p>Memory total: {formatBytes(memory.totalBytes)}</p>
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
            <h4 className="server-card__section-title">Disks</h4>

            <div className="server-card__disk-list">
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
            </div>
        </div>
        
        <div className="server-card__section">
            <h4 className="server-card__section-title">Software</h4>
            <div className="server-card__disk-item">
            <div className="server-card__disk-name">docker</div>
            <div className="server-card__details">
                <p>Version: {docker?.version ?? 'not installed'}</p>
                <p>Compose: {docker?.composeVersion ?? 'not installed'}</p>
                <p>Buildx: {docker?.buildxVersion ?? 'not installed'}</p>
                <p>Driver: {docker?.buildxDriver ?? 'not installed'}</p>
                <p>
                Rootless:{' '}
                {docker?.rootless === undefined ? 'unknown' : docker.rootless ? 'yes' : 'no'}
                </p>
                <p>Home dir: {docker?.homeDir ?? 'not installed'}</p>
                <p>
                Platforms: {docker?.buildxPlatforms.join(', ') ?? 'not installed'}
                </p>
            </div>
            </div>
        </div>
    </article>
  );
};