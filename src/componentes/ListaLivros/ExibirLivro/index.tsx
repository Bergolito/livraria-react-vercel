import React from 'react';
import ILivro from '../../../interfaces/ILivro';
import styles from './ExibirLivro.module.scss';

interface ExibirLivroProps {
  livro: ILivro;
  onVerDetalhes?: (id: number) => void;
}

const ExibirLivro: React.FC<ExibirLivroProps> = ({ livro, onVerDetalhes }) => {
  // Imagem padrão local em vez de placeholder online
  const imagemPadrao = '/imagens/capas/capa.jpg';

  return (
    <div className={styles.cardLivro}>
      <div className={styles.cardImagem}>
        <img 
          src={livro.imagemCapa || imagemPadrao} 
          alt={`Capa do livro ${livro.titulo}`} 
          className={styles.capaLivro}
          onError={(e) => {
            // Caso a imagem local também falhe, usar um placeholder online como fallback
            const target = e.target as HTMLImageElement;
            target.onerror = null; // Previne loop infinito
            target.src = 'https://via.placeholder.com/150x200?text=Sem+Capa';
          }}
        />
      </div>
      <div className={styles.cardConteudo}>
        <h3 className={styles.titulo}>{livro.titulo}</h3>
        <div className={styles.infoLivro}>
          <p><span>Autor:</span> {livro.autor}</p>
          <p><span>Editora:</span> {livro.editora}</p>
          <p><span>Páginas:</span> {livro.numeroPaginas}</p>
        </div>
        {onVerDetalhes && (
          <button 
            className={styles.botaoDetalhes}
            onClick={() => onVerDetalhes(livro.id)}
          >
            Ver detalhes
          </button>
        )}
      </div>
    </div>
  );
};

export default ExibirLivro;
