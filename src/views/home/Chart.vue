<template>
  <div>
    <!-- <ve-line :data="orderChart" :settings="settings"></ve-line>
    <ve-pie :data="productChart"></ve-pie> -->
  </div>
</template>

<script>
export default {
  name: "Chart",
  data: function () {
    return {
      settings: {
        labelMap: {
          count: '当日订单总数'
        }
      },
      orderChart: {
        columns: ['date', 'count'],
        rows: []
      },
      productChart: {
        columns: ['name', 'total'],
        rows: []
      }
    }
  },
  mounted() {

  },
  methods: {
    loadChart(url) {

    },

    loadProductChart(url) {

    }
  }
};
</script>

<style></style>
