import estilos from './NavBar.module.scss';
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (<nav className={estilos.Link} style={{ background: '#afa' }}>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      {/* <li>
        <Link to="/restaurantes">Restaurantes</Link>
      </li>  */}
      <li>
        <Link to="/livros">Livros</Link>
      </li>
      <li>
        <Link to="/super-calculadora">SuperCalculadora</Link>
      </li>
      <li>
        <Link to="/calculadora">Calculadora</Link>
      </li>
      <li>
        <Link to="/sudoku">Sudoku</Link>
      </li>
      <li>
        <Link to="/comps">Componentes</Link>
      </li>
      <li>
        <Link to="/admin">Admin</Link>
      </li>
    </ul>
  </nav>)
}

export default NavBar