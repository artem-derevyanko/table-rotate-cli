export const toLogEntry = (err: Error) => {
  return {
    level: 'error',
    data: {
      name: err.name,

      stack: err.stack,
      message: err.message,
    },
  };
};
