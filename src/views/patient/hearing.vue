<template>
  <div class="soundTextReport">
    <div class="contain">
      <div class="header">
        <img class="img" src="../../assets/image/logo@2x.png" />
        <div class="slogan">{{slogan}}</div>
      </div>
      <div class="header-title">
        <div class="title">纯音测听报告单</div>
      </div>
      <div class="user-info">
        <span>姓名：</span>
        <span>{{userInfo.truename}}</span>
        <span>性别：</span>
        <span>{{userInfo.sex == 1 ? '男' : userInfo.sex == 2 ? '女': ''}}</span>
        <span>年龄：</span>
        <span>{{age}}</span>
        <span>病例号：</span>
        <span>{{userInfo.patientNum ? userInfo.patientNum : ''}}</span>
      </div>
      <div class="report-wrapper">
        <div class="flex-row">
          <div>设备型号：</div>
          <div class="text">ear pad</div>
          <div>校准日期：</div>
          <div class="text">{{headData.time}}</div>
          <div>测试环境：</div>
          <div class="text">{{headData.environmentDB}}</div>
        </div>
        <div style="display: flex">
          <div class="leftecharts"></div>
          <div class="rightecharts"></div>
        </div>
        <div class="flex-row">
          <div>换能器/给声途径：</div>
          <div class="text">{{headData.transducer}}</div>
          <div>测试方法：</div>
          <div class="text">{{headData.projects}}</div>
          <div>测试音：</div>
          <div class="text">{{headData.testTone}}</div>
        </div>
        <div class="chunk">
          <div>听力图记录符号：</div>
          <table class="table">
            <tr>
              <th>侧别</th>
              <th>气导</th>
              <th>气导掩蔽</th>
              <th>无反应</th>
              <th>舒适阈</th>
              <th>不舒适阈</th>
            </tr>
            <tr>
              <td>左耳</td>
              <td>&#927;</td>
              <td style="font-size:20px">&#8420;</td>
              <td>
                <div class="left_turn">&#8681;</div>
              </td>
              <td rowspan="2">M</td>
              <td rowspan="2">U</td>
            </tr>
            <tr>
              <td>右耳</td>
              <td>&#10005;</td>
              <td style="font-size:20px">&#9744;</td>
              <td>
                <div class="right_turn">&#8681;</div>
              </td>
            </tr>
          </table>
          <table class="table">
            <tr>
              <th></th>
              <th>气导听阀</th>
              <th>不舒适阈</th>
            </tr>
            <tr>
              <td>左耳dBHL</td>
              <td>{{leftDataInfo.listenRange}}</td>
              <td>{{leftDataInfo.notComfortableRange}}</td>
            </tr>
            <tr>
              <td>右耳dBHL</td>
              <td>{{rightDataInfo.listenRange}}</td>
              <td>{{rightDataInfo.notComfortableRange}}</td>
            </tr>
          </table>
        </div>
        <div class="chunk">
          <div>中国听力残疾评定标准（2006）</div>
          <table class="table-two">
            <tr>
              <th>听力残疾级别</th>
              <th>听阈均值（dB SPL）（较好耳）</th>
              <th>言语识别率（%）</th>
            </tr>
            <tr>
              <td>一级</td>
              <td>&gt;90</td>
              <td>&lt;15</td>
            </tr>
            <tr>
              <td>二级</td>
              <td>71-90</td>
              <td>15-30</td>
            </tr>
            <tr>
              <td>三级</td>
              <td>61-70</td>
              <td>31-60</td>
            </tr>
            <tr>
              <td>四级</td>
              <td>51-60</td>
              <td>61-70</td>
            </tr>
          </table>
        </div>
        <div class="report-bottom">
          <div class="flex-row">
            <div>诊断提示：</div>
            <div class="text">{{leftDataInfo.remark}}{{rightDataInfo.remark}}</div>
          </div>
        </div>
      </div>
<!--      <div class="user-sign">-->
<!--        <div>本人签字：</div>-->
<!--        <div class="line"></div>-->
<!--        <div>家属签字:</div>-->
<!--        <div class="line"></div>-->
<!--        <div class="line"></div>-->
<!--      </div>-->
<!--      <div class="doctor-sign">-->
<!--        <div>验配中心：</div>-->
<!--        <div>检查日期：{{userInfo.updatetime}}</div>-->
<!--        <div>医生签名：</div>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
  import echarts from "echarts";
  import {reportOther,getInfo,reportData } from "@/api/patient";

  export default {
    data() {
      return {
        slogan: "用爱经营 用良心服务 用匠心成就 ",
        userInfo: {
          uid: "DG20190920000041",
          name: "李四",
          sex: "男",
          age: 33,
          nation: "汉"
        },
        headData: "",
        leftData: "",
        rightData: "",
        report: "",
        leftCharts: [],
        rightCharts: [],
        leftDataInfo: "",
        rightDataInfo: ""
      };
    },
    computed: {
      age() {
        if (this.userInfo.birthday == "") {
          return;
        } else {
          if(this.userInfo.birthday!=undefined){
            return (
              new Date().getFullYear() - Number(this.userInfo.birthday.slice(0, 4))
            );
          }
        }
      }
    },
    created() {
      this.recordId = this.$route.params.recordId
      this.patientId = this.$route.params.id

      getInfo({
        patientId: this.patientId
      }).then(res => {
        if (res.result == 1) {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
          this.userInfo = res.data;
        }
      });
      reportOther({
        recordId: this.recordId,
      }).then(res => {
        if (res.result == 1) {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
          this.headData = res.data;
        }
      });

      reportData({
        recordId: this.recordId,
        type: "1",
        isAid: "0",
        projects: "1",
      }).then(res => {
        if (res.result == 1) {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
          if(res.data!=null){
            this.leftData = res.data.list;
            this.leftDataInfo = res.data.info;
            this.leftData.forEach(el => {
              var arr = [];
              arr.push(el.Hz, el.Db);
              this.leftCharts.push(arr);
            });
            this.getcharts1(".leftecharts");
          }
        }
      });
      reportData({
        recordId: this.recordId,
        type: "2",
        isAid: "0",
        projects: "1",
      }).then(res => {
        if (res.result == 1) {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
          if(res.data!=null){
            this.rightData = res.data.list;
            this.rightDataInfo = res.data.info;
            this.rightData.forEach(el => {
              var arr = [];
              arr.push(el.Hz, el.Db);
              this.rightCharts.push(arr);
            });
            this.getcharts2(".rightecharts");
          }
        }
      });
    },
    methods: {
      getcharts1(name) {
        var dom = document.querySelector(name);
        var echarts = this.$echarts.init(dom);
        var Option = {
          xAxis: {},
          yAxis: {},
          series: [
            {
              data: this.leftCharts,
              type: "line"
            }
          ]
        };
        echarts.setOption(Option);
      },
      getcharts2(name) {
        var dom = document.querySelector(name);
        var echarts = this.$echarts.init(dom);
        var Option = {
          xAxis: {},
          yAxis: {},
          series: [
            {
              data: this.rightCharts,
              type: "line"
            }
          ]
        };
        echarts.setOption(Option);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .soundTextReport {
    .contain {
      color: #212121;
      display: flex;
      flex-direction: column;
    }
    .header {
      display: flex;
      padding-right: 30px;
      align-items: center;
      justify-content: space-between;
      .img {
        height: 90px;
      }
      .slogan {
        font-size: 16px;
        font-weight: bold;
        color: #333;
      }
    }
    .header-title {
      height: 46px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      .title {
        height: 34px;
        font-size: 26px;
        font-weight: bold;
        line-height: 34px;
        color: #333;
      }
      .button {
        display: flex;
        position: absolute;
        top: 0;
        right: 30px;
        .print {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 82px;
          height: 34px;
          background: #f1f1f1;
          border-radius: 18px;
          margin-right: 14px;
          img {
            width: 14px;
            height: 14px;
          }
          span {
            width: 28px;
            height: 18px;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 18px;
            color: #333;
            padding-left: 4px;
          }
        }
        .close {
          width: 34px;
          height: 34px;
          background: #f1f1f1 url("../../assets/image/tanchu_close@2x.png")
          no-repeat;
          background-size: 14px 14px;
          background-position: center center;
          border-radius: 50%;
        }
      }
    }
    .user-info {
      font-size: 14px;
      line-height: 16px;
      color: #212121;
      margin: 42px auto 0;
      span:nth-of-type(2n + 2) {
        padding: 0 10px;
        border-bottom: 1px solid #212121;
        margin-right: 12px;
      }
    }
    .user-sign {
      width: 90%;
      display: flex;
      margin: 0 auto;
      justify-content: flex-end;
      margin-top: 46px;
      .line {
        width: 100px;
        border-bottom: 1px solid #212121;
        margin-right: 20px;
      }
    }

    .doctor-sign {
      display: flex;
      align-items: center;
      width: 90%;
      margin: 34px auto;
      div {
        flex-grow: 1;
      }
    }
    .report-wrapper {
      margin: 30px 30px 0;
      .leftecharts {
        flex-grow: 1;
        width: 300px;
        height: 300px;
      }
      .rightecharts {
        flex-grow: 1;
        width: 300px;
        height: 300px;
      }
      .flex-row {
        display: flex;
        flex-wrap: wrap;
        .text {
          flex-grow: 1;
          border-bottom: 1px solid #212121;
          padding: 0 1em;
          margin: 0 6px;
        }
      }
      .chunk {
        margin-top: 14px;
      }
      .table {
        width: 100%;
        border-collapse: collapse;
        border: 1px solid #212121;
        margin-top: 12px;
        th,
        td {
          border: 1px solid #212121;
          font-weight: 400;
          text-align: center;
          line-height: 38px;
        }
      }
      .table-two {
        width: 100%;
        border-collapse: collapse;
        border: 1px dotted #212121;
        margin-top: 12px;
        th,
        td {
          font-weight: 400;
          text-align: center;
        }
        th {
          border: 1px dotted #212121;
          line-height: 38px;
        }
        td {
          line-height: 28px;
        }
      }
      .report-bottom {
        margin-top: 80px;
        .flex-row {
          margin-top: 12px;
        }
      }
    }
  }
</style>
