<template>
  <div id="chart" :style="{height: '500px', width: '1000px'}"></div>
</template>
<script>
import echarts from 'echarts'

export default {
  name: 'home',
  mounted () {
    this.drawCharts()
  },
  methods: {
    drawCharts () {
      let myCharts = echarts.init(document.getElementById('chart'), 'light')
      myCharts.setOption({
        legend: {},
        tooltip: {},
        dataset: {
          // 提供一份数据
          source: [
            ['product', '2015', '2016', '2017'],
            ['Matcha Latte', 43.3, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            ['Walnut Brownie', 72.4, 53.9, 39.1]
          ]
        },
        // X轴，类目轴
        xAxis: {type: 'Category'},
        // Y轴
        yAxis: {},
        series: [
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'}
        ]
      })
    }
  }
}
</script>
