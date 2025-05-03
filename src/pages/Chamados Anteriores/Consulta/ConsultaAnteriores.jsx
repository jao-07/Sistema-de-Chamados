import { useParams } from 'react-router-dom';

function ConsultaAnteriores() {

    const { id } = useParams();
    return (
        <div>Consulta do chamado {id}</div>
    )
}

export default ConsultaAnteriores