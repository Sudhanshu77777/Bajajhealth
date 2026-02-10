
export default function errorHandler(err, req, res, next) {
 
  console.error(`[ERROR] ${req.method} ${req.originalUrl}`);
  console.error(err.stack || err);

  let statusCode = err.status || 500;

  if (err.name === 'SyntaxError' && err.status === 400 && 'body' in err) {
    statusCode = 400;
    err.message = 'Invalid JSON payload';
  }

  let clientMessage = err.message || 'Something went wrong';

  if (statusCode === 500 && process.env.NODE_ENV !== 'development') {
    clientMessage = 'Internal server error';
  }

  res.status(statusCode).json({
    is_success: false,
    message: clientMessage,

    error: err.name || 'ServerError',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}