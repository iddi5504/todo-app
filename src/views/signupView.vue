<template>
  <div class="signup">
   <div class="signup-fields">
    <label for="email">Email</label>
    <input class="signup-input"  type="email" v-model="email" name="email">
   </div>
    <div  class="signup-fields">
      <label for="password">Password</label>
    <input class="signup-input" type="password" v-model="password" name="email">
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
      createUserWithEmailAndPassword(auth,this.email,this.password)
      .then(response=>{
        console.log(response.user)
        this.$router.push("/todo")
      })
      .catch(error=>{
        console.log(error)
      })
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
  border-radius: 10px;
  width: 94%;
  padding: 10px;
  margin: 13px;
  box-sizing: border-box;
  font-size: 29px;
}
.signup-fields{
  display: flex;
  align-items: self-start;
  justify-content: center;
  gap: 10px;
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
}

label{
  font-size: 1.7rem;
  font-weight: 500;
  color: black;
  margin: 13px;
}
</style>