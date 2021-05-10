<template>
  <div class="about">
    <h1>This is an about page</h1>
    <TestComponent />
  </div>
</template>

<script>
import TestComponent from "@/components/TestComponent.vue";

export default {
  name: "Test",
  components: {
    TestComponent,
  },
};
</script>
