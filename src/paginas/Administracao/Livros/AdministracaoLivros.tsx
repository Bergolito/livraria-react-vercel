import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import http from "../../../http"

import { Link as RouterLink } from 'react-router-dom'
import ILivro from "../../../interfaces/ILivro"
import EditIcon from '@mui/icons-material/Edit';

const AdministracaoLivros = () => {

    const [livros, setLivros] = useState<ILivro[]>([])

    useEffect(() => {
        http.get<ILivro[]>('livros')
            .then(resposta => setLivros(resposta.data))
    }, [])

    const excluir = (restauranteAhSerExcluido: ILivro) => {
        http.delete(`livros/${restauranteAhSerExcluido.id}/`)
            .then(() => {
                const listaRestaurante = livros.filter(livro => livro.id !== restauranteAhSerExcluido.id)
                setLivros([...listaRestaurante])
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
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {livros.map(livro => <TableRow key={livro.id}>
                        <TableCell>
                            {livro.titulo}
                        </TableCell>
                        <TableCell>
                            [ <RouterLink to={`/admin/livros/${livro.id}`}>editar </RouterLink> ]
                            [ <RouterLink to={`/admin/livros/${livro.id}`}> <EditIcon /> </RouterLink> ]
                            
                        </TableCell>
                        <TableCell>
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