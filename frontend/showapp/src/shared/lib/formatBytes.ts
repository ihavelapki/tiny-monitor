export const formatBytes = (value?: number): string => {
  if (value === undefined || value === null) {
    return 'unknown';
  }

  if (!Number.isFinite(value)) {
    return 'unknown';
  }

  if (value === 0) {
    return '0 B';
  }

  const units = ['B', 'KiB', 'MiB', 'GiB', 'TiB'];
  let size = value;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
};