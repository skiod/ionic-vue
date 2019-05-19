<template>
  <div>
    <!-- header -->
      <ion-header>
        <ion-toolbar>
          <ion-grid>
        <ion-row>
          <ion-col size="1">
              <ion-icon @click="openStart()" name="menu"></ion-icon>
          </ion-col>
          <ion-col size="11">
            <ion-title>Home</ion-title>
          </ion-col>
        </ion-row>
          </ion-grid>
        </ion-toolbar>
      </ion-header>
    <!--  header-->

   <!-- nav left -->
   <navLeft></navLeft>
   <!-- nav left -->
   
  <ion-menu-controller main></ion-menu-controller>
  </div>
</template>
<style>
.my-custom-menu {
  --width: 300px;
}
ion-icon{
  cursor: pointer;
  height:100%;
  font-size: 25px
}
</style>

<script>
  import navLeft from './nav/left';
    export default {
    components : {navLeft},
    methods : {
      openStart () {
        document.querySelector('ion-menu-controller').open('start')
      }
    },
    mounted(){
    }
  }
    
</script>