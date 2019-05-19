<template>
  <ion-grid>
    <ion-row>
      <ion-item size="12">
        <ion-img src="logo.png"></ion-img>
      </ion-item>
      <ion-col size="12">
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input :value="email" @input="email = $event.target.value"></ion-input>
        </ion-item>
      </ion-col>
      <ion-col size="12">
        <ion-item>
          <ion-label position="floating">Password</ion-label>
          <ion-input :value="password" @input="password = $event.target.value" type="password"></ion-input>
        </ion-item>
      </ion-col>
      <ion-col size="12">
        <ion-item>
          <ion-label position="floating">Repeat Password</ion-label>
          <ion-input :value="c_password" @input="c_password = $event.target.value" type="password"></ion-input>
        </ion-item>
      </ion-col>
      <ion-col size="12">
        <ion-label v-if="error != null" text-wrap>
          <ion-text color="danger">
            <h3>{{error}}</h3>
          </ion-text>
        </ion-label>
      </ion-col>
      <ion-col size="12">
        <ion-button :disabled="isLoading" expand="block" @click="signUp">
          <ion-spinner v-if="isLoading" name="crescent"></ion-spinner>
          {{ !isLoading ? "Sign up" : "" }}
        </ion-button>
      </ion-col>
      <ion-col size="12">
        <a @click="signIn">Already have an account ?</a>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      email: "",
      password: "",
      c_password: "",
      error: null,
      isLoading: false
    };
  },
  methods: {
    signIn() {
      this.$router.push("login");
    },
    signUp() {
      if(this.password != this.c_password){
        this.error = "password and confirm password not match"
        return;
      }
      this.isLoading = true;
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(success => {
          this.isLoading = false;
          this.error = null;
          this.$router.push("home");
        })
        .catch(error => {
          this.isLoading = false;
          this.error = error.message;
        });
    }
  }
};
</script>
<style scoped>
ion-img {
  margin-bottom: 20px;
  margin-top: 20px;
  height: 25vh !important;
  width: auto !important;
  align-items: center;
}
a {
  text-decoration: underline;
  font-weight: bold;
  cursor: pointer;
}
</style>