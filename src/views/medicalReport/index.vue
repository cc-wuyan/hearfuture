<template>
  <div class="medicalReport">
    <!-- <div class="report_qr_case">
      <img src="../../assets/images/reportQr.png" alt />
    </div>-->
    <div class="contain">
      <div class="header">
        <img class="img" src="../../assets/image/logo@2x.png" alt />
        <div class="slogan">{{slogan}}</div>
      </div>
      <div class="header-title">
        <div class="title">就诊报告单</div>
      </div>
      <!-- <div class="user-info">
        <span>诊断时间：</span>
        <span>{{nowdatetime}}</span>
        <span>验配师：</span>
        <span>{{truename}}</span>
      </div>-->

      <div class="user_info">
        <div>
          <span class="t_b">{{userInfo.truename}}</span>
          {{userInfo.sex == 1 ? '男' : userInfo.sex == 2 ? '女': ''}}， {{age}}岁
        </div>
        <div>
          <span class="t_b" v-if="userInfo.isFirst == 0">首次</span>
          <span class="t_b" v-else>二次</span>
          诊断
        </div>
        <div>
          <span>诊断时长</span>
          {{parseInt(recordInfo.useTime / 60)}} 分钟
        </div>
        <!-- <div>
          <span>诊断完成度</span> 100%
        </div>-->
      </div>

      <div class="chunk1">
        <div class="t_title">一、主诉：</div>
        <div class="d_border">{{mainDetails}}</div>
      </div>
      <div class="chunk2">
        <p class="t_title">二、检测检验</p>
        <p class="t_p">1.听友健康问卷:</p>
        <p class="t_p_l">根据您的回答，您的听力损失概率为: {{rate.result}}，陪同人认为您的听力损失概率为: {{rate.reconfirmResult}}</p>
        <p class="t_p">2、电耳镜检查结果:</p>
        <p class="t_p_l">左：{{leftEarCheck.content}}</p>
        <p class="t_p_l">右：{{rightEarCheck.content}}</p>
        <p class="t_p">3.纯音测听检查结果如下:</p>
        <div class="echart_case">
          <div class="echart">
            <div style="margin-bottom:10px">左耳：</div>
            <iframe :src="htmlUrl+'/table/pta_left.html?sid='+sid+'&recordId='+recordId"></iframe>
          </div>

          <div class="echart1">
            <div style="margin-bottom:10px">右耳：</div>

            <iframe :src="htmlUrl+'/table/pta_right.html?sid='+sid+'&recordId='+recordId"></iframe>
          </div>
        </div>
        <div class="result">
          <div class="flex_1">
            <div>侧别</div>
            <div>裸耳听阈</div>
            <div>助听听阈</div>
            <div>裸耳不舒适阈</div>
            <div>大声保护阈</div>
          </div>
          <div class="flex_2">
            <div>左耳</div>
            <div>
              <img src="../../assets/image/hear_left.png" />
            </div>
            <div>
              <img src="../../assets/image/aid_left.png" />
            </div>
            <div>
              <img src="../../assets/image/uncomfortable.png" />
            </div>
            <div>
              <img src="../../assets/image/aid_uncomfortable.png" />
            </div>
          </div>
          <div class="flex_2">
            <div>右耳</div>
            <div>
              <img src="../../assets/image/hear_right.png" />
            </div>
            <div>
              <img src="../../assets/image/aid_right.png" />
            </div>
            <div>
              <img src="../../assets/image/uncomfortable.png" />
            </div>
            <div>
              <img src="../../assets/image/aid_uncomfortable.png" />
            </div>
          </div>
        </div>
        <div class="echart_info_case">
          <div class="content">
            左耳:裸耳听阈
            <span>{{leftListenRange.listenRange ? leftListenRange.listenRange :0}}</span>dB. 助听听阈
            <span>{{leftListenRangeAid.listenRangeAid ? leftListenRangeAid.listenRangeAid : 0}}</span>dB
          </div>
          <div class="content">
            右耳:裸耳听阈
            <span>{{rightListenRange.listenRange ? rightListenRange.listenRange :0}}</span>dB. 助听听阈
            <span>{{rightListenRangeAid.listenRangeAid ? rightListenRangeAid.listenRangeAid :0}}</span>dB
          </div>
        </div>

        <p class="t_p">4、言语测听的检查结果:</p>
        <p class="t_p_l">
          言语识别率:
          <span class="t_insert">{{Math.round(visualRatio.accuracyrate)}}</span>%。
          竞争性环境言语识別率:
          <span class="t_insert">{{Math.round(envDecreased.accuracyrate)}}</span>%，
          言语识別阂:
          <span class="t_insert">{{Math.round(visualThreshold.threshold)}}</span>dB
        </p>
        <p class="t_p_l">
          视觉代偿率:
          <span class="t_insert">{{Math.round(noVisual.noVisual)}}</span>%，
          整体反应能力下降率:
          <span class="t_insert">{{Math.round(responseDecreased.responseDecreased)}}</span>%
        </p>
      </div>
      <div class="chunk2">
        <div class="t_title">四、诊断处置方案</div>
      </div>
      <div>
        <table class="report_table">
          <tr>
            <td></td>
            <td>品牌</td>
            <td>系列</td>
            <td>颜色</td>
            <td>机身码</td>
            <td>型号</td>
            <td>保修年限</td>
            <td>类型</td>
            <td>功率</td>
          </tr>
          <tr>
            <td>左耳</td>
            <td>{{eardrumInfo.brandLeft}}</td>
            <td>{{eardrumInfo.seriesLeft}}</td>
            <td>{{eardrumInfo.colorLeft}}</td>
            <td>{{eardrumInfo.codeLeft}}</td>
            <td>{{eardrumInfo.modelLeft}}</td>
            <td>{{eardrumInfo.guaranteeLeft}}</td>
            <td>{{eardrumInfo.typeLeft}}</td>
            <td>{{eardrumInfo.powerLeft}}</td>
          </tr>
          <tr>
            <td>右耳</td>
            <td>{{eardrumInfo.brandRight}}</td>
            <td>{{eardrumInfo.seriesRight}}</td>
            <td>{{eardrumInfo.colorRight}}</td>
             <td>{{eardrumInfo.codeRight}}</td>
            <td>{{eardrumInfo.modelRight}}</td>
            <td>{{eardrumInfo.guaranteeRight}}</td>
            <td>{{eardrumInfo.typeRight}}</td>
            <td>{{eardrumInfo.powerRight}}</td>
          </tr>

        </table>
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
  </div>
</template>

<script>
import echarts from "echarts";
import api from "../../api/api";

export default {
  data() {
    return {
      ruleForm: {
        type: [],
      },
      slogan: "用爱经营 用良心服务 用匠心成就 ",
      userInfo: {
        truename: null,
        sex: null,
        birthday: "",
        patientNum: null,
        updatetime: null,
        isFirst: null,
      },
      orgName: "",
      truename: "",
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
      // 验配记录信息
      recordInfo: {
        useTime: null,
      },
      // 主诉
      mainDetails: "",
      // 听损概率
      rate: {
        result: null,
        reconfirmResult: null,
      },
      // 耳镜检查
      leftEarCheck: {
        content: "",
      },
      rightEarCheck: {
        content: "",
      },
      // 裸耳听阈
      leftListenRange: {
        listenRange: null,
      },
      rightListenRange: {
        listenRange: null,
      },
      // 助听听阈
      leftListenRangeAid: {
        listenRangeAid: null,
      },
      rightListenRangeAid: {
        listenRangeAid: null,
      },
      // 定制单
      eardrumInfo: {
        brandLeft: null,
        brandRight: null,
        seriesLeft: null,
        seriesRight: null,
        colorLeft: null,
        colorRight: null,
        codeLeft: null,
        codeRight: null,
        modelLeft: null,
        modelRight: null,
        guaranteeLeft: null,
        guaranteeRight: null,
        typeLeft: null,
        typeRight: null,
        powerLeft: null,
        powerRight: null,
      },
      // 言语识别率
      visualRatio: {
        accuracyrate: null,
      },
      // 竞争性环境言语识別率
      envDecreased: {
        accuracyrate: null,
      },
      // 言语识別阂
      visualThreshold: {
        threshold: null,
      },
      // 视觉代偿率
      noVisual: {
        noVisual: null,
      },
      // 整体反应能力下降率
      responseDecreased: {
        responseDecreased: null,
      },
    };
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
  created() {
    // 获取用户信息
    api
      .postFormAPI("patient/getInfo", {
        patientId: localStorage.getItem("patientId"),
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result != 1) {
          return;
        }
        // 数据处理
        const data = res.data.data;
        for (const key in this.userInfo) {
          if (data.hasOwnProperty(key)) {
            this.userInfo[key] = data[key];
          }
        }
        // 获取主诉
        if (this.userInfo.isFirst > 0) {
          // 获取复诊主诉
          api
            .postFormAPI("patientReturnvisit/getInfo", {
              recordId: localStorage.getItem("recordId"),
              sid: localStorage.getItem("sid"),
            })
            .then((res) => {
              if (res.data.result != 1) {
                return;
              }
              this.mainDetails = res.data.data.mainDetails;
            })
            .catch((err) => console.log(err));
        } else {
          // 获取现病史主诉
          api
            .postFormAPI("patientHpi/getInfo", {
              recordId: localStorage.getItem("recordId"),
              sid: localStorage.getItem("sid"),
            })
            .then((res) => {
              if (res.data.result != 1) {
                return;
              }
              this.mainDetails = res.data.data.mainDetails;
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));

    // 验配师信息
    api
      .postFormAPI("patientMatchRecord/getMatcherByRecordId", {
        sid: localStorage.getItem("sid"),
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

    // 获取验配记录信息
    this.getFormData("patientMatchRecord/getRecordInfo", "recordInfo", {
      recordId: localStorage.getItem("recordId"),
      sid: localStorage.getItem("sid"),
    });

    // 听友健康问卷
    api
      .postFormAPI("patientTestpaper/getPaperListByStep", {
        recordId: localStorage.getItem("recordId"),
        processKey: "health_questionnaire_adult",
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result != "1") {
          return;
        }
        if (res.data.data.length <= 0) {
          return;
        }
        var list = res.data.data[0].analysis;
        if (list.length > 0) {
          var score = parseFloat(res.data.data[0].score);
          var reconfirmScore = parseFloat(res.data.data[0].reconfirmScore);
          console.log(reconfirmScore);
          list.forEach((el) => {
            if (el.minScore <= score && el.maxScore >= score) {
              this.rate.result = el.result;
            }
            if (
              el.minScore <= reconfirmScore &&
              el.maxScore >= reconfirmScore
            ) {
              this.rate.reconfirmResult = el.result;
            }
          });
        }
        //数据处理
      })
      .catch((err) => console.log(err));

    // 获取耳镜检查结果
    this.getFormData("earmirror/report", "leftEarCheck", {
      recordId: localStorage.getItem("recordId"),
      sid: localStorage.getItem("sid"),
      ear: "left",
    });

    this.getFormData("earmirror/report", "rightEarCheck", {
      recordId: localStorage.getItem("recordId"),
      sid: localStorage.getItem("sid"),
      ear: "right",
    });

    // 验配师信息
    api
      .postFormAPI("patientMatchRecord/getMatcherByRecordId", {
        recordId: localStorage.getItem("recordId"),
      })
      .then((res) => {
        if (res.data.result == "1") {
          this.truename = res.data.data.truename;
        }
        //数据处理
      })
      .catch((err) => console.log(err));

    // 获取裸耳听阈
    api
      .postFormAPI("checkHearing/reportData", {
        patientId: localStorage.getItem("patientId"),
        recordId: localStorage.getItem("recordId"),
        sid: localStorage.getItem("sid"),
        type: 1,
        isAid: 0,
        projects: 1,
      })
      .then((res) => {
        if (res.data.result != 1) {
          return;
        }
        this.leftListenRange.listenRange = res.data.data.info.listenRange;
        //数据处理
      })
      .catch((err) => console.log(err));

    api
      .postFormAPI("checkHearing/reportData", {
        patientId: localStorage.getItem("patientId"),
        recordId: localStorage.getItem("recordId"),
        sid: localStorage.getItem("sid"),
        type: 2,
        isAid: 0,
        projects: 1,
      })
      .then((res) => {
        if (res.data.result != 1) {
          return;
        }
        this.rightListenRange.listenRange = res.data.data.info.listenRange;
        //数据处理
      })
      .catch((err) => console.log(err));

    // 助听听阈
    api
      .postFormAPI("checkHearing/reportData", {
        patientId: localStorage.getItem("patientId"),
        recordId: localStorage.getItem("recordId"),
        sid: localStorage.getItem("sid"),
        type: 1,
        isAid: 1,
        projects: 1,
      })
      .then((res) => {
        if (res.data.result != 1) {
          return;
        }
        this.leftListenRangeAid.listenRangeAid =
          res.data.data.info.listenRangeAid;
        //数据处理
      })
      .catch((err) => console.log(err));

    api
      .postFormAPI("checkHearing/reportData", {
        patientId: localStorage.getItem("patientId"),
        recordId: localStorage.getItem("recordId"),
        sid: localStorage.getItem("sid"),
        type: 2,
        isAid: 1,
        projects: 1,
      })
      .then((res) => {
        if (res.data.result != 1) {
          return;
        }
        this.rightListenRangeAid.listenRangeAid =
          res.data.data.info.listenRangeAid;
        //数据处理
      })
      .catch((err) => console.log(err));

    // 定制单
    this.getFormData("contract/earrumPlan", "responseDecreased", {
      sid: localStorage.getItem("sid"),
      recordId: localStorage.getItem("recordId"),
      type: 3,
    });

    // 获取视觉代偿率-2.0
    this.getFormData("checkWords/visualRatio", "noVisual", {
      sid: localStorage.getItem("sid"),
      recordId: localStorage.getItem("recordId"),
      type: "3",
    });

    // 获取整体反应下降率-2.0
    api
      .postFormAPI("checkWords/responseDecreased", {
        sid: localStorage.getItem("sid"),
        recordId: localStorage.getItem("recordId"),
        type: "3",
      })
      .then((res) => {
        if (res.data.result == "1") {
          this.responseDecreased.responseDecreased =
            ((res.data.data.advantage / 120) * 100).toFixed(2) -
            res.data.data.ratio;
        }
      })
      .catch((err) => console.log(err));

    // 言语识别率-2.0
    this.getFormData("checkWords/reportSoundData", "visualRatio", {
      sid: localStorage.getItem("sid"),
      recordId: localStorage.getItem("recordId"),
      type: "3",
      isMaskingTone: "0",
      testVoiceType: "1",
      db: "65",
      wordsType: "2",
    });

    // 言语识别阈-2.0
    this.getFormData("checkWords/reportSoundData", "visualThreshold", {
      sid: localStorage.getItem("sid"),
      recordId: localStorage.getItem("recordId"),
      type: "3",
      isMaskingTone: "0",
      testVoiceType: "1",
      wordsType: "2",
      projects: "1",
    });

    // 竞争性环境言语识别率-2.0
    this.getFormData("checkWords/reportSoundData", "envDecreased", {
      sid: localStorage.getItem("sid"),
      recordId: localStorage.getItem("recordId"),
      type: "3",
      isMaskingTone: "1",
      testVoiceType: "1",
      db: "65",
      wordsType: "2",
    });
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
  },
  mounted() {},
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
};
</script>

<style lang="scss" scoped>
.medicalReport {
  position: relative;
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
        padding: unset !important;
      }
    }
  }
  .report_qr_case {
    width: 100px;
    height: 100px;
    border-radius: 12px;
    position: absolute;
    top: 80px;
    right: 60px;
    font-size: 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .user_info {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 30px;
    height: 60px;
    box-sizing: border-box;
    margin-top: 20px;
    background: #f2f2f2;
    border-radius: 12px;
  }
  .user_info > div {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    span {
      margin-right: 15px;
    }
    span.t_b {
      font-weight: bold;
      font-size: 20px;
    }
  }
  .user_info > div:first-child {
    border-right: 1px solid #d7d7d7;
  }
  .chunk1 {
    display: flex;
    width: 100%;
    line-height: 32px;
    margin-top: 30px;
    .t_title {
      flex-shrink: 0;
      font-size: 20px;
      font-weight: bold;
    }
    .d_border {
      text-decoration: underline;
      flex-grow: 1;
      word-break: break-all;
      line-height: 32px;
    }
  }
  .t_title {
    font-size: 20px;
    font-weight: bold;
  }
  .t_insert {
    padding: 0 4px;
    text-decoration: underline;
  }
  .t_p {
    margin-top: 14px;
    padding-left: 30px;
  }
  .t_p_l {
    margin-top: 14px;
    padding-left: 60px;
  }
  .chunk2 {
    margin-top: 10px;
    .echart_case {
      overflow: hidden;
      height: 470px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      // height: 360px;
      width: calc(100% - 30px);
      margin-left: 30px;
      margin-bottom: 14px;
      .echart {
        width: 400px;
        height: 440px;
        margin: 14px 0;
      }
      .echart1 {
        width: 400px;
        height: 440px;
        margin: 14px 0;
      }
    }
    .result {
      width: 100%;
      // height: calc(100% - 60px);
      margin-bottom: 30px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      /* padding-top: 60px; */
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      border: 1px solid #ddd;
    }

    .result > div {
      width: 100%;
      display: flex;
      border-bottom: 1px solid #ddd;
      div {
        flex: 1;
        padding: 0 8px;
        text-align: center;
        border-right: 1px solid #ddd;
      }
      div:last-child {
        border-right: unset;
      }
    }
    .result > div:last-child {
      border-bottom: unset;
    }
    .flex_1 {
      flex: 1;
    }
    .flex_2 {
      flex: 2;
    }
    .flex_4 {
      flex: 4;
    }
    .echart_info_case {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      .content {
        width: 20px;
        flex-grow: 1;
        span {
          padding: 0 4px;
          text-decoration: underline;
        }
      }
      .center {
        width: 200px;
      }
    }
  }
  .contain {
    display: flex;
    flex-direction: column;
    color: #212121;
    justify-content: center;
    padding: 0 40px;
    box-sizing: border-box;
  }
  .report_table {
    border-collapse: collapse;
    margin-top: 12px;
    tr,
    td {
      border: 1px solid #ddd;
      text-align: center;
      padding: 10px 6px;
      .el-checkbox-group {
        font-size: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
    }
    width: 100%;
  }
  .header {
    display: flex;
    width: 100%;
    margin: 20px auto 0;
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
    margin-top: 50px;
    .chunk {
      margin-bottom: 26px;
    }
    .chunk-content {
      width: 100%;
      box-sizing: border-box;
      padding: 14px 0 0 1em;
      line-height: 26px;
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      .flex-grow {
        display: flex;
        flex-grow: 1;
      }
    }
    .chunk-label {
      font-weight: bold;
    }
  }
  .user-info {
    font-size: 18px;
    line-height: 16px;
    color: #212121;
    margin: 42px auto 0;
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
}
</style>

<style lang="scss">
.medicalReport {
  position: relative;
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
        padding: unset !important;
      }
    }
  }
}
.report_table {
  tr,
  td {
    .el-checkbox-group {
      font-size: 0;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
}
</style>>
