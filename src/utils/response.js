



export function ErrorRes(res, message , status , error) {
  return res.status(status).json({
    success: false,
    message: message,
    error: error,
  });
}


export function SuccessRes(res, message, data , status = 200) {
  return res.status(status).json({
    success: true,
    message: message,
    data: data,
  });
}