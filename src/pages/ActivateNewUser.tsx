import jwtDecode from 'jwt-decode'
import { useNavigate, useParams } from 'react-router-dom'
import { signInPath } from '../pathLinks'
import { toast } from 'react-toastify'
import { AppDispatch } from '../redux/store'
import { activateUser } from '../redux/slices/Users/userSlice'
import { useDispatch } from 'react-redux'

const ActivateNewUser = () => {
  const { token } = useParams()
  const decoded = jwtDecode(String(token))
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const handleActivatAccount = async () => {
    try {
      // const response = await activateUserAccount(String(token))
      dispatch(activateUser(String(token)))
      toast.success('User activated successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
      navigate(signInPath)
    } catch (error: any) {
      console.log(error.response.data.message)
      toast.error(error.response.data.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
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
