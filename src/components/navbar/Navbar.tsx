import "./Navbar.css"
import {useNavigate} from 'react-router-dom';
import {getAuthToken, getUserRole, setAuthToken} from '../../helpers/axiosHelper.ts';
import {Button} from '@mui/material';
import React from 'react';


export default function Navbar() {
  const navigate = useNavigate();
  const userRole = getUserRole();

  const logout = () => {
    setAuthToken(null);
    navigate('/login')
  }

  return (
    <div className="navbar">
      {userRole=="ADMIN" &&
        <Button
        variant="contained"
        color="primary"
        size="small"
        sx={{fontSize: 12}}
        onClick={() => navigate("/users")}
      >
        Vartotojai
      </Button>}
      {userRole!="ADMIN" &&
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/registered-events")}
          size="small"
          sx={{fontSize: 12}}
        >
          Mano užsiregistruoti renginiai
        </Button>
      }

      {userRole == "ORGANIZER" &&
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/created-events")}
            size="small"
            sx={{fontSize: 12}}
          >
            Mano sukurti renginiai
          </Button>

          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{fontSize: 12}}
            onClick={() => navigate('/create-event')}
          >
            Sukurti renginį
          </Button>
        </>
      }
      {getAuthToken() ?
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={logout}
          sx={{fontSize: 12}}>
          Atsijungti
        </Button> :
        <button>
          Prisijungti
        </button>
      }
    </div>
  )
}
