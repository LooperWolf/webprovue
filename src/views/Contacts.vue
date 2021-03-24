<template>
  <div id="contacts" v-if="render">
    <sui-segment raised color="teal" id="SearchBox">
      <sui-grid :columns="1">
        <sui-grid-row>
          <div
            is="sui-label"
            color="teal"
            ribbon
            style="margin-left: 14px; margin-bottom: 5px; text-align: center"
          >
            Contacts
          </div>
          <sui-input
            icon="search"
            placeholder="Search Name"
            style="flex: 1"
            v-model="search"
          />
          <div class="ui buttons right align">
            <button class="ui button" v-on:click="searchbox">Search</button>
            <button class="ui orange button" v-on:click="toggle">+</button>
          </div>
        </sui-grid-row>
      </sui-grid>
    </sui-segment>
    <!-- <sui-button @click.native="toggle">Show Modal</sui-button> -->
    <sui-modal v-model="showModal">
      <sui-modal-header>Contacts</sui-modal-header>
      <sui-modal-content>
        <sui-container style="padding: 20px">
          <sui-form>
            <sui-form-field required>
              <label style="text-align: left">Contact ID</label>
              <input
                placeholder="Contact ID"
                type="text"
                name="id"
                v-model="contact.id"
              />
            </sui-form-field>
            <sui-form-field required>
              <label style="text-align: left">First Name</label>
              <input
                placeholder="First Name"
                type="text"
                name="fname"
                v-model="contact.firstname"
              />
            </sui-form-field>
            <sui-form-field required>
              <label style="text-align: left">Last Name</label>
              <input
                placeholder="Last Name"
                type="text"
                name="lname"
                v-model="contact.lastname"
              />
            </sui-form-field>
            <sui-form-field required>
              <label style="text-align: left">Mobile No</label>
              <input
                placeholder="Mobile No"
                type="text"
                name="cnum"
                v-model="contact.phonenum"
              />
            </sui-form-field>
            <sui-form-field>
              <label style="text-align: left">Email</label>
              <input
                placeholder="Email"
                type="text"
                name="email"
                v-model="contact.email"
              />
            </sui-form-field>
            <sui-form-field>
              <label style="text-align: left">Facebook</label>
              <input
                placeholder="Facebook"
                type="text"
                name="fb"
                v-model="contact.fb"
              />
            </sui-form-field>
            <sui-form-field>
              <label style="text-align: left">Image Urlt</label>
              <input
                placeholder="Image Url"
                type="text"
                name="url"
                v-model="contact.image"
              />
            </sui-form-field>

            <sui-button type="submit" v-on:click="checkForm">Submit</sui-button>
          </sui-form>
        </sui-container>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button positive @click.native="toggle"> OK </sui-button>
      </sui-modal-actions>
    </sui-modal>
    <sui-divider />
    <sui-card-group
      class="middle aligned"
      style="align-items: center; justify-content: center; margin-left: auto"
    >
      <sui-segment
        raised
        color="teal"
        style="padding-left: 40px; padding-right: 40px; width: 100%"
      >
        <sui-grid :columns="1">
          <sui-grid-row>
            <div v-for="contract in contacts" :key="contract._id">
              <sui-card
                style="margin: 40px"
                v-if="checkcondition(contract.firstname + contract.lastname)"
              >
                <sui-image v-bind:src="contract.image" />
                <sui-card-content>
                  <sui-card-header style="margin-bottom: 10px">{{
                    contract.firstname + " " + contract.lastname
                  }}</sui-card-header>
                  <sui-card-meta>Mobile: {{ contract.phonenum }}</sui-card-meta>
                  <sui-card-meta> Email: {{ contract.email }} </sui-card-meta>
                  <sui-card-meta> Facebook: {{ contract.fb }} </sui-card-meta>
                </sui-card-content>
                <sui-card-content extra>
                  <sui-button
                    icon="edit"
                    color="blue"
                    v-on:click="edit(contract)"
                  />
                  <sui-button
                    icon="eraser"
                    color="red"
                    v-on:click="deletion(contract._id)"
                  />
                </sui-card-content>
              </sui-card>
            </div>
          </sui-grid-row>
        </sui-grid>
      </sui-segment>
    </sui-card-group>
  </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.min.js"></script>
<script src="https://unpkg.com/semantic-ui-vue/dist/commonjs/semantic-ui-vue.js"></script>
<script>
import modal from "vue-semantic-modal";
import axios from "axios";
export default {
  name: "Contacts",
  components: {
    modal,
  },
  mounted() {
    // fetch(`https://34.69.168.13:443/contacts/getmany`, {
    //   method: "GET",
    // })
    this.updateData();
  },
  data() {
    return {
      render:true,
      search: "",
      editing: false,
      potato: "potato",
      one: 1,
      showModal: false,
      confirmed: false,
      contacts: null,
      contact: {
        id: null,
        firstname: null,
        lastname: null,
        phonenum: null,
        email: null,
        fb: null,
        image: null,
      },
    };
  },
  methods: {
    async updateData() {
      await axios
        .get(`https://34.69.168.13:443/contacts/getmany`)
        .then((response) => {
          console.log(response);
          if (response.status != 200) throw new Error(response.status);
          // else return response.json();
          this.contacts = response.data;
        })
        // .then((responseJson) => {
        //   console.log(responseJson);
        //   this.contacts = responseJson;
        // })
        .catch((error) => {
          console.log("error: " + error);
        });
        this.$forceUpdate()
        this.render = false
        this.render = true
    },
    edit(data) {
      console.log("potato");
      this.toggle();
      this.editing = true;
      this.contact._id = data._id;
      this.contact.id = data.id.toString();
      this.contact.firstname = data.firstname.toString();
      this.contact.lastname = data.lastname.toString();
      this.contact.phonenum = data.phonenum.toString();
      this.contact.email = data.email.toString();
      this.contact.fb = data.fb.toString();
      this.contact.image = data.image.toString();
    },
    deletion(id) {
      console.log(id);
      // console.log(id)
      var payload = { _id: id };
      axios.post(`https://34.69.168.13:443/contacts/delete`, payload);
      this.updateData();
      // fetch(`httpss://34.69.168.13:443/contacts/delete`, {
      //   method: "DELETE",
      //   body: JSON.stringify({
      //     "_id": id
      //   }),
      // })
      //   .then((response) => {
      //     if (!response.ok) throw new Error(response.status);
      //     else return response.json();
      //   })
      //   .then((responseJson) => {
      //     console.log(responseJson);
      //   })
      //   .catch((error) => {
      //     console.log("error: " + error);
      //   });
    },
    checkcondition(str) {
      console.log(typeof str);
      // console.log(str.toLowerCase().includes(this.search.toLowerCase()));
      return str.toLowerCase().includes(this.search.toLowerCase());
    },
    checkForm: function (e) {
      console.log(this.contact);
      if (this.editing) {
        console.log("edited");
        console.log(this.contact);
        axios.put(`https://34.69.168.13:443/contacts/update`, this.contact);
        // fetch(`https://34.69.168.13:443/contacts/update`, {
        //   method: "PUT",
        //   body: JSON.stringify(this.contact),
        // })
        //   .then((response) => {
        //     if (!response.ok) throw new Error(response.status);
        //     else return response.json();
        //   })
        //   .then((responseJson) => {
        //     console.log(responseJson);
        //   })
        //   .catch((error) => {
        //     console.log("error: " + error);
        //   });
        this.editing = false;
      } else {
        axios.post(`https://34.69.168.13:443/contacts/add`, this.contact);
        // fetch(`https://34.69.168.13:443/contacts/add`, {
        //   method: "POST",
        //   body: JSON.stringify(this.contact),
        // })
        //   .then((response) => {
        //     if (!response.ok) throw new Error(response.status);
        //     else return response.json();
        //   })
        //   .then((responseJson) => {
        //     console.log(responseJson);
        //   })
        //   .catch((error) => {
        //     console.log("error: " + error);
        //   });
        e.preventDefault();
      }
      this.updateData();
    },
    searchbox() {
      console.log(this.search);
    },
    toggle() {
      this.showModal = !this.showModal;
      this.contact = {
        _id: null,
        id: null,
        firstname: null,
        lastname: null,
        phonenum: null,
        email: null,
        fb: null,
        image: null,
      };
    },
    confirm() {
      this.confirmed = true;
      this.showModal = false;
    },
    handlers: function (e) {
      console.log(e);
    },
    greet: function (event) {
      // `this` inside methods points to the Vue instance
      // console.log(this.name);
      // alert("Hello " + this.potato + "!");
      // if (event) {
      // alert(event.target.tagName);
      // }
      console.log("potato");
      this.showModal = true;
    },
  },
};
</script>

<style>
#contacts {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  background-color: white;
  align-items: center;
  justify-content: center;
}
#header {
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
#SearchBox {
  background-color: white;
  margin: 20px;
  justify-content: space-between;
  /* border-radius: 20px; */
}
</style>
