import React, { useState } from 'react';
import ILivro from '../../../interfaces/ILivro';

import styles from './ExibirLivro.module.scss';

interface ExibirLivroProps {
  livro: ILivro;
  onVerDetalhes?: (id_: number) => void;
  exibirModalCompleto?: boolean;
}

const ExibirLivro: React.FC<ExibirLivroProps> = ({ livro, onVerDetalhes, exibirModalCompleto }) => {
  
  // Imagem padrão local em vez de placeholder online
  const imagemPadrao = '/imagens/capas/capa.jpg';

  // Função para extrair o nome do autor do objeto ou exibir o autor como string
  const renderAutor = () => {
    if (livro.autor && typeof livro.autor === 'object' && 'nome' in livro.autor) {
      return livro.autor.nome;
    }
    return livro.autor;
  };

  if (exibirModalCompleto) {
    console.log('Livro selecionado => ',livro);
    return (
      <div style={{ padding: 8 }}>
        <h2 style={{ color: '#6a5acd', marginBottom: 24 }}>{livro.titulo}</h2>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          <div>
            <img 
              src={livro.imagemCapa || '/imagens/capas/capa.jpg'} 
              alt={`Capa do livro ${livro.titulo}`}
              style={{ width: 180, height: 260, objectFit: 'cover', borderRadius: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
              onError={e => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = 'https://via.placeholder.com/150x200?text=Sem+Capa';
              }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <p><strong>ID:</strong> {livro._id ?? livro.id}</p>
            <p><strong>Título:</strong> {livro.titulo}</p>
            <p><strong>Autor:</strong> {typeof livro.autor === 'object' ? livro.autor.nome : livro.autor}</p>
            <p><strong>Editora:</strong> {livro.editora}</p>
            <p><strong>Número de Páginas:</strong> {livro.numeroPaginas}</p>
            <p><strong>Imagem da Capa:</strong> {livro.imagemCapa ? livro.imagemCapa : 'Não informada'}</p>
            <div style={{ marginTop: 24, borderTop: '1px solid #eee', paddingTop: 16 }}>
              <h3 style={{ color: '#6a5acd' }}>Informações Adicionais</h3>
              <p><strong>Info 1:</strong> Dados complementares sobre o livro</p>
              <p><strong>Data de Cadastro:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
              <p><strong>Disponibilidade:</strong> Em estoque</p>
              <p><strong>Categoria:</strong> Literatura</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              onClick={() => onVerDetalhes(livro._id)}
            >
              Ver detalhes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExibirLivro;
