import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { useEffect, useState } from "react";
import type { Schema } from "../data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function Home({}) {
  const [, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data: { items: any; }) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    if (name && content) {
      client.models.Todo.create({ name, content }).then(() => {
        setName('');
        setContent('');
      });
    }
  }
//    client.models.Todo.create({ content: window.prompt("Todo content") });
//    client.models.Todo.create({ name: window.prompt("Todo name") });

  return (
    <Authenticator>
      {({ signOut }) => (

    <main>

      <div className="afterheader">
      <h1>Insertá tus datos webon</h1>
      </div>

      <div className="create">
      <input 
        type="text" 
        placeholder="Nombre" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      /> <br />
      <input className="content"
        type="text" 
        placeholder="Comentario" 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
      /> <br />
      <button onClick={createTodo}>Crear</button>
      </div>

      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>

      <button onClick={signOut}>Sign out</button>

    </main>

    )}
    </Authenticator>

  );
}

export default Home;
