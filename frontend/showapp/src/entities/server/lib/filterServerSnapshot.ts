import type { ServerSnapshot, ServerScopeQuery } from '../model/types';

export const filterServerSnapshot = (
  snapshots: ServerSnapshot[],
  filters: ServerScopeQuery,
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