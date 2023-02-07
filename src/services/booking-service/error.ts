function ForbiddenError(message: string) {
  return {
    name: "ForbiddenError",
    message
  };
}

function NotFoundError(message: string) {
  return {
    name: "NotFound",
    message
  };
}

const error = {
  ForbiddenError,
  NotFoundError
};

export default error;

