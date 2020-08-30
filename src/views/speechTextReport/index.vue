<template>
  <div class="speechTextReport">
    <div class="contain">
      <div class="header">
        <img class="img" src="../../assets/image/logo@2x.png" alt />
        <div class="slogan">{{slogan}}</div>
      </div>
      <div class="header-title">
        <div class="title">言语测听报告单</div>
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
        <div class="chunk">
          <div class="chunk-label">一、音色识别：（加粗并且有下划线的字母为林氏六音）</div>
          <table class="voicetable">
            <caption>韵母识别:</caption>
            <tr>
              <td>韵母</td>
              <td v-for="(item,index) in initial" :key="index">
                <u>
                  <b v-if="sixVoice.includes(item)">{{item}}</b>
                  <span v-else>{{item}}</span>
                </u>
              </td>
            </tr>
            <tr>
              <td>结果</td>
              <td v-for="(item,index) in initial" :key="index">
                <div v-for="(itemR,indexR) in recognition" :key="indexR">
                  <div v-if="itemR.content==item">
                    <div v-if="itemR.status==1">√</div>
                    <div v-else>x</div>
                  </div>
                </div>
              </td>
            </tr>
          </table>
          <table class="voicetable">
            <caption>声母识别:</caption>
            <tr>
              <td>韵母</td>
              <td v-for="(item,index) in finals" :key="index">
                <u>
                  <b v-if="sixVoice.includes(item)">{{item}}</b>
                  <span v-else>{{item}}</span>
                </u>
              </td>
            </tr>
            <tr>
              <td>结果</td>
              <td v-for="(item,index) in finals" :key="index">
                <div v-for="(itemR,indexR) in recognition" :key="indexR">
                  <div v-if="itemR.content==item">
                    <div v-if="itemR.status==1">√</div>
                    <div v-else>x</div>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div class="chunk">
          <div class="chunk-label">二、言语测试</div>
          <div class="chunk-content">
            <table class="table">
              <tr>
                <th colspan="2">素材</th>
                <th colspan="6">双音节</th>
                <th colspan="5">句子</th>
              </tr>
              <!-- <tr>
                <th colspan="6">
                  <span v-for="(item, index) in disyllable" :key="index">&#10686;{{item}}</span>
                </th>
                <th colspan="5">
                  <span v-for="(item, index) in sentence" :key="index">&#10686;{{item}}</span>
                </th>
              </tr>-->
              <tr>
                <td colspan="2">环境</td>
                <td colspan="3">安静</td>
                <td colspan="3">噪声</td>
                <td colspan="2">安静</td>
                <td colspan="3">噪声</td>
              </tr>
              <tr>
                <td colspan="2">计量</td>
                <td>识别阈</td>
                <td>
                  强度
                  <br />dBSPL
                </td>
                <td>识别率</td>
                <td>
                  强度
                  <br />dBSPL
                </td>
                <td>识别率</td>
                <td>信噪比</td>
                <td>
                  强度
                  <br />dBSPL
                </td>
                <td>识别率</td>
                <td>
                  强度
                  <br />dBSPL
                </td>
                <td>识别率</td>
                <td>信噪比</td>
              </tr>
              <tr>
                <td colspan="2">电声</td>
                <td>{{reportSoundData1.threshold}}</td>
                <td>65</td>
                <td>{{reportSoundData9.accuracyrate}}</td>

                <td>65</td>
                <td>{{reportSoundData3.accuracyrate}}</td>
                <td>{{reportSoundData3.isNoise}}</td>

                <td>65</td>
                <td>{{reportSoundData5.accuracyrate}}</td>

                <td>65</td>
                <td>{{reportSoundData7.accuracyrate}}</td>
                <td>{{reportSoundData7.isNoise}}</td>
              </tr>
              <tr>
                <td colspan="2">口声</td>
                <td>{{reportSoundData2.threshold}}</td>
                <td>70</td>
                <td>{{reportSoundData10.accuracyrate}}</td>

                <td>70</td>
                <td>{{reportSoundData4.accuracyrate}}</td>
                <td>{{reportSoundData4.isNoise}}</td>

                <td>70</td>
                <td>{{reportSoundData6.accuracyrate}}</td>

                <td>70</td>
                <td>{{reportSoundData8.accuracyrate}}</td>
                <td>{{reportSoundData8.isNoise}}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="chunk">
          <div class="chunk-label">三、PI曲线</div>
          <div class="chunk-content">
            <div class="echarts"></div>
          </div>
        </div>
        <div class="chunk">
          <div class="chunk-label">四、视觉代偿测试：</div>
          <div class="chunk-content">
            视觉代偿率
            <span class="span">{{visualRatio.visual-visualRatio.noVisual}}</span>%=有视觉辅助双音节词识别率
            <span class="span">{{visualRatio.visual}}</span>%-无视觉辅助双音节词识别率
            <span class="span">{{visualRatio.noVisual}}</span>%
          </div>
        </div>
        <div class="chunk">
          <div class="chunk-label">五、整体反应能力损失测试：</div>
          <div class="chunk-content">
            整体反应能力损失率
            <span
              class="span"
            >{{(responseDecreased.advantage/120*100).toFixed(2)-responseDecreased.ratio}}</span>%=优势耳听力损失率
            <span class="span">{{(responseDecreased.advantage/120*100).toFixed(2)}}</span>%-双音节词识别率
            <span class="span">{{responseDecreased.ratio}}</span>%
          </div>
          <div class="chunk-content">
            优势耳听力损失率
            <span class="span">{{(responseDecreased.advantage/120*100).toFixed(2)}}</span>%=优势PTA值
            <span class="span">{{responseDecreased.advantage}}</span>/120*100%
          </div>
        </div>
        <div class="chunk">
          <div class="chunk-label">六、医生印象与建议：</div>
          <div class="chunk-content">
            <div class="advise">{{report}}</div>
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
        <div>验配中心：{{userInfo.matchTitle}}</div>
        <div>检查日期：{{userInfo.nowdatetime}}</div>
        <div>医生签名：{{userInfo.matcherName}}</div>
      </div>
    </div>
    <div class="back_btn" @click="toBack" v-if="this.$route.query.fromRouter">返回</div>
    <!--  <div class="back_btn" @click="toBack" v-else="this.$route.query.fromRouter"></div>-->
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
        matcherName: "",
        matchTitle: "",
        name: "",
        truename: "",
        sex: "",
        birthday: "",
        patientNum: "",
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

      report: "",
      recordId: 0,
      recognition: {},
      pi: [],
      checkbox: [],
      visualRatio: {},
      responseDecreased: {},
      reportSoundMaterial: {},
      disyllable: {},
      reportSoundData1: {},
      reportSoundData2: {},
      reportSoundData3: {},
      reportSoundData4: {},
      reportSoundData5: {},
      reportSoundData6: {},
      reportSoundData7: {},
      reportSoundData8: {},
      reportSoundData9: {},
      reportSoundData10: {},
      sentence: {},
      initial: ["a", "o", "e", "i", "u", "ü"],
      finals: [
        "b",
        "p",
        "m",
        "f",
        "d",
        "t",
        "n",
        "l",
        "g",
        "k",
        "h",
        "j",
        "q",
        "x",
        "zh",
        "ch",
        "sh",
        "r",
        "z",
        "c",
        "s",
        "y",
        "w",
      ],
      sixVoice: ["a", "i", "u", "m", "sh", "s"],
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
    this.recordId = localStorage.getItem("recordId");
    // 用户基本信息
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

          // 将时间戳转换成年月日
          if (this.userInfo.updatetime) {
            const date = new Date(this.userInfo.updatetime * 1000)
              .toLocaleString()
              .replace(/\//g, "-");
            this.userInfo.updatetime = date.substring(0, date.indexOf(" "));
          }
        }
        //数据处理
      })
      .catch((err) => console.log(err));

    // 验配师信息
    api
      .postFormAPI("patientMatchRecord/getMatcherByRecordId", {
        recordId: this.recordId,
      })
      .then((res) => {
        if (res.data.result == "1") {
          this.orgName = res.data.data.orgName;
          this.truename = res.data.data.truename;
        }
        //数据处理
      })
      .catch((err) => console.log(err));

    api
      .postFormAPI("checkWords/reportRecognition", {
        recordId: this.recordId,
        type: "3",
        isHearingAid: "0",
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result == "1") {
          // var data111="{\"message\":\"\",\"code\":\"200\",\"data\":[{\"status\":\"1\",\"content\":\"a\"},{\"status\":\"\",\"content\":\"牛奶\"},{\"status\":\"1\",\"content\":\"b\"},{\"status\":\"\",\"content\":\"喜剧\"},{\"status\":\"1\",\"content\":\"特征\"},{\"status\":\"\",\"content\":\"客观\"},{\"status\":\"1\",\"content\":\"s\"},{\"status\":\"\",\"content\":\"得意\"},{\"status\":\"1\",\"content\":\"班长\"},{\"status\":\"\",\"content\":\"队员\"},{\"status\":\"1\",\"content\":\"同志\"},{\"status\":\"\",\"content\":\"躲藏\"},{\"status\":\"1\",\"content\":\"d\"},{\"status\":\"\",\"content\":\"h\"},{\"status\":\"1\",\"content\":\"神秘\"},{\"status\":\"\",\"content\":\"中等\"},{\"status\":\"1\",\"content\":\"汽车\"},{\"status\":\"\",\"content\":\"f\"},{\"status\":\"1\",\"content\":\"老师\"},{\"status\":\"\",\"content\":\"今天\"},{\"status\":\"\",\"content\":\"l\"},{\"status\":\"\",\"content\":\"要求\"},{\"status\":\"\",\"content\":\"波浪\"},{\"status\":\"\",\"content\":\"作者\"},{\"status\":\"\",\"content\":\"能够\"}],\"result\":\"1\"}";
          // this.recognition=JSON.parse(data111).data
          // console.log( this.recognition)
          this.recognition = res.data.data;
        }
      })
      .catch((err) => console.log(err));

    // 言语测听-报告单-pi曲线-2.0
    api
      .postFormAPI("checkWords/reportPI", {
        recordId: this.recordId,
        type: "3",
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result == "1") {
          var data = res.data.data;
          data.forEach((el) => {
            var arr = [];
            arr.push(el.db, el.accuracyrate);
            this.pi.push(arr);
          });
          this.getcharts(".echarts");
        }
      })
      .catch((err) => console.log(err));

    // 言语测听-获取视觉代偿率(报告解读/报告单)-2.0
    api
      .postFormAPI("checkWords/visualRatio", {
        recordId: this.recordId,
        type: "3",
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result == "1") {
          this.visualRatio = res.data.data;
        }
      })
      .catch((err) => console.log(err));

    // 言语测听-获取整体反应下降率(报告单/报告解读)-2.0
    api
      .postFormAPI("checkWords/responseDecreased", {
        recordId: this.recordId,
        type: "3",
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result == "1") {
          this.responseDecreased = res.data.data;
        }
      })
      .catch((err) => console.log(err));

    //言语测听-报告单-言语测试-对应的数据-2.0
    api
      .postFormAPI("checkWords/reportSoundData", {
        recordId: this.recordId,
        type: "3",
        isMaskingTone: "0",
        testVoiceType: "1",
        projects: "1",
        wordsType: "2",
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result == "1") {
          this.reportSoundData1 = res.data.data;
        }
      })
      .catch((err) => console.log(err));
    api
      .postFormAPI("checkWords/reportSoundData", {
        recordId: this.recordId,
        type: "3",
        isMaskingTone: "0",
        testVoiceType: "1",
        projects: "2",
        wordsType: "2",
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result == "1") {
          this.reportSoundData9 = res.data.data;
        }
      })
      .catch((err) => console.log(err));

    api
      .postFormAPI("checkWords/reportSoundData", {
        recordId: this.recordId,
        type: "3",
        isMaskingTone: "0",
        testVoiceType: "2",
        projects: "1",
        wordsType: "2",
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result == "1") {
          this.reportSoundData2 = res.data.data;
        }
      })
      .catch((err) => console.log(err));

    api
      .postFormAPI("checkWords/reportSoundData", {
        recordId: this.recordId,
        type: "3",
        isMaskingTone: "0",
        testVoiceType: "2",
        projects: "2",
        wordsType: "2",
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result == "1") {
          this.reportSoundData10 = res.data.data;
        }
      })
      .catch((err) => console.log(err));

    api
      .postFormAPI("checkWords/reportSoundData", {
        recordId: this.recordId,
        type: "3",
        isMaskingTone: "1",
        testVoiceType: "1",
        db: "65",
        wordsType: "2",
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result == "1") {
          this.reportSoundData3 = res.data.data;
        }
      })
      .catch((err) => console.log(err));

    api
      .postFormAPI("checkWords/reportSoundData", {
        recordId: this.recordId,
        type: "3",
        isMaskingTone: "1",
        testVoiceType: "2",
        db: "70",
        wordsType: "2",
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result == "1") {
          this.reportSoundData4 = res.data.data;
        }
      })
      .catch((err) => console.log(err));

    api
      .postFormAPI("checkWords/reportSoundData", {
        recordId: this.recordId,
        type: "3",
        isMaskingTone: "0",
        testVoiceType: "2",
        db: "0",
        wordsType: "3",
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result == "1") {
          this.reportSoundData5 = res.data.data;
        }
      })
      .catch((err) => console.log(err));

    api
      .postFormAPI("checkWords/reportSoundData", {
        recordId: this.recordId,
        type: "3",
        isMaskingTone: "0",
        testVoiceType: "2",
        db: "0",
        wordsType: "3",
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result == "1") {
          this.reportSoundData6 = res.data.data;
        }
      })
      .catch((err) => console.log(err));

    api
      .postFormAPI("checkWords/reportSoundData", {
        recordId: this.recordId,
        type: "3",
        isMaskingTone: "1",
        testVoiceType: "1",
        db: "65",
        wordsType: "3",
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result == "1") {
          this.reportSoundData7 = res.data.data;
        }
      })
      .catch((err) => console.log(err));

    api
      .postFormAPI("checkWords/reportSoundData", {
        recordId: this.recordId,
        type: "3",
        isMaskingTone: "1",
        testVoiceType: "2",
        db: "70",
        wordsType: "3",
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result == "1") {
          this.reportSoundData8 = res.data.data;
        }
      })
      .catch((err) => console.log(err));

    //言语测听-报告单-言语测试-对应的数据-2.0
    // api
    //   .postFormAPI("checkWords/reportSoundMaterial", {
    //     recordId: this.recordId,
    //     type: "3",
    //     wordsType: "2",
    //     sid: localStorage.getItem("sid"),
    //   })
    //   .then((res) => {
    //     if (res.data.result == "1") {
    //       this.disyllable = res.data.data;
    //     }
    //   })
    //   .catch((err) => console.log(err));
    // api
    //   .postFormAPI("checkWords/reportSoundMaterial", {
    //     recordId: this.recordId,
    //     type: "3",
    //     wordsType: "3",
    //     sid: localStorage.getItem("sid"),
    //   })
    //   .then((res) => {
    //     if (res.data.result == "1") {
    //       this.sentence = res.data.data;
    //     }
    //   })
    //   .catch((err) => console.log(err));
  },

  methods: {
    getcharts(name) {
      var dom = document.querySelector(name);
      var echarts = this.$echarts.init(dom);
      var option1 = {
        xAxis: {},
        yAxis: {},
        series: [
          {
            data: this.pi,
            type: "line",
          },
        ],
      };
      echarts.setOption(option1);
    },
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
.speechTextReport {
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
    font-size: 18px;
    line-height: 16px;
    color: #212121;
    margin: 42px auto 0;
    span:nth-of-type(2n + 2):not(:last-of-type) {
      padding: 0 10px;
      margin-right: 50px;
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
    }
    .chunk-label {
      font-weight: bold;
    }
    .span {
      padding: 0 1em;
    }
    .table {
      width: 100%;
      border-collapse: collapse;
      th,
      td {
        border: 1px solid #212121;
        padding: 4px;
        text-align: center;
        font-weight: 400;
      }
    }
    .voicetable {
      border-collapse: collapse;
      margin-top: 20px;
      margin-left: 16px;
      caption{
        text-align: left;
        margin-bottom: 12px;
      }
      th,
      td {
        border: 1px solid #212121;
        text-align: center;
        font-weight: 400;
        padding: 4px 6px;
      }
      tr td:not(:first-child){
        width: 28px;
        padding: 4px 0;
      }
    }
    .echarts {
      flex-grow: 1;
      height: 300px;
    }
    .advise {
      flex-grow: 1;
      border-bottom: 1px solid #212121;
      min-height: 16px;
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
