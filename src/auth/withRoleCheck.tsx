import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type WithAuthorityCheckProps = {
  allowedAuthorities: string[];
};

const withRoleCheck = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AuthorityCheckedComponent: React.FC<P & WithAuthorityCheckProps> = ({
    allowedAuthorities,
    ...props
  }) => {
    const { user, isTokenChecking } = useAuth();

    if (isTokenChecking) {
      return <div>Loding ...</div>;
    }

    if (allowedAuthorities.length !== 0) {
      const isAuthorized = user?.authorities?.some((role) =>
        allowedAuthorities.includes(role)
      );

      if (!isAuthorized && user?.authorities?.length !== undefined) {
        return <Navigate to="/unauthorized" replace />;
      }
    }

    return <WrappedComponent {...(props as P)} />;
  };

  return AuthorityCheckedComponent;
};

export default withRoleCheck;
