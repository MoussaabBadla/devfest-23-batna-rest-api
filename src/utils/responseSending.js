export const successResponse = (res, message, data,status) => {
    return res.status(status).json({
       status: 'success',
       message: message || 'Request successful',
       data: data || null,
     });
   };
 
 
 export const errorResponse = (res, message, statusCode = 500) => {
    return res.status(statusCode).json({
       status: 'error',
       message: message || 'Internal Server Error',
     });
   };