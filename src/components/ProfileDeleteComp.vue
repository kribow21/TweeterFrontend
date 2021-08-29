<template>
    <div>
        <!-- delete profile method toggles the password input thats needed for the api call to confirm their request is authorized-->
        <v-btn
            @click="deleteProfile"
            color="primary"
            elevation="2"
            raised
        >Delete Profile</v-btn>
        <div :class="{passwordForm : isForm}">
        <v-col
            cols="12"
            sm="6"
            md="3"
        >
        <v-text-field
            label="Password"
            v-model="userPassword"
            :type="'password'"
            outlined
        ></v-text-field>
        <v-btn
                @click="confirmDelete"
                color="primary"
                elevation="2"
                raised
            >Confirm</v-btn>
        </v-col>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies"
    export default {
        name : 'ProfileDeleteComp',
        data() {
            return {
                isForm: true,
                userPassword: "",
            }
        },
        methods: {
            deleteProfile() {
                if (this.isForm == true){
                    this.isForm = false
                }else if(this.isForm == false){
                    this.isForm = true
                }
            },
            confirmDelete(){
                axios.request({
                    url : "https://tweeterest.ml/api/users",
                    method : "DELETE",
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    data : {
                        "loginToken" : cookies.get('loginToken'),
                        "password" : this.userPassword,
                    }
                }).then((response) => {
                    console.log(response);
                    cookies.remove('loginToken');
                    cookies.remove('userId')

                }).catch((error) => {
                    console.error("There was an error" +error);
                })
            }
        }
    }
</script>

<style scoped>
.passwordForm{
    display: none;
}
</style>