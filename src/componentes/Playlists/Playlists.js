import React, {  useEffect, useState } from "react";
import Musicas from "../Musicas/Musicas";
import axios from "axios";


function Playlists() {

    const [ playlists, setPlaylists ] = useState([])
    console.log(playlists)
    const [ playlistNome, setPlaylistNomes ] = useState("")

    const pegarPlayslits = () => {
        axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists",{
            headers:{
                Authorization: "felipe-leal-ammal"
            }
        })
        .then((resposta)=>{
            console.log(resposta.data)
            setPlaylists(resposta.data.result.list)
          })
          .catch((erro)=>{
            console.log(erro.data)
          })
    }

    useEffect(()=>{
        pegarPlayslits()
    }, [])

    console.log(playlists)

    const criarPlaylist = () => {

        const body = {
            name: playlistNome
        }

        const headers = {
            headers: {
                Authorization: "felipe-leal-ammal"
            }
        }
        
        axios.post("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists", body, headers)
        .then((resposta)=>{
            console.log(resposta.data)
            pegarPlayslits()
            setPlaylistNomes("")
            
        })
        .catch((erro)=>{
            console.log(erro)
        })
    }

    // const procurarPlayslistId = () => {
    //     axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/search?name=${playlistNome}`)
    // }
  
    return (
        <div>
            <label>
                Criar Playlist
                <input value={playlistNome} onChange={(event)=>setPlaylistNomes(event.target.value)}/>
            </label>
            <button onClick={criarPlaylist}>Criar Playlist</button>

         
            {playlists.map((playlist) => {
                return <Musicas key={playlist.id} playlist={playlist}/>
            })}

        </div>
    );
}

export default Playlists;
