<template>
  <div id="app">
    <input type="text" v-model="username" name="name">
    
    <button @click="post">Submit</button>
    <button @click="signOut">Sign out</button>
    <br>
    <input type="text" v-model="id">
    <button style="background-color:red;" @click="deleteUser">Delete</button>
    <button style="background-color:green;" @click="getUser">get</button>
    <input type="text" v-model="editedEmail" placeholder="edit email">
    <button style="background-color:cyan;" @click="editEmail">Edit</button>

  </div>
</template>
<script>
import { users } from './firebase'
import { getDocs } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { 
  connectAuthEmulator,
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc,
   deleteDoc, 
   onSnapshot,
    query,
   serverTimestamp,
    orderBy,
    getDoc,
    updateDoc
  } from "firebase/firestore";
import { database } from "./firebase"
const auth=getAuth()
connectAuthEmulator(auth,"http://localhost:9099")
export default {
  data() {
    return {
      username: "",
      email: "",
      id: "",
      editedEmail:"",
      password:""
    }
  },
  methods: {
    post() {
      addDoc(users, {
         username: this.username,
          email: this.email,
          createdAt:serverTimestamp()

         })
        .then(data => {
          console.log(data)
        })
    },
    deleteUser() {
      console.log()
      let thisUser = doc(database, "users", this.id)
      deleteDoc(thisUser)
        .then(data => { data })
      console.log(thisUser)
    },
    getUser() {
      const user= doc(database, "users", this.id)
      getDoc(user)
      .then(user => { console.log(user.data())});

    },
    editEmail(){
      const user=doc(database,"users",this.id)
      updateDoc(user,{
        email:this.editedEmail
      })
    },
    // creating an account
    signUp(){
      createUserWithEmailAndPassword(auth,this.email,this.password)
      .then(response => { console.log(response)})
    },
    signOut(){
      signOut(auth)
      .then(response=> { console.log(response)})
      .catch(error => { console.log(error)})
    }
  },
  created() {
    const Users= query(users,orderBy("createdAt",'desc'))
    getDocs(Users)
    .then(snapshot=>{
      // console.log({...snapshot.data()})
     let users=[]
     snapshot.docs.forEach(doc=>{
      users.push({...doc.data(),id:doc.id})
     })
     console.log(users)
    })

    onSnapshot(users, (snapshot) => {
    var localUsers = [];
      snapshot.docs.forEach(doc => {
        localUsers.push({ ...doc.data(), id: doc.id })
      })
      console.log(localUsers)
    })
  }}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

input {
  width: 70vw;
  padding: 10px;
  font-size: large;
  margin: 20px;
  background: aliceblue;
}

button {
  padding: 10px;
  font-size: large;
  margin: 10px;
  border-radius: 10px;
  width: 100px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
