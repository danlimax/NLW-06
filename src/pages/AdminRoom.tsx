import { useHistory, useParams } from 'react-router-dom'

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
//import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';

import '../styles/room.scss';
import { database } from '../services/firebase';






type RoomParams = {
  id: string;
}

// useParams<generic> 

export function AdminRoom() {
  // const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { title, questions } = useRoom(roomId)
  
async function handleEndRoom() {
  database.ref(`rooms/${roomId}`).update({
    endedAt: new Date(),
  })

  history.push('/');
}


async function handleDeleteQuestion(questionId: string) {
  if (window.confirm('Tem certeza que você deseja excluir esta sugestão?')){
     await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
  }
}

async function handleCheckQuestionAsAnswered(questionId: string) {
  await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
    isAnswered: true,
  });
}

async function handleHiglightQuestion(questionId: string) {
  await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
    isHiglighted: true,
  });
}



  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          
          <div>
          <RoomCode code={roomId} />
          <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} caixa(s) de sugestão</span> }
        </div>

        <div className="question-list">
        {questions.map(question => {
          return (
            <Question
            key={question.id} 
            content={question.content}
            author={question.author}
            isAnswerd={question.isAnswered}
            isHighlighted={question.isHighlighted}
            >
              {!question.isAnswered && (
                //<></> Fragment, utilisado para evitar erros no css do react.
                <>
                <button
                type="button"
                onClick={() => handleCheckQuestionAsAnswered(question.id)}
                >
                  <img src={checkImg} alt="Marcar pergunta como respondida" />
                </button>
                <button
                type="button"
                onClick={() => handleHiglightQuestion(question.id)}
                >
                  <img src={answerImg} alt="Dar destaque à pergunta" />
                </button>
                </>
              )}
              <button
              type="button"
              onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt="Remover pergunta" />
              </button>
            </Question>
          );
        })}
        </div>
      </main>
    </div>
  );
}

// Algorítimo de reconciliação