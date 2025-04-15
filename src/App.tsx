import { Routes, Route } from 'react-router-dom';
import PaginaBaseAdmin from './paginas/Administracao/PaginaBaseAdmin';
import AdministracaoPratos from './paginas/Administracao/Pratos/AdministracaoPratos';
import FormularioPrato from './paginas/Administracao/Pratos/FormularioPrato';
import AdministracaoRestaurantes from './paginas/Administracao/Restaurantes/AdministracaoRestaurantes';
import FormularioRestaurante from './paginas/Administracao/Restaurantes/FormularioRestaurante';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import VitrineLivros from './paginas/VitrineLivros';
import Sudoku from './componentes/Sudoku';
import Calculadora from './componentes/Calculadora';
import Componentes from './componentes/Componentes';
import AdministracaoLivros from './paginas/Administracao/Livros/AdministracaoLivros';
import FormularioLivro from './paginas/Administracao/Livros/FormularioLivro';
import SuperCalculadora from './componentes/SuperCalculadora';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/livros" element={<VitrineLivros />} />
      <Route path="/sudoku" element={<Sudoku />} />
      <Route path="/calculadora" element={<Calculadora />} />
      <Route path="/super-calculadora" element={<SuperCalculadora />} />
      <Route path="/comps" element={<Componentes />} />

      <Route path='/admin' element={<PaginaBaseAdmin />}>

        <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />

        <Route path="pratos" element={<AdministracaoPratos />} />
        <Route path="pratos/novo" element={<FormularioPrato />} />

        <Route path="livros" element={<AdministracaoLivros />} />
        <Route path="livros/novo" element={<FormularioLivro />} />
        <Route path="livros/:id" element={<FormularioLivro />} />

      </Route>

    </Routes>
  );
}

export default App;
