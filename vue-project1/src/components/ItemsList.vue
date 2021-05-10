<template>
  <h2>lists goes here</h2>
  <div class="list-container">
    <div class="p-d-flex p-jc-center" v-for="item in items" :key="item.id">
      <Card class="card" @click="$router.push({ path: `/item/${item.id}` })">
        <template #header> </template>
        <template #title>{{ item.title }}</template>
        <template #content>{{ item.content }}</template>
      </Card>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import firebase from "firebase";

export default {
  data() {
    return {
      items: [],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    getItems() {
      this.items = [];
      firebase
        .firestore()
        .collection(`users2/${this.user.data.uid}/items`)
        .get({ idField: "id" })
        .then((qs) => {
          qs.forEach((doc) => {
            //console.log(doc.id);
            this.items.push({
              id: doc.id,
              title: doc.data().title,
              created: doc.data().created,
              content: doc.data().content,
            });
          });
          console.log(this.items);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getItems();
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 20rem;
  margin: 2em;
}
.list-container {
  width: 100%;
}
</style>
