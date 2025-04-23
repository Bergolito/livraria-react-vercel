import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import http from "../../../http"

import { Link as RouterLink } from 'react-router-dom'
import ILivro from "../../../interfaces/ILivro"

const AdministracaoLivros = () => {

    const [livros, setLivros] = useState<ILivro[]>([])

    const API_URL = process.env.REACT_APP_API_URL
    console.log('API_URL => ',API_URL)
  
    useEffect(() => {
        http.get<ILivro[]>(API_URL+'/livros')
            .then(resposta => {
                console.log('\n\nLivros => ',resposta.data);
                setLivros(resposta.data)
            })
    }, [])

    const excluir = (livro: ILivro) => {
        http.delete(API_URL+`/livros/${livro._id}`)
            .then(() => {
                const listaLivros = livros.filter(livroTemp => livroTemp._id !== livro._id)
                setLivros([...listaLivros])
            })
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Título
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
                            <RouterLink  to={`/admin/livros/${livro._id}`}> Editar </RouterLink> 
                            <Button variant="outlined" color="error" onClick={() => excluir(livro)}>
                                Excluir
                            </Button>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoLivros