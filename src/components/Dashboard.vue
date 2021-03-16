<template>
  <div id="dashboard">
  <div class="chart-title"><h1>Bar Chart</h1></div>
    <bar-chart></bar-chart>
    <div class="chart-title"><h1>Line Chart</h1></div>
    <LineChart></LineChart>
  </div>
</template>

<script>
import BarChart from "./../barchart.js";
import LineChart from "./../linechart.js"

export default {
  components: {
    BarChart,
    LineChart: LineChart
  }
};
</script>

<style>
.chart-title {
    text-align: center;
}
</style>

