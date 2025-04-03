import { Box, Button, Checkbox, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../../../http"
import IRestaurante from "../../../interfaces/IRestaurante"
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
                    setAnoPublicacao(''+resposta.data.ano_publicacao)
                    setIsbn(resposta.data.isbn)
                    setDisponivel(resposta.data.disponivel)
                })
        }
    }, [parametros])

    const [titulo, setTitulo] = useState('')
    const [autor, setAutor] = useState('')
    const [editora, setEditora] = useState('')
    const [anoPublicacao, setAnoPublicacao] = useState('')
    const [isbn, setIsbn] = useState('')
    const [disponivel, setDisponivel] = useState(false)

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if (parametros.id) {
            http.put(`livros/${parametros.id}/`, {
                titulo: titulo,
                autor: autor,
                editora: editora,
                ano_publicacao: anoPublicacao,
                isbn: isbn,
                disponivel: disponivel
            })
            .then(() => {
                alert("Livro atualizado com sucesso!")
            })
        } else {
            http.post('livros/', {
                titulo: titulo,
                autor: autor,
                editora: editora,
                ano_publicacao: anoPublicacao,
                isbn: isbn,
                disponivel: disponivel
            })
            .then(() => {
                alert("Livro cadastrado com sucesso!")
            })
        }

    }

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
                <TextField
                    value={editora}
                    onChange={evento => setEditora(evento.target.value)}
                    label="Editora"
                    variant="standard"
                    fullWidth
                    required
                />
                <TextField
                    value={anoPublicacao}
                    onChange={evento => setAnoPublicacao(evento.target.value)}
                    label="Ano de Publicação"
                    variant="standard"
                    fullWidth
                    required
                />
                <TextField
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
                />

                <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
            </Box>
        </Box>
    )
}

export default FormularioLivro