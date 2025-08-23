import { Permissions } from '@/constants/Permissions';

const protectedRoutes = [
  { path: /\/control-panel\/news(.*)/, permissions: [Permissions.ManageNews] },
  { path: /\/control-panel\/motd(.*)/, permissions: [Permissions.ManageNews] },
  {
    path: /\/control-panel\/users(.*)/,
    permissions: [Permissions.ManageUsers],
  },
];

export function canAccessRoute(route, permissions) {
  let routePerms = null;

  for (let { path, permissions } of protectedRoutes) {
    if (path instanceof RegExp && path.test(route)) {
      routePerms = permissions;
      break;
    }

    if (path === route) {
      routePerms = permissions;
      break;
    }
  }

  if (!routePerms) {
    return true;
  }

  if (typeof permissions === 'string') {
    permissions = [permissions];
  }

  for (let r of permissions) {
    if (routePerms.includes(r)) {
      return true;
    }
  }

  return false;
}
