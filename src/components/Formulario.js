import React, { useState } from 'react';
import styled from '@emotion/styled';
import { obtenerDiferenciaYear, calcularMarca, obtenerPlan } from '../helper';
import PropTypes from 'prop-types';


const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center; 
    border-radius: 4px;
`;

const Label = styled.label`
     flex: 0 0 100px;
     border-radius: 4px;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #E1E1E1;
    -webkit-appearance: none;
    border-radius: 4px;
`;

const InputRadio = styled.input`
    margin: 0 1rem;
    border-radius: 4px;
`;

const Boton = styled.button`
    background-color: #00838F;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #fff;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    transition: background-color .3s ease; 
    
    &:hover {
        background-color: #26C6DA;
        cursor: pointer; 
    }
`;

const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    width: 60%;
    text-align: center;
    border-radius: 4px;
    margin-bottom: 2rem;
    align-items: center;
`;

const Formulario = ( {guardarResumen, guardarCargando} ) => {

    const [ datos, guardarDatos ] = useState({
        marca: '',
        year: '',
        plan: ''
    });

    const [ error, guardarError] = useState(false);

    //extrar los valors del state
    const { marca, year, plan } = datos;

    //leer dato del formulario y colocarlos en el state
    const obtenerFormulario = e => {
        guardarDatos ({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    const cotizarSeguro = e => {
        e.preventDefault();

        if(marca.trim() === '' || year.trim() === '' || plan.trim() === '') {
            guardarError(true);
            return;
        }

        guardarError(false);

        let resultado = 2000;

        //obtener la diferencia de años
        const diferencia = obtenerDiferenciaYear(year);
        console.log(diferencia);

        //Por cada año hay que restar el 3%
        resultado -= ((diferencia * 3) * resultado) / 100;

        //americano 15%
        //asiatico 5%
        //europeo 30%
        resultado = calcularMarca(marca) * resultado;

        //Plan basico aumenta 20%
        //Completo 50%
        const incrementoPlan = obtenerPlan(plan);
        resultado = parseFloat(incrementoPlan * resultado).toFixed(2);
        
        //Total

        guardarCargando(true);

        setTimeout(() => {
            //elimina spinner
            guardarCargando(false);
            //pasa el elemento al principal
            guardarResumen({
                cotizacion: Number(resultado),
                datos
            });
        }, 3000);
        
    }


    return ( 

        <form
            onSubmit = {cotizarSeguro}
        >

        { error ? <Error>Todos los campos son obligatorios</Error> : null}
            <Campo>
                <Label>Marca</Label>
                <Select
                    name='marca'
                    value={marca}
                    onChange= {obtenerFormulario}
                >
                    <option value="">-- Seleccione --</option>
                    <option value='americano'>Americano</option>
                    <option value='europeo'>Europeo</option>
                    <option value='asiatico'>Asiatico</option>
                </Select>
            </Campo>

            <Campo>
                <Label>Marca</Label>
                <Select
                    name='year'
                    value={year}
                    onChange= {obtenerFormulario}
                >
                <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>

            <Campo>
                <Label>Plan</Label>
                <InputRadio 
                    type='radio'
                    name='plan'
                    value='basico'
                    checked= {plan === 'basico'}
                    onChange= {obtenerFormulario}
                /> Básico

                <InputRadio 
                    type='radio'
                    name='plan'
                    value='completo'
                    checked = {plan === 'completo'}
                    onChange= {obtenerFormulario}
                /> Completo    
            </Campo>

            <Boton type='submit'>Cotizar </Boton>
        </form>

     );
}

Formulario.prototype = {
    guardarCargando: PropTypes.func.isRequired,
    guardarResumen: PropTypes.func.isRequired
}    
 
export default Formulario;