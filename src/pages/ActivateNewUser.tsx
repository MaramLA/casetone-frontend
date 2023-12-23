import jwtDecode from 'jwt-decode'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { signInPath } from '../pathLinks'
import { activateUser } from '../redux/slices/Users/userSlice'
import { AppDispatch, RootState } from '../redux/store'
import { errorResponse, successResponse } from '../utils/messages'

const ActivateNewUser = () => {
  const { token } = useParams()
  const decoded = jwtDecode(String(token))
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const { data, error } = useSelector((state: RootState) => state.usersReducer)

  useEffect(() => {
    if (data) {
      successResponse('User activated successfully')
      navigate(signInPath)
    }
  }, [data])

  useEffect(() => {
    if (error) {
      errorResponse(error)
    }
  }, [error])

  const handleActivatAccount = async () => {
    try {
      dispatch(activateUser(String(token))).then((data) => {
        if (data.meta.requestStatus === 'fulfilled') {
          successResponse('User activated successfully')
          navigate(signInPath)
        }
      })
    } catch (error: any) {
      errorResponse(error.response.data.msg)
    }
  }

  return (
    <main>
      <div className="error-container">
        <h2>Hello!</h2>
        <p>Click the button below to activate you account</p>
        <button onClick={handleActivatAccount}>Activate</button>
      </div>
    </main>
  )
}

export default ActivateNewUser
