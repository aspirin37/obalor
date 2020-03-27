<template>
  <div style="margin-top: 20px">
    <div
      class="title"
      @click="showActualNodeParameters"
    >
      {{ node.name }}
    </div>
    <ul>
      <li
        v-for="(it, i) in node.children"
        :key="i"
      >
        <tree :node="it" />
      </li>
    </ul>
    <template v-if="isModalShown">
      <b-modal
        v-model="isModalShown"
        :title="node.name"
        size="lg"
      >
        <vue-json-pretty
          show-length
          :select-on-click-node="false"
          :data="actualNodeParameters"
        />
      </b-modal>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Tree',
  props: {
    node: Object,
  },
  data: () => ({
    isModalShown: false,
  }),
  computed: {
    ...mapGetters(['userDimensions']),
    actualNodeParameters() {
      // найти те правила
      const compliedRules = this.node.rules
        .filter(rule => {
          // в которых есть хотя бы один фильтр,
          const ruleHasCompliedFilters = rule.filters.find(filter => {
            // все элементы которого
            return Array.from(Object.entries(filter)).every(([key, value]) => {
              // совпадают с дименшнами юзера
              if (typeof value === 'boolean') {
                return this.userDimensions[key] === value;
              }
              if (typeof value === 'object') {
                return value.includes(this.userDimensions[key]);
              }
            });
          });

          // или правила, в которых нет фильтров
          const ruleHasNoFilters = !rule.filters.length;

          return ruleHasCompliedFilters || ruleHasNoFilters;
        })
        // отобразить только параметры
        .map(({ parameters }) => parameters)
        // первые совпадения вынести в приоритет
        .reverse();

      // вернуть итоговый объект с актуальными параметрами
      return Object.assign(...compliedRules);
    },
  },
  methods: {
    showActualNodeParameters() {
      this.isModalShown = true;
    },
  },
};
</script>

<style>
ul,
.title {
  margin-bottom: 10px;
  cursor: pointer;
}
</style>
