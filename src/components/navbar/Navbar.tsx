import "./Navbar.css"
import { useNavigate } from 'react-router-dom';
import {getAuthToken, setAuthToken} from '../../helpers/axiosHelper.ts';


export default function Navbar () {
  const navigate = useNavigate();

  const logout = () => {
    setAuthToken(null);
    navigate('/login')
  }

  return (
    <div className="navbar">
      <button>
        Mano renginiai
      </button>
      <button onClick={()=> navigate('/create-event')}>
        Sukurti Rengini
      </button>
      <p>
        URRS
      </p>
      {getAuthToken() ?
      <button onClick={logout}>
        Atsijungti
      </button> :
        <button>
          Prisijungti
        </button>
      }
    </div>
  )
}
