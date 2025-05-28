import IAutor from "./IAutor";
import IEditora from "./IEditora";

export default interface ILivro {
  id: number;
  _id: number;
  titulo: string;
  autor: string | IAutor;
  editora: string | IEditora;
  numeroPaginas: number;
  edicao: number; // Edição do livro
  ano?: number; // Ano de lançamento do livro
  isbn?: string; // ISBN do livro
  imagemCapa?: string; // URL da imagem da capa do livro
}
