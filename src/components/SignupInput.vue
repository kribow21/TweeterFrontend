<template>
    <div>
        <form id="Form" action="javascript:void(0)">
            <label for="email">Email</label>
            <input v-model="email" type="text" id="email">
            <label for="username">Username</label>
            <input v-model="username" type="text" id="username">
            <label for="password">Password</label>
            <input v-model="password" type="text" name="password" id="password">
            <label for="profileBio">Profile Bio</label>
            <input v-model="proBio" type="text" name="bio" id="proBio">
            <label for="birthday">Birthday</label>
            <input v-model="birthday" type="date" name="birthday" id="birthDate">
            <label for="profileURl">Profile Picture</label>
            <input v-model="proPic" type="url" id="picUrl">
        </form>
        <button @click="makeSignupCall" id="signUp">Sign Up</button>
    </div>
</template>

<script>
import axios from "axios";

    export default {
        name : 'SignupInput',
        data() {
            return {
                email : "",
                username : "",
                password : "",
                proBio : "",
                birthday : "",
                proPic : "",
            }
        },
        methods: {
            makeSignupCall() {
                axios.request({
                    url : "https://tweeterest.ml/api/users",
                    method : "POST",
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    data : 
                        { 
                        "email": this.email,
                        "username": this.username,
                        "password": this.password,
                        "bio": this.proBio,
                        "birthdate": this.birthday,
                        "imageUrl": this.proPic,
                        }
                    }).then((response) => {
                    console.log(response);
                    }).catch((error) => {
                    console.error("There was an error" +error);
                    })
                }
        }
        
    }
</script>

<style scoped>
form{
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(2 , 1fr);
}
</style>