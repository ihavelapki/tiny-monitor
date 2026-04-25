import { useState } from 'react';

import type { TimeRangeOption } from '../../time-range-filter';
import type { MetricsFiltersState } from './types';

const initialState: MetricsFiltersState = {
  scope: {
    environment: 'dev',
    project: 'default',
    selectedHosts: ['master'],
  },
  timeRange: '1h',
};

export const useMetricsFilters = () => {
  const [filters, setFilters] = useState<MetricsFiltersState>(initialState);

  const setEnvironment = (environment: string) => {
    setFilters((prev) => ({
      ...prev,
      scope: {
        ...prev.scope,
        environment,
      },
    }));
  };

  const setProject = (project: string) => {
    setFilters((prev) => ({
      ...prev,
      scope: {
        ...prev.scope,
        project,
      },
    }));
  };

  const setSelectedHosts = (selectedHosts: string[]) => {
    setFilters((prev) => ({
      ...prev,
      scope: {
        ...prev.scope,
        selectedHosts,
      },
    }));
  };

  const selectAllHosts = (hosts: string[]) => {
    setFilters((prev) => ({
      ...prev,
      scope: {
        ...prev.scope,
        selectedHosts: hosts,
      },
    }));
  };

  const clearHosts = () => {
    setFilters((prev) => ({
      ...prev,
      scope: {
        ...prev.scope,
        selectedHosts: [],
      },
    }));
  };

  const setTimeRange = (timeRange: TimeRangeOption) => {
    setFilters((prev) => ({
      ...prev,
      timeRange,
    }));
  };

  return {
    filters,
    setEnvironment,
    setProject,
    setSelectedHosts,
    selectAllHosts,
    clearHosts,
    setTimeRange,
  };
};