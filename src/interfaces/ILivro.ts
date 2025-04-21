export default interface ILivro {
  id: number
  titulo: string
  autor: string
  editora: string
  numeroPaginas: number
  imagemCapa?: string // URL da imagem da capa do livro
}