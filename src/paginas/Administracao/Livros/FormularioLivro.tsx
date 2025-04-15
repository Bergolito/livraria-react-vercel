import { Box, Button, Checkbox, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../../../http"
import ILivro from "../../../interfaces/ILivro"

const FormularioLivro = () => {

    const parametros = useParams()

    useEffect(() => {
        if (parametros.id) {
            http.get<ILivro>(`livros/${parametros.id}/`)
                .then(resposta => {
                    setTitulo(resposta.data.titulo)
                    setAutor(resposta.data.autor)
                    setEditora(resposta.data.editora)
                    setNumeroPaginas(''+resposta.data.numeroPaginas)
                    // setAnoPublicacao(''+resposta.data.ano_publicacao)
                    // setIsbn(resposta.data.isbn)
                    // setDisponivel(resposta.data.disponivel)
                })
        }
    }, [parametros])

    const [titulo, setTitulo] = useState('')
    const [autor, setAutor] = useState('67febf8056cfdefc8c505c54')
    const [editora, setEditora] = useState('')
    //const [anoPublicacao, setAnoPublicacao] = useState('')
    const [numeroPaginas, setNumeroPaginas] = useState('')
    // const [isbn, setIsbn] = useState('')
    // const [disponivel, setDisponivel] = useState(false)

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if (parametros.id) {
            http.put(`livros/${parametros.id}/`, {
                titulo: titulo,
                autor: autor,
                editora: editora,
                // ano_publicacao: anoPublicacao,
                // isbn: isbn,
                // disponivel: disponivel
            })
            .then(() => {
                alert("Livro atualizado com sucesso!")
            })
        } else {
            http.post('livros/', {
                titulo: titulo,
                autor: autor,
                editora: editora,
                numeroPaginas: numeroPaginas,
            })
            .then(() => {
                alert("Livro cadastrado com sucesso!")
            })
        }

    }

    // "Casa do código", "Alura","Cristiano Arcoverde Publicacoes"
    return (
        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
            <Typography component="h1" variant="h6">Formulário de Livros</Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                <TextField
                    value={titulo}
                    onChange={evento => setTitulo(evento.target.value)}
                    label="Título"
                    variant="standard"
                    fullWidth
                    required
                />
                <TextField
                    value={autor}
                    onChange={evento => setAutor(evento.target.value)}
                    label="Autor"
                    variant="standard"
                    fullWidth
                    required
                />
                {/* <TextField
                    value={editora}
                    onChange={evento => setEditora(evento.target.value)}
                    label="Editora"
                    variant="standard"
                    fullWidth
                    required
                /> */}
                {/* <Select label="Editora" value={editora} onChange={evento => setEditora(evento.target.value)} fullWidth required>
                    <option value="Casa do código">Casa do código</option>
                    <option value="Alura">Alura</option>
                    <option value="Cristiano Arcoverde Publicacoes">Cristiano Arcoverde Publicacoes</option>
                </Select> */}
                <div>
                <label htmlFor="opcoes">Editora:</label>
                <select id="editora" value={editora} onChange={evento => setEditora(evento.target.value)}>
                    <option value="">-- Selecione --</option>
                    <option value="Casa do código">Casa do código</option>
                    <option value="Alura">Alura</option>
                    <option value="Cristiano Arcoverde Publicacoes">Cristiano Arcoverde Publicacoes</option>
                </select>
                <p>Você selecionou: {editora}</p>
                </div>                
                <TextField
                    value={numeroPaginas}
                    onChange={evento => setNumeroPaginas(evento.target.value)}
                    label="Páginas"
                    variant="standard"
                    fullWidth
                    required
                /> 
                {/* <TextField
                    value={isbn}
                    onChange={evento => setIsbn(evento.target.value)}   
                    label="ISBN"
                    variant="standard"
                    fullWidth
                    required
                />
                Disponível?
                <Checkbox
                    value={disponivel}
                    onChange={evento => setDisponivel(false)}
                    required
                /> */} 

                <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
            </Box>
        </Box>
    )
}

export default FormularioLivro