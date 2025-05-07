import React, { useState } from 'react';
import ILivro from '../../../interfaces/ILivro';

import styles from './ExibirLivro.module.scss';

interface ExibirLivroProps {
  livro: ILivro;
  onVerDetalhes?: (id: number) => void;
}

const ExibirLivro: React.FC<ExibirLivroProps> = ({ livro, onVerDetalhes }) => {
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);
  
  // Imagem padrão local em vez de placeholder online
  const imagemPadrao = '/imagens/capas/capa.jpg';

  // Função para extrair o nome do autor do objeto ou exibir o autor como string
  const renderAutor = () => {
    if (livro.autor && typeof livro.autor === 'object' && 'nome' in livro.autor) {
      return livro.autor.nome;
    }
    return livro.autor;
  };

  const abrirDetalhes = () => {
    setMostrarDetalhes(true);
  };

  const fecharDetalhes = () => {
    setMostrarDetalhes(false);
  };

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
          { 
            livro.autor && (
              <p><span>Autor:</span> {renderAutor()}</p>
            )
          }
          <p><span>Editora:</span> {livro.editora}</p>
          { livro.numeroPaginas && (
            <p><span>Páginas:</span> {livro.numeroPaginas}</p>
          )
          }
        </div>
        
        <div className={styles.footerBotoes}>
          {onVerDetalhes && (
            <button 
              className={styles.botaoDetalhes}
              onClick={() => onVerDetalhes(livro.id)}
            >
              Ver detalhes
            </button>
          )}
          <button 
            className={styles.botaoDetalhar}
            onClick={abrirDetalhes}
          >
            Detalhar
          </button>
        </div>
      </div>

      {mostrarDetalhes && (
        <div className={styles.modalOverlay} onClick={fecharDetalhes}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <button className={styles.fecharModal} onClick={fecharDetalhes}>×</button>
            <h2>{livro.titulo}</h2>
            
            <div className={styles.modalConteudo}>
              <div className={styles.modalImagem}>
                <img 
                  src={livro.imagemCapa || imagemPadrao} 
                  alt={`Capa do livro ${livro.titulo}`}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://via.placeholder.com/150x200?text=Sem+Capa';
                  }}
                />
              </div>
              
              <div className={styles.detalhesLivro}>
                <p><strong>Autor:</strong> {renderAutor()}</p>
                <p><strong>Editora:</strong> {livro.editora}</p>
                <p><strong>Número de Páginas:</strong> {livro.numeroPaginas}</p>
                <p><strong>ID:</strong> {livro._id}</p>
                
                {/* Informações adicionais */}
                <div className={styles.infoAdicional}>
                  <h3>Informações Adicionais</h3>
                  <p><strong>Info 1:</strong> Dados complementares sobre o livro</p>
                  <p><strong>Data de Cadastro:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
                  <p><strong>Disponibilidade:</strong> Em estoque</p>
                  <p><strong>Categoria:</strong> Literatura</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExibirLivro;
