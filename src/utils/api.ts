export function backendUrl(path: string) {
  const normalizedPath = path.startsWith('/')
    ? path
    : `/${path}`;

  if (
    window.location.hostname === 'localhost' &&
    window.location.port.startsWith('517')
  ) {
    return `http://localhost:8000${normalizedPath}`;
  }

  return normalizedPath;
}
