<template>
  <div class="adultQuestion">
    <div class="header">
      <div class="spot"></div>
      <div class="header_left">根据您的回答，您的听力损失概率为：</div>
      <div class="header_center">{{score}}</div>
      <div class="header_right">
        <span>（ 陪同</span>
        <span>{{reconfirm}}</span>
        <span>）</span>
      </div>
    </div>
    <div class="form">
      <div class="form_header">
        <div class="wt">问题</div>
        <div class="select">本人</div>
        <div class="select">陪同</div>
      </div>
      <van-form>
        <div class="form_list" v-for="(item,index) in question" :key="index">
          <div
            style="width:100%;display: flex;align-items: center;padding-left:8px;"
            v-if="item.type == 1"
          >
            <div class="question">{{item.desc}}</div>
            <div class="select" @click="showDialog(index,'left')">
              <div>{{item.answer==item.options[0].option?item.options[0].title:(item.answer==item.options[1].option?item.options[1].title:(item.answer==item.options[2].option?item.options[2].title:"--"))}}</div>
              <div class="dropdown_icon"></div>
            </div>
            <div class="select" v-if="item.reconfirm == 1" @click="showDialog(index, 'right')">
              <div>{{item.reconfirmAnswer==item.options[0].option?item.options[0].title:(item.reconfirmAnswer==item.options[1].option?item.options[1].title:(item.reconfirmAnswer==item.options[2].option?item.options[2].title:"--"))}}</div>
              <div class="dropdown_icon"></div>
            </div>
          </div>
        </div>
      </van-form>
    </div>
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
  </div>
</template>

<script>
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
      totalScore: 0,
      scoreRange: [],
      scoreResult: [],
    };
  },
  created() {
    this.recordId = localStorage.getItem("recordId");
    var age = 7;
    if (age <= 7) {
      this.init();
    } else {
      this.$router.replace("childQuestion");
    }
  },
  watch: {
    question: {
      handler(newVal) {
        this.score = 0;
        this.reconfirm = 0;
        newVal.forEach((item) => {
          if (item.score) {
            this.score += Number(item.score);
          }
          if (item.reconfirmScore) {
            this.reconfirm += Number(item.reconfirmScore);
          }
        });
        // this.score = Math.round((this.score / this.totalScore) * 100) + "%";
        // this.reconfirm =
        //   Math.round((this.reconfirm / this.totalScore) * 100) + "%";

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
    // 选中关系
    choiseRelation(e) {
      var whiciList = this.questionShowIndex;
      if (this.whichWay == "left") {
        this.$set(this.question[whiciList], "option1", "");
        this.$set(
          this.question[whiciList],
          "option1",
          this.question[whiciList].options[e].option
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
        this.$set(
          this.question[whiciList],
          "option2",
          this.question[whiciList].options[e].option
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
        .postFormAPI("patientTestpaper/getPaperListByStep", {
          recordId: this.recordId,
          processKey: "health_questionnaire_adult",
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.result == "1") {
            this.question = res.data.data[0].questionList;
            this.id = res.data.data[0].id;
            const analysis = res.data.data[0].analysis;

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
        this.answer.length == this.question.length &&
        this.reconfirmAnswer.length == this.question.length
      ) {
        this.saveApi();
      } else {
        this.$notify({
          message: "问卷全部填写完毕才可提交！",
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
          if (res.data.result != "1") {
            return;
          }
          this.$notify({
            message: res.data.message,
          });
          //数据处理
          this.nativeCall({ index: 3 }, "updateStep");
        })
        .catch((err) => console.log(err));
    },
    nativeCall(param, nativeMethodName) {
      // console.log(param);
      // console.log(nativeMethodName);
      param = this.queryParams(param);
      // console.log(param);

      document.location = "js://" + nativeMethodName + "?" + param;
    },
    queryParams(data, isPrefix = false) {
      console.log(data);
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
  },
  components: {
    SaveButton,
  },
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.adultQuestion {
  .dropdown_icon {
    width: 16px;
    height: 10px;
    background: url("../../assets/images/icon_more@2x.png") center/cover;
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
    margin: 26px 30px;
    padding-right: 20px;
    box-sizing: border-box;
    background: #f9f9f9;
    .wt {
      flex-grow: 1;
      padding-left: 16px;
    }

    .select {
      width: 86px;
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
    margin: 0 30px 14px;
    padding-left: 8px;
    padding-right: 20px;
    .select {
      width: 86px;
      text-align: center;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
      padding: 0 15px;
      box-sizing: border-box;
    }
    .question {
      flex-grow: 1;
      height: 24px;
      font-weight: 400;
      line-height: 18px;
      color: #212121;
    }
  }
}
</style>
<style lang="scss">
.adultQuestion {
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
</style>
