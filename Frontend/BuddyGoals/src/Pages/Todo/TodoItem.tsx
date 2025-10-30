import { useParams } from "react-router-dom"

export function TodoItem(){
    const {id} = useParams();
    return <>Todo Item with id:{id}</>
}