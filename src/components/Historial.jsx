import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
const Historial = () => {
  const cotizacionesGuardadasLocalStorage = JSON.parse(localStorage.getItem('cotizaciones')) || [];
  const borrarTodo = () => {
   
    localStorage.removeItem('cotizaciones');
    
   
  
 
    Swal.fire({
      icon: "info",
      title: "Cotizaciones eliminadas",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    }).then(() => {
     
      window.location.reload();
    });
  
  };
  return (
    <div>

      <h1>Historial de Cotizaciones</h1>
      <div className='div-guardado'>
      
      <ul>
        <div className='titulos'>

        <p>Fecha</p>
        <p>Cotizacion</p>
        <p>Tipo de propiedad </p>
        <p>Ubicacion
        </p>
        <p>m2</p>
        </div>
        {cotizacionesGuardadasLocalStorage.map((cotizacion, index) => (
          <li key={index}>
            <p>{cotizacion.fecha} </p>
            <p>${cotizacion.cotizacion} </p>
            <p>{cotizacion.datosSeleccionados.tipoPropiedad}  </p>
            <p>{cotizacion.datosSeleccionados.ubicacion} </p>
            <p>{cotizacion.datosSeleccionados.metrosCuadrados}  </p>
          </li>
          
        ))}
      </ul>
      </div>
      <div className='div-form'>

        <Link to="/">
        <button> 🔙Volver a Formulario</button>
      </Link>
        <button onClick={borrarTodo}>Borrar cotizaciones🗑</button>
      </div>
    </div>
  );
};

Historial.propTypes = {
  cotizacionesGuardadas: PropTypes.array.isRequired,
};




export default Historial;