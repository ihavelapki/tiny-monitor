import { filterServerSnapshot } from '../lib/filterServerSnapshot';
import { mockServerSnapshots } from '../mock/servers';
import type { ServerSnapshot } from '../model/types';

type GetServerSnapshotQuery = {
  environment: string;
  project: string;
  selectedHosts: string[];
};

export const getServerSnapshot = async (
  query: GetServerSnapshotQuery,
): Promise<ServerSnapshot | null> => {
  return filterServerSnapshot(mockServerSnapshots, query);
};