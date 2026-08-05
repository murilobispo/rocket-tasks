import { isRouteErrorResponse, useRouteError } from 'react-router'

export default function ErrorPage() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        return (
          <>
            <h1>404</h1>
            <p>Page not found.</p>
          </>
        )

      default:
        return (
          <>
            <h1>{error.status}</h1>
            <p>{error.statusText}</p>
          </>
        )
    }
  }

  if (error instanceof Error) {
    return (
      <>
        <h1>Something went wrong</h1>
        <p>{error.message}</p>
      </>
    );
  }

  return <h1>Unknown error.</h1>;
}