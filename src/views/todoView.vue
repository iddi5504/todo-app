<template>
  <div class="todo">
    <div class="w-100">
      <div class="d-flex py-4 flex-column justify-content-around align-items-center">
        <h3 class="h1">Add a todo</h3>
        <div class="d-flex flex-column justify-content-around align-items-center w-100 mw-70">
          <div style="position:relative;">
          <input type="text" v-on:keyup.enter="addTodo" v-model="todotext" class="todo-input">
            <i class="bi bi-blockquote-right input-icon"></i>
          </div>
          <div class="w-100">
            <button @click="addTodo" type="button" class="btn ">
              <span>Add to do</span>
              <i style="font-size:1.4rem;" class="bi bi-plus"></i>
            </button>
            <select class="select" v-model="sortby" name="sortby" id="sortby">
              <option value="time">Sort by date</option>
              <option value="priority">Sort by priority</option>
            </select>
          </div>

        </div>
      </div>
      <div class="todo-containers">
        <div v-for="todo in todos" :key="todo.id"
          class="todo-container d-flex flex-row justify-content-between align-items-center w-100 mw-70">
          <div class="d-flex flex-row justify-content-between align-items-start w-100 p-1">
            <div style="text-align:left;"
              class="d-flex flex-column justify-content-around  text-left align-items-start  w-100">
              <div class="p-1 h3">
                {{todo.todo}}
              </div>
              <div class="d-flex flex-row justify-content-start g-10 align-items-start w-100">
                <div>
                  Date
                </div>
                <div>
                  {{todo.priority}}
                </div>
              </div>
            </div>
            <div>
              <i @click="deleteTodo(todo.id)" class="bi bi-trash"></i>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { firestore } from "../firebase"
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  doc,
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore'
const todos = collection(firestore, "todos")
export default {
  data() {
    return {
      todotext: "",
      todos: [],
      sortby: "time"
    }
  },
  methods: {
    addTodo() {
      addDoc(todos, {
        todo: this.todotext,
        priority: 3,
        time: serverTimestamp(),

      })
        .then(() => {
          this.todotext = ""
        })
    },
    deleteTodo(id) {
      const thisTodo = doc(todos, id)
      deleteDoc(thisTodo)
    }
  },
  created() {

  },
  watch: {
    sortby: {
      handler(sortby) {
        const todoQuery = query(todos, orderBy(sortby, 'desc'))
        onSnapshot(todoQuery, (snapshot) => {
          const todos = []
          snapshot.forEach(snapshot => {
            todos.push({ ...snapshot.data(), id: snapshot.id })
            console.log(snapshot)
          });
          this.todos = todos
          console.warn(todos)
        })
      },
      immediate: true
    }
  }
}
</script>

<style>
.todo {
  height: 100vh;
  width: 100%;
}

.todo-input {
  max-width: 377px;
  border-radius: 10px;
  background: aliceblue;
  border: none;
  box-shadow: 1px 2px 4px grey;
  padding: 10px;
  margin: 10px;
  width: 100%;
  color: hotpink;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 30px;
  outline: none;
  padding-left: 50px;
}

.todo-input:hover{
 
}

button {
  background: hotpink !important;
}

.todo-container {
  max-width: 530px;
  border-radius: 10px;
  background: pink;
  padding: 10px;
  box-shadow: 1px 2px 7px 0px grey;
}

.todo-containers {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  margin: 12px;
}

.select {
  width: 150px;
  padding: 5px;
  margin: 5px;
  border-radius: 10px;
  height: 2.8rem;
}

.bi-trash {
  font-size: 2rem;
}
.bi-card-text {
}
.input-icon{
  position: absolute;
  top: 7px;
  left: 20px;
  font-size: 2rem;
  
}
</style>