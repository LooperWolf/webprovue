<template>
  <sui-card class="centered" style="width: 30%">
    <sui-segment raised color="teal" id="float">
      <sui-grid :columns="1">
        <sui-grid-row>
          <div is="sui-label" color="teal" ribbon style="margin-left: 14px">
            Login
          </div>
        </sui-grid-row>
      </sui-grid>
    </sui-segment>
    <sui-container style="padding: 20px">
      <sui-form>
        <sui-form-field>
          <label style="text-align: left">User Account</label>
          <input
            placeholder="User Account"
            type="text"
            name="name"
            v-model="login.username"
          />
          <label
            style="text-align: left; color: red"
            v-if="this.login.username == ''"
            >Please Enter Username</label
          >
        </sui-form-field>
        <sui-form-field>
          <label style="text-align: left">Password</label>
          <input
            placeholder="Password"
            type="text"
            name="password"
            v-model="login.password"
          />
          <label
            style="text-align: left; color: red"
            v-if="this.login.password == ''"
            >Please Enter Password</label
          >
        </sui-form-field>
        <sui-button type="submit" v-on:click="checkForm">Submit</sui-button>
      </sui-form>
    </sui-container>
  </sui-card>
</template>

<script>
import axios from "axios";
import router from '../router'

// @ is an alias to /src
export default {
  name: "Home",
  data: function () {
    return {
      login: {
        username: null,
        password: null,
      },
    };
  },
  methods: {
    checkForm: function (e) {
      console.log("potato");
      console.log(this.login.username);
      console.log(this.login.password);

      axios
        .post(`httpsS://34.69.168.13:443/contacts`, this.login)
        .then((response) => {
          console.log(response.data[0]);
          if(response.data[0])
          router.push('contacts')
        });

      if (!this.login.username) {
        this.username = "";
      }
      if (!this.login.password) {
        this.password = "";
      }

      e.preventDefault();
    },
  },
};
</script>
<style>
#float {
  background-color: white;
  margin: 20px;
  border-radius: 20px;
}

#form {
  text-align: left;
}
</style>
