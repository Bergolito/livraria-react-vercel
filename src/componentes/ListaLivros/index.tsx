import axios from 'axios';
import { useEffect, useState } from 'react';
import ILivro from '../../interfaces/ILivro';
import GridLivros from './GridLivros';

const ListaLivros = () => {

  const [livros, setLivros] = useState<ILivro[]>([])

  const API_URL = process.env.API_URL || 'http://localhost:3500' 
  useEffect(() => {
      // obter livros
      axios.get(API_URL+'/livros')
        .then(resposta => {
          console.log(resposta.data)
          setLivros(resposta.data)
        })
        .catch(erro => {
          console.log(erro)
      })
    }
  )

  return (
    <>
    <h1>Lista de Livros</h1>
    <GridLivros livros={livros} colunas={3} />
    </>
  )
}

export default ListaLivros