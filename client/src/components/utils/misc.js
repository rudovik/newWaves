export const USER_SERVER = '/api/users'
export const PRODUCT_SERVER = '/api/products'

export const getErrorPayload = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message || error.request
}
