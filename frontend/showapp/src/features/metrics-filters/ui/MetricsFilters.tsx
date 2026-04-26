import { ServerScopeFilters } from '../../server-scope-filters';
import { TimeRangeFilter } from '../../time-range-filter';
import type { TimeRangeOption } from '../../time-range-filter';

type MetricsFiltersProps = {
  environment: string;
  project: string;
  selectedHosts: string[];
  timeRange: TimeRangeOption;
  environmentOptions: string[];
  projectOptions: string[];
  hostOptions: string[];
  onEnvironmentChange: (value: string) => void;
  onProjectChange: (value: string) => void;
  onHostsChange: (value: string[]) => void;
  onSelectAllHosts: () => void;
  onClearHosts: () => void;
  onTimeRangeChange: (value: TimeRangeOption) => void;
};

export const MetricsFilters = ({
  environment,
  project,
  selectedHosts,
  timeRange,
  environmentOptions,
  projectOptions,
  hostOptions,
  onEnvironmentChange,
  onProjectChange,
  onHostsChange,
  onSelectAllHosts,
  onClearHosts,
  onTimeRangeChange,
}: MetricsFiltersProps) => {
  return (
    <div className="surface-card metrics-filters">
      <div className="metrics-filters__row">
        <div className="metrics-filters__scope">
          <ServerScopeFilters
            environment={environment}
            project={project}
            selectedHosts={selectedHosts}
            environmentOptions={environmentOptions}
            projectOptions={projectOptions}
            hostOptions={hostOptions}
            onEnvironmentChange={onEnvironmentChange}
            onProjectChange={onProjectChange}
            onHostsChange={onHostsChange}
            onSelectAllHosts={onSelectAllHosts}
            onClearHosts={onClearHosts}
          />
        </div>
        <div className="surface-card server-scope-filters">
          <div className="metrics-filters__time-range">
            <TimeRangeFilter value={timeRange} onChange={onTimeRangeChange} />
          </div>
        </div>
      </div>
    </div>
  );
};