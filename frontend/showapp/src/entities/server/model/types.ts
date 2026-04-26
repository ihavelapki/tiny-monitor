export type EnvironmentName = 'dev' | 'test' | 'stage' | 'prod' | string;

export type DiskMountState = 'mounted' | 'not_mounted';

export type ServerSnapshot = {
  environment: EnvironmentName;
  timestamp: string;
  project: string;
  servers: ServerInfo[];
};

export type ServerScopeQuery = {
  environment: string;
  project: string;
  selectedHosts: string[];
};

export type ServerInfo = {
  alias: string;
  hostname: string;
  ipAddress: string;
  systemInfo: ServerSystemInfo;
};

export type ServerSystemInfo = {
  os: ServerOsInfo;
  hardware: ServerHardwareInfo;
  software: ServerSoftwareInfo;
  network?: ServerNetworkInfo;
};

export type ServerOsInfo = {
  prettyName: string;
  architecture: string;
  virtualization: string;
  kernel?: ServerKernelInfo;
};

export type ServerHardwareInfo = {
  memory: {
    totalBytes: number;
    swap?: ServerSwapInfo;
    balloonDriverInstalled?: boolean;
  };
  cpuCount: number;
  disks: ServerDisks;
};

export type ServerDisks = {
  root: ServerDiskInfo;
  home: ServerDiskInfo;
  opt: ServerDiskInfo;
};

export type ServerDiskInfo = {
  mountpoint: string;
  size: string;
  fstype: string;
  available: string;
  state: DiskMountState;
};

export type ServerSwapInfo = {
  total: string;
  free: string;
  enabled: boolean;
};

export type ServerKernelInfo = {
  version: string;    
  maxMapCount?: number;
};

export type ServerNetworkInfo = {
  mtu?: number;
};

export type ServerSoftwareInfo = {
  docker?: DockerInfo;
};

export type DockerInfo = {
    version: string;
    composeVersion: string;
    buildxVersion: string;
    buildxDriver: string;
    buildxPlatforms: string[];
    rootless: boolean;
    homeDir: string;
};