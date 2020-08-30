<template>
  <div class="report">
    <div class="contain">
      <div class="header">
        <img class="img" src="../../assets/image/logo@2x.png" alt />
        <div class="slogan">{{slogan}}</div>
      </div>
      <div class="header-title">
        <div class="title">{{title}}</div>
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
        <div class="report-title">{{title}}</div>
        <div
          v-if="title.indexOf('儿童')==-1"
          class="report-tips"
        >请回答全部问题，不要跳过，如果您正在使用或曾经使用过助听器，请回答出没有助听器的情景</div>
        <div v-else class="report-tips">CAP-II中文版具有较好的重测信度、评分者信度和校标效度，可以用于汉语普通话 0-6 岁听力语言障碍儿童的听觉能力评估</div>
        <div class="report">
          <div class="table-tiem">
            <div>级别</div>
            <div class="cell">判断标准</div>
            <div v-if="title.indexOf('儿童')==-1">本人</div>
            <div>陪同</div>
          </div>
          <div class="table-tiem" v-for="(item,index) in question" :key="index">
            <div style="color:#7D7D7D">{{index+1}}</div>
            <div>{{item.title}}</div>
            <div v-if="options.length>0 && title.indexOf('儿童')==-1">{{options[index][item.answer[0]]}}</div>
            <div
              v-if="options.length>0"
            >{{options[index][item.reconfirmAnswer[0]]}}</div>
          </div>
          <div class="table-bottom" v-if="category == 'category_hear'">
            <div class="score-description-wrapper">
              <div class="score-description" v-if="analysis.length > 0">
                <span>听觉健康问卷(HHE-s)计分规则：</span>
                <span>总得分为{{analysis[0].minScore}}-{{analysis[analysis.length-1].maxScore}}分</span>
                <template v-if="processKey == 'health_questionnaire_adult'">
                  <span>回答：“是”为4分、“有时”为2分、“不是”为0分</span>
                  <span>0-8分听力损失概率为13%</span>
                  <span>9-24分听力损失概率为50%</span>
                  <span>25-40分听力损失概率为84%</span>
                </template>
                <span
                  v-else
                  v-for="(item, index) in analysis"
                  :key="index"
                >{{item.minScore}}-{{item.maxScore}}分为{{item.result}}</span>
              </div>
            </div>
            <div class="score-title">
              <span>听力损失率：</span>
            </div>
            <div class="score" v-if="title.indexOf('儿童')==-1">
              <span>{{score}}</span>
            </div>
            <div class="score">
              <span>{{reconfirmScore}}</span>
            </div>
          </div>
          <div class="table-bottom" v-if="category == 'category_recovery'">
            <div class="score-description-wrapper">
              <div class="score-description">
                <span>总分</span>
              </div>
            </div>
            <div class="score-title">
              <span>{{score}}</span>
            </div>
            <div class="score">
              <!-- <span>{{score}}</span> -->
            </div>
            <div class="score">
              <!-- <span>{{reconfirmScore}}</span> -->
            </div>
          </div>
          <div class="table-bottom" v-if="analysisTitle">
            <div class="score-description-wrapper">
              <div class="score-description">
                <span>结果说明</span>
              </div>
            </div>
            <div class="score-title">
              <span>{{analysisTitle}}</span>
            </div>
            <div class="score">
              <!-- <span>{{score}}</span> -->
            </div>
            <div class="score">
              <!-- <span>{{reconfirmScore}}</span> -->
            </div>
          </div>
          <div class="table-bottom" v-if="useExplain">
            <div class="score-description-wrapper">
              <div class="score-description">
                <span>使用说明</span>
              </div>
            </div>
            <div class="score-title">
              <span>{{useExplain}}</span>
            </div>
            <div class="score">
              <!-- <span>{{score}}</span> -->
            </div>
            <div class="score">
              <!-- <span>{{reconfirmScore}}</span> -->
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
      },
      // 当前时间
      nowdatetime: new Date()
        .toLocaleString()
        .replace(/\//g, "-")
        .substring(
          0,
          new Date().toLocaleString().replace(/\//g, "-").indexOf(" ")
        ),
      id: "",
      title: "",
      processKey: "",
      title: "",
      analysis: "",
      question: [],
      reconfirmScore: "",
      score: "",
      options: [],
      category: "",
      useExplain: "",
      analysisTitle: "",
    };
  },
  computed: {
    age() {
      if (this.userInfo.birthday == "" || !this.userInfo.birthday) {
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
      const item = JSON.parse(localStorage.getItem("reportListData"));
      this.id = item.id;
      this.title = item.title;
      this.analysisTitle = item.analysisTitle;
      this.category = item.category;
      this.useExplain = item.useExplain;
      this.processKey = item.processKey;
      this.title = item.title;
      this.analysis = item.analysis;
      this.question = item.questionList;
      this.reconfirmScore = item.reconfirmScore;
      this.score = item.score;
      this.question.forEach((item) => {
        let options = {};
        item.options.forEach((item) => {
          options[item.option] = item.title;
        });
        this.options.push(options);
      });

      // 问卷计分特殊
      if (
        this.processKey == "health_questionnaire_adult" ||
        this.processKey == "health_questionnaire_child"
      ) {
        if (this.analysis.length > 0) {
          let scoreRange = [];
          let scoreResult = [];
          for (let i = 0; i < this.analysis.length; i++) {
            // 分数范围
            scoreRange[i] = this.analysis[i].minScore;
            // 分数结果
            scoreResult[i] = this.analysis[i].result;
          }
          this.score = Number(this.score);
          this.reconfirmScore = Number(this.reconfirmScore);
          for (let i = 0; i < scoreRange.length; i++) {
            if (this.score < scoreRange[i]) {
              this.score = scoreResult[i - 1];
              break;
            }
            if (i == scoreRange.length - 1 && this.score >= scoreRange[i]) {
              this.score = scoreResult[i];
            }
          }
          for (let i = 0; i < scoreRange.length; i++) {
            if (this.reconfirmScore < scoreRange[i]) {
              this.reconfirmScore = scoreResult[i - 1];
              break;
            }
            if (
              i == scoreRange.length - 1 &&
              this.reconfirmScore >= scoreRange[i]
            ) {
              this.reconfirmScore = scoreResult[i];
            }
          }
        }
      }
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
    },
    getuserInfo() {
      api
        .postFormAPI("patient/getInfo", {
          patientId: localStorage.getItem("patientId"),
        })
        .then((res) => {
          if (res.data.result == "1") {
            const data = res.data.data;
            for (const key in this.userInfo) {
              if (data.hasOwnProperty(key)) {
                this.userInfo[key] = data[key];
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
.report {
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
        border-bottom: 1px solid #e4e4e4;
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
      .table-bottom:last-child {
        border-bottom: unset;
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