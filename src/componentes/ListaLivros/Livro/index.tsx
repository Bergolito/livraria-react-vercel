import axios from 'axios';
import { useState, useEffect } from 'react';
import estilos from './Livro.module.scss';
import ILivro from '../../../interfaces/ILivro';

interface LivroProps {
  livro: ILivro
}

const Livro = ({ livro }: LivroProps) => {
  
  return (
    <section className={estilos.Livro}>
      <div className={estilos.Titulo}>
        <h2>Título: {livro.titulo}</h2>
        <h2>Autor: {livro.autor}</h2>
        <h2>Editora: {livro.editora}</h2>
        <h2>Qtd Páginas: {livro.numeroPaginas}</h2>
      </div>
    </section>)  
}

export default Livro
