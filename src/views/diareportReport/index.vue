<template>
  <div class="diareportReport">
    <div class="contain">
      <div class="header">
        <img class="img" src="../../assets/image/logo@2x.png" alt />
        <div class="slogan">{{slogan}}</div>
      </div>
      <div class="header-title">
        <div class="title">听觉言语诊断报告单</div>
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
      <div class="report-wrapper">
        <div class="chunk">
          <div class="chunk-label">一、临床诊断</div>
          <div class="mt-14">1、听觉诊断结果:</div>
          <div class="chunk-content">
            <table class="table">
              <tr>
                <th></th>
                <th>左耳</th>
                <th>右耳</th>
              </tr>
              <tr>
                <td>程度</td>
                <td>
                  <van-checkbox-group
                    v-model="diareport.leftDegree"
                    direction="horizontal"
                    disabled
                  >
                    <van-checkbox name="0" shape="square">听力正常</van-checkbox>
                    <van-checkbox name="1" shape="square">轻微听力损失</van-checkbox>
                    <van-checkbox name="2" shape="square">轻度听力损失</van-checkbox>
                    <van-checkbox name="3" shape="square">中度听力损失</van-checkbox>
                    <van-checkbox name="4" shape="square">中等重度听力损失</van-checkbox>
                    <van-checkbox name="5" shape="square">重度听力损失</van-checkbox>
                    <van-checkbox name="6" shape="square">极度听力损失</van-checkbox>
                  </van-checkbox-group>
                </td>
                <td>
                  <van-checkbox-group
                    v-model="diareport.rightDegree"
                    direction="horizontal"
                    disabled
                  >
                    <van-checkbox name="0" shape="square">听力正常</van-checkbox>
                    <van-checkbox name="1" shape="square">轻微听力损失</van-checkbox>
                    <van-checkbox name="2" shape="square">轻度听力损失</van-checkbox>
                    <van-checkbox name="3" shape="square">中度听力损失</van-checkbox>
                    <van-checkbox name="4" shape="square">中等重度听力损失</van-checkbox>
                    <van-checkbox name="5" shape="square">重度听力损失</van-checkbox>
                    <van-checkbox name="6" shape="square">极度听力损失</van-checkbox>
                  </van-checkbox-group>
                </td>
              </tr>
              <tr>
                <td>性质</td>
                <td>
                  <van-checkbox-group
                    v-model="diareport.leftNature"
                    direction="horizontal"
                    disabled
                  >
                    <van-checkbox name="1" shape="square">传导性</van-checkbox>
                    <van-checkbox name="2" shape="square">感应神经性</van-checkbox>
                    <van-checkbox name="3" shape="square">混合性</van-checkbox>
                  </van-checkbox-group>
                </td>
                <td>
                  <van-checkbox-group
                    v-model="diareport.rightNature"
                    direction="horizontal"
                    disabled
                  >
                    <van-checkbox name="1" shape="square">传导性</van-checkbox>
                    <van-checkbox name="2" shape="square">感应神经性</van-checkbox>
                    <van-checkbox name="3" shape="square">混合性</van-checkbox>
                  </van-checkbox-group>
                </td>
              </tr>
              <tr>
                <td>疾病</td>
                <td>{{disease[diareport.leftDisease]}}</td>
                <td>{{disease[diareport.rightDisease]}}</td>
              </tr>
              <tr>
                <td>并发症</td>
                <td>
                  <van-checkbox-group
                    v-model="diareport.leftComplication"
                    direction="horizontal"
                    disabled
                  >
                    <van-checkbox name="1" shape="square">重振</van-checkbox>
                    <van-checkbox name="2" shape="square">听觉过敏</van-checkbox>
                    <van-checkbox name="3" shape="square">耳鸣</van-checkbox>
                  </van-checkbox-group>
                </td>
                <td>
                  <van-checkbox-group
                    v-model="diareport.rightComplication"
                    direction="horizontal"
                    disabled
                  >
                    <van-checkbox name="1" shape="square">重振</van-checkbox>
                    <van-checkbox name="2" shape="square">听觉过敏</van-checkbox>
                    <van-checkbox name="3" shape="square">耳鸣</van-checkbox>
                  </van-checkbox-group>
                </td>
              </tr>
            </table>
          </div>
          <div class="mt-14">2、言语诊断结果:</div>
          <div class="chunk-content">
            <div>言语识别率：</div>
            <div class="span flex-grow">{{diareport.speechRecognitionRate}}%</div>

            <div>噪声环境言语识别率：</div>
            <div class="span flex-grow">{{diareport.environmentalSpeechRecognitionRate}}%</div>
          </div>
          <div class="chunk-content">
            <div>视觉代偿率：</div>
            <div class="span flex-grow">{{diareport.visualCompensationRate}}%</div>
            <div>整体反应能力下降：</div>
            <div class="span flex-grow">{{diareport.overallDeclineRate}}%</div>
          </div>
        </div>
        <div class="chunk">
          <div class="chunk-label">二、影响听力康复的提示：</div>
          <div class="chunk-content">
            <div>1、特殊听力损失情况：</div>
            <van-checkbox-group v-model="diareport.hearingLoss" direction="horizontal" disabled>
              <van-checkbox name="1" shape="square">听力损失非对称性</van-checkbox>
              <van-checkbox name="2" shape="square">突发性听力损失</van-checkbox>
              <van-checkbox name="3" shape="square">言语分辨力明显下降</van-checkbox>
              <van-checkbox name="4" shape="square">陡降型听力损失</van-checkbox>
              <van-checkbox name="5" shape="square">大声音明显不耐受</van-checkbox>
              <van-checkbox name="6" shape="square">一侧耳已经无法由助听器获得帮助</van-checkbox>
              <van-checkbox name="7" shape="square">波动性听力下降</van-checkbox>
            </van-checkbox-group>
          </div>
          <div class="chunk-content">
            <div>2、影响操作及佩戴的情况：</div>
            <van-checkbox-group
              v-model="diareport.impactSituation"
              direction="horizontal"
              class="flex_1_case"
              disabled
            >
              <van-checkbox name="1" shape="square">视力障碍</van-checkbox>
              <van-checkbox name="2" shape="square">手灵活性差</van-checkbox>
              <van-checkbox name="3" shape="rightDegreesquare">戴眼镜</van-checkbox>
              <van-checkbox name="4" shape="square">易出汗</van-checkbox>
            </van-checkbox-group>
          </div>
          <div class="chunk-content shrink">
            <div>3、其他与听力康复相关情况：</div>
            <van-checkbox-group v-model="diareport.otherSituation" direction="horizontal" disabled>
              <van-checkbox name="1" shape="square">与听力康复相关的认知障碍</van-checkbox>
              <van-checkbox name="2" shape="square">情绪障碍</van-checkbox>
            </van-checkbox-group>
          </div>
          <div class="ten_row">
            <div>4、听觉改善主观意愿及配合度：</div>
            <div class="flex_1_case">
              <div>抵触</div>
              <van-checkbox-group v-model="diareport.coordination" direction="horizontal" disabled>
                <van-checkbox name="0" shape="square">0</van-checkbox>
                <van-checkbox name="1" shape="square">1</van-checkbox>
                <van-checkbox name="2" shape="square">2</van-checkbox>
                <van-checkbox name="3" shape="square">3</van-checkbox>
                <van-checkbox name="4" shape="square">4</van-checkbox>
                <van-checkbox name="5" shape="square">5</van-checkbox>
                <van-checkbox name="6" shape="square">6</van-checkbox>
                <van-checkbox name="7" shape="square">7</van-checkbox>
                <van-checkbox name="8" shape="square">8</van-checkbox>
                <van-checkbox name="9" shape="square">9</van-checkbox>
                <van-checkbox name="10" shape="square">10</van-checkbox>
              </van-checkbox-group>
              <div>愿意</div>
            </div>
          </div>
          <div class="chunk-content">
            <div>5、主要交流对象：</div>
            <van-checkbox-group v-model="diareport.mainTalker" class="flex_1_case" direction="horizontal" disabled>
              <van-checkbox name="1" shape="square">家人</van-checkbox>
              <van-checkbox name="2" shape="square">朋友</van-checkbox>
              <van-checkbox name="3" shape="square">同事</van-checkbox>
            </van-checkbox-group>
          </div>
        </div>
      </div>
      <div class="fixed_bottom">
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
      // 当前时间
      nowdatetime: new Date()
        .toLocaleString()
        .replace(/\//g, "-")
        .substring(
          0,
          new Date().toLocaleString().replace(/\//g, "-").indexOf(" ")
        ),
      diareport: {
        leftDegree: [],
        rightDegree: [],
        leftNature: [],
        rightNature: [],
        leftDisease: [],
        rightDisease: [],
        leftComplication: [],
        rightComplication: [],
        speechRecognitionRate: null,
        environmentalSpeechRecognitionRate: null,
        visualCompensationRate: null,
        overallDeclineRate: null,
        hearingLoss: [],
        impactSituation: [],
        otherSituation: [],
        coordination: [],
        mainTalker: [],
      },
      disease: [
        "",
        "传导性",
        "中耳畸形",
        "中耳炎",
        "耳硬化症",
        "感应神经性",
        "内耳畸形",
        "药物性",
        "突发性",
        "老年性",
        "梅尼埃病",
        "混合性",
      ],
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
        const data = res.data.data;
        for (const key in this.userInfo) {
          if (data.hasOwnProperty(key)) {
            this.userInfo[key] = data[key];
          }
        }

        //数据处理
      })
      .catch((err) => console.log(err));

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

    // 获取诊断报告
    api
      .postFormAPI("patientDiareport/getInfo", {
        recordId: localStorage.getItem("recordId"),
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result != 1) {
          return;
        }
        const data = res.data.data;
        for (const key in this.diareport) {
          if (data.hasOwnProperty(key)) {
            switch (key) {
              case "leftDegree":
              case "rightDegree":
              case "leftNature":
              case "rightNature":
              case "leftDisease":
              case "rightDisease":
              case "leftComplication":
              case "rightComplication":
              case "hearingLoss":
              case "impactSituation":
              case "otherSituation":
              case "coordination":
              case "mainTalker":
                {
                  data[key] = data[key].split(",");
                }
                break;
            }
            this.diareport[key] = data[key];
          }
        }
      })
      .catch((err) => console.log(err));
    this.init();
  },
  methods: {
    showDiolog() {},
    init() {
      // 获取视觉代偿率-2.0
      api
        .postFormAPI("checkWords/visualRatio", {
          recordId: this.recordId,
          type: "3",
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.result == "1") {
            var noVisual = res.data.data.noVisual;
            this.diareport.visualCompensationRate =
              parseFloat(res.data.data.visual) -
              parseFloat(res.data.data.noVisual);
            // 获取整体反应下降率-2.0
            api
              .postFormAPI("checkWords/responseDecreased", {
                recordId: this.recordId,
                type: "3",
                sid: localStorage.getItem("sid"),
              })
              .then((re) => {
                if (re.data.result == "1") {
                  this.diareport.overallDeclineRate =
                    parseFloat((re.data.data.advantage / 120) * 100) -
                    parseInt(noVisual);
                }
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));

      // 言语识别率-2.0
      api
        .postFormAPI("checkWords/reportSoundData", {
          recordId: this.recordId,
          type: "3",
          isMaskingTone: "0",
          testVoiceType: "1",
          db: "65",
          wordsType: "2",
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.result == "1") {
            this.diareport.speechRecognitionRate = res.data.data.accuracyrate;
          }
        })
        .catch((err) => console.log(err));
      // 竞争性环境言语识别率-2.0
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
            this.diareport.environmentalSpeechRecognitionRate =
              res.data.data.accuracyrate;
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.diareportReport {
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
      align-items: center;
      .flex-grow {
        display: flex;
        flex-grow: 1;
      }
    }
    .chunk-label {
      font-weight: bold;
    }
    .table {
      width: 100%;
      border-collapse: collapse;
      th,
      td {
        font-weight: unset;
        text-align: left;
        border: 1px solid #212121;
        padding: 4px 0;
      }
    }
    .span {
      min-height: 24px;
      border-bottom: 1px solid #212121;
      padding: 0 1em;
      margin: 0 14px 0 6px;
      min-width: 26px;
    }
    .mt-14 {
      margin-top: 14px;
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
  .fixed_bottom {
    width: 100%;
    // position: fixed;
    // bottom: 0;
  }
}
</style>

<style lang="scss">
.diareportReport {
  .ten_row {
    display: flex;
    padding-left: 14px;
    box-sizing: border-box;
    margin: 20px 0 0;
    flex-wrap: wrap;
    .flex_1_case {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding-left: 14px;
      margin: 10px 0 0;
      .van-checkbox-group--horizontal {
        padding-left: 0;
        flex-grow: 1;
        margin: 0 20px;
        .van-checkbox {
          flex: 1;
        }
      }
    }
    .van-checkbox-group .van-checkbox {
      width: auto;
      margin: 0 6px;
    }
  }
  .shrink {
    .van-checkbox-group {
      flex-grow: 1;
    }
  }
  .van-checkbox-group {
    padding-left: 14px;
    .van-checkbox {
      margin: 10px 0 0;
      width: 50%;
    }
  }
  .van-checkbox__icon--disabled.van-checkbox__icon--checked .van-icon {
    color: #fff;
  }
  .van-checkbox__icon--checked {
    background-color: #1989fa;
  }
  .van-checkbox__icon--disabled .van-icon {
    background-color: unset;
    border-color: #c8c9cc;
  }
  .chunk-content > .van-checkbox-group .van-checkbox--horizontal {
    margin-top: 12px;
  }
  .chunk-content .flex_1_case {
    width: 100%;
    .van-checkbox {
      flex: 1;
    }
  }

  .van-checkbox__label {
    color: #212121;
  }
}
</style>
