<template>
        <div id="User">
        <form id="Form" action="javascript:void(0)">
            <label for="email">Email</label>
            <input type="text" id="email">
            <label for="password">Password</label>
            <input type="password" name="password" id="password">
        </form>
            <button @click="makeLoginRequest">Log In</button> 
        <h3 id="failResponse"></h3>
    </div>
</template>

<script>
import axios from "axios";
    export default {
        name : 'LoginInput',
                methods : {
                    makeLoginRequest : function() {
                    let emailInput = document.getElementById('email').value;
                    let passInput = document.getElementById('password').value;
                    axios.request({
                    url : "https://tweeterest.ml/api/login",
                    method : "POST",
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    data : {
                        email : emailInput,
                        password : passInput
                    }
                }).then((response) => {
                    console.log(response);

                }).catch((error) => {
                    console.error("There was an error" +error);
                    document.getElementById('failResponse').innerText="Failed to login"
                })
            }
        }
    }
</script>

<style scoped>

</style>