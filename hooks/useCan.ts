import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

type useCanParam = {
  permissions?: string[];
  roles?: string[];
};

export function useCan({ permissions = [], roles = [] }: useCanParam) {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return false;
  }

  if (permissions?.length > 0) {
    const hasAllPermissions = permissions?.every((permissions) => {
      return user?.permissions.includes(permissions);
    });
    if (!hasAllPermissions) {
      return false;
    }
  }

  if (roles?.length > 0) {
    const hasAllRoles = roles?.some((roles) => {
      return user?.roles.includes(roles);
    });
    if (!hasAllRoles) {
      return false;
    }
  }

  return true;
}
