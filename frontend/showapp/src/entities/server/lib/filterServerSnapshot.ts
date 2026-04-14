import type { ServerSnapshot } from '../model/types';

type FilterServerSnapshotParams = {
  environment: string;
  project: string;
  selectedHosts: string[];
};

export const filterServerSnapshot = (
  snapshots: ServerSnapshot[],
  filters: FilterServerSnapshotParams,
): ServerSnapshot | null => {
  const matchingSnapshot = snapshots.find(
    (snapshot) =>
      snapshot.environment === filters.environment && snapshot.project === filters.project,
  );

  if (!matchingSnapshot) {
    return null;
  }

  if (filters.selectedHosts.length === 0) {
    return {
      ...matchingSnapshot,
      servers: [],
    };
  }

  return {
    ...matchingSnapshot,
    servers: matchingSnapshot.servers.filter((server) =>
      filters.selectedHosts.includes(server.alias),
    ),
  };
};