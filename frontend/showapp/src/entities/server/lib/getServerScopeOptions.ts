import type { ServerSnapshot } from '../model/types';

export type ServerScopeOptions = {
  environmentOptions: string[];
  projectOptions: string[];
  hostOptions: string[];
};

type GetServerScopeOptionsParams = {
  snapshots: ServerSnapshot[];
  environment?: string;
  project?: string;
};

export const getServerScopeOptions = ({
  snapshots,
  environment,
  project,
}: GetServerScopeOptionsParams): ServerScopeOptions => {
  const environmentOptions = Array.from(
    new Set(snapshots.map((snapshot) => snapshot.environment)),
  ).sort();

  const projectOptions = Array.from(
    new Set(
      snapshots
        .filter((snapshot) => (environment ? snapshot.environment === environment : true))
        .map((snapshot) => snapshot.project),
    ),
  ).sort();

  const matchingSnapshot = snapshots.find(
    (snapshot) =>
      (environment ? snapshot.environment === environment : true) &&
      (project ? snapshot.project === project : true),
  );

  const hostOptions = matchingSnapshot
    ? matchingSnapshot.servers.map((server) => server.alias).sort()
    : [];

  return {
    environmentOptions,
    projectOptions,
    hostOptions,
  };
};