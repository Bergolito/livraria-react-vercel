import Banner from '../../componentes/Banner';
import NavBar from '../../componentes/NavBar';
import Rodape from '../../componentes/Rodape';

function App() {
  return (
    <>
      <NavBar />
      <Banner /> 
      <img 
          src="/imagens/livraria.jpg" 
          alt="Banner do sistema" 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; // Previne loop infinito
            target.src = 'https://via.placeholder.com/150x200?text=Sem+Capa';
          }}
        />

      <Rodape />
    </>
  );
}

export default App;
