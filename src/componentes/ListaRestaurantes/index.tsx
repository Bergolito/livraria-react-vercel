import axios from 'axios';
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  useEffect(() => {
    // obter restaurantes
    axios.get<IRestaurante[]>('http://localhost:3500/restaurantes')
      .then(resposta => {
        console.log(resposta.data)
        setRestaurantes(resposta.data)
      })
      .catch(erro => {
        console.log(erro)
      })
      
  }, [])

  return (
    <>
    <h1>Lista de Restaurantes</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    </>
  )
}

export default ListaRestaurantes