import { useState } from "react";
import TodoList from "./components/todoList/TodoList";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <TodoList />
        </>
    );
}

export default App;
