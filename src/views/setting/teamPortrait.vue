<template>
  <div class="teamPortrait">
    <div class="charts_chunk">
      <div class="radar_charts" ref="charts"></div>
    </div>
    <div class="table">
      <el-table :data="teamPortrait" style="width: 100%">
        <el-table-column prop="username" label="验配师"></el-table-column>
        <el-table-column prop="average" label="客满度" sortable>
          <template slot-scope="scope">{{scope.row.average}}%</template>
        </el-table-column>
        <el-table-column prop="flow" label="客流量" sortable>
          <template slot-scope="scope">{{scope.row.flow}}人</template>
        </el-table-column>
        <el-table-column prop="success" label="成功率" sortable>
          <template slot-scope="scope">{{scope.row.success}}%</template>
        </el-table-column>
        <el-table-column prop="share" label="转介率" sortable>
          <template slot-scope="scope">{{scope.row.share}}%</template>
        </el-table-column>
        <el-table-column prop="time" label="留店时间" sortable>
          <template slot-scope="scope">{{scope.row.time}}分钟</template>
        </el-table-column>
      </el-table>
      <div class="tips" v-show="teamPortrait.length!=0">备注：留店时间的最大值为180分钟，客流量的最大值为每月50人。</div>
    </div>
  </div>
</template>

<script>
import api from "../../api/api";
export default {
  data() {
    return {
      teamPortrait: [],
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
          sid: this.sid,
          type: "2",
        })
        .then((res) => {
          if (res.data.result != 1) {
            return;
          }
          const data = res.data.data;
          // 遍历，超过最大值的取最大值
          data.forEach((item) => {
            for (const key in item) {
              switch (key) {
                case "average":
                case "success":
                case "share":
                  Number(item[key]) > 100
                    ? (item[key] = 100)
                    : Number(item[key]);
                  break;
                case "flow":
                  Number(item[key]) > 50 ? (item[key] = 50) : Number(item[key]);
                  break;
                case "time":
                  Number(item[key]) > 180
                    ? (item[key] = 180)
                    : Number(item[key]);
                  break;
              }
            }
          });
          this.teamPortrait = data;
        })
        .catch((err) => console.log(err));
    },
    getRadarCharts() {
      let dom = this.$refs.charts;
      if (this.teamPortrait.length == 0) {
        dom.innerHTML = "暂无数据";
        dom.setAttribute("class", "no_data");
        return;
      }
      const count = this.teamPortrait.length;
      let totalData = {
        average: 0,
        time: 0,
        share: 0,
        success: 0,
        flow: 0,
      };

      // 计算总数
      this.teamPortrait.forEach((item) => {
        for (const key in totalData) {
          if (item.hasOwnProperty(key)) {
            totalData[key] += parseFloat(item[key]);
          }
        }
      });
      // 算平均
      let averageData = [];
      for (const key in totalData) {
        if ("'average','success','share'".includes(key)) {
          averageData.push(
            parseFloat(((totalData[key] / count) * 0.01).toFixed(2))
          );
        } else {
          averageData.push(Math.round(totalData[key] / count));
        }
      }
      let echarts = this.$echarts.init(dom);
      let option = {};
      option = {
        tooltip: {},
        legend: {
          data: ["平均数据"],
          x: "left",
          y: "20px",
          textStyle: {
            fontSize: 20,
            color: "#212121",
          },
        },
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
        series: [
          {
            type: "radar",
            data: [
              {
                value: averageData,
                name: "平均数据",
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
.teamPortrait {
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
  .table /deep/ .el-table {
    table {
      border-collapse: collapse;
    }
    font-size: 16px;
    thead {
      font-weight: 400;
      color: #212121;
    }
    th.is-leaf {
      border: 1px solid #e4e4e4;
      background-color: #f6f6f6;
      text-align: center;
    }
    td {
      border: 1px solid #e4e4e4;
      color: #7d7d7d;
      text-align: center;
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