import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../../../http"
import ILivro from "../../../interfaces/ILivro"
import IAutor from "../../../interfaces/IAutor"
import IEditora from "../../../interfaces/IEditora"

// Estendendo a interface ILivro para incluir o autor como objeto
interface ILivroCompleto extends Omit<ILivro, 'autor'> {
    autor: IAutor | string;
    editora: IEditora | string;
}

const FormularioLivro = () => {

    const parametros = useParams()
    const [autores, setAutores] = useState<IAutor[]>([])
    const [editoras, setEditoras] = useState<IEditora[]>([])
    const [titulo, setTitulo] = useState('')
    const [autor, setAutor] = useState('')
    const [editora, setEditora] = useState('')
    const [numeroPaginas, setNumeroPaginas] = useState('')

    const API_URL = process.env.REACT_APP_API_URL
    console.log('API_URL => ',API_URL)

    useEffect(() => {
        http.get<IEditora[]>(API_URL+'/editoras ')
            .then(resposta => {
                setEditoras(resposta.data)
            })
    }, [API_URL])

    useEffect(() => {
        http.get<IAutor[]>(API_URL+'/autores')
            .then(resposta => {
                setAutores(resposta.data)
            })
    }, [API_URL])

    useEffect(() => {
        if (parametros.id) {
            http.get<ILivroCompleto>(API_URL+`/livros/${parametros.id}`)
                .then(resposta => {
                    setTitulo(resposta.data.titulo)
                    
                    // Verifica se autor é um objeto ou string
                    if (typeof resposta.data.autor === 'object' && resposta.data.autor !== null) {
                        setAutor(resposta.data.autor._id.toString())
                    } else {
                        setAutor(resposta.data.autor as string)
                    }
                    
                    // Verifica se editora é um objeto ou string
                    if (typeof resposta.data.editora === 'object' && resposta.data.editora !== null) {
                        setEditora(resposta.data.editora._id.toString())
                    } else {
                        setEditora(resposta.data.editora as string)
                    }

                    setNumeroPaginas(''+resposta.data.numeroPaginas)
                })
        }
    }, [API_URL, parametros.id])


    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        console.log('Submit => ',parametros);

        if (parametros.id) {
            http.put(API_URL+`/livros/${parametros.id}/`, {
                titulo: titulo,
                autor: autor,
                editora: editora,
            })
            .then(() => {
                alert("Livro atualizado com sucesso!")
            })
        } else {
            http.post(API_URL+'/livros', {
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

    return (
        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
            <Typography component="h1" variant="h6">Formulário de Livros</Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                <InputLabel id="select-titulo-label">Título</InputLabel>
                <TextField
                    value={titulo}
                    onChange={evento => setTitulo(evento.target.value)}
                    label="Título"
                    variant="standard"
                    fullWidth
                    required
                />
                <FormControl variant="standard" fullWidth margin="normal">
                    <InputLabel id="select-autor-label">Autor</InputLabel>
                    <Select
                        labelId="select-autor-label"
                        id="select-autor"
                        value={autor}
                        onChange={evento => setAutor(evento.target.value)}
                        label="Autor"
                        required
                    >
                        <MenuItem value=""><em>Selecione um autor</em></MenuItem>
                        {autores.map(autor => (
                            <MenuItem key={autor._id} value={autor._id}>
                                {autor.nome}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <p>Autor selecionado: {autor}</p>
                <div>
                <label htmlFor="opcoes">Editora:</label>
                <FormControl variant="standard" fullWidth margin="normal">
                    <InputLabel id="select-editora-label">Editora</InputLabel>
                    <Select
                        labelId="select-editora-label"
                        id="select-editora"
                        value={editora}
                        onChange={evento => setEditora(evento.target.value)}
                        label="Editora"
                        required
                    >
                        <MenuItem value=""><em>Selecione uma editora</em></MenuItem>
                        {editoras.map(editora => (
                            <MenuItem key={editora._id} value={editora._id}>
                                {editora.nome}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <p>Editora selecionada: {editora}</p>
                </div>                
                <TextField
                    value={numeroPaginas}
                    onChange={evento => setNumeroPaginas(evento.target.value)}
                    label="Páginas"
                    variant="standard"
                    fullWidth
                    required
                /> 

                <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
            </Box>
        </Box>
    )
}

export default FormularioLivro;