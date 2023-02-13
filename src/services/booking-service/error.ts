function ForbiddenError(message: string) {
  return {
    name: "ForbiddenError",
    nameCatch: "ForbiddenError",
    message
  };
}

function NotFoundError(message: string) {
  return {
    name: "NotFoundError",
    nameCatch: "NotFound",
    message
  };
}

const error = {
  ForbiddenError,
  NotFoundError
};

export default error;

