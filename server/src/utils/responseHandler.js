export const responseHandler = {
  success: (res, statusCode = 200, message = 'Success', data = null) => {
    return res.status(statusCode).json({
      success: true,
      message,
      ...(data && { data }),
    });
  },

  error: (res, statusCode = 500, message = 'Error', error = null) => {
    return res.status(statusCode).json({
      success: false,
      message,
      ...(process.env.NODE_ENV === 'development' && error && { error }),
    });
  },

  created: (res, message = 'Created successfully', data = null) => {
    return res.status(201).json({
      success: true,
      message,
      ...(data && { data }),
    });
  },

  notFound: (res, message = 'Resource not found') => {
    return res.status(404).json({
      success: false,
      message,
    });
  },

  badRequest: (res, message = 'Bad request') => {
    return res.status(400).json({
      success: false,
      message,
    });
  },

  unauthorized: (res, message = 'Unauthorized') => {
    return res.status(401).json({
      success: false,
      message,
    });
  },

  forbidden: (res, message = 'Forbidden') => {
    return res.status(403).json({
      success: false,
      message,
    });
  },
};
