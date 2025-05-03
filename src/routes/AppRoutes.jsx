import styles from './AppRoutes.module.css'
import TelaInicial from '../pages/Tela Inicial/TelaInicial';
import Header from '../pages/Header/Header';
import ChamadosAnteriores from '../pages/Chamados Anteriores/ChamadosAnteriores';
import NovoChamado from '../pages/Novo Chamado/NovoChamado';
import ConsultaAnteriores from '../pages/Chamados Anteriores/Consulta/ConsultaAnteriores';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const AppRoutes = () => {
  return (
    <div className={styles.AppRoutes}>
        <BrowserRouter> 
          <Header />
          <Routes>
            <Route path="/" element={<TelaInicial/>}/>
            <Route path="/solicitacoesAnteriores" element={<ChamadosAnteriores/>}/>
            <Route path="/solicitacoesAnteriores/:id" element={<ConsultaAnteriores/>}/>
            <Route path="/novaSolicitacao" element={<NovoChamado/>} />
            <Route path="*" element={<Navigate to="/" replace={false}/> } />
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default AppRoutes;