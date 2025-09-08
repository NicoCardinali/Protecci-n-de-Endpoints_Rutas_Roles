import { Formik, Form, Field } from "formik";
import { useUserContext } from "../../context/UserContext";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


export default function AdminRoleView() {
  const { users, editUser, getUsers } = useUserContext();
  const { user: currentUser } = useAuthContext();
  const [initialValues, setInitialValues] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const rolesInit = {};
    users.forEach(u => {
      rolesInit[u.id] = u.rol;
    });
    setInitialValues(rolesInit);
  }, [users]);

const handleSubmit = async (values) => {
  try {
    for (const userIdStr in values) {
      const userId = Number(userIdStr);
      const userToUpdate = users.find(u => u.id === userId);
      if (userToUpdate) {
        const updatedUser = { ...userToUpdate, rol: values[userIdStr] };
        await editUser(userId, updatedUser); 
      }
    }
    alert("Roles actualizados correctamente");
    navigate("/usuarios");
  } catch (error) {
    console.error(error);
    alert("Error al actualizar roles");
  }
};

  if (!["admin", "moderador"].includes(currentUser?.rol)) {
    return <p>No tienes permisos para ver esta página</p>;
  }

  return (
    <div className="p-d-flex p-flex-column p-align-center p-mt-3" style={{ width: "100%", maxWidth: "600px" }}>
      <h2>Administración de Roles</h2>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form className="p-d-flex p-flex-column p-gap-3">
            {users.map(u => (
              <div key={u.id} className="p-d-flex p-ai-center p-jc-between" style={{ gap: "10px" }}>
                <div style={{ width: "200px" }}>
                  {u.nombre} ({u.email})
                </div>
                <Field
                  as="select"
                  name={u.id.toString()}
                  value={values[u.id] || u.rol}
                  onChange={handleChange}
                  className="p-inputtext p-component"
                >
                  <option value="admin">Admin</option>
                  <option value="moderador">Moderador</option>
                  <option value="cliente">Cliente</option>
                </Field>
              </div>
            ))}
            <Button 
              type="submit" 
              label="Actualizar Roles" 
              className="p-button-success p-button-rounded" 
            />
            <Link to="/usuarios">
             <Button label="Ir al listado de usuarios" icon="pi pi-home" className="p-button-rounded p-button-secondary" />
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
}
