import { createStore } from "vuex";
import _ from "lodash";
import {
  ADD_TODO,
  DELETE_TODO,
  GET_TODO,
  TASK_SELECT,
  UPDATE_STATUS,
  UPDATE_TASK,
} from "../configs";
// Create a new store instance.
export const store = createStore({
  state() {
    return {
      todo: [],
      status: false,
      edit: {},
    };
  },
  // lấy ra state
  getters: {
    todo: (state) => state.todo,
    edit: (state) => state.edit,
    status: (state) => state.status,
  },
  // các hàm để thao tác với state
  mutations: {
    [GET_TODO](state, payload) {
      state.todo = payload;
    },
    [ADD_TODO](state, payload) {
      state.todo.push(payload);
    },
    [DELETE_TODO](state, payload) {
      const filter = state.todo.filter((_todo) => _todo.id !== payload.id);
      state.todo = filter;
    },
    [UPDATE_TASK](state, payload) {
      const index = state.todo.findIndex((_item, id) => {
        return _item.id === payload.id;
      });
      console.log(index);
      state.todo[index] = payload;
      state.tode = JSON.parse(JSON.stringify(state.todo));
    },
    [TASK_SELECT](state, payload) {
      state.edit = payload;
    },
    [UPDATE_STATUS](state,payload){
      state.status = !state.status
    }
  },
});
