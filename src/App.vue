<template>
  <div id="app">
    <div class="container">
      <tree :node="config" />
    </div>
  </div>
</template>

<script>
import Tree from '@/components/Tree.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    Tree,
  },
  computed: {
    ...mapState(['config']),
  },
  created() {
    this.getConfig();
    this.getDimensions();
  },
  methods: {
    ...mapActions(['getConfig', 'getDimensions']),
  },
};
</script>

<style lang="scss"></style>
