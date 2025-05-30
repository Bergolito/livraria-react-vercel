import React, { useMemo } from 'react';

import styles from './ExibirAutor.module.scss';
import IAutor from '../../../interfaces/IAutor';

interface ExibirAutorProps {
  autor: IAutor;
  onVerDetalhes?: (id: string) => void;
  onDetalhar?: () => void;
  exibirModalCompleto?: boolean;
}

const ExibirAutor: React.FC<ExibirAutorProps> = ({ autor, onVerDetalhes, onDetalhar, exibirModalCompleto }) => {
  // Imagem padrão local em vez de placeholder online
  const imagemPadrao = '/imagens/autores/avatar-autor.jpg';

  // Função utilitária para converter hex em URL de imagem
  function hexToImageUrl(hexString?: string, mimeType: string = 'image/jpeg'): string | undefined {
    if (!hexString) return undefined;
    // Remove prefixo "0x" se existir
    const cleanHex = hexString.startsWith('0x') ? hexString.slice(2) : hexString;
    // Converte hex para array de bytes
    const bytes = new Uint8Array(cleanHex.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []);
    if (bytes.length === 0) return undefined;
    const blob = new Blob([bytes], { type: mimeType });
    return URL.createObjectURL(blob);
  }

  // Memoiza a URL da imagem para evitar recriação desnecessária
  const imagemAutorUrl = useMemo(() => {
    // Tenta detectar o tipo da imagem pelo início do hex (exemplo simples)
    let mimeType = 'image/jpeg';
    if (autor.imagem?.startsWith('89504e47')) mimeType = 'image/png'; // PNG signature
    return hexToImageUrl(autor.imagem, mimeType);
  }, [autor.imagem]);

  if (exibirModalCompleto) {
    return (
      <div className={styles.modalConteudo} style={{ boxShadow: 'none', pointerEvents: 'auto' }}>
        <div className={styles.modalImagem}>
          <img
            src={imagemAutorUrl || imagemPadrao}
            alt={`Capa do livro ${autor.nome}`}
            onError={e => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = 'https://via.placeholder.com/150x200?text=Sem+Capa';
            }}
            style={{ boxShadow: 'none' }}
          />
        </div>
        <div className={styles.detalhesLivro}>
          <h2 style={{ color: '#6a5acd', marginBottom: 16 }}>{autor.nome}</h2>
          <p><strong>Nacionalidade:</strong> {autor.nacionalidade}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cardLivro}>
      <div className={styles.cardImagem}>
        <img 
          src={imagemAutorUrl || imagemPadrao}
          alt={`Capa do livro ${autor.nome}`} 
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
        <h3 className={styles.titulo}>{autor.nome}</h3>

        <div className={styles.infoLivro}>
          { 
            autor.nome && (
              <p><span>Autor:</span> {autor.nome}</p>
            )
          }
          <p><span>Nacionalidade:</span> {autor.nacionalidade}</p>
        </div>
        
        <div className={styles.footerBotoes}>
          {onVerDetalhes && (
            <button 
              className={styles.botaoDetalhes}
              onClick={() => onVerDetalhes(autor._id)}
            >
              Ver detalhes
            </button>
          )}
          {onDetalhar && !exibirModalCompleto && (
            <button 
              className={styles.botaoDetalhar}
              onClick={onDetalhar}
            >
              Detalhar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExibirAutor;
