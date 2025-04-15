import { useState } from "react";
import Banner from "../Banner";
import NavBar from "../NavBar";
import Rodape from "../Rodape";
import Operacao from "./operacao";
import estilo from './SuperCalculadora.module.scss';

export default function SuperCalculadora() {

    const [valor1, setValor1] = useState<number>(0);
    const [valor2, setValor2] = useState<number>(0);
    const [resultado, setResultado] = useState<number>(0);
    const [operacao, setOperacao] = useState<string>('+');

    // function calcularResultado() {
    //     let res = 0;
    //     switch (operacao) {
    //         case '+':
    //             res = valor1 + valor2;
    //             break;
    //         case '-':
    //             res = valor1 - valor2;
    //             break;
    //         case '*':
    //             res = valor1 * valor2;
    //             break;
    //         case '/':
    //             res = valor1 / valor2;
    //             break;
    //         default:
    //             res = 0;
    //     }
    //     setResultado(res);
    // }

    return (
        <>
        <NavBar />
        <Banner /> 
        <h1>Super Calculadora </h1>

        <div>
            <label>
                Valor 1:
                <input type="number" value={valor1} onChange={(e) => setValor1(Number(e.target.value))} />
            </label> 
            <br />
            <label>
                Valor 2:
                <input type="number" value={valor2} onChange={(e) => setValor2(Number(e.target.value))} />
            </label>
            <br />
            {/* <button id="calcular" onClick={calcularResultado}>Calcular</button> */}
        </div>
        {/* 
        // Rosa pastel: #FFD1DC
        // Azul bebê: #ADD8E6
        // Verde menta: #E0FFFF
        // Amarelo claro: #FFFACD 
        // */}
        <div className={estilo.container}>
            <div className={estilo.item}><Operacao valor1={valor1} valor2={valor2} operacao="+" corFundo="#FFD1DC" /></div>
            <div className={estilo.item}><Operacao valor1={valor1} valor2={valor2} operacao="-" corFundo="#ADD8E6"/></div>
            <div className={estilo.item}><Operacao valor1={valor1} valor2={valor2} operacao="*" corFundo="#E0FFFF"/></div>
            <div className={estilo.item}><Operacao valor1={valor1} valor2={valor2} operacao="/" corFundo="#FFFACD"/></div>
        </div>
            
        <Rodape />
        </>
    )
    
}    