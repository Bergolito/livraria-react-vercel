import { Box } from "@mui/material";
import { useState } from "react";

export default function Operacao(
    { valor1, valor2, operacao, corFundo }: 
    { valor1: number; valor2: number; operacao: string, corFundo?: string }) {

    const [resultado, setResultado] = useState<number>(0);  
    
    const estilos = {
        border: '1px solid #ccc',
        padding: '10px',
        background: corFundo ? corFundo : '#ADD8E6',
    };

    function calcularResultado() {
        let res = 0;
        switch (operacao) {
            case '+':
                res = valor1 + valor2;
                break;
            case '-':
                res = valor1 - valor2;
                break;
            case '*':
                res = valor1 * valor2;
                break;
            case '/':
                res = valor1 / valor2;
                break;
            default:
                res = 0;
        }
        setResultado(res);
    }

    return (
        // Rosa pastel: #FFD1DC
        // Azul bebê: #ADD8E6
        // Verde menta: #E0FFFF
        // Amarelo claro: #FFFACD
        <div className="direita" style={estilos}>
            <h2>Operação: {operacao === '+'?'Soma':operacao === '-'?'Subtração':operacao === '*'?'Multiplicação':operacao === '/'?'Divisão':'Outra Operação'}</h2>
            <label>
                Número 1: <input type="text" value={valor1} readOnly/>
            </label>
            <br />
            <label>
                Número 2: <input type="text" value={valor2} readOnly/>
            </label>
            <br />
            <button onClick={calcularResultado}>Calcular</button>
            <p>Resultado: {resultado}</p>
        </div>
    );
}