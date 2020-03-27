<template>
  <div id="app">
    <div class="container">
      <tree :node="config" />
    </div>
  </div>
</template>

<script>
import Tree from '@/components/Tree.vue';
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    Tree,
  },
  data: () => ({
    isModalShown: false,
  }),
  computed: {
    ...mapState(['dimensions', 'config']),
    ...mapGetters(['userDimensions']),
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
