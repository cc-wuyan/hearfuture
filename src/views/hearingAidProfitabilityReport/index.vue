<template>
  <div class="hearingAidProfitabilityReport">
    <div class="contain">
      <div class="header">
        <img class="img" src="../../assets/image/logo@2x.png" alt />
        <div class="slogan">{{slogan}}</div>
      </div>
      <div class="header-title">
        <div class="title">助听器受益度评估报告单</div>
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
        <div class="report-tips">请回答全部问题，不要跳过，如果您正在使用或曾经使用过助听器，请回答出没有助听器的情景</div>
        <div class="report">
          <div class="table-tiem">
            <div>级别</div>
            <div class="cell">判断标准</div>
            <div>本人</div>
          </div>
          <div class="table-tiem" v-for="(item,index) in question" :key="index">
            <div style="color:#7D7D7D">{{index+1}}</div>
            <div>{{item.title}}</div>
            <div>{{item.answer==item.options[0].option?item.options[0].title:(item.answer==item.options[1].option?item.options[1].title:(item.answer==item.options[2].option?item.options[2].title:"--"))}}</div>
          </div>
          <div class="table-bottom">
            <div class="score-description-wrapper">
              <div class="score-description">
                <span>计分规则：</span>
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
  methods: {
    showDiolog() {},
  },
};
</script>

<style lang="scss" scoped>
.hearingAidProfitabilityReport {
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