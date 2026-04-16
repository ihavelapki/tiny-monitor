import { useState } from 'react';

import type { ServerScopeFiltersState } from './types';

const initialState: ServerScopeFiltersState = {
  environment: 'dev',
  project: 'default',
  selectedHosts: ['host1', 'host2', 'host3']
};

export const useServerScopeFilters = () => {
  const [filters, setFilters] = useState<ServerScopeFiltersState>(initialState);

  const setEnvironment = (environment: string) => {
    setFilters((prev) => ({
      ...prev,
      environment,
    }));
  };

  const setProject = (project: string) => {
    setFilters((prev) => ({
      ...prev,
      project,
    }));
  };

  const setSelectedHosts = (selectedHosts: string[]) => {
    setFilters((prev) => ({
      ...prev,
      selectedHosts,
    }));
  };

  const selectAllHosts = (hosts: string[]) => {
    setFilters((prev) => ({
      ...prev,
      selectedHosts: hosts,
    }));
  };

  const clearHosts = () => {
    setFilters((prev) => ({
      ...prev,
      selectedHosts: [],
    }));
  };

  return {
    filters,
    setEnvironment,
    setProject,
    setSelectedHosts,
    selectAllHosts,
    clearHosts,
  };
};