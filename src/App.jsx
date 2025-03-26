import "@fontsource/poppins";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import styles from './App.module.css'
import TelaInicial from './Compontents/Tela Inicial/TelaInicial';
import Header from './Compontents/Header';
import ChamadosAnteriores from './Compontents/Chamados Anteriores/ChamadosAnteriores';
import NovoChamado from './Compontents/Novo Chamado/NovoChamado';

function App() {

  return (
      <div className={styles.App}>
        <Router> 
          <Header />
          <Routes>
            <Route path="/" element={<TelaInicial/>}/>
            <Route path="/anteriores" element={<ChamadosAnteriores/>}/>
            <Route path="/novaSolicitacao" element={<NovoChamado/>} />
            <Route path="*" element={<Navigate to="/" replace={false}/> } />
          </Routes>
        </Router>

      </div>
  )
}

export default App
