import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material"
import { useEffect, useState } from "react"
import http from "../../../http"

import { Link as RouterLink } from 'react-router-dom'
import ILivro from "../../../interfaces/ILivro"
import IAutor from "../../../interfaces/IAutor"

const AdministracaoLivros = () => {

    const listaEditoras = [
        { id: 1, nome: 'Casa do código' },
        { id: 2, nome: 'Alura' },
        { id: 3, nome: 'Cristiano Arcoverde Publicacoes' },
    ]    

    const [livros, setLivros] = useState<ILivro[]>([])
    const [autores, setAutores] = useState<IAutor[]>([])
    const [filtroTitulo, setFiltroTitulo] = useState('')
    const [filtroAutor, setFiltroAutor] = useState('')
    const [filtroEditora, setFiltroEditora] = useState('')
    const [filtroPaginas, setFiltroPaginas] = useState('')

    const API_URL = process.env.REACT_APP_API_URL
    console.log('API_URL => ',API_URL)
  
    useEffect(() => {
        http.get<ILivro[]>(API_URL+'/livros')
            .then(resposta => {
                console.log('\n\nLivros => ',resposta.data);
                setLivros(resposta.data)
            })
        http.get<IAutor[]>(API_URL+'/autores')
            .then(resposta => setAutores(resposta.data))
    }, [])

    const excluir = (livro: ILivro) => {
        http.delete(API_URL+`/livros/${livro._id}`)
            .then(() => {
                const listaLivros = livros.filter(livroTemp => livroTemp._id !== livro._id)
                setLivros([...listaLivros])
            })
    }

    const filtrarLivros = () => {
        console.log('\n\nfiltrarLivros => ');

        let url = API_URL + '/livros/busca?';
        if (filtroTitulo) url += `titulo=${encodeURIComponent(filtroTitulo)}&`;
        if (filtroAutor) url += `autor=${encodeURIComponent(filtroAutor)}&`;
        if (filtroPaginas) url += `numeroPaginas=${encodeURIComponent(filtroPaginas)}&`;
        
        console.log('nfiltrarLivros URL => ',url);

        http.get<ILivro[]>(url)
            .then( (resposta) => {
                console.log('resposta => ',resposta.data);
                setLivros(resposta.data)
            })
    }

    const limparFiltros = () => {
        setFiltroTitulo('');
        setFiltroAutor('');
        setFiltroPaginas('');
        http.get<ILivro[]>(API_URL+'/livros')
            .then(resposta => setLivros(resposta.data))
    }

    return (
        <>
        <Paper sx={{ p: 2, mb: 3 }}>
            {/* <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}> */}
            <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "left", flexGrow: 1 }}>   
                <TextField
                    label="Título"
                    value={filtroTitulo}
                    onChange={e => setFiltroTitulo(e.target.value)}
                    variant="outlined"
                    size="small"
                />
                <FormControl sx={{ minWidth: 180 }} size="small">
                    <InputLabel id="filtro-autor-label">Autor</InputLabel>
                    <Select
                        id="filtro-autor"
                        labelId="filtro-autor-label"
                        value={filtroAutor}
                        label="Autor"
                        onChange={e => setFiltroAutor(e.target.value)}
                    >
                        <MenuItem value=""><em>Todos</em></MenuItem>
                        {autores.map(autor => (
                            <MenuItem key={autor.id} value={autor.id}>{autor.nome}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 180 }} size="small">
                    <InputLabel id="filtro-editora-label">Editora</InputLabel>
                    <Select
                        id="filtro-editora"
                        labelId="filtro-editora-label"
                        value={filtroEditora}
                        label="Editora"
                        onChange={e => setFiltroEditora(e.target.value)}
                    >
                        <MenuItem value=""><em>Todos</em></MenuItem>
                        {listaEditoras.map(editora => (
                            <option key={editora.id} value={editora.id}>{editora.nome}</option>
                        ))}
                    </Select>
                </FormControl>                
                <TextField
                    label="Nº de páginas"
                    value={filtroPaginas}
                    onChange={e => setFiltroPaginas(e.target.value)}
                    variant="outlined"
                    size="small"
                    type="number"
                />
                <Button variant="outlined" onClick={limparFiltros}>Limpar</Button>
                <Button variant="contained" onClick={filtrarLivros}>Pesquisar</Button>
            </Box>
        </Paper>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Título
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
                        <TableCell>{livro.titulo}</TableCell>
                        <TableCell>{livro.editora}</TableCell>
                        <TableCell>
                            <RouterLink  to={`/admin/livros/${livro._id}`}> Editar </RouterLink> 
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

export default AdministracaoLivros