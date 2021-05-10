<template>
  <div class="p-formgroup-inline p-d-flex p-jc-center">
    <div class="p-field">
      <InputText
        id="search"
        v-model="searchString"
        type="text"
        placeholder="Search by title"
      />
    </div>
    <Button @click="search" type="button" icon="pi pi-search" label="Search" />
  </div>
  <div class="list-container">
    <div
      class="p-d-flex p-jc-center"
      v-for="item in filteredItems"
      :key="item.id"
    >
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
      filteredItems: [],
      searchString: "",
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
        .orderBy("created")
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
          //console.log(this.items);
          this.filteredItems = this.items;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    search() {
      console.log("search:", this.searchString);
      if (this.searchString.length > 0) {
        this.filteredItems = this.items.filter((item) =>
          item.title.toLowerCase().includes(this.searchString.toLowerCase())
        );
        console.log(this.filteredItems);
      } else {
        this.filteredItems = this.items;
      }
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
