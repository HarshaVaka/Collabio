import { TodoItem } from "./Todo/TodoItem";

export function Todo(){
    return (
        <div className="flex flex-row">
            <div>Todo</div>
            <TodoItem/>
        </div>
    )
}