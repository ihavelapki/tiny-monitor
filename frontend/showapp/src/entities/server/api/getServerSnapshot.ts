import { filterServerSnapshot } from '../lib/filterServerSnapshot';
import { mockServerSnapshots } from '../mock/servers';
import type { ServerSnapshot, ServerScopeQuery } from '../model/types';

export const getServerSnapshot = async (
  query: ServerScopeQuery,
): Promise<ServerSnapshot | null> => {
  return filterServerSnapshot(mockServerSnapshots, query);
};