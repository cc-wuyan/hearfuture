<template>
  <div class="hearingAidTestReport">
    <div class="contain">
      <div class="header">
        <img class="img" src="../../assets/image/logo@2x.png" alt />
        <div class="slogan">{{slogan}}</div>
      </div>
      <div class="header-title">
        <div class="title">助听器选配试验（调试）报告单</div>
      </div>
      <div class="user-info">
        <span>姓名：</span>
        <span>{{userInfo.truename}}</span>
        <span>性别：</span>
        <span>{{userInfo.sex == 1 ? '男' : userInfo.sex == 2 ? '女': ''}}</span>
        <span>年龄：</span>
        <span>{{age}}</span>
        <span>病例号：</span>
        <span>{{userInfo.patientNum}}</span>
      </div>
      <div class="user-info">
        <span>设备型号：</span>
        <span>{{header.earPad}}</span>
        <span>测试环境：</span>
        <span>{{header.environmentDB}}</span>
        <span>环能器：</span>
        <span>{{header.transducer}}</span>
        <span>测试音：</span>
        <span>{{header.testTone}}</span>
      </div>
      <div class="report-wrapper">
        <div class="chunk">
          <table class="table">
            <tr>
              <th>助听器特性</th>
              <th>品牌</th>
              <th>类型</th>
              <th>型号</th>
              <th>功率</th>
              <th>受话器</th>
              <th>耳塞</th>
              <th>耳膜</th>
              <th>通气孔</th>
            </tr>
            <tr>
              <td>右耳</td>
              <td>{{rightReportAid.brand}}</td>
              <td>{{rightReportAid.type}}</td>
              <td>{{rightReportAid.model}}</td>
              <td>{{rightReportAid.power}}</td>
              <td>{{rightReportAid.receiver}}</td>
              <td>{{rightReportAid.earplugs}}</td>
              <td>{{rightReportAid.earMold}}</td>
              <td>{{rightReportAid.vent}}</td>
            </tr>
            <tr>
              <td>左耳</td>
              <td>{{leftReportAid.brand}}</td>
              <td>{{leftReportAid.type}}</td>
              <td>{{leftReportAid.model}}</td>
              <td>{{leftReportAid.power}}</td>
              <td>{{leftReportAid.receiver}}</td>
              <td>{{leftReportAid.earplugs}}</td>
              <td>{{leftReportAid.earMold}}</td>
              <td>{{leftReportAid.vent}}</td>
            </tr>
          </table>
        </div>
        <div class="chunk">
          <div class="echarts">
            <div class="leftCharts">
              <iframe
                :src="htmlUrl+'/table/pta_left.html?sid='+sid+'&recordId='+recordId"
                scrolling="no"
              ></iframe>
            </div>
            <div class="rightCharts">
              <iframe
                :src="htmlUrl+'/table/pta_right.html?sid='+sid+'&recordId='+recordId"
                scrolling="no"
              ></iframe>
            </div>
          </div>
        </div>
        <div class="chunk">
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
              <td>△</td>
              <td>
                <div class="right_turn">&#8681;</div>
              </td>
            </tr>
          </table>

          <table class="table">
            <tr>
              <th>平均值</th>
              <th>裸耳听阈</th>
              <th>助听听阈</th>
              <th>增益值</th>
              <th>裸耳不舒适阈</th>
              <th>大声保护阈</th>
              <th>双耳平衡</th>
              <th>评估效果</th>
            </tr>
            <tr>
              <td>左耳</td>
              <td>{{leftListenRange.listenRange}}</td>
              <td>{{leftListenRangeAid.listenRangeAid}}</td>
              <td>{{leftListenRangeAid.gain}}</td>
              <td>{{leftNotComfortableRange.notComfortableRange}}</td>
              <td>{{leftNotComfortableAid.notComfortableRangeAid}}</td>
              <td>&#11096;大&#11096;小&#11096;平</td>
              <td>&#11096;优&#11096;良&#11096;差</td>
            </tr>
            <tr>
              <td>右耳</td>
              <td>{{rightListenRange.listenRange}}</td>
              <td>{{rightListenRangeAid.listenRangeAid}}</td>
              <td>{{rightListenRangeAid.gain}}</td>
              <td>{{rightNotComfortableRange.notComfortableRange}}</td>
              <td>{{rightNotComfortableAid.notComfortableRangeAid}}</td>
              <td>&#11096;大&#11096;小&#11096;平</td>
              <td>&#11096;优&#11096;良&#11096;差</td>
            </tr>
          </table>
        </div>
        <div class="chunk">
          <div class="content">
            <span class="label">选配建议：</span>
            <span>助听器方案&nbsp;无线产品方案</span>
          </div>
        </div>
        <div class="chunk">
          <div class="content">
            <span class="label">声处方备注：</span>
          </div>
        </div>
        <div class="chunk"></div>
      </div>
      <!-- <div class="fixed_bottom"> -->
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
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import api from "../../api/api";

export default {
  data() {
    return {
      slogan: "用爱经营 用良心服务 用匠心成就 ",
      orgName: "",
      truename: "",
      userInfo: {
        truename: null,
        sex: null,
        birthday: "",
        patientNum: null,
        updatetime: null,
      },
      header: {
        earPad: "ear pad",
        environmentDB: null,
        transducer: null,
        testTone: null,
      },
      leftReportAid: {
        brand: null,
        type: null,
        model: null,
        power: null,
        receiver: null,
        earplugs: null,
        earMold: null,
        vent: null,
      },
      rightReportAid: {
        brand: null,
        type: null,
        model: null,
        power: null,
        receiver: null,
        earplugs: null,
        earMold: null,
        vent: null,
      },
      leftListenRange: {
        listenRange: null,
      },
      rightListenRange: {
        listenRange: null,
      },
      leftListenRangeAid: {
        listenRangeAid: null,
        gain: null,
        notComfortableRangeAid: null,
      },
      rightListenRangeAid: {
        listenRangeAid: null,
        gain: null,
        notComfortableRangeAid: null,
      },
      leftNotComfortableAid: {
        notComfortableRangeAid: null,
      },
      rightNotComfortableAid: {
        notComfortableRangeAid: null,
      },
      leftNotComfortableRange: {
        notComfortableRange: null,
      },
      rightNotComfortableRange: {
        notComfortableRange: null,
      },
      leftCharts: null,
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
    };
  },
  created() {
    // 获取用户信息
    this.getFormData("patient/getInfo", "userInfo", {
      patientId: localStorage.getItem("patientId"),
      sid: localStorage.getItem("sid"),
    });

    // 验配师信息
    api
      .postFormAPI("patientMatchRecord/getMatcherByRecordId", {
        recordId: localStorage.getItem("recordId"),
      })
      .then((res) => {
        if (res.data.result == "1") {
          this.orgName = res.data.data.orgName;
          this.truename = res.data.data.truename;
        }
        //数据处理
      })
      .catch((err) => console.log(err));

    // 获取头部数据
    this.getFormData("checkHearing/reportOther", "header", {
      recordId: localStorage.getItem("recordId"),
      sid: localStorage.getItem("sid"),
    });

    // 获取助听器
    this.getInfoFormData("checkHearing/reportAid", "leftReportAid", {
      patientId: localStorage.getItem("patientId"),
      recordId: localStorage.getItem("recordId"),
      type: 1,
      sid: localStorage.getItem("sid"),
    });

    this.getInfoFormData("checkHearing/reportAid", "rightReportAid", {
      patientId: localStorage.getItem("patientId"),
      recordId: localStorage.getItem("recordId"),
      type: 2,
      sid: localStorage.getItem("sid"),
    });

    // 获取裸耳听阈
    this.getInfoFormData("checkHearing/reportData", "leftListenRange", {
      patientId: localStorage.getItem("patientId"),
      recordId: localStorage.getItem("recordId"),
      sid: localStorage.getItem("sid"),
      type: 1,
      isAid: 0,
      projects: 1,
    });

    this.getInfoFormData("checkHearing/reportData", "rightListenRange", {
      patientId: localStorage.getItem("patientId"),
      recordId: localStorage.getItem("recordId"),
      sid: localStorage.getItem("sid"),
      type: 2,
      isAid: 0,
      projects: 1,
    });

    // 助听听阈 & 增益值
    this.getInfoFormData("checkHearing/reportData", "leftListenRangeAid", {
      patientId: localStorage.getItem("patientId"),
      recordId: localStorage.getItem("recordId"),
      sid: localStorage.getItem("sid"),
      type: 1,
      isAid: 1,
      projects: 1,
    });

    this.getInfoFormData("checkHearing/reportData", "rightListenRangeAid", {
      patientId: localStorage.getItem("patientId"),
      recordId: localStorage.getItem("recordId"),
      sid: localStorage.getItem("sid"),
      type: 2,
      isAid: 1,
      projects: 1,
    });

    // 大声保护阈
    this.getInfoFormData("checkHearing/reportData", "leftNotComfortableAid", {
      patientId: localStorage.getItem("patientId"),
      recordId: localStorage.getItem("recordId"),
      sid: localStorage.getItem("sid"),
      type: 1,
      isAid: 1,
      projects: 4,
    });

    this.getInfoFormData("checkHearing/reportData", "rightNotComfortableAid", {
      patientId: localStorage.getItem("patientId"),
      recordId: localStorage.getItem("recordId"),
      sid: localStorage.getItem("sid"),
      type: 2,
      isAid: 1,
      projects: 4,
    });

    // 裸耳不舒适阈
    this.getInfoFormData("checkHearing/reportData", "leftNotComfortableRange", {
      patientId: localStorage.getItem("patientId"),
      recordId: localStorage.getItem("recordId"),
      sid: localStorage.getItem("sid"),
      type: 1,
      isAid: 0,
      projects: 4,
    });

    this.getInfoFormData(
      "checkHearing/reportData",
      "rightNotComfortableRange",
      {
        patientId: localStorage.getItem("patientId"),
        recordId: localStorage.getItem("recordId"),
        sid: localStorage.getItem("sid"),
        type: 2,
        isAid: 0,
        projects: 4,
      }
    );
  },
  computed: {
    age() {
      if (this.userInfo.birthday == "") {
        return;
      }
      return (
        new Date().getFullYear() - Number(this.userInfo.birthday.slice(0, 4))
      );
    },
  },
  methods: {
    getFormData(url, field, query) {
      api
        .postFormAPI(url, query)
        .then((res) => {
          if (res.data.result != 1) {
            return;
          }
          const data = res.data.data;
          for (const key in this[field]) {
            if (data.hasOwnProperty(key)) {
              this[field][key] = data[key];
            }
          }

          //数据处理
        })
        .catch((err) => console.log(err));
    },
    getInfoFormData(url, field, query) {
      api
        .postFormAPI(url, query)
        .then((res) => {
          if (res.data.result != 1 ) {
            return;
          }
          let data = res.data.data.info;
          if (field == "leftReportAid" || field == "rightReportAid") {
            data = res.data.data;
          }
          for (const key in this[field]) {
            if (data.hasOwnProperty(key)) {
              this[field][key] = data[key];
            }
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.left_turn {
  transform: rotate(90deg);
}
.right_turn {
  transform: rotate(270deg);
}
.hearingAidTestReport {
  iframe {
    width: 100%;
    height: 100%;
    border: none;
    .canvas {
      width: 100%;
      height: 100%;
      .content {
        width: 100% !important;
        height: 100%;
      }
    }
  }
  .contain {
    display: flex;
    flex-direction: column;
    color: #212121;
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
  .report-wrapper {
    display: flex;
    flex-direction: column;
    margin: 0 30px;
    margin-top: 40px;
    .chunk {
      margin-bottom: 26px;
    }
    .table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 14px;
      th,
      td {
        font-weight: unset;
        text-align: center;
        border: 1px solid #212121;
        padding: 4px 6px;
      }
    }
    .echarts {
      display: flex;
      align-items: center;
      justify-content: space-between;
      // height: 400px;
      .leftCharts {
        width: 400px;
        height: 440px;
        margin: 14px 0;
      }
      .rightCharts {
        width: 400px;
        height: 440px;
        margin: 14px 0;
      }
    }
    .content {
      border: 1px solid #212121;
      padding: 12px;
      .label {
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
  .user-info {
    font-size: 18px;
    line-height: 30px;
    color: #212121;
    margin: 30px auto 0;
    padding: 0 12px;
    span:nth-of-type(2n + 2):not(:last-of-type) {
      padding: 0 10px;
      margin-right: 40px;
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
  .fixed_bottom {
    width: 100%;
    position: fixed;
    bottom: 0;
  }
}
</style>
