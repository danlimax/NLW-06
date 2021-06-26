import { useState } from 'react';
import { FormEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'


import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';


import { Button } from '../components/Button';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import '../styles/auth.scss';


// webpack (snowpack, vite, ...)
// Module Bundles ->

export function NewRoom() {
    const { user } = useAuth()
    const history = useHistory()
    const [newRoom, setNewRoom] =useState('');

// Função para criação de sala do firebase.

    async function handleCreateRoom(event: FormEvent){
        event.preventDefault();
        if (newRoom.trim() === ''){
            return;
        }
            const roomRef = database.ref('rooms');

            const firebaseRoom = await roomRef.push({
                title: newRoom,
                authorId: user?.id,
            })
        history.push(`/rooms/${firebaseRoom.key}`)
    }

    return (
        <div id="page-auth">
            <aside>
            <img src={illustrationImg} alt="Ilujstração simbolizando perguntas e repostas" />
            <strong>Crie salas de sugestões ao-vivo</strong>
            <p>Faça uma sugestão para criação de conteúdo</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                        type="text" 
                        placeholder="Nome da sala"
                        onChange={event => setNewRoom(event.target.value)}
                        value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>

                    </p>
                </div>
            </main>
        </div>
    )
}