// responseBuilder.js

// Define a function to build success responses
export const successResponse = (data, message = "Success", success = true) => {
  return {
    success,
    message,
    data,
  }
}

export const successWithTokenResponse = (data, message = "Success", token, success = true) => {
  return {
    success,
    message,
    data,
    token
  }
}

export const successWithPagination = (data, currentPage,totalPages, success = true) => {
  return {
    success,
    data,
    currentPage,
    totalPages
  }
}

export const errorResponse = (message, success = false) => {
  return {
    message,
    success,
  };
}


