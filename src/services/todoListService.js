import httpClient from "../apis/axiosClient"
import { API_TODO } from "../configs"

export const todoListService = {
    getAllTodo(){
        return httpClient.get(API_TODO)
    },
    addTodo(todo){
        return httpClient.post(API_TODO,todo)
    }
}