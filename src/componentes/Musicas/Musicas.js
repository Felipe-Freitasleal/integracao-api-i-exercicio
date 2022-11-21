import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Botao, ContainerInputs, ContainerMusicas, InputMusica, Musica } from './styled'

//TODAS AS FUNÇÕES DE API SÃO ASYNC 
export default function Musicas(props) {
    const { playlist, pegarPlayslits } = props

    const [musicas, setMusicas] = useState([])
    const [artista, setArtista] = useState("")
    const [nomeMusica, setNomeMusica] = useState("")
    const [linkMusica, setLinkMusica] = useState("")

    //RENDERIZA TODAS AS MUSICAS DE CADA PLAYSLIT, PEGANDO POR REQUSIÇÃO AS MÚSICAS NA API E ÀS PONDO NO ESTADO QUE GUARDA A LISTA DE MÚSICAS
    const pegarMusica = async () => {
        try {
            const resposta = await axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${playlist.id}/tracks`, {
                headers: {
                    Authorization: "felipe-leal-ammal"
                }
            })

            console.log(resposta.data)
            setMusicas(resposta.data.result.tracks)
        } catch (error) {
            console.log(error.response)
        }

        // .then((resposta) => {
        //     console.log(resposta.data)
        //     setMusicas(resposta.data.result.tracks)
        // })
        // .catch((erro) => {
        //     console.log(erro.response)
        // })
    }

    useEffect(() => {
        pegarMusica()
    }, [])

    //ADICIONA MÚSICAS NOVAS, PEGAR A REQUISIÇÃO E CHAMANDO NOVA RENDERIZAÇÃO NO .THEN
    const addMusica = async () => {
        try {
            const body = {
                artist: artista,
                name: nomeMusica,
                url: linkMusica
            };

            const resposta = await axios.post(
                `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${playlist.id}/tracks`,
                body, {
                headers: {
                    Authorization: "felipe-leal-ammal"
                }
            })

            console.log(resposta);
            pegarMusica();
        } catch (error) {
            console.log(error.response);
        }
        // .then((resposta) => {
        //     console.log(resposta);
        //     pegarMusica();
        // })
        // .catch((erro) => {
        //     console.log(erro.response);
        // });
    };

    //FUNÇÃO QUE DELETA MÚSICA. APÓS PASSAR A REQUISIÇÃO PARA A API COM O AXIOS.DELETE, CHAMA A FUNÇÃO PEGA TODAS ÀS MUSICAS NA API CHAMANDO ELA NO .THEN
    const deletarMusica = async (trackId) => {
        try {
            const resposta = await axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${playlist.id}/tracks/${trackId}`, {
                headers: {
                    Authorization: "felipe-leal-ammal"
                }
            })

            console.log(resposta);
            pegarMusica();
        } catch (error) {
            console.log(error);
        }
        // .then((resposta) => {
        //     console.log(resposta);
        //     pegarMusica();
        // })
        // .catch((erro) => {
        //     console.log(erro);
        // })
    }

    //FUNÇÃO IMPLEMENTADA COM ASYNC E AWAIT
    //FUNÇÃO PARA DELETAR PLAYSLIST, QUE NO TRY FAZ A REQUISIÇÃO A API E PEGA, COMO PROPS, A CHAMADA DA FUNÇÃO QUE RENDERIZA TODAS AS PLAYSLITS NA OUTRO COMPONENTE
    const deletPlaylist = async () => {
        try {
            const res = await axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${playlist.id}`, {
                headers: {
                    Authorization: "felipe-leal-ammal"
                }
            })

            pegarPlayslits()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ContainerMusicas>
            <h2>{props.playlist.name}</h2>
            <button onClick={deletPlaylist}>deletar playlist</button>
            {musicas.map((musica) => {
                return (
                    <Musica key={musica.id}>
                        <h3>{musica.name} - {musica.artist}</h3>
                        <audio src={musica.url} controls />
                        <button onClick={() => deletarMusica(musica.id)}>X</button>
                    </Musica>)
            })}
            <ContainerInputs>
                <InputMusica placeholder="artista" value={artista} onChange={(event) => setArtista(event.target.value)} />
                <InputMusica placeholder="musica" value={nomeMusica} onChange={(event) => setNomeMusica(event.target.value)} />
                <InputMusica placeholder="url" value={linkMusica} onChange={(event) => setLinkMusica(event.target.value)} />
                <Botao onClick={addMusica}>Adicionar musica</Botao>
            </ContainerInputs>
        </ContainerMusicas>
    )
}

