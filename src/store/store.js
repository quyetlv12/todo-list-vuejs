import { createStore } from "vuex";
import _ from 'lodash'
// Create a new store instance.
export const store = createStore({
  state() {
    return {
     todo : []
    };
  },
  // lấy ra state
  getters : {
    todo : state => state.todo
  },
  // các hàm để thao tác với state
  mutations: {
    setTodo(state , payload){
      state.todo = payload
    },
    add(state , payload){
     state.todo.push(payload)
    },
    completed(state,payload){

    },
    delete(state,payload){

    },
    update(state,payload){

    }
  },
});
