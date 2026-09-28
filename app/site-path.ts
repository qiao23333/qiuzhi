const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function sitePath(path: string): string {
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function currentRoute(): string {
  const pathname = window.location.pathname;
  const route = base && pathname.startsWith(`${base}/`) ? pathname.slice(base.length) : pathname;
  return route.replace(/\/+$/, '') || '/';
}
