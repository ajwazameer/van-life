import {
  useRouteError,
  isRouteErrorResponse,
  Navigate,
} from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  // Any redirect-shaped error (302/301/etc with a Location) → just navigate
  if (
    error &&
    typeof error.status === "number" &&
    error.status >= 300 &&
    error.status < 400
  ) {
    const location =
      typeof error.headers?.get === "function"
        ? error.headers.get("Location")
        : error.headers?.map?.location;
    return <Navigate to={location || "/login"} replace />;
  }

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>Error: {error.status}</h1>
        <pre>{error.statusText}</pre>
      </>
    );
  }

  return <h1>Error: {error?.message || "Something went wrong"}</h1>;
}

// import { useRouteError } from "react-router-dom";
// export default function Error() {
//   const error = useRouteError();

//   return (
//     <>
//       <h1>Error: {error.message}</h1>
//       <pre>
//         {error.status} - {error.statusText}
//       </pre>
//       ;
//     </>
//   );
// }
