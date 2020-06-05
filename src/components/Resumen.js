import React from 'react';
import styled from '@emotion/styled';
import { primerMayuscula } from '../helper';
import PropTypes from 'prop-types';

const ContenedorResumen = styled.div`
    padding: 1rem;
    text-align: center;
    background-color: #00838F;
    color: #fff;
    margin-top: 1rem;
    border-radius: 4px;
`;

const Resumen = ({ datos }) => {

    const { marca, year, plan } = datos;
    if (marca === '' || year === '' || plan === '') return null;

    return ( 
        <ContenedorResumen>
        <h2>Resumen de Cotización</h2>
        <ul>
            <li>Marca: {primerMayuscula(marca)} </li>
            <li>Año: {primerMayuscula(year)} </li>
            <li>Plan: {primerMayuscula(plan)} </li>
        </ul>
        </ContenedorResumen>
     );
}

Resumen.protoTypes = {
    datos: PropTypes.object.isRequired
}
 
export default Resumen;
