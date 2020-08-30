<template>
  <div class="speechTextReport">
    <div class="contain">
      <div class="header">
        <img class="img" src="../../assets/image/logo@2x.png" alt />
        <div class="slogan">{{slogan}}</div>
      </div>
      <div class="header-title">
        <div class="title">言语测听报告单</div>
        <div class="button">
          <div class="print">
            <img src="../../assets/image/print@2x.png" alt />
            <span>打印</span>
          </div>
          <div class="close"></div>
        </div>
      </div>
      <div class="user-info">
        <span>姓名：</span>
        <span>{{userInfo.truename}}</span>
        <span>性别：</span>
        <span>{{userInfo.sex == 1 ? '男' : userInfo.sex == 2 ? '女': ''}}</span>
        <span>年龄：</span>
        <span>{{userInfo.birthday}}</span>
        <span>民族：</span>
        <span>{{userInfo.nation}}</span>
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
              <td v-for="(item,index) in recognition" :key="index">
                <div v-if="item.content != ''">
                  <u v-if="initial.includes(item.content)&&!finals.includes(item.content)">
                    <b v-if="sixVoice.includes(item.content)">{{item.content}}</b>
                    <span v-else>{{item.content}}</span>
                  </u>
                </div>
              </td>
            </tr>
            <tr>
              <td>结果</td>
              <td v-for="(item,index) in recognition" :key="index">
                <div v-if="initial.includes(item.content)&&!finals.includes(item.content)">
                  <div v-if="item.status==1">√</div>
                  <div v-else>x</div>
                </div>
              </td>
            </tr>
          </table>
          <table class="voicetable">
            <caption>声母识别:</caption>
            <tr>
              <td>韵母</td>
              <td v-for="(item,index) in recognition" :key="index">
                <div v-if="item.content != ''">
                  <u v-if="finals.includes(item.content)&&!initial.includes(item.content)">
                    <b v-if="sixVoice.includes(item.content)">{{item.content}}</b>
                    <span v-else>{{item.content}}</span>
                  </u>
                </div>
              </td>
            </tr>
            <tr>
              <td>结果</td>
              <td v-for="(item,index) in finals" :key="index">
                <div v-for="(itemR,indexR) in recognition" :key="indexR">
                  <div v-if="finals.includes(item.content)&&!initial.includes(item.content)">
                    <div v-if="item.status==1">√</div>
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
                <th>素材</th>
                <th colspan="6">双音节</th>
                <th colspan="6">句子</th>
              </tr>
              <!-- <tr>
                <th colspan="6">
                  <span v-for="(item, index) in disyllable" :key="index">◎{{item}}</span>
                </th>
                <th colspan="6">
                  <span v-for="(item, index) in sentence" :key="index">◎{{item}}</span>
                </th>
              </tr>-->
              <tr>
                <td>环境</td>
                <td colspan="3">安静</td>
                <td colspan="3">噪声</td>
                <td colspan="3">安静</td>
                <td colspan="3">噪声</td>
              </tr>
              <tr>
                <td colspan="2">计量</td>
                <td>识别阈</td>
                <td>识别率</td>
                <td>
                  强度
                  <br />dBSPL
                </td>
                <td>识别阈</td>
                <td>识别率</td>
                <td>信噪比</td>
                <td>识别阈</td>
                <td>识别率</td>
                <td>
                  强度
                  <br />dBSPL
                </td>
                <td>识别阈</td>
                <td>识别率</td>
                <td>信噪比</td>
              </tr>
              <tr>
                <td colspan="2">电声</td>
                <td>{{reportSoundData1.threshold}}</td>
                <td>{{reportSoundData1.accuracyrate}}</td>
                <td>65</td>
                <td>{{reportSoundData3.threshold}}</td>
                <td>{{reportSoundData3.accuracyrate}}</td>
                <td>{{reportSoundData3.isNoise}}</td>
                <td>{{reportSoundData5.threshold}}</td>
                <td>{{reportSoundData5.accuracyrate}}</td>
                <td>65</td>
                <td>{{reportSoundData7.threshold}}</td>
                <td>{{reportSoundData7.accuracyrate}}</td>
                <td>{{reportSoundData7.isNoise}}</td>
              </tr>
              <tr>
                <td colspan="2">口声</td>
                <td>{{reportSoundData2.threshold}}</td>
                <td>{{reportSoundData2.accuracyrate}}</td>
                <td>70</td>
                <td>{{reportSoundData4.threshold}}</td>
                <td>{{reportSoundData4.accuracyrate}}</td>
                <td>{{reportSoundData4.isNoise}}</td>
                <td>{{reportSoundData6.threshold}}</td>
                <td>{{reportSoundData6.accuracyrate}}</td>
                <td>70</td>
                <td>{{reportSoundData8.threshold}}</td>
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
import {
  reportSoundMaterial,
  visualRatio,
  responseDecreased,
  getInfo,
  reportPI,
  reportSoundData,
  reportRecognition,
  reportWordsOther,
} from "@/api/patient";
export default {
  data() {
    return {
      slogan: "用爱经营 用良心服务 用匠心成就 ",
      userInfo: {
        uid: "DG20190920000041",
        name: "李四",
        sex: "男",
        age: 33,
        nation: "汉",
      },
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
  created() {
    this.recordId = this.$route.params.recordId;
    this.patientId = this.$route.params.id;
    getInfo({
      patientId: this.patientId,
    }).then((res) => {
      if (res.result == 1) {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        this.userInfo = res.data;
      }
    });

    reportRecognition({
      recordId: this.recordId,
      type: "3",
      isHearingAid: "0",
    }).then((res) => {
      if (res.result == 1) {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        this.recognition = res.data;
      }
    });

    reportPI({
      recordId: this.recordId,
      type: "3",
    }).then((res) => {
      if (res.result == 1) {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        var data = res.data;
        data.forEach((el) => {
          var arr = [];
          arr.push(el.db, el.accuracyrate);
          this.pi.push(arr);
        });
        this.getcharts(".echarts");
      }
    });

    visualRatio({
      recordId: this.recordId,
      type: "3",
    }).then((res) => {
      if (res.result == 1) {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        this.visualRatio = res.data;
      }
    });

    responseDecreased({
      recordId: this.recordId,
      type: "3",
    }).then((res) => {
      if (res.result == 1) {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        this.responseDecreased = res.data;
      }
    });

    //言语测听-报告单-言语测试-对应的数据-2.0
    reportSoundData({
      recordId: this.recordId,
      type: "3",
      isMaskingTone: "0",
      testVoiceType: "1",
      db: "0",
      wordsType: "2",
    }).then((res) => {
      if (res.result == 1) {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        this.reportSoundData1 = res.data;
      }
    });

    reportSoundData({
      recordId: this.recordId,
      type: "3",
      isMaskingTone: "0",
      testVoiceType: "2",
      db: "0",
      wordsType: "2",
    }).then((res) => {
      if (res.result == 1) {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        this.reportSoundData2 = res.data;
      }
    });

    reportSoundData({
      recordId: this.recordId,
      type: "3",
      isMaskingTone: "1",
      testVoiceType: "2",
      db: "65",
      wordsType: "2",
    }).then((res) => {
      if (res.result == 1) {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        this.reportSoundData3 = res.data;
      }
    });

    reportSoundData({
      recordId: this.recordId,
      type: "3",
      isMaskingTone: "1",
      testVoiceType: "1",
      db: "65",
      wordsType: "2",
    }).then((res) => {
      if (res.result == 1) {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        this.reportSoundData4 = res.data;
      }
    });

    reportSoundData({
      recordId: this.recordId,
      type: "3",
      isMaskingTone: "1",
      testVoiceType: "2",
      db: "70",
      wordsType: "2",
    }).then((res) => {
      if (res.result == 1) {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        this.reportSoundData5 = res.data;
      }
    });

    reportSoundData({
      recordId: this.recordId,
      type: "3",
      isMaskingTone: "0",
      testVoiceType: "2",
      db: "0",
      wordsType: "3",
    }).then((res) => {
      if (res.result == 1) {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        this.reportSoundData6 = res.data;
      }
    });

    reportSoundData({
      recordId: this.recordId,
      type: "3",
      isMaskingTone: "1",
      testVoiceType: "1",
      db: "65",
      wordsType: "3",
    }).then((res) => {
      if (res.result == 1) {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        this.reportSoundData7 = res.data;
      }
    });

    reportSoundData({
      recordId: this.recordId,
      type: "3",
      isMaskingTone: "1",
      testVoiceType: "2",
      db: "70",
      wordsType: "3",
    }).then((res) => {
      if (res.result == 1) {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        this.reportSoundData8 = res.data;
      }
    });

    //言语测听-报告单-言语测试-对应的数据-2.0
    reportSoundMaterial({
      recordId: this.recordId,
      type: "3",
      wordsType: "2",
    }).then((res) => {
      if (res.result == 1) {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        this.disyllable = res.data;
      }
    });

    reportSoundMaterial({
      recordId: this.recordId,
      type: "3",
      wordsType: "3",
    }).then((res) => {
      if (res.result == 1) {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        this.sentence = res.data;
      }
    });
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
      margin-top: 14px;
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
      caption {
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
      tr td:not(:first-child) {
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
}
</style>
