import { DecodedUser } from '../redux/slices/products/productSlice'

export function isDecodedUser(obj: unknown): obj is DecodedUser {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'username' in obj &&
    'isAdmin' in obj &&
    'user_id' in obj
  )
}
