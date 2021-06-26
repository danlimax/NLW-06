//Importações das paginas e dos contextos.
import { BrowserRouter, Route, Switch } from "react-router-dom"

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";
import { AdminRoom } from "./pages/AdminRoom";

import { AuthContextProvider } from './contexts/AuthContext'





// Colocar exact para acessar apenas a home, pois sem ele vai buscar tido que começa com a barra.

//Criando rotas no react.
function App() {
 

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
        <Route path="/rooms/:id" component={Room} />
        <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;

// Componente no react é uma função que devolve um HTML.
//Tudo é componente.
//<Button></Button> formato children
//Estado é uma informação mantintida por um componente de dentro do react.