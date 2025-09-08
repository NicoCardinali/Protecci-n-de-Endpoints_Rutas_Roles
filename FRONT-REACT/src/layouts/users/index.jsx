import { Routes, Route } from 'react-router-dom';
import UsersView from './UsersView';
import UserForm from './UserForm';
import UserRol from './UserRol'

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UsersView />} />
      <Route path="/crear" element={<UserForm />} />
      <Route path="/editar/:id" element={<UserForm />} />
      <Route path="/editar-rol" element={<UserRol />} />
    </Routes>
  );
}
