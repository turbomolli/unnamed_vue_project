<template>
  <Menubar :model="items">
    <template #start>
      <router-link to="/">
        <img alt="Vue logo" src="@/assets/logo.png" height="30" />
      </router-link>
    </template>
    <template #end>
      <Button
        v-if="!user.loggedIn"
        @click="login"
        label="Google Login"
        icon="pi pi-user"
      ></Button>

      <Avatar
        v-if="user.loggedIn"
        :image="user.data.photoURL"
        @click="toggelOverlay"
        shape="circle"
      />

      <OverlayPanel ref="op">
        <h4>{{ user.data.displayName }}</h4>
        <h5>{{ user.data.email }}</h5>
        <Button
          v-if="user.loggedIn"
          @click="logout"
          label="Logout"
          icon="pi pi-user"
        ></Button>
      </OverlayPanel>
    </template>
  </Menubar>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import firebase from "firebase";
// const db = firebase.firestore();

export default {
  data() {
    return {
      items: [
         {
          label: "New",
          icon: "pi pi-plus",
          to: "/item",
          visible: () => this.user.loggedIn,
        }
      ],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapMutations(["updateUserDetails", "updateLoggedIn"]),
    login() {
      console.log("login");
      this.userData = [];
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((res) => {
          console.log(res.user);
          this.updateUserData(res.user);
        });
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("logged out");
          // this.store.commit("updateUserData", []);
          // this.store.commit("updateLoggedIn", false);
          this.updateUserDetails([]);
          this.updateLoggedIn(false);
          this.toggelOverlay(event);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateUserData(user) {
      console.log(user);
      const data = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
      // this.store.commit("updateUserData", data);
      // this.store.commit("updateLoggedIn", true);
      this.updateUserDetails(data);
      this.updateLoggedIn(true);
      firebase
        .firestore()
        .collection("users2")
        .doc(user.uid)
        .set(data, { merge: true });
    },
    toggelOverlay(event) {
      this.$refs.op.toggle(event);
    },
  },
  mounted() {
    // this.test();
  },
};
</script>

<style scoped lang="scss">
img {
  margin-left: 1em;
  margin-right: 1em;
}
</style>
