export const ErrorFallback = ({ error }: { error: Error }) => {
  if (error.message.includes("data is undefined")) {
    return (
      <div role="alert">
        <p>Sorry, we couldn't find the data you were looking.</p>
      </div>
    );
  }

  return (
    <div role="alert">
      <p>Something went wrong</p>
    </div>
  );
};
