<template>
  <div>
    <h2>test component for {{ test123 }}</h2>
    <h3 v-for="cat in catsData" :key="cat.name">{{ cat.name }}</h3>
  </div>
</template>

<script>
import firebase from "firebase";
const db = firebase.firestore();

export default {
  data() {
    return {
      test123: "testing123",
      catsData: [],
    };
  },
  methods: {
    test() {
      console.log("testing");
    },
    getCats() {
      this.catsData = [];
      db.collection("cats")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.catsData.push({
              name: doc.data().name,
              photo: doc.data().photo,
            });
            console.log(doc.id + " " + doc.data().name);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    // this.test();
    this.getCats();
  },
};
</script>

<style scoped lang="scss"></style>
