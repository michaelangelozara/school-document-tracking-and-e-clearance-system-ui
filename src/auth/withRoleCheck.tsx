import React from "react";
import { Navigate } from "react-router-dom";

type WithRoleCheckProps = {
  allowedRoles: string[];
};

const withRoleCheck = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const RoleCheckedComponent: React.FC<P & WithRoleCheckProps> = ({
    allowedRoles,
    ...props
  }) => {
    // const { user } = useAuth();

    // if (!user) {
    //   return <Navigate to="/login" replace />;
    // }

    // const isAuthorized = user.roles.some((role) => allowedRoles.includes(role));

    // if (!isAuthorized) {
    //   return <Navigate to="/unauthorized" replace />;
    // }

    return <WrappedComponent {...(props as P)} />;
  };

  return RoleCheckedComponent;
};

export default withRoleCheck;
