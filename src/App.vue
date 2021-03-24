<template>
  <div id="app">
    <h2 is="sui-header" id="appheader">
      <sui-grid :columns="1">
        <sui-grid-row>
      <router-link to="/" custom v-slot="{ navigate }">
        <div @click="navigate" id="logo" style=" height:100%">
          <sui-image
            style="height: 50px"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1184px-Vue.js_Logo_2.svg.png"
          />
        </div>
      </router-link>
      <!-- <div
        is="sui-button"
        content="Contacts"
        id="contacts"
        v-on:click="greet"
      /> -->
      <router-link to="/contacts" custom v-slot="{ navigate }"
        ><div
          is="sui-button"
          content="Contacts"
          id="contactsbutton"
          style="
            color: white;
          "
          v-on:click="navigate"
        />
      </router-link>
        </sui-grid-row>
      </sui-grid>
    </h2>
    <!-- <div id="nav">
      <router-link to="/" tag="sui-button">Home</router-link> |
      <router-link to="/contacts">Contacts</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#logo {
  height: 20px;
}
#appheader {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  align-content: left;
  color: #2c3e50;
  background-color: rgb(34, 34, 34);
  padding: 10px;
  padding-left: 20px;
}

#contactsbutton {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-align: start;
  align-self: center;
  background-color: rgb(34, 34, 34);
  /* margin-left: 100px; */
  /* margin-bottom: 20px; */
}


#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
