import './Users.css';
import React, { useEffect, useState } from 'react';
import { getRoles, getUsers, updateRole } from '../../api/usersApi.ts';
import {
  Button,
  MenuItem,
  Paper, Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  const getAllUsers = async () => {
    const data = await getUsers();
    return data.data;
  };

  const getAllRoles = async () => {
    const data = await getRoles();
    return data.data;
  }

  const updateUserRole = async (roleName, userId) => {
    const data = await updateRole(roleName, userId).then(() => {
    location.reload()
    });
  }

  useEffect(() => {
    getAllUsers().then(data => setUsers(data));
    getAllRoles().then(data => setRoles(data));
  }, []);

  return <div>
    <Button
      variant="contained"
      sx={{mt:2, ml:2}}
      onClick={() => navigate("/")}
    >
      Grįžti atgal
    </Button>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, mt: 3 }} aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell>Vardas</TableCell>
            <TableCell>Pavardė</TableCell>
            <TableCell>El. paštas</TableCell>
            <TableCell>Rolė</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
            key={user.id}
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
              <TableCell component="th" scope="row">
                {user.firstName}
              </TableCell>
              <TableCell>
                {user.lastName}
              </TableCell>
              <TableCell>
                {user.email}
              </TableCell>
              <TableCell>
                <Select
                  sx={{minWidth:200}}
                  id="user-role-select"
                  value={user.role}
                  onChange={(e) => {updateUserRole(e.target.value, user.id)}}
                >
                  {roles?.map(role =>
                    <MenuItem value={role}>{role}</MenuItem>,
                  )}
                </Select>
              </TableCell>
            </TableRow>
            ))}
        </TableBody>
      </Table>

    </TableContainer>
  </div>;
}
