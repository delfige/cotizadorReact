
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import Formulario from './components/Formulario';
import Historial from './components/Historial';
import { useState } from 'react';

const App = () => {
  
  const [cotizacionesGuardadas, setCotizacionesGuardadas] = useState([]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Formulario setCotizacionesGuardadas={setCotizacionesGuardadas} />}
        />
        <Route
          path="/historial"
          element={<Historial cotizacionesGuardadas={cotizacionesGuardadas} setCotizacionesGuardadas={setCotizacionesGuardadas} />}
        />
      </Routes>
    </Router>
  );
}

export default App;