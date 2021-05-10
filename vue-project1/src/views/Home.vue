<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- {{ $store.state.user.data }}
    <br />
    logged in: {{ user.loggedIn }} -->
    <h1>Welcome to Unnamed Vue Project</h1>
    <h3 v-if="!user.loggedIn">Login with Google to add new items</h3>
    <ItemsList v-if="user.loggedIn" />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import ItemsList from "@/components/ItemsList.vue";

export default {
  name: "Home",
  components: {
    ItemsList,
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>
