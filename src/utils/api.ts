export function backendUrl(path: string) {
  const normalizedPath = path.startsWith('/')
    ? path
    : `/${path}`;

  if (
    window.location.hostname === 'localhost' &&
    window.location.port.startsWith('517')
  ) {
    return `http://localhost:3000${normalizedPath}`;
  }

  const configuredApiBase = import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/$/, '');
  return configuredApiBase ? `${configuredApiBase}${normalizedPath}` : normalizedPath;
}
