<template>
  <div class="signup">
   <div class="signup-fields">
    <label for="email">Email</label>
    <input class="signup-input"  type="email" v-model="email" name="email">
   </div>
    <div  class="signup-fields">
      <label for="password">Password</label>
      <input @keyup.enter="SignUp" class="signup-input" type="password" v-model="password" name="email">
    </div>
    <button @click="signUp">Sign up</button>
    <div  @click="login">
        <div style="text-align: center;
        font-size: 1.4rem;
        padding: 30px;">
          Already have an account ? <br> Login
        </div>

    </div>
  </div>
</template>
<script>

import { auth } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
  
} from 'firebase/auth'
export default {
  data(){
    return {
      email:"",
      password:""
    }
  },
  methods:{
    signUp(){
     if (this.email && this.password) {
      createUserWithEmailAndPassword(auth,this.email,this.password)
      .then(response=>{
        console.log(response.user)
        this.$router.push("/todo")
      })
      .catch(error=>{
        console.log(error)
      })
     } else {
      alert("Please fill out the form")
     }
    },
    login(){
      signInWithEmailAndPassword(auth,this.email,this.password)
      .then(response=>{
        console.log(response.user)
        this.$router.push("/todo")
      })
      .catch(
       ()=>{
        throw "there was an error while signing you in "
       }
      )
    }
  }
}
</script>
<style scoped>
.signup-input{
  border-radius: 6px;
  width: 94%;
  padding: 10px;
  margin: 6px 13px;
  box-sizing: border-box;
  font-size: 29px;
  max-width: 45ch;
  border: none;
  box-shadow: 3px 2px 5px grey;
  outline: none;
  color: #4b4949;
}
.signup-fields{
  display: flex;
  align-items: self-start;
  justify-content: center;
  gap: 5px;
  flex-direction: column;
  width: inherit;
}
.signup{
  display: flex;
  flex-direction: column;
  justify-content: center;
  column-gap: 20px;
  width: 100%;
  align-items: center;
  max-width: 380px;

}

button{
  padding: 10px;
  border-radius: 10px;
  border: none;
  font-size: 1.5rem;
  max-width: 200px;
  width: 100%;
  background: rebeccapurple;
  color: white;
  font-weight: bolder;
  margin: 18px;
  box-shadow: 1px 2px 7px grey;
}

label{
  font-size: 1.7rem;
  font-weight: 500;
  color: black;
  margin: 0 17px;
}
</style>