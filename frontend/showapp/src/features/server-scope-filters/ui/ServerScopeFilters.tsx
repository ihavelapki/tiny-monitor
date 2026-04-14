import { useState } from 'react';

type ServerFiltersProps = {
  environment: string;
  project: string;
  selectedHosts: string[];
  environmentOptions: string[];
  projectOptions: string[];
  hostOptions: string[];
  onEnvironmentChange: (value: string) => void;
  onProjectChange: (value: string) => void;
  onHostsChange: (value: string[]) => void;
  onSelectAllHosts: () => void;
  onClearHosts: () => void;
};

export const ServerScopeFilters = ({
  environment,
  project,
  selectedHosts,
  environmentOptions,
  projectOptions,
  hostOptions,
  onEnvironmentChange,
  onProjectChange,
  onHostsChange,
  onSelectAllHosts,
  onClearHosts,
}: ServerFiltersProps) => {
  const [isHostsOpen, setIsHostsOpen] = useState(false);

  const handleHostToggle = (host: string) => {
    const isSelected = selectedHosts.includes(host);

    if (isSelected) {
      onHostsChange(selectedHosts.filter((item) => item !== host));
      return;
    }

    onHostsChange([...selectedHosts, host]);
  };

  const hostsLabel =
    selectedHosts.length === 0
      ? 'No hosts selected'
      : selectedHosts.length === hostOptions.length
        ? 'All hosts selected'
        : selectedHosts.join(', ');

  return (
    <div className="surface-card server-scope-filters">
      <div className="server-scope-filters__row">
        <div className="server-scope-filters__group">
          <label className="filter-field__label" htmlFor="environment-select">
            Environment
          </label>

          <select
            id="environment-select"
            className="filter-field__control"
            value={environment}
            onChange={(event) => onEnvironmentChange(event.target.value)}
          >
            {environmentOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="server-scope-filters__group">
          <label className="filter-field__label" htmlFor="project-select">
            Project
          </label>

          <select
            id="project-select"
            className="filter-field__control"
            value={project}
            onChange={(event) => onProjectChange(event.target.value)}
          >
            {projectOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="server-scope-filters__group server-scope-filters__group--hosts">
          <label className="filter-field__label">Hosts</label>

          <div className="hosts-dropdown">
            <button
              type="button"
              className="filter-field__control hosts-dropdown__trigger"
              onClick={() => setIsHostsOpen((prev) => !prev)}
            >
              <span className="hosts-dropdown__value">{hostsLabel}</span>
              <span className="hosts-dropdown__arrow">{isHostsOpen ? '▲' : '▼'}</span>
            </button>

            {isHostsOpen && (
              <div className="hosts-dropdown__menu">
                <div className="hosts-dropdown__actions">
                  <button type="button" className="button" onClick={onSelectAllHosts}>
                    Select all
                  </button>

                  <button type="button" className="button" onClick={onClearHosts}>
                    Clear
                  </button>
                </div>

                <div className="hosts-dropdown__list">
                  {hostOptions.map((host) => {
                    const isChecked = selectedHosts.includes(host);

                    return (
                      <label key={host} className="hosts-dropdown__item">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleHostToggle(host)}
                        />
                        <span>{host}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};