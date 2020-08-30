<template>
  <div class="adultQuestion">
    <div class="qusetion_title" v-if="allData.category == 'category_hear'">
      <p>{{allData.title}}</p>
    </div>
    <div
      class="header"
      v-if="allData.processKey == 'health_questionnaire_adult' || allData.processKey == 'health_questionnaire_child'"
    >
      <div class="spot"></div>
      <div class="header_left">根据您的回答，您的听力损失概率为：</div>
      <div class="header_center">{{score==0?"0%":score}}</div>
      <div class="header_right">
        <span>（ 陪同</span>
        <span>{{reconfirm==0?"0%":reconfirm}}</span>
        <span>）</span>
      </div>
    </div>
    <div class="qusetion_title" v-if="allData.category == 'category_tinnitus'">
      <p>耳鸣评价表</p>
      <div class="score">
        <div>总分：{{trueScore}}分</div>
      </div>
    </div>
    <div class="qusetion_title" v-if="allData.category == 'category_recovery'">
      <p>助听器效果表</p>
      <div class="score">
        <div>总分：{{trueScore}}分</div>
      </div>
    </div>

    <div
      v-if="allData.category == 'category_tinnitus' || allData.category == 'category_recovery'"
      class="question_case"
    >
      <div @click="showDialogTips('useExplain','使用说明')">使用说明</div>
      <div @click="showDialogTips('analysisTitle','结果说明')">结果说明</div>
    </div>

    <div class="form">
      <div class="form_header">
        <div class="wt">问题</div>
        <div class="select" v-if="allData.processKey != 'health_questionnaire_child'">本人</div>
        <div
          class="select"
          v-if="allData.category != 'category_tinnitus' && allData.category != 'category_recovery'"
        >陪同</div>
      </div>
      <van-form>
        <div class="form_list" v-for="(item,index) in question" :key="index">
          <div
            style="width:100%;display: flex;align-items: center;padding-left:8px;"
            v-if="item.type == 1"
          >
            <div class="question">{{item.title}}</div>
            <div
              class="select"
              @click="showDialog(index,'left')"
              v-if="allData.processKey != 'health_questionnaire_child'"
            >
              <div v-if="options.length>0">{{options[index][item.answer[0]]}}</div>
              <div class="dropdown_icon"></div>
            </div>
            <div
              class="select"
              v-if="item.reconfirm == 1 && allData.category != 'category_tinnitus' && allData.category != 'category_recovery'"
              @click="showDialog(index, 'right')"
            >
              <div v-if="options.length>0">{{options[index][item.reconfirmAnswer[0]]}}</div>
              <div class="dropdown_icon"></div>
            </div>
          </div>
        </div>
      </van-form>
    </div>
    <div v-if="reTurnState" class="return_btn" @click="returnBtn"></div>
    <div @click="save()">
      <save-button></save-button>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      class="dialogModalForadultQuestion"
      width="500px"
    >
      <div class="options_case" v-if="relations && whichWay == 'left'">
        <div
          v-for="(item, index) in relations"
          :key="index"
          class="chunk"
          :class="item.option == relationList.option1 ? 'sign' : ''"
          @click="choiseRelation(index,whichWay)"
        >{{item.title}}</div>
      </div>
      <div class="options_case" v-if="relations && whichWay == 'right'">
        <div
          v-for="(item, index) in relations"
          :key="index"
          class="chunk"
          :class="item.option == relationList.option2 ? 'sign' : ''"
          @click="choiseRelation(index,whichWay)"
        >{{item.title}}</div>
      </div>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="dialogQuestionTips"
      class="dialogQuestionTips"
      width="500px"
    >
      <div class="options_case">
        <p class="titile">{{dialogQuestionTipsTitle}}</p>
        <p class="money">{{diologConttent}}</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const Big = require("big.js");
import SaveButton from "../components/SaveButton";
import api from "../../api/api";

export default {
  data() {
    return {
      question: [],
      dialogVisible: false,
      relations: "",
      relation_sign: -1,
      whichWay: "",
      relationList: "",
      questionShowIndex: "",
      id: "",
      score: 0,
      reconfirm: 0,
      options: [],
      scoreRange: [],
      scoreResult: [],
      allData: "",
      dialogQuestionTips: false,
      diologConttent: "",
      dialogQuestionTipsTitle: "",
      questionScore: 0,
      trueScore: 0,
      reTurnState: true,
    };
  },
  created() {
    this.recordId = localStorage.getItem("recordId");
    this.pId = this.$route.query.id;
    this.init();
    var routeHistory = JSON.parse(localStorage.getItem("routeHistory"));
    if (routeHistory) {
      var page = JSON.parse(routeHistory.data).key;
      if (
        page == "health_questionnaire_adult" ||
        page == "health_questionnaire_child" ||
        page == "benefit_assess" ||
        page == "cure_assess"
      ) {
        this.reTurnState = false;
      }
    }
  },
  watch: {
    question: {
      handler(newVal) {
        this.score = 0;
        this.reconfirm = 0;
        this.questionScore = 0; //耳鸣评价表分数
        this.trueScore = 0; //耳鸣评价表分数
        newVal.forEach((item) => {
          if (item.option1Record) {
            this.questionScore =
              this.questionScore + Number(item.option1Record);
          }
        });
        // 耳鸣评价表的计算
        if (
          this.allData.category == "category_tinnitus" ||
          this.allData.category == "category_recovery"
        ) {
          newVal.forEach((item) => {
            var a = Big(this.trueScore);
            var b = Big(item.score);
            this.trueScore = a.plus(b).toFixed(2);
          });
        } else {
          newVal.forEach((item) => {
            if (item.score) {
              this.score += Number(item.score);
            }
            if (item.reconfirmScore) {
              this.reconfirm += Number(item.reconfirmScore);
            }
          });
        }

        // 计算分数范围
        if (this.score != 0) {
          // console.log(this.score);
          // console.log(this.reconfirm);
          for (let i = 0; i < this.scoreRange.length; i++) {
            if (this.score < this.scoreRange[i]) {
              this.score = this.scoreResult[i - 1];
              break;
            }
            if (
              i == this.scoreRange.length - 1 &&
              this.score >= this.scoreRange[i]
            ) {
              this.score = this.scoreResult[i];
            }
          }
        }
        if (this.reconfirm != 0) {
          // console.log(this.score);
          // console.log(this.reconfirm);
          for (let i = 0; i < this.scoreRange.length; i++) {
            if (this.reconfirm < this.scoreRange[i]) {
              this.reconfirm = this.scoreResult[i - 1];
              break;
            }
            if (
              i == this.scoreRange.length - 1 &&
              this.reconfirm >= this.scoreRange[i]
            ) {
              this.reconfirm = this.scoreResult[i];
            }
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    init() {
      this.getData();
    },
    showDialog(e, whichWay) {
      this.whichWay = whichWay;
      this.dialogVisible = true;
      this.relationList = this.question[e];
      this.relations = this.relationList.options;
      this.questionShowIndex = e;
    },
    returnBtn() {
      this.$router.go(-1);
    },
    // 选中关系
    choiseRelation(e) {
      var whiciList = this.questionShowIndex;
      if (this.whichWay == "left") {
        this.$set(this.question[whiciList], "option1", "");
        this.$set(this.question[whiciList], "option1Val", "");
        this.$set(this.question[whiciList], "option1Record", "");
        this.$set(
          this.question[whiciList],
          "option1",
          this.question[whiciList].options[e].option
        );
        this.$set(
          this.question[whiciList],
          "option1Val",
          this.question[whiciList].options[e].title
        );
        this.$set(
          this.question[whiciList],
          "option1Record",
          this.question[whiciList].options[e].score
        );
        // 选中改变值与分数
        this.$set(
          this.question[whiciList].answer,
          "0",
          this.question[whiciList].option1
        );
        this.question[whiciList].score = this.question[whiciList].options[
          e
        ].score;
      } else {
        this.$set(this.question[whiciList], "option2", "");
        this.$set(this.question[whiciList], "option2Val", "");
        this.$set(this.question[whiciList], "option2Record", "");
        this.$set(
          this.question[whiciList],
          "option2",
          this.question[whiciList].options[e].option
        );
        this.$set(
          this.question[whiciList],
          "option2Val",
          this.question[whiciList].options[e].title
        );
        this.$set(
          this.question[whiciList],
          "option2Record",
          this.question[whiciList].options[e].score
        );
        // 选中改变值与分数
        this.$set(
          this.question[whiciList].reconfirmAnswer,
          "0",
          this.question[whiciList].option2
        );
        this.question[whiciList].reconfirmScore = this.question[
          whiciList
        ].options[e].score;
      }
      this.dialogVisible = false;
    },
    getData() {
      api
        .postFormAPI("patientTestpaper/getInfoByPaperId", {
          paperId: this.pId,
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.code == "200") {
            this.question = res.data.data.questionList;
            this.allData = res.data.data;
            this.id = res.data.data.id;
            // 选项数组
            this.question.forEach((item) => {
              let options = {};
              item.options.forEach((item) => {
                options[item.option] = item.title;
              });
              this.options.push(options);
            });
            const analysis = res.data.data.analysis;
            for (let i = 0; i < analysis.length; i++) {
              // 分数范围
              this.scoreRange[i] = analysis[i].minScore;
              // 分数结果
              this.scoreResult[i] = analysis[i].result;
            }
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    save() {
      let answer = [];
      let reconfirmAnswer = [];
      // console.log(this.question);
      this.question.forEach((item, index) => {
        if (item.answer.length != 0) {
          answer.push({
            questionId: item.id,
            option: item.answer,
            score: item.score,
          });
        }
        if (item.reconfirmAnswer.length != 0) {
          reconfirmAnswer.push({
            questionId: item.id,
            option: item.reconfirmAnswer,
            score: item.reconfirmScore,
          });
        }
      });

      this.answer = answer;
      this.reconfirmAnswer = reconfirmAnswer;
      if (
        (this.allData.category == "category_tinnitus" ||
          this.allData.category == "category_recovery") &&
        this.answer.length == this.question.length
      ) {
        this.saveApi();
        return;
      } else if (
        this.allData.processKey == "health_questionnaire_child" &&
        this.reconfirmAnswer.length == this.question.length
      ) {
        this.saveApi();
        return;
      }
      if (
        this.answer.length == this.question.length &&
        this.reconfirmAnswer.length == this.question.length
      ) {
        this.saveApi();
        return;
      } else {
        this.$notify({
          message: "问卷全部填写完毕才可提交！",
          offset: 60,
        });
      }
    },
    saveApi() {
      api
        .postFormAPI("patientTestpaper/answer", {
          id: this.id,
          answer: JSON.stringify(this.answer),
          reconfirmAnswer: JSON.stringify(this.reconfirmAnswer),
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.result == "1") {
            this.nativeCall({ index: 10 }, "updateStep");
          }
          this.$notify({
            message: res.data.message,
            offset: 60,
          });

          //数据处理
        })
        .catch((err) => console.log(err));
    },
    showDialogTips(e, title) {
      this.dialogQuestionTipsTitle = title;
      this.diologConttent = this.allData[e];
      this.dialogQuestionTips = true;
    },
    queryParams(data, isPrefix = false) {
      let prefix = isPrefix ? "?" : "";
      let _result = [];
      for (let key in data) {
        let value = data[key];
        // 去掉为空的参数
        if (["", undefined, null].includes(value)) {
          continue;
        }
        if (value.constructor === Array) {
          value.forEach((_value) => {
            _result.push(
              encodeURIComponent(key) + "[]=" + encodeURIComponent(_value)
            );
          });
        } else {
          _result.push(
            encodeURIComponent(key) + "=" + encodeURIComponent(value)
          );
        }
      }
      // console.log(_result.length ? prefix + _result.join("&") : "");
      return _result.length ? prefix + _result.join("&") : "";
    },
    nativeCall(param, nativeMethodName) {
      // console.log(param);
      // console.log(nativeMethodName);
      param = this.queryParams(param);
      // console.log(param);

      document.location = "js://" + nativeMethodName + "?" + param;
    },
  },
  components: {
    SaveButton,
  },
  mounted() {
    // console.log(this.$route);
  },
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.adultQuestion {
  margin-top: 30px;
  .return_btn {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    position: fixed;
    right: 18px;
    bottom: 154px;
    background: url("../../assets/image/btn/icon_btn_back@2x.png") no-repeat
      center/contain;
  }
  .dropdown_icon {
    width: 16px;
    height: 10px;
    margin-left: 6px;
    background: url("../../assets/images/icon_more@2x.png") center/cover;
    flex-shrink: 0;
  }
  .header {
    display: flex;
    position: relative;
    // padding: 0 30px;
    align-items: center;
    margin: 22px 44px 0;

    .spot {
      width: 6px;
      height: 6px;
      position: absolute;
      left: -14px;
      top: 14px;
      background: rgba(36, 175, 239, 1);
    }

    .header_left {
      height: 24px;
      font-weight: bold;
      line-height: 18px;
      color: #212121;
    }

    .header_center {
      height: 40px;
      font-size: 30px;
      font-weight: bold;
      line-height: 31px;
      color: #48a0dc;
    }

    .header_right {
      height: 24px;
      font-weight: bold;
      line-height: 18px;
      color: #6e6e6e;

      span:nth-child(2) {
        color: #ef9014;
      }
    }
  }

  .form_header {
    display: flex;
    height: 60px;
    font-weight: bold;
    line-height: 60px;
    color: #212121;
    margin: 8px 30px;
    padding-right: 20px;
    box-sizing: border-box;
    background: #f9f9f9;

    .wt {
      flex-grow: 1;
      padding-left: 16px;
    }

    .select {
      flex-shrink: 0;
      width: 120px;
      text-align: center;
    }
  }

  .form_list {
    display: flex;
    align-items: center;
    // width: 690px;
    height: 60px;
    background: #f9f9f9;
    border-radius: 6px;
    margin: 0 30px 8px;
    padding-left: 8px;
    padding-right: 20px;
    .select {
      flex-shrink: 0;
      width: 120px;
      text-align: center;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: center;
      padding: 0 15px;
      box-sizing: border-box;
      div:first-child {
        white-space: nowrap;
      }
    }
    .question {
      flex-grow: 1;
      height: 24px;
      font-weight: 400;
      line-height: 18px;
      color: #212121;
      margin-right: 12px;
    }
  }
}
</style>
<style lang="scss">
.adultQuestion {
  .qusetion_title {
    padding: 0 30px;
    box-sizing: border-box;
    p {
      font-size: 32px;
      text-align: center;
      font-weight: bold;
      color: #333;
      margin-bottom: 14px;
    }
    .score {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      margin-bottom: 20px;
      div {
        width: 140px;
        height: 40px;
        display: flex;
        background: #f2f2f2;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .question_case {
    position: fixed;
    left: 0;
    top: 100px;
    text-align: center;
    div {
      width: 40px;
      height: 100px;
      padding: 0 8px;
      box-sizing: border-box;
      background: #ddd;
      border: 1px solid #666;
      margin: 20px 0;
      display: flex;
      align-items: center;
    }
  }
  .van-dropdown-menu__bar {
    background-color: #f9f9f9;
    box-shadow: none;
    width: 78px;
  }

  .van-dropdown-menu__title {
    color: #212121;
  }

  .van-dropdown-menu__title::after {
    border: none;
    transform: none;
    opacity: 1;
    margin-top: 0;
    background: url(../../assets/image/icon_more@2x.png) no-repeat;
    background-size: contain;
    width: 10px;
    height: 6px;
    right: -8px;
  }
}

// dialog
.dialogModalForadultQuestion {
  display: flex;
  align-items: center;
  justify-content: center;
  .el-dialog {
    margin: unset !important;
    border-radius: 10px;
  }
  .el-dialog__header {
    padding: 0;
    text-align: center;
    margin-top: 34px;
  }
  .el-dialog__headerbtn {
    top: 10px;
    right: 10px;
    font-size: 24px;
  }
  .el-dialog__title {
    font-size: 24px;
    color: #333;
    font-weight: bold;
  }
  .options_case {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 18px;
    .chunk {
      width: 270px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      color: #212121;
    }
    .sign {
      color: #fff;
      background: url("../../assets/images/icon_login_bg@2x.png") center/cover;
    }
  }
}

.dialogQuestionTips {
  .titile {
    font-size: 32px;
    color: #333;
    font-weight: bold;
    margin: 24px auto 36px;
    text-align: center;
  }
  .money {
    font-size: 20px;
    color: #333;
    text-align: left;
    text-indent: 2em;
    margin-bottom: 30px;
    span {
      color: #fc3c3c;
      font-size: 52px;
    }
  }
  .btn {
    width: 190px;
    height: 40px;
    margin: 50px auto 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    background: linear-gradient(180deg, #64c9ff, #3173b7);
    color: #fff;
    font-size: 18px;
  }
  .img_case {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 50px;
    box-sizing: border-box;
    margin-top: 30px;
    .top {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;

      img {
        width: 30px;
        height: 30px;
        margin-right: 10px;
      }
    }
    .top:last-child {
      margin-left: 75px;
    }
    .qr {
      width: 100%;
      margin: 20px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 140px;
        height: 140px;
      }
    }
  }
  .img_case > div {
    flex: 1;
    padding: 20px 0;
    border: 1px solid #c1c1c1;
    box-sizing: border-box;
    background: #fff;
  }
  .img_case > div:last-child {
    margin-left: 75px;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  .el-dialog__body {
    padding: 0;
    background: #f9f9f9;
  }
  font-size: 18px;
  // .el-dialog__header {
  //   padding: 0;
  //   display: none;
  // }
  .el-dialog__title {
    padding: 0;
    display: none;
  }
  .el-dialog {
    width: calc(100% - 320px) !important;
    margin: unset !important;
    background: #f9f9f9;
    border-radius: 10px;
  }
  .el-icon-close:before {
    font-size: 30px;
  }
}
</style>
