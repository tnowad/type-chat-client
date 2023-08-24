import useAuth from "@/hooks/useAuth";
import React from "react";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithAuth: React.FC<P> = (props) => {
    const auth = useAuth();

    if (auth.user) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };

  WithAuth.displayName = `withAuth(${
    WrappedComponent.displayName ?? WrappedComponent.name
  })`;

  return WithAuth;
};

export default withAuth;
