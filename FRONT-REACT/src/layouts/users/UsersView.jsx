import { useUserContext } from '../../context/UserContext';
import { useAuthContext } from '../../context/AuthContext';
import { exportToPDF } from '../../utils/ExportToPdf';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';  
import { Column } from 'primereact/column';        
import { Button } from 'primereact/button';   

export default function UsersView() {
  const { users, deleteUser, loading, error } = useUserContext();
  const { user } = useAuthContext();

  const handleExport = () => {
    exportToPDF(users, 'Usuarios', ['nombre', 'email', 'edad']);
  };

  return (
    <div>
      <h2>👤 Lista de Usuarios 👤</h2>

      <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
        {(user?.rol === 'admin' || user?.rol === 'moderador') && <Link to="/usuarios/crear">
          <Button label="Crear nuevo usuario" icon="pi pi-plus" className="p-button-rounded p-button-success" />
        </Link>}
        <Link to="/">
          <Button label="Volver al inicio" icon="pi pi-home" className="p-button-rounded p-button-secondary" />
        </Link>
        <Button label="Exportar PDF" icon="pi pi-file-pdf" className="p-button-rounded p-button-warning" onClick={handleExport} />
        {user?.rol === 'admin' && <Link to="/usuarios/editar-rol">
          <Button label="Editar Roles" className="p-button-rounded p-button-secondary" />
        </Link>}
      </div>

      {loading && <p>Cargando usuarios...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <DataTable 
        value={Array.isArray(users) ? users : []} 
        paginator={false} 
        className="p-datatable-sm p-shadow-2 mt-4"
      >
        <Column field="nombre" header="Nombre" />
        <Column field="email" header="Email" />
        <Column field="edad" header="Edad" />

        {(user?.rol === 'admin' || user?.rol === 'moderador') && <Column field="rol" header="Rol" />}
        
        {user?.rol === 'admin' && (
          <Column 
            header="Acciones" 
            body={(rowData) => (
              <>
                <Link to={`/usuarios/editar/${rowData.id}`}>
                  <Button label="Editar" icon="pi pi-pencil" className="p-button-rounded p-button-info mr-2" />
                </Link>
                <Button 
                  label="Eliminar" 
                  icon="pi pi-trash" 
                  className="p-button-rounded p-button-danger" 
                  onClick={() => deleteUser(rowData.id)} 
                />
              </>
            )}
          />
        )}
      </DataTable>
    </div>
  );
}