import { 
    Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
    Card, CardContent, TextField, MenuItem, Select, InputLabel, FormControl, Grid 
} from "@mui/material"
import { useEffect, useState } from "react"
import http from "../../../http"
import ILivro from "../../../interfaces/ILivro"
import IAutor from "../../../interfaces/IAutor"
import { Link as RouterLink } from 'react-router-dom'
import IEditora from "../../../interfaces/IEditora"

const AdministracaoLivros = () => {

    const [livros, setLivros] = useState<ILivro[]>([])
    const [titulo, setTitulo] = useState('')
    const [autor, setAutor] = useState('')
    const [editora, setEditora] = useState('')
    const [numeroPaginas, setNumeroPaginas] = useState('')
    const [autores, setAutores] = useState<IAutor[]>([])
    const [editoras, setEditoras] = useState<IEditora[]>([])
    
    const API_URL = process.env.REACT_APP_API_URL

    useEffect(() => {
        http.get<IAutor[]>(API_URL + '/autores').then(resp => setAutores(resp.data))
        http.get<IEditora[]>(API_URL + '/editoras').then(resp => setEditoras(resp.data))
    }, [API_URL])

    const buscarLivros = () => {
        const params: any = {}
        if (titulo) params.titulo = titulo
        if (autor) params.nomeAutor = autor
        if (editora) params.nomeEditora = editora
        if (numeroPaginas) params.numeroPaginas = numeroPaginas

        console.log('params => ', params);
        http.get<ILivro[]>(API_URL + '/livros/busca', { params })
            .then(resposta => {
                console.log('livros => ', resposta.data);
                setLivros(resposta.data)
            })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        buscarLivros()
    }, [])

    const excluir = (livro: ILivro) => {
        http.delete(API_URL + `/livros/${livro._id}`)
            .then(() => {
                buscarLivros()
            })
    }

    const handlePesquisar = () => {
        buscarLivros()
    }

    const handleLimpar = () => {
        setTitulo('')
        setAutor('')
        setEditora('')
        setNumeroPaginas('')
        buscarLivros()
    }

    return (
        <>
            <Card sx={{ mb: 2 }}>
                <CardContent>
                    <h2>Filtro de Pesquisa</h2>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Título"
                                value={titulo}
                                onChange={e => setTitulo(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormControl fullWidth>
                                <InputLabel>Autor</InputLabel>
                                <Select
                                    label="Autor"
                                    value={autor}
                                    onChange={e => setAutor(e.target.value)}
                                >
                                    <MenuItem value="">Todos</MenuItem>
                                    {autores.map(autor => (
                                        <MenuItem key={autor._id} value={autor.nome}>{autor.nome}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormControl fullWidth>
                                <InputLabel>Editora</InputLabel>
                                <Select
                                    label="Editora"
                                    value={editora}
                                    onChange={e => setEditora(e.target.value)}
                                >
                                    <MenuItem value="">Todos</MenuItem>
                                    {editoras.map(editora => (
                                        <MenuItem key={editora._id} value={editora.nome}>{editora.nome}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Nº de páginas"
                                type="number"
                                value={numeroPaginas}
                                onChange={e => setNumeroPaginas(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} sx={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                            <Button variant="contained" color="primary" onClick={handlePesquisar} sx={{ mr: 1 }}>
                                Pesquisar
                            </Button>
                            <Button variant="outlined" onClick={handleLimpar}>
                                Limpar
                            </Button>

                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <RouterLink to="/admin/livros/novo">
                <Button variant="contained" color="primary">
                    Novo Livro
                </Button>
            </RouterLink>            

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Título
                            </TableCell>
                            <TableCell>
                                Autor
                            </TableCell>                            
                            <TableCell>
                                Editora
                            </TableCell>
                            <TableCell>
                                Ações
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {livros.map(livro => <TableRow key={livro._id}>
                            <TableCell>
                                {livro.titulo}
                            </TableCell>

                           <TableCell>
                                {
                                    livro.autor && typeof livro.autor === 'object' && 'nome' in livro.autor && (
                                        livro.autor.nome
                                    ) || (
                                        livro.autor 
                                    )
                                }
                            </TableCell>
                            <TableCell>
                                {
                                    livro.editora && typeof livro.editora === 'object' && 'nome' in livro.editora && (
                                        livro.editora.nome
                                    ) || (
                                        livro.editora 
                                    )
                                }

                            </TableCell>
                            <TableCell>
                                <RouterLink to={`/admin/livros/${livro._id}`}> Editar </RouterLink>
                                <Button variant="outlined" color="error" onClick={() => excluir(livro)}>
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default AdministracaoLivros;