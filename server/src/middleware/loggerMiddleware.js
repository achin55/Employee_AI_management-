export const loggerMiddleware = (req, res, next) => {
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    console.log(
      `${req.method} ${req.originalUrl} - Status: ${res.statusCode} - Duration: ${duration}ms`
    );
  });

  next();
};
