import "./Users.css"
import {useEffect, useState} from 'react';
import {getUsers} from '../../api/usersApi.ts';
export default function Users () {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    const data = await getUsers();
    return data.data
  }

  useEffect(() => {
    getAllUsers().then(data => setUsers(data))
  }, [])

  return <div>
    {users.map(item => (<p key={item.id}>{item?.email}</p>))}
  </div>
}
