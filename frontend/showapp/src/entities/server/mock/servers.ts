import type { ServerSnapshot } from '../model/types';

export const mockServerSnapshot: ServerSnapshot = {
  environment: 'dev',
  timestamp: '2026-04-01 00:02:15',
  project: 'default',
  servers: [
    {
      alias: 'master',
      hostname: 'dev-master.myhost.mydomain',
      ipAddress: '10.140.0.23',
      systemInfo: {
        os: {
          prettyName: 'Ubuntu 22.04.4 LTS',
          architecture: 'x86_64',
          virtualization: 'kvm',
          kernel: {
            version: '5.15.0-76-generic',
            maxMapCount: 262144,
          },
        },
        hardware: {
          memory: {
            totalBytes: '16764985344',
            swap: {
                total: '2G',
                free: '1.4G',
                enabled: true,
            },
            balloonDriverInstalled: false,
          },
          cpuCount: 4,
          disks: {
            root: {
              mountpoint: '/',
              size: '197G',
              fstype: 'ext4',
              available: '83G',
              state: 'mounted',
            },
            home: {
              mountpoint: '/home',
              size: '-',
              fstype: '-',
              available: '-',
              state: 'not_mounted',
            },
            opt: {
              mountpoint: '/opt',
              size: '-',
              fstype: '-',
              available: '-',
              state: 'not_mounted',
            },
          }
        },
        software: {
            docker: {
                version: '20.10.12',
                composeVersion: '2.17.3',
                buildxVersion: '0.8.0',
                buildxDriver: 'docker-container',
                buildxPlatforms: ['linux/amd64', 'linux/arm64'],
                rootless: false,
                homeDir: '/home/user'
            }
        }, 
        network: {
          mtu: 1500,
        },
      },
    },
    {
      alias: 'worker',
      hostname: 'dev-worker.myhost.mydomain',
      ipAddress: '10.140.0.21',
      systemInfo: {
        os: {
          prettyName: 'Ubuntu 22.04.4 LTS',
          architecture: 'x86_64',
          virtualization: 'kvm',
          kernel: {
            version: '5.15.0-76-generic',
            maxMapCount: 262144,
          },
        },
        hardware: {
          memory: {
            totalBytes: '16764985344',
            swap: {
                total: '2G',
                free: '1.4G',
                enabled: true,
            },
            balloonDriverInstalled: false,
          },
          cpuCount: 4,
          disks: {
            root: {
              mountpoint: '/',
              size: '197G',
              fstype: 'ext4',
              available: '83G',
              state: 'mounted',
            },
            home: {
              mountpoint: '/home',
              size: '-',
              fstype: '-',
              available: '-',
              state: 'not_mounted',
            },
            opt: {
              mountpoint: '/opt',
              size: '-',
              fstype: '-',
              available: '-',
              state: 'not_mounted',
            },
          }
        },
        software: {
            docker: {
                version: '20.10.12',
                composeVersion: '2.17.3',
                buildxVersion: '0.8.0',
                buildxDriver: 'docker-container',
                buildxPlatforms: ['linux/amd64', 'linux/arm64'],
                rootless: false,
                homeDir: '/home/user'
            }
        }, 
        network: {
          mtu: 1500,
        },
      },
    },
    {
      alias: 'database',
      hostname: 'dev-database.myhost.mydomain',
      ipAddress: '10.140.0.11',
      systemInfo: {
        os: {
          prettyName: 'Ubuntu 22.04.4 LTS',
          architecture: 'x86_64',
          virtualization: 'kvm',
          kernel: {
            version: '5.15.0-76-generic',
            maxMapCount: 262144,
          },
        },
        hardware: {
          memory: {
            totalBytes: '16764985344',
            swap: {
                total: '2G',
                free: '1.4G',
                enabled: true,
            },
            balloonDriverInstalled: false,
          },
          cpuCount: 4,
          disks: {
            root: {
              mountpoint: '/',
              size: '197G',
              fstype: 'ext4',
              available: '83G',
              state: 'mounted',
            },
            home: {
              mountpoint: '/home',
              size: '-',
              fstype: '-',
              available: '-',
              state: 'not_mounted',
            },
            opt: {
              mountpoint: '/opt',
              size: '-',
              fstype: '-',
              available: '-',
              state: 'not_mounted',
            },
          }
        },
        software: {
            docker: {
                version: '20.10.12',
                composeVersion: '2.17.3',
                buildxVersion: '0.8.0',
                buildxDriver: 'docker-container',
                buildxPlatforms: ['linux/amd64', 'linux/arm64'],
                rootless: false,
                homeDir: '/home/user'
            }
        }, 
        network: {
          mtu: 1500,
        },
      },
    },
  ],
};