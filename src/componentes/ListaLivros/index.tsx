import axios from 'axios';
import { useEffect, useState } from 'react';
import estilos from './ListaLivros.module.scss';
import ILivro from '../../interfaces/ILivro';
import Livro from './Livro';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
// import SendIcon from '@mui/icons-material/Send';
// import Stack from '@mui/material/Stack';

const ListaLivros = () => {

  const [livros, setLivros] = useState<ILivro[]>([])

  useEffect(() => {
      // obter livros
      axios.get('http://localhost:3000/livros')
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
    {livros?.map(item => <Livro livro={item} key={item.id} />)}
    </>
  )
}

export default ListaLivros