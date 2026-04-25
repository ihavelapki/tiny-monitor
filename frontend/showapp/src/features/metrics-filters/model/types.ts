import type { ServerScopeFiltersState } from '../../server-scope-filters';
import type { TimeRangeOption } from '../../time-range-filter';

export type MetricsFiltersState = {
  scope: ServerScopeFiltersState;
  timeRange: TimeRangeOption;
};