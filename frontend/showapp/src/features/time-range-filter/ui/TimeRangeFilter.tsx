import type { TimeRangeOption } from '../model/types';

type TimeRangeFilterProps = {
  value: TimeRangeOption;
  onChange: (value: TimeRangeOption) => void;
};

export const TimeRangeFilter = ({ value, onChange }: TimeRangeFilterProps) => {
  return (
    <div className="metrics-filters__group">
      <label className="filter-field__label" htmlFor="time-range-select">
        Time range
      </label>

      <select
        id="time-range-select"
        className="filter-field__control"
        value={value}
        onChange={(event) => onChange(event.target.value as TimeRangeOption)}
      >
        <option value="15m">15 minutes</option>
        <option value="30m">30 minutes</option>
        <option value="1h">1 hour</option>
        <option value="6h">6 hours</option>
        <option value="24h">24 hours</option>
      </select>
    </div>
  );
};