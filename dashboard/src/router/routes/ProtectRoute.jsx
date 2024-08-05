import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ route, children }) => {
  const { role, userInfo } = useSelector((state) => state.auth);

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (route.role) {
    if (role === route.role) {
      if (route.status) {
        if (route.status === userInfo.status) {
          return <Suspense fallback={null}>{children}</Suspense>;
        } else {
          return userInfo.status === "pending" ? (
            <Navigate to="/seller/account-pending" replace />
          ) : (
            <Navigate to="/seller/account-inactive" replace />
          );
        }
      } else {
        return <Suspense fallback={null}>{children}</Suspense>;
      }
    } else if (route.visibility) {
      if (route.visibility.includes(userInfo.status)) {
        return <Suspense fallback={null}>{children}</Suspense>;
      } else {
        return <Navigate to="/seller/account-inactive" replace />;
      }
    } else {
      return <Navigate to="/unauthorized" replace />;
    }
  } else if (route.ability === "seller") {
    return <Suspense fallback={null}>{children}</Suspense>;
  } else {
    return <Navigate to="/unauthorized" replace />;
  }
};

export default ProtectRoute;
