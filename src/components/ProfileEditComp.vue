<template>
    <div>
        <!-- the edit profile method toggles the editing form so the user can input what they want to change-->
            <v-btn
            @click="editProfile"
            class="ma-2"
            color="secondary"
            dark
            >
            <v-icon dark>
            mdi-account-cog-outline
            </v-icon>
            </v-btn>
            <v-container :class="{editForm : isForm}">
            <v-row>
                <v-col
                    cols="12"
                    sm="6"
                    md="3"
                >
                <v-text-field
                    label="Email"
                    v-model="userEmail"
                    outlined
                ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="3"
                >
                <v-text-field
                    label="Username"
                    v-model="userUsername"
                    outlined
                ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="3"
                >
                <v-text-field
                    label="Profile Bio"
                    v-model="proBio"
                    outlined
                ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="3"
                >
                <v-text-field
                    label="Profile Pic"
                    v-model="proPic"
                    outlined
                ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="3"
                >
                <v-text-field
                    label="YYYY-MM-DD"
                    v-model="birthday"
                    outlined
                ></v-text-field>
        <!-- confirms changes with a message to let the user know it was sucessful-->
                <v-btn
                    @click="postEditRequest"
                    class="ma-2"
                    color="secondary"
                    dark
                    >
                    <v-icon dark>
                    mdi-lock-check-outline
                    </v-icon>
                </v-btn>
                <p id="confirmResponse"></p>
                </v-col>
            </v-row>
            </v-container>
    </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies"
    export default {
        name : 'ProfileEditComp',
        data() {
            return {
                isForm: true,
                userEmail: "",
                userUsername: "",
                proBio: "",
                proPic: "",
                birthday: "",
            }
        },
        methods: {
            editProfile(){
                if (this.isForm == true){
                    this.isForm = false
                }else if(this.isForm == false){
                    this.isForm = true
                }
            },
            postEditRequest(){
                    axios.request({
                    url : "https://tweeterest.ml/api/users",
                    method : "PATCH",
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    data : {
                        "loginToken" : cookies.get('loginToken'),
                        "email": this.userEmail,
                        "username": this.userUsername,
                        "bio": this.proBio,
                        "imageUrl" : this.proPic,
                        "birthdate": this.birthday
                    }
                }).then((response) => {
                    console.log(response); 
                    document.getElementById('confirmResponse').innerText="Changes confirmed"
                    this.$emit('updateUserProfile');

                }).catch((error) => {
                    console.error("There was an error" +error);
                })
            }
        }
    }
</script>

<style scoped>
.editForm{
    display: none;
}
</style>