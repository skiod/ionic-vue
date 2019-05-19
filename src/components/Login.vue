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
          <ion-input type="password" :value="password" @input="password = $event.target.value"></ion-input>
        </ion-item>
      </ion-col>

      <ion-col size="12">
        <ion-label v-if="error != null" text-wrap>
          <ion-text color="danger">
            <h3>{{error}}</h3>
          </ion-text>
        </ion-label>
      </ion-col>

      <ion-col size="6">
        <ion-button :disabled="isLoading" expand="block" @click="signIn()">
          <ion-spinner v-if="isLoading" name="crescent"></ion-spinner>
          {{ !isLoading ? "Sign in" : "" }}
        </ion-button>
      </ion-col>
      <ion-col size="6">
        <ion-button :disabled="isLoading" expand="block" @click="fbLogin()">
          <ion-icon ios="logo-facebook" md="logo-facebook"></ion-icon>Login with fb
        </ion-button>
      </ion-col>
      <ion-col size="12">
        <a @click="signUp()">Sign up ?</a>
      </ion-col>
    </ion-row>
    <ion-toast></ion-toast>
  </ion-grid>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
      isLoading: false
    };
  },
  methods: {
    signIn() {
      this.isLoading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(success => {
          this.isLoading = false;
          this.error = null;
          this.$router.push("home");
        })
        .catch(error => {
          this.isLoading = false;
          this.error = error.message;
        });
    },
    signUp() {
      this.$router.push("signup");
    },
    fbLogin() {
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          var token = result.credential.accessToken;
          var user = result.user;
          this.$router.push('home')
        })
        .catch(error => {
          if (error.code == "auth/account-exists-with-different-credential") {
            var pendingCred = error.credential;
            firebase
              .auth()
              .fetchSignInMethodsForEmail(error.email)
              .then(methods => {
                if (methods[0] === "password") {
                  this.presentAlertPrompt().then(password => {
                    firebase
                      .auth()
                      .signInWithEmailAndPassword(error.email, password)
                      .then(user => {
                        // Step 4a.
                        return firebase
                          .auth()
                          .currentUser.linkWithCredential(pendingCred);
                      })
                      .then(() => {
                        this.error = null;
                        this.$router.push('home')
                      })
                      .catch((e) => {
                          this.error = e.message
                      })
                  });
                }
              })
              .catch(e => {
                this.error = e.message
              });
          }
        });
    },
    presentAlertPrompt() {
      return new Promise((resolve, reject) => {
        return this.$ionic.alertController
          .create({
            header: "Email already exist",
            subHeader:
              "You have already signed up with a different auth provider for that email.",
            inputs: [
              {
                name: "password",
                type : "password",
                placeholder: "password"
              }
            ],
            buttons: [
              {
                text: "Cancel",
                role: "cancel",
                cssClass: "secondary",
                handler: () => {
                  console.log("Confirm Cancel");
                }
              },
              {
                text: "Ok",
                handler: e => {
                  resolve(e.password);
                }
              }
            ]
          })
          .then(a => a.present());
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