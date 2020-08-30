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

        <div class="chart_case">
          <div class="leftecharts">
            <div style="margin-bottom:2px">左耳：</div>
            <iframe
              :src="htmlUrl+'/table/pta_left_report.html?sid='+sid+'&recordId='+recordId"
              scrolling="no"
            ></iframe>
          </div>
          <div class="rightecharts">
            <div style="margin-bottom:2px">右耳：</div>
            <iframe
              :src="htmlUrl+'/table/pta_right_report.html?sid='+sid+'&recordId='+recordId"
              scrolling="no"
            ></iframe>
          </div>
        </div>
        <div class="chunk">
          <div class="flex-row">
            <div>换能器/给声途径：</div>
            <div class="text">{{headData.transducer}}</div>
            <div>测试方法：</div>
            <div class="text">{{headData.projects}}</div>
            <div>测试音：</div>
            <div class="text">{{headData.testTone}}</div>
          </div>
        </div>
        <div class="chunk mt-26">
          <div>听力图记录符号：</div>
          <table class="table">
            <tr>
              <th>侧别</th>
              <th>气导</th>
              <th>气导掩蔽</th>
              <th>无反应</th>
              <th>不舒适阈</th>
            </tr>
            <tr>
              <td>左耳</td>
              <td>&#10005;</td>
              <td style="font-size:20px">&#9744;</td>
              <td>
                <div class="left_turn">&#8681;</div>
              </td>
              <td rowspan="2">U</td>
            </tr>
            <tr>
              <td>右耳</td>
              <td>&#927;</td>
              <td >△</td>
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
        <div class="chunk mt-26">
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
            <div class="text">{{headData.remark}}</div>
          </div>
        </div>
      </div>
      <div class="user-sign">
        <div>本人签字：</div>
        <div class="line"></div>
        <div>家属签字:</div>
        <div class="line"></div>
      </div>
      <div class="doctor-sign">
        <div>验配中心：{{orgName}}</div>
        <div>检查日期：{{nowdatetime}}</div>
        <div>医生签名：{{truename}}</div>
      </div>
    </div>
    <div class="back_btn" @click="toBack" v-if="this.$route.query.fromRouter">返回</div>
  </div>
</template>

<script>
import echarts from "echarts";
import api from "../../api/api";
import common from "../../utils/common";

export default {
  data() {
    return {
      slogan: "用爱经营 用良心服务 用匠心成就 ",
      orgName: "",
      truename: "",
      userInfo: {
        uid: "",
        name: "",
        truename: "",
        patientNum: "",
        sex: "",
        birthday: "",
        nation: "",
        updatetime: "",
      },
      // 当前时间
      nowdatetime: new Date()
        .toLocaleString()
        .replace(/\//g, "-")
        .substring(
          0,
          new Date().toLocaleString().replace(/\//g, "-").indexOf(" ")
        ),
      // 图表地址
      htmlUrl: process.env.VUE_APP_HTMLURL,
      sid: localStorage.getItem("sid"),
      recordId: localStorage.getItem("recordId"),
      headData: "",
      leftData: "",
      rightData: "",
      report: "",
      leftCharts: [],
      rightCharts: [],
      leftDataInfo: {
        listenRange: "",
        notComfortableRange: "",
      },
      rightDataInfo: {
        listenRange: "",
        notComfortableRange: "",
      },
      innerHtml: "",
    };
  },
  computed: {
    age() {
      if (this.userInfo.birthday == "") {
        return;
      } else {
        return (
          new Date().getFullYear() - Number(this.userInfo.birthday.slice(0, 4))
        );
      }
    },
  },
  created() {
    // 获取用户基本信息
    api
      .postFormAPI("patient/getInfo", {
        patientId: localStorage.getItem("patientId"),
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result == "1") {
          const data = res.data.data;
          for (let key in this.userInfo) {
            if (data.hasOwnProperty(key)) {
              this.userInfo[key] = data[key];
            }
          }
        }
        //数据处理
      })
      .catch((err) => console.log(err));

    // 验配师信息
    api
      .postFormAPI("patientMatchRecord/getMatcherByRecordId", {
        recordId: localStorage.getItem("patientId"),
      })
      .then((res) => {
        if (res.data.result == "1" && res.data.data != null) {
          this.orgName = res.data.data.orgName;
          this.truename = res.data.data.truename;
        }
        //数据处理
      })
      .catch((err) => console.log(err));

    api
      .postFormAPI("checkHearing/reportOther", {
        recordId: this.recordId,
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result == "1") {
          this.headData = res.data.data;
        }
      })
      .catch((err) => console.log(err));

    api
      .postFormAPI("checkHearing/reportData", {
        recordId: this.recordId,
        type: "1",
        isAid: "0",
        projects: "1",
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result == "1" && res.data.data != null) {
          // this.leftData = res.data.data.list;
          this.leftDataInfo.listenRange = res.data.data.info.listenRange;
          // var arr = [];
          // this.leftData.forEach((el) => {
          //   arr.push(el.Hz, el.Db);
          // });
          // this.leftCharts.push(arr);
        }
      })
      .catch((err) => console.log(err));

    api
      .postFormAPI("checkHearing/reportData", {
        recordId: this.recordId,
        type: "1",
        isAid: "0",
        projects: "4",
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result == "1" && res.data.data != null) {
          this.leftDataInfo.notComfortableRange =
            res.data.data.info.notComfortableRange;
        }
      })
      .catch((err) => console.log(err));

    api
      .postFormAPI("checkHearing/reportData", {
        recordId: this.recordId,
        type: "2",
        isAid: "0",
        projects: "4",
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result == "1" && res.data.data != null) {
          this.rightDataInfo.notComfortableRange =
            res.data.data.info.notComfortableRange;
        }
      })
      .catch((err) => console.log(err));
    api
      .postFormAPI("checkHearing/reportData", {
        recordId: this.recordId,
        type: "2",
        isAid: "0",
        projects: "1",
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result == "1" && res.data.data != null) {
          this.rightDataInfo.listenRange = res.data.data.info.listenRange;
        }
      })
      .catch((err) => console.log(err));
  },
  methods: {
    toBack() {
      this.$router.replace({
        name: "patient",
        query: {
          active: "checkLog",
        },
      });
    },
  },
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
    margin: 20px 30px 0;
    align-items: center;
    justify-content: space-between;
    .img {
      height: 40px;
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
  }
  .user-info {
    font-size: 18px;
    line-height: 16px;
    color: #212121;
    margin: 42px auto 0;
    span:nth-of-type(2n + 2):not(:last-of-type) {
      padding: 0 10px;
      margin-right: 50px;
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
    .chart_case {
      height: 420px;
      // overflow: hidden;
      display: -webkit-flex;
      align-items: center;
      justify-content: space-between;

      .leftecharts {
        width: 340px;
        height: 380px;
        // margin: 14px 0;
        iframe {
          display: block;
          position: absolute;
          left: 30px;
          top: 284px;
          width: 340px;
          height: 380px !important;
          border: none;
          margin: 0;
          padding: 0;
        }
      }
      .rightecharts {
        width: 340px;
        height: 380px;
        iframe {
          display: block;
          position: absolute;
          right: 10px;
          top: 284px;
          width: 340px;
          height: 380px !important;
          border: none;
          margin: 0;
          padding: 0;
        }
      }
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
    .mt-26 {
      margin-top: 26px;
    }
    .table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid #212121;
      margin-top: 14px;
      th,
      td {
        border: 1px solid #212121;
        font-weight: 400;
        text-align: center;
        line-height: 38px;
      }
      &:nth-of-type(2){
        margin-top: 18px;
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
  .left_turn {
    font-size: 24px;
    transform: rotate(45deg);
  }
  .right_turn {
    font-size: 24px;
    transform: rotate(-45deg);
  }
  .back_btn {
    width: 54px;
    height: 54px;
    position: fixed;
    right: 20px;
    bottom: 20px;
    border-radius: 50%;
    background: #5d5d5d;
    margin-bottom: 25px;
    color: #fff;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 12px;
    justify-content: center;
  }
}
</style>
