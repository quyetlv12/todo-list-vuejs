import httpClient from "../apis/axiosClient";
import { API_TODO } from "../configs";

export const todoListService = {
  getAllTodo() {
    return httpClient.get(API_TODO);
  },
  addTodo(todo) {
    return httpClient.post(API_TODO, todo);
  },
  doneTask(id, todo) {
    return httpClient.put(`${API_TODO}/${id}`, todo);
  },
  deleteTask(id){
      return httpClient.delete(`${API_TODO}/${id}`)
  },
  update(id,task){
    return httpClient.put(`${API_TODO}/${id}`,task)
  }
};
