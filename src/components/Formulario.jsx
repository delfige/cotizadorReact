import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function Formulario() {
    const [tiposPropiedad, setTiposPropiedad] = useState([]);
    const [ubicaciones, setUbicaciones] = useState([]);
    const [selectedTipoPropiedad, setSelectedTipoPropiedad] = useState('');
    const [selectedUbicacion, setSelectedUbicacion] = useState('');
    const [metrosCuadrados, setMetrosCuadrados] = useState('');
    const [cotizacion, setCotizacion] = useState('');
    const [errorMensaje, setErrorMensaje] = useState('');
    const [datosSeleccionados, setDatosSeleccionados] = useState({
        tipoPropiedad: '',
        ubicacion: '',
        metrosCuadrados: '',
    });


  
    useEffect(() => {

      const fetchData = async () => {
        try {
          const response = await fetch('datos.json');
          const data = await response.json();
  
          const propiedades = data.filter(item => item.categoria === 'propiedad');
          const ubicaciones = data.filter(item => item.categoria === 'ubicacion');
  
          // Almacenar en el estado local
          setTiposPropiedad(propiedades);
          setUbicaciones(ubicaciones);
        } catch (error) {
          console.error('Error al obtener datos:', error);
        }
      };
  
      fetchData(); 
    }, []); 
  
    const calcularCotizacion = () => {

        if (parseFloat(metrosCuadrados) < 20) {
          setErrorMensaje('Ingrese un número mayor o igual a 20 para los metros cuadrados.');
          return;
        }
        if (!selectedTipoPropiedad || !selectedUbicacion) {
          setErrorMensaje('Seleccione un tipo de propiedad y una ubicación.');
          return;
        }
      
      
        const factorPropiedad = obtenerFactorPorTipo(selectedTipoPropiedad, tiposPropiedad);
        const factorUbicacion = obtenerFactorPorTipo(selectedUbicacion, ubicaciones);
      
     
        const costoM2 = 35.86;
      

        
      

        const resultado = costoM2 * factorPropiedad * factorUbicacion * parseFloat(metrosCuadrados);
        console.log('Resultado sin formato:', resultado);
      
        setCotizacion(resultado.toFixed(2));
        Swal.fire({
          icon: 'success',
          title: 'Cotización realizada con éxito',
          showConfirmButton: false,
          timer: 1500,
      });
      
        setErrorMensaje('');
        setDatosSeleccionados({
            tipoPropiedad: selectedTipoPropiedad,
            ubicacion: selectedUbicacion,
            metrosCuadrados: metrosCuadrados,
          });
        
      };
  
      const obtenerFactorPorTipo = (tipo, categorias) => {
        const dato = categorias.find(item => item.tipo === tipo);
        return dato ? dato.factor : 1;
      }
      const guardarCotizacion = () => {
        if (cotizacion !== '') {
            const nuevaCotizacion = {
                cotizacion: cotizacion,
                datosSeleccionados: { ...datosSeleccionados },
                fecha: new Date().toLocaleString(),
              };
          

          const cotizacionesGuardadasLocalStorage = JSON.parse(localStorage.getItem('cotizaciones')) || [];
      

          const nuevasCotizaciones = [...cotizacionesGuardadasLocalStorage, nuevaCotizacion];
      
      
          localStorage.setItem('cotizaciones', JSON.stringify(nuevasCotizaciones));

          Swal.fire({
            icon: 'success',
            title: 'Cotización guardada correctamente',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      };
    
  return (
    <div>
      <h1 className='title'>Seguros del hogar 🏠</h1>
    <form>
    <label>
      Tipo de Propiedad:
      <select value={selectedTipoPropiedad} onChange={(e) => setSelectedTipoPropiedad(e.target.value)}>
        <option value="">Seleccione un tipo de propiedad</option>
        {tiposPropiedad.map((tipo, index) => (
        <option key={index} value={tipo.tipo}>
            {tipo.tipo}
        </option>
        ))}
      </select>
    </label>
    <br />
    <label>
      Ubicación:
      <select value={selectedUbicacion} onChange={(e) => setSelectedUbicacion(e.target.value)}>
            <option value="">Seleccione una ubicación</option>
            {ubicaciones.map((ubicacion, index) => (
                <option key={index} value={ubicacion.tipo}>
                {ubicacion.tipo}
                </option>
            ))}
            </select>

    </label>
    <br />
    <label>
      Metros Cuadrados:
      <input type="number" min="20" value={metrosCuadrados} onChange={(e) => setMetrosCuadrados(e.target.value)} />
    </label>
    <br />

    
    {errorMensaje && <div style={{ color: 'red' }}>{errorMensaje}</div>}

    

    
    {cotizacion !== '' && (
        <div className='div-cotizacion'>
          <h2>Cotización:</h2>
          <p>${cotizacion}</p>

          <h2>Datos Seleccionados:</h2>
          <p>Tipo de Propiedad: {datosSeleccionados.tipoPropiedad}</p>
          <p>Ubicación: {datosSeleccionados.ubicacion}</p>
          <p>Metros Cuadrados: {datosSeleccionados.metrosCuadrados}</p>
        </div>
      )}

    
    <div className='div-botones'>
    <button type="button" onClick={calcularCotizacion}>
      Calcular Cotización
    </button>
    <button type="button" onClick={guardarCotizacion}>
        Guardar Cotización 
      </button>

    </div>
      
      <div className='div-historial'>

      <Link to="/historial">Ver tus cotizaciones📂</Link>
      </div>
  </form>
  </div>
  );
}

export default Formulario;
