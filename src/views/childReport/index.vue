<template>
  <div class="childReport">
    <div class="contain">
      <div class="header">
        <img class="img" src="../../assets/image/logo@2x.png" alt />
        <div class="slogan">{{slogan}}</div>
      </div>
      <div class="header-title">
        <div class="title">听友问卷(儿童)</div>
        <!-- <div class="button">
          <div class="print">
            <img src="../../assets/image/print@2x.png" alt />
            <span>打印</span>
          </div>
          <div class="close"></div>
        </div>-->
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
        <div class="report-title">听觉健康问卷</div>
        <div class="report-tips">CAP-II中文版具有较好的重测信度、评分者信度和校标效度，可以用于汉语普通话 0-6 岁听力语言障碍儿童的听觉能力评估</div>
        <div class="report">
          <div class="table-tiem">
            <div>级别</div>
            <div class="cell">判断标准</div>
            <div>陪同</div>
          </div>
          <div class="table-tiem" v-for="(item,index) in question" :key="index">
            <div style="color:#7D7D7D">{{index+1}}</div>
            <div>{{item.title}}</div>
            <div>{{item.answer[0]==item.options[0].option?item.options[0].title:(item.answer==item.options[1].option?item.options[1].title:"--")}}</div>
          </div>
          <div class="table-bottom">
            <div class="score-description-wrapper">
              <div class="score-description">
                <span>听觉健康问卷(HHE-s)计分规则：</span>
                <span>总得分为0-40分</span>
                <span>回答：“是”为4分、“有时”为2分、“不是”为0分</span>
                <span>0-8分听力损失概率为13%</span>
                <span>9-24分听力损失概率为50%</span>
                <span>25-40分听力损失概率为84%</span>
              </div>
            </div>
            <div class="score-title">
              <span>听力损失率：</span>
            </div>
            <div class="score">
              <span>{{score}}</span>
            </div>
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
        nation: null,
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
      question: [],
      score: "",
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
    this.init();
  },
  methods: {
    init() {
      this.getuserInfo();
      this.getListData();
    },
    getuserInfo() {
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
          if (res.data.result == "1") {
            this.orgName = res.data.data.orgName;
            this.truename = res.data.data.truename;
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    getListData() {
      api
        .postFormAPI("patientTestpaper/getPaperListByStep", {
          recordId: localStorage.getItem("recordId"),
          processKey: "health_questionnaire_child",
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.result == "1") {
            this.question = res.data.data[0].questionList;
            const analysis = res.data.data[0].analysis;
            let scoreRange = [];
            let scoreResult = [];
            for (let i = 0; i < analysis.length; i++) {
              // 分数范围
              scoreRange[i] = analysis[i].minScore;
              // 分数结果
              scoreResult[i] = analysis[i].result;
            }
            this.score = Number(res.data.data[0].score);
            for (let i = 0; i < scoreRange.length; i++) {
              if (this.score < scoreRange[i]) {
                this.score = scoreResult[i - 1];
                break;
              }
              if (i == scoreRange.length - 1 && this.score >= scoreRange[i]) {
                this.score = scoreResult[i];
              }
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
.childReport {
  .contain {
    display: flex;
    flex-direction: column;
    color: #212121;
  }
  .header {
    display: flex;
    width: 90%;
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
      margin-right: 40px;
    }
  }
  .report-wrapper {
    display: flex;
    width: 90%;
    flex-direction: column;
    align-self: center;
    align-items: center;
    margin-top: 50px;
    .report-title {
      font-size: 22px;
      line-height: 18px;
      color: #212121;
    }
    .report-tips {
      font-size: 14px;
      line-height: 16px;
      margin: 20px auto 0;
    }
    .report {
      width: 100%;
      border: 1px solid #a1a1a1;
      margin-top: 40px;
      > div:first-child {
        background-color: #f9f9f9;
        border-bottom: none;
      }
      .table-tiem {
        display: flex;
        border-bottom: 1px solid #e4e4e4;
        div {
          display: flex;
          height: 48px;
          width: 80px;
          align-items: center;
          justify-content: center;
          border-right: 1px solid #e4e4e4;
          &:last-child {
            border-right: none;
          }
        }
        :nth-child(2) {
          flex-grow: 1;
          justify-content: flex-start;
          padding-left: 20px;
        }
        .cell {
          flex-grow: 1;
          justify-content: center;
          padding-left: 0;
        }
      }
      .table-bottom {
        display: flex;
        > div {
          border-right: 1px solid #e4e4e4;
          &:last-child {
            border-right: none;
          }
        }
        .score-description-wrapper {
          padding: 10px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          .score-description {
            display: flex;
            flex-direction: column;
          }
        }
        .score-title {
          flex-grow: 1;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 20px;
        }
        .score {
          display: flex;
          width: 80px;
          align-items: center;
          justify-content: center;
        }
      }
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
