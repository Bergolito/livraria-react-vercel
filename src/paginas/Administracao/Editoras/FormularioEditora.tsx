import { Box, Button, InputLabel, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import http from "../../../http"
import IEditora from "../../../interfaces/IEditora"

const FormularioEditora = () => {

    const parametros = useParams()
    const navigate = useNavigate()
    const [nome, setNome] = useState('')

    const API_URL = process.env.REACT_APP_API_URL
    console.log('API_URL => ',API_URL)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (parametros.id) {
            http.get<IEditora>(API_URL+`/editoras/${parametros.id}`)
                .then(resposta => {
                    setNome(resposta.data.nome)
                })
        }
    }, [parametros])

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        console.log('Submit => ',parametros);

        if (parametros.id) {
            http.put(API_URL+`/editoras/${parametros.id}/`, {
                nome: nome,
            })
            .then(() => {
                alert("Editora atualizada com sucesso!")
                navigate('/admin/editoras');
            })
        } else {
            http.post(API_URL+'/editoras', {
                nome: nome,
            })
            .then(() => {
                alert("Editora cadastrada com sucesso!")
                navigate('/admin/editoras');
            })
        }

    }

    // "Casa do código", "Alura","Cristiano Arcoverde Publicacoes"
    return (
        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
            <Typography component="h1" variant="h6">Formulário de Editoras</Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                <InputLabel id="select-titulo-label">Nome</InputLabel>
                <TextField
                    value={nome}
                    onChange={evento => setNome(evento.target.value)}
                    label="Nome"
                    variant="standard"
                    fullWidth
                    required
                />

                <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
            </Box>
        </Box>
    )
}

export default FormularioEditora;