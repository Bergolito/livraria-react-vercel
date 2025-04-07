import axios from 'axios';
import { useEffect, useState } from 'react';
import ILivro from '../../interfaces/ILivro';
import Livro from './Livro';

const ListaLivros = () => {

  const [livros, setLivros] = useState<ILivro[]>([])

  useEffect(() => {
      // obter livros
      axios.get('http://localhost:3500/livros')
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