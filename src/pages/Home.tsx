import { useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';

import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';


import '../styles/auth.scss';


// webpack (snowpack, vite, ...)
// Module Bundles ->

export function Home() {
    // Fazendo um hook com as paginas, a constante não pode ser colocado foda da função.

    const history = useHistory();
    const { user, singInWitchGoogle } = useAuth()
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom() {
        if (!user) {
            await singInWitchGoogle()
        }
        history.push('/rooms/new');
    }

//Fluxo para entrar em uma sala
    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();

        if (roomCode.trim() === ''){
            return;
        }
        
        const roomRef = await database.ref(`rooms/${roomCode}`).get();
        
        if (!roomRef.exists()) {
            alert('Room does not exists.');
            return;
        }

        if (roomRef.val().endedAt){
            alert('Room alredy closed.');
            return;
        }

        history.push(`/rooms/${roomCode}`)
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
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">Ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}

                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}