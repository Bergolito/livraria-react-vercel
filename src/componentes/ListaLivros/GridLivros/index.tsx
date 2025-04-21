import React from 'react';
import ILivro from '../../../interfaces/ILivro';
import ExibirLivro from '../ExibirLivro';
import styles from './GridLivros.module.scss';

interface GridLivrosProps {
  livros: ILivro[];
  colunas?: number;
  onVerDetalhes?: (id: number) => void;
}

const GridLivros: React.FC<GridLivrosProps> = ({ 
  livros, 
  colunas = 3, 
  onVerDetalhes 
}) => {
  return (
    <div 
      className={styles.gridContainer}
      style={{ 
        gridTemplateColumns: `repeat(${colunas}, 1fr)` 
      }}
    >
      {livros.map(livro => (
        <div className={styles.gridItem} key={livro.id}>
          <ExibirLivro 
            livro={livro} 
            onVerDetalhes={onVerDetalhes}
          />
        </div>
      ))}
    </div>
  );
};

export default GridLivros;
