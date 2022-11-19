import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Botao, ContainerInputs, ContainerMusicas, InputMusica, Musica } from './styled'


export default function Musicas(props) {
    const { playlist } = props

    const [ musicas, setMusicas ] = useState([])
    const [ artista, setArtista] = useState("")
    const [ nomeMusica, setNomeMusica ] = useState("")
    const [ linkMusica, setLinkMusica ] = useState("")

    const pegarMusica = () =>{
        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${playlist.id}/tracks`, {
            headers:{
                Authorization: "felipe-leal-ammal"
            }
        })
        .then((resposta)=>{
            console.log(resposta.data)
            setMusicas(resposta.data.result.tracks)
        })
        .catch((erro)=>{
            console.log(erro.response)
        })
    }
    useEffect(()=>{
        pegarMusica()
    },[])

    const addMusica = () => {
        const body = {
          artist: artista,
          name: nomeMusica,
          url: linkMusica
        };
        axios
          .post(
            `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${playlist.id}/tracks`,
            body,{
                headers:{
                    Authorization: "felipe-leal-ammal"
                }
            })
            .then((resposta) => {
                console.log(resposta);
                pegarMusica();
            })
            .catch((erro) => {
                console.log(erro.response);
            });
      };

      const deletarMusica = (trackId) => {

        axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${playlist.id}/tracks/${trackId}`, {
            headers:{
                Authorization: "felipe-leal-ammal"
            }
        })
        .then((resposta)=>{
            console.log(resposta);
            pegarMusica();
        })
        .catch((erro)=>{
            console.log(erro);
        })
      }

    return (
        <ContainerMusicas>
            <h2>{props.playlist.name}</h2>
            {musicas.map((musica) => {
                return (
                    <Musica key={musica.id}>
                        <h3>{musica.name} - {musica.artist}</h3>
                        <audio src={musica.url} controls />
                        <button onClick={()=>deletarMusica(musica.id)}>X</button>
                    </Musica>)
            })}
            <ContainerInputs>
                <InputMusica placeholder="artista" value={artista} onChange={(event)=>setArtista(event.target.value)}/>
                <InputMusica placeholder="musica" value={nomeMusica} onChange={(event)=>setNomeMusica(event.target.value)}/>
                <InputMusica placeholder="url" value={linkMusica} onChange={(event)=>setLinkMusica(event.target.value)}/>
                <Botao onClick={addMusica}>Adicionar musica</Botao>
            </ContainerInputs>
        </ContainerMusicas>
    )
}

