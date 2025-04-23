import axios from 'axios';
import { useEffect, useState } from 'react';
import ILivro from '../../interfaces/ILivro';
import GridLivros from './GridLivros';

const ListaLivros = () => {

  const [livros, setLivros] = useState<ILivro[]>([])

  const API_URL = process.env.API_URL 
  useEffect(() => {
      // obter livros
      axios.get(API_URL+'/livros')
        .then(resposta => {
          console.log('Livros => ',resposta.data)
          setLivros(resposta.data)
        })
        .catch(erro => {
          console.log(erro)
      })
    }, []  // Adicionando array de dependências vazio para evitar loop infinito
  )

  return (
    <>
    <h1>Lista de Livros</h1>
    <GridLivros livros={livros} colunas={3} />
    </>
  )
}

export default ListaLivros