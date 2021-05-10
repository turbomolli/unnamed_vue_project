<template>
  <div class="p-d-flex p-jc-center">
    <Card class="card">
      <template #header> </template>
      <template #title>
        <span v-if="routeParams">Edit item</span>
        <span v-if="!routeParams">Create new item</span>
      </template>
      <template #content>
        <div class="p-fluid">
          <div class="p-field">
            <!-- <label for="title">Title</label> -->
            <InputText
              id="title"
              v-model="form.title"
              type="text"
              placeholder="Title"
            />
            <textarea
              id="content"
              v-model="form.content"
              placeholder="Content"
              type="text"
              rows="5"
            />
            <Button @click="saveForm" label="Save"></Button>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import firebase from "firebase";
import { useRoute } from "vue-router";

export default {
  data() {
    return {
      form: {
        id: null,
        title: "",
        content: "",
      },
      routeParams: null,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    saveForm() {
      if (this.form.title && this.form.content) {
        console.log(this.form);
        if (this.form.id) {
          this.updateItem(this.form.id, this.form);
        } else {
          this.createItem(this.form);
        }
      } else {
        console.log("no empty");
      }
    },
    createItem(item) {
      firebase
        .firestore()
        .collection(`users2/${this.user.data.uid}/items`)
        .add({
          title: item.title,
          content: item.content,
          created: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          console.log("added to db");
          this.$router.push({ path: "/" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateItem(id, item) {
      firebase
        .firestore()
        .collection(`users2/${this.user.data.uid}/items`)
        .doc(id)
        .update({
          title: item.title,
          content: item.content,
        })
        .then(() => {
          console.log("item updated succesfully");
          this.$router.push({ path: "/" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getItem(id) {
      firebase
        .firestore()
        .collection(`users2/${this.user.data.uid}/items`)
        .doc(id)
        .get({ idField: "id" })
        .then((doc) => {
          if (doc.exists) {
            console.log("document", doc.data());
            this.form = {
              id: doc.id,
              title: doc.data().title,
              content: doc.data().content,
              created: doc.data().created,
            };
          } else {
            console.log("not found");
          }
        });
    },
  },
  mounted() {
    const route = useRoute();
    this.routeParams = route.params.id;
    if (this.routeParams) {
      this.getItem(this.routeParams);
    }
  },
};
</script>

<style lang="scss" scoped>
.item-container {
  text-align: center;
}

.card {
  margin-left: auto;
  margin-right: auto;
  width: 45rem;
  margin: 2em;
}

textarea {
  margin-top: 1em;
  width: 100%;
}
</style>
