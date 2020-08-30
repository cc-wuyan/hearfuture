<template>
  <div class="userPortrait">
    <div class="charts_chunk">
      <div class="radar_charts" ref="charts"></div>
    </div>
    <div class="table">
      <table>
        <tr>
          <th>客满度</th>
          <th>客流量</th>
          <th>成功率</th>
          <th>转介率</th>
          <th>留店时间</th>
        </tr>
        <tr v-if="userPortrait">
          <td>{{userPortrait.average}}%</td>
          <td>{{userPortrait.flow}}人</td>
          <td>{{userPortrait.success}}%</td>
          <td>{{userPortrait.share}}%</td>
          <td>{{userPortrait.time}}分钟</td>
        </tr>
        <tr v-else>
          <td colspan="5">暂无数据</td>
        </tr>
      </table>
      <div class="tips" v-show="userPortrait">备注：留店时间的最大值为180分钟，客流量的最大值为每月50人。</div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import api from "../../api/api";
export default {
  data() {
    return {
      userPortrait: null,
      sid: "",
    };
  },
  created() {
    this.sid = this.queryParams("sid");
    this.init();
  },
  methods: {
    async init() {
      await this.getData();
      this.getRadarCharts();
    },
    getData() {
      return api
        .postFormAPI("match/operatorPortrait", {
          sid:this.sid,
          type: "1",
        })
        .then((res) => {
          if (res.data.result != 1) {
            return;
          }
          let data = res.data.data[0];
          // 遍历，超过最大值的取最大值
          for (const key in data) {
            switch (key) {
              case "average":
              case "success":
              case "share":
                Number(data[key]) > 100 ? (data[key] = 100) : Number(data[key]);
                break;
              case "flow":
                Number(data[key]) > 50 ? (data[key] = 50) : Number(data[key]);
                break;
              case "time":
                Number(data[key]) > 180 ? (data[key] = 180) : Number(data[key]);
                break;
            }
          }
          this.userPortrait = data;
        })
        .catch((err) => console.log(err));
    },
    getRadarCharts() {
      let dom = this.$refs.charts;
      if (this.userPortrait == null) {
        dom.innerHTML = "暂无数据";
        dom.setAttribute("class", "no_data");
        return;
      }
      let echarts = this.$echarts.init(dom);
      let data = [
        parseFloat(this.userPortrait.average * 0.01),
        Number(this.userPortrait.time),
        parseFloat(this.userPortrait.share * 0.01),
        parseFloat(this.userPortrait.success * 0.01),
        Number(this.userPortrait.flow),
      ];
      console.log("data", data);
      let option = {};
      option = {
        radar: {
          name: {
            textStyle: {
              fontSize: 20,
              color: "#212121",
              padding: [3, 5],
            },
          },
          indicator: [
            { name: "满意度", max: 1 },
            { name: "留店时间", max: 180 },
            { name: "转介率", max: 1 },
            { name: "成功率", max: 1 },
            { name: "客流量", max: 50 },
          ],
        },
        grid: {
          y: 0,
          x: 0,
        },
        series: [
          {
            name: "",
            type: "radar",
            data: [
              {
                value: data,
              },
            ],
          },
        ],
      };
      echarts.setOption(option);
    },
    queryParams(paramName) {
      let param = this.$route.query;
      if (param.hasOwnProperty(paramName)) {
        return param[paramName];
      }
      return "";
    },
  },
};
</script>

<style lang="scss" scoped>
.userPortrait {
  margin: 60px 0 0;
  font-size: 16px;
  font-family: PingFang SC;
  color: #212121;
  .charts_chunk {
    margin: 0px 30px;
    box-shadow: 0px 1px 10px #ececec;
    border-radius: 10px;
    .radar_charts {
      width: 640px;
      height: 560px;
      margin: 0 auto;
    }
  }
  .table {
    margin: 30px 30px 0;
  }
  table {
    box-sizing: border-box;
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    th,
    td {
      font-weight: 400;
      border: 1px solid #e4e4e4;
      padding: 12px 6px;
      color: #7d7d7d;
    }
    th {
      background-color: #f6f6f6;
      color: #212121;
    }
  }
  .no_data {
    line-height: 560px;
    font-size: 20px;
    color: #646464;
    text-align: center;
  }
  .tips {
    margin-top: 12px;
    color: #646464;
    font-size: 14px;
  }
}
</style>