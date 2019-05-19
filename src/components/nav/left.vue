<template>
  <ion-menu side="start" menuId="custom" class="my-custom-menu">
    <ion-header>
      <ion-toolbar color="tertiary">
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>
          <ion-icon name="person"></ion-icon>Profile
        </ion-item>
        <ion-item>
          <ion-icon name="analytics"></ion-icon>Menu Item
        </ion-item>
        <ion-item>
          <ion-icon name="chatboxes"></ion-icon>Menu Item
        </ion-item>
        <ion-item>
          <ion-icon name="settings"></ion-icon>Settings
        </ion-item>
        <ion-item @click="logOut()">
          <ion-icon name="log-out"></ion-icon>Log out
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>
<style scoped>
ion-item {
  cursor: pointer;
}
</style>
<script>
import firebase from 'firebase';
export default {
  name: "left",
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then((status) => {
            this.$router.push('login')  
        })
        .catch(error => {
            alert('error',error)
        })
    }
  }
};
</script>