import React from 'react';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NovoChamadoPadrão = () => {

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === "/novaSolicitacao") 
            navigate("/novaSolicitacao/new", { replace: true })
    },[navigate, location])

    return (
        <div style={{display: "flex", justifyContent: "center", marginTop: "300px"}}>
            <img src="/loading.svg" alt="Carregando"/>
        </div>
    )  
}

export default NovoChamadoPadrão;