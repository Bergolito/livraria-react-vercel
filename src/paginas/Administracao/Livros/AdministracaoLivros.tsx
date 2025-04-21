import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import http from "../../../http"

import { Link as RouterLink } from 'react-router-dom'
import ILivro from "../../../interfaces/ILivro"

const AdministracaoLivros = () => {

    const [livros, setLivros] = useState<ILivro[]>([])

    useEffect(() => {
        http.get<ILivro[]>('livros')
            .then(resposta => {
                console.log('\n\nLivros => ',resposta.data);
                setLivros(resposta.data)
            })
    }, [])

    const excluir = (idLivro: ILivro) => {
        http.delete(`livros/${idLivro._id}`)
            .then(() => {
                const listaLivros = livros.filter(livro => livro._id !== idLivro._id)
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
                    {livros.map(livro => <TableRow key={livro.id}>
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