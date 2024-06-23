// Filename - pages/data.tsx
import React from 'react' 
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import type { Schema } from "../data/resource";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

const Data: React.FC = () => {
    const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

    useEffect(() => {
        client.models.Todo.observeQuery().subscribe({
          next: (data: { items: any; }) => setTodos([...data.items]),
        });
      }, []);

      function deleteTodo(id: string) {
        client.models.Todo.delete({ id })
      }

    return (
        <Authenticator>
            {({ signOut }) => (
        <div>
            <h1>Datos</h1>

    <div className="list">
     <ul>
        {todos.map((todo) => (
          <li 
          onClick={() => deleteTodo(todo.id)}
          key={todo.id}> <strong> {todo.name} </strong><br /> {todo.content}</li>
        ))}
      </ul>
      </div>

            <button onClick={signOut}>Sign out</button>
        </div> )}
        </Authenticator>
    );
};
 
export default Data;