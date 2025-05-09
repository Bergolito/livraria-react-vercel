import axios from 'axios';
import { useEffect, useState } from 'react';
import ILivro from '../../interfaces/ILivro';
import GridLivros from './GridLivros';
import ExibirLivro from './ExibirLivro';

const ListaLivros = () => {

  const [livros, setLivros] = useState<ILivro[]>([])
  const [livroSelecionado, setLivroSelecionado] = useState<ILivro | null>(null);

  const API_URL = process.env.REACT_APP_API_URL 
  console.log('API_URL => ',API_URL)
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

  const handleDetalhar = (id: number) => {
    const livro = livros.find(l => l.id === id || l._id === id);
    if (livro) setLivroSelecionado(livro);
  };

  const handleFecharModal = () => setLivroSelecionado(null);

  return (
    <>
    <h1>Lista de Livros</h1>
    <GridLivros livros={livros} onVerDetalhes={handleDetalhar} />
    {livroSelecionado && (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000
      }} onClick={handleFecharModal}>
        <div onClick={e => e.stopPropagation()} style={{background: '#fff', borderRadius: 8, padding: 32, maxWidth: 600, width: '90%', position: 'relative'}}>
          <button onClick={handleFecharModal} style={{position: 'absolute', top: 12, right: 16, fontSize: 22, background: 'none', border: 'none', cursor: 'pointer'}}>×</button>
          <ExibirLivro livro={livroSelecionado} exibirModalCompleto />
        </div>
      </div>
    )}
    </>
  )
}

export default ListaLivros