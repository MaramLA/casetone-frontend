import { AxiosError } from 'axios'
import jwtDecode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { signInPath } from '../pathLinks'
import { activateUser } from '../redux/slices/Users/userSlice'
import { AppDispatch } from '../redux/store'
import { errorResponse, successResponse } from '../utils/messages'

const ActivateNewUser = () => {
  const { token } = useParams()
  const decoded = jwtDecode(String(token))
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const handleActivatAccount = async () => {
    try {
      dispatch(activateUser(String(token))).then((data) => {
        if (data.meta.requestStatus === 'fulfilled') {
          successResponse('User activated successfully')
          navigate(signInPath)
        }
      })
    } catch (error: AxiosError | any) {
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
