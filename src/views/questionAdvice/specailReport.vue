<template>
  <div class="specailReport">
    <p class="title">患者导向的听觉改善分级问卷(COSI)声景选择</p>
    <table>
      <tr>
        <td style="width:30%;">选配助听器前使用者提出五个最需要解决的问题</td>
        <td style="width:24%;">针对这些问题的改善程度</td>
        <td style="width:46%;">针对提出的问题在使用助听器后最终的听觉能力</td>
      </tr>
      <tr v-for="(item, index) in dataGather" :key="index">
        <td @click="showOption(index,0)">
          <p v-if="item.questions">{{relationships[0][item.questions-1].val}}</p>
          <img src="../../assets/image/icon_more@2x.png" alt />
        </td>
        <td @click="showOption(index,1)">
          <p v-if="item.degreeImprovement">{{relationships[1][item.degreeImprovement-1].val}}</p>
          <img src="../../assets/image/icon_more@2x.png" alt />
        </td>
        <td @click="showOption(index,2)">
          <p v-if="item.result">{{relationships[2][item.result-1].val}}</p>
          <img src="../../assets/image/icon_more@2x.png" alt />
        </td>
      </tr>
      <tr>
        <td>总分</td>
        <td>{{degreeImprovementVal}}分</td>
        <td>{{resultVal}}分</td>
      </tr>
    </table>

    <el-dialog
      title="提示"
      :visible.sync="dialogQuestionTips"
      class="dialogQuestionTips"
      width="500px"
    >
      <div class="options_case">
        <p class="titile">{{dialogQuestionTipsTitle}}</p>
        <p class="money" v-html="diologConttent"></p>
      </div>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisibleOption"
      class="dialogVisibleOption"
      width="500px"
    >
      <div
        class="options_case"
        :class="relationshipsVal == 0 ? 'sign1' : relationshipsVal == 1 ? 'sign2': 'sign3'"
      >
        <div
          v-for="(item, index) in relationships[relationshipsVal]"
          :key="index"
          class="chunk"
          :class="index == relation_sign ? 'sign' : ''"
          @click="choiseRelation(index)"
        >{{item.val}}</div>
      </div>
    </el-dialog>

    <div class="question_case">
      <div @click="showDialogTips('title','使用说明')">使用说明</div>
      <div @click="showDialogTips('analysisTitle','结果说明')">结果说明</div>
    </div>

    <div class="pos_case">
      <div class="print_btn" @click="print" v-if="showBtn"></div>
      <div class="back_btn" @click="returnBack" v-if="showBtn"></div>
      <div class="save_btn" @click="submit" v-if="showBtn"></div>
    </div>
  </div>
</template>

<script>
import api from "../../api/api";

export default {
  data() {
    return {
      showBtn: true,
      dialogQuestionTips: false,
      dialogQuestionTipsTitle: "",
      degreeImprovementVal: "0",
      resultVal: "0",
      diologConttent: "",
      form: {
        resource: "",
      },
      dataGather: [
        {
          id: 1,
          questions: "",
          degreeImprovement: "",
          result: "",
        },
        {
          id: 2,
          questions: "",
          degreeImprovement: "",
          result: "",
        },
        {
          id: 3,
          questions: "",
          degreeImprovement: "",
          result: "",
        },
        {
          id: 4,
          questions: "",
          degreeImprovement: "",
          result: "",
        },
        {
          id: 5,
          questions: "",
          degreeImprovement: "",
          result: "",
        },
      ],
      dialogVisibleOption: false,
      relationships: [
        [
          { val: "学校" },
          { val: "运动场" },
          { val: "汽车中" },
          { val: "餐厅" },
          { val: "火车站" },
          { val: "商场超市" },
          { val: "酒吧" },
          { val: "会议室" },
          { val: "嘈杂广场" },
          { val: "户外" },
          { val: "宴会厅" },
          { val: "手机/电视" },
          { val: "礼堂" },
          { val: "幼儿园" },
          { val: "繁华的马路" },
          { val: "公园" },
          { val: "影剧院" },
          { val: "工厂/车间" },
          { val: "家庭" },
          { val: "飞机场" },
        ],
        [
          { val: "更差：1分" },
          { val: "没什么不同：2分" },
          { val: "有一点帮助：3分" },
          { val: "比较好：4分" },
          { val: "非常好：5分" },
        ],
        [
          { val: "使用助听器后有10%的时候可以改善：1分" },
          { val: "使用助听器后有25%的时候可以改善：2分" },
          { val: "使用助听器后有50%的时候可以改善：3分" },
          { val: "使用助听器后有75%的时候可以改善：4分" },
          { val: "使用助听器后有95%的时候可以改善：5分" },
        ],
      ],
      relation_sign: -1,
      relationshipsVal: 0,
      changeIndex: "",
      // 使用说明，结果说明
      allData: {
        title: `<table>
      <tr>
        <td style="text-align:left;line-height:32px;color:#212121;">
          <p>使用参考：</p>
          <p>1.针对最初提出的五个问题说明使用助听器之后比使用助听器之前改善的效果，以及最终达到的能力</p>
          <p>2.应用步骤</p>
          <p style="padding-left: 3em;">初诊：（验配师提问、记录/使用者填写）</p>
          <p style="padding-left: 6em;">登记使用者信息</p>
          <p style="padding-left: 6em;">让使用者提出5个最想解决的问题，并按需要程度排列</p>
          <p style="padding-left: 3em;">复诊：针对初诊提出的5个问题，评价改善程度和现在达到的听觉能力</p>
          <p style="padding-left: 6em;">针对个别问题进行深入咨询和分析</p>
          <p style="padding-left: 6em;">调整助听器/进行相关测试（真耳分析、助听听阈、言语测试）</p>
        </td>
      </tr>
    </table>`,
        analysisTitle: `
        <table>
      <tr>
        <td colspan="3" style="text-align:left">3.COSI问卷中问题提出频率统计</td>
      </tr>
      <tr>
        <td>问题</td>
        <td>提出次数</td>
        <td>百分比（%）</td>
      </tr>
      <tr>
        <td>打电话</td>
        <td>29</td>
        <td>96.7</td>
      </tr>
      <tr>
        <td>在安静环境同1到2人说话</td>
        <td>28</td>
        <td>93.3</td>
      </tr>
      <tr>
        <td>听电视或收音机声音</td>
        <td>27</td>
        <td>90</td>
      </tr>
      <tr>
        <td>在噪声环境同1到2人说话</td>
        <td>24</td>
        <td>80</td>
      </tr>
      <tr>
        <td>在噪声环境同多人说话</td>
        <td>15</td>
        <td>50</td>
      </tr>
      <tr>
        <td>社会交流</td>
        <td>15</td>
        <td>50</td>
      </tr>
      <tr>
        <td>在安静环境同多人说话</td>
        <td>8</td>
        <td>26.7</td>
      </tr>
      <tr>
        <td>其他</td>
        <td>4</td>
        <td>13.3</td>
      </tr>
    </table>`,
      },
    };
  },
  watch: {
    dataGather: {
      handler(val) {
        // console.log(val);
        var degreeImprovementVal = 0;
        var resultVal = 0;
        val.forEach((item, index) => {
          degreeImprovementVal += Number(item.degreeImprovement);
          resultVal += Number(item.result);
        });
        this.degreeImprovementVal = degreeImprovementVal;
        this.resultVal = resultVal;
      },
      deep: true,
    },
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    returnBack() {
      this.$router.go(-1);
    },
    showOption(index, id) {
      this.relationshipsVal = id;
      this.changeIndex = index;
      this.dialogVisibleOption = true;
    },
    // 选中关系
    choiseRelation(e) {
      // css
      this.relation_sign = e;

      // val
      var num = e + 1;
      var val = this.relationships[this.relationshipsVal][e].val;

      if (this.relationshipsVal == 0) {
        this.dataGather[this.changeIndex].questions = num;
        this.dataGather[this.changeIndex].val1 = val;
      } else if (this.relationshipsVal == 1) {
        this.dataGather[this.changeIndex].degreeImprovement = num;
        this.dataGather[this.changeIndex].val2 = val;
      } else {
        this.dataGather[this.changeIndex].result = num;
        this.dataGather[this.changeIndex].val3 = val;
      }
      this.dialogVisibleOption = false;
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
    init() {
      api
        .postFormAPI("checkWords/improvementReportInfo", {
          sid: localStorage.getItem("sid"),
          recordId: localStorage.getItem("recordId"),
        })
        .then((res) => {
          if (res.data.result != 1) {
            return;
          }
          const data = res.data.data;
          if (data && data.id) {
            data.questions = data.questions.split(",");
            data.degreeImprovement = data.degreeImprovement.split(",");
            data.result = data.result.split(",");
            this.dataGather.forEach((item, i) => {
              item.questions = data.questions[i];
              item.degreeImprovement = data.degreeImprovement[i];
              item.result = data.result[i];
            });
            this.dataGather.sort((a) => a);
            console.log(this.dataGather);
          }
        })
        .catch((err) => console.log(err));
    },
    showDialogTips(e, title) {
      this.dialogQuestionTipsTitle = title;
      this.diologConttent = this.allData[e];
      this.dialogQuestionTips = true;
    },
    submit() {
      var result = true;
      this.dataGather.forEach((item, index) => {
        for (var key in item) {
          if (item[key] == "") {
            result = false;
          }
        }
      });
      if (!result) {
        this.$notify({
          message: "请完善问卷",
        });
        return false;
      }
      var questions = this.dataGather.map((a) => a.questions).join(",");
      var degreeImprovement = this.dataGather
        .map((a) => a.degreeImprovement)
        .join(",");
      var result = this.dataGather.map((a) => a.result).join(",");

      var row = {
        sid: localStorage.getItem("sid"),
        recordId: localStorage.getItem("recordId"),
        questions: questions,
        degreeImprovement: degreeImprovement,
        result: result,
      };
      api
        .postFormAPI("checkWords/improvementReport", row)
        .then((res) => {
          if (res.data.result == "1") {
            localStorage.setItem("specailReport", "1");
            this.$notify({
              message: res.data.message,
            });
            this.nativeCall({ index: 13 }, "updateStep");
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    print() {
      this.showBtn = false;
      this.nativeCall(
        {
          url: process.env.VUE_APP_ONLINEURL + "/specailReport",
        },
        "printContentForUrl"
      );
    },
  },
  components: {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.specailReport {
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
  font-size: 16px;
  width: 100%;
  background: #fff;
  padding: 0 30px 30px;
  margin-top: 46px;
  box-sizing: border-box;
  min-height: 100vh;
  .title {
    font-size: 34px;
    color: #212121;
    text-align: center;
    font-weight: bold;
  }
  table {
    margin-top: 40px;
    border-collapse: collapse;
    width: 100%;
    & tr:first-child td {
      text-align: center;
    }
    tr,
    td {
      border: 1px solid #ddd;
      height: 30px;
      padding: 10px;
      .el-checkbox-group {
        font-size: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
    }
  }
  .pos_case {
    position: fixed;
    right: 18px;
    bottom: 27px;
    display: flex;
    flex-direction: column;
    .print_btn,
    .back_btn,
    .save_btn {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: url("../../assets/image/btn/icon_btn_print@2x.png") no-repeat
        center/contain;
    }
    .back_btn {
      background: url("../../assets/image/btn/icon_btn_back@2x.png") no-repeat
        center/contain;
    }
    .save_btn {
      background: url("../../assets/image/btn/icon_btn_save@2x.png") no-repeat
        center/contain;
    }
  }
}
</style>
<style lang="scss">
.specailReport {
  .el-radio-group {
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .el-radio {
    margin-right: unset;
    margin: 14px 0;
  }
  td:first-child {
    .el-radio {
      width: calc(100% / 3);
    }
  }
  tr:not(:first-child) {
    width: 100%;
    align-items: center;
    flex-direction: row;
    td {
      text-align: center;
      p {
        display: inline-block;
      }
      img {
        width: 20px;
        height: 12px;
        float: right;
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
      margin-bottom: 30px;
      padding: 0 40px 40px;
      box-sizing: border-box;
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
    font-size: 16px;
    // .el-dialog__header {
    //   padding: 0;
    //   display: none;
    // }
    .el-dialog__title {
      padding: 0;
      display: none;
    }
    .el-dialog {
      width: calc(100% - 100px) !important;
      margin: unset !important;
      background: #f9f9f9;
      border-radius: 10px;
      table {
        margin-top: 40px;
        border-collapse: collapse;
        width: 100%;
        tr,
        td {
          border: 1px solid #ddd;
          text-align: center;
          height: 30px;
          padding: 10px;
        }
      }
    }
    .el-icon-close:before {
      font-size: 30px;
    }
  }
  .el-radio,
  .el-radio__input {
    white-space: normal;
  }
}

// dialog
.dialogVisibleOption {
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
    font-size: 3px;
  }
  .el-dialog__title {
    font-size: 30px;
    color: #333;
    font-weight: bold;
  }
  .options_case {
    display: flex;
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
      border-radius: 30px;
      background: url("../../assets/images/icon_login_bg@2x.png") center/cover;
    }
  }
  .sign1 {
    flex-direction: row;
    flex-wrap: wrap;
    .chunk {
      width: 50%;
      flex-shrink: 0;
    }
  }
  .sign2 {
    flex-direction: column;
    .chunk {
      width: 60%;
    }
  }
  .sign3 {
    flex-direction: column;
    .chunk {
      width: 100%;
    }
  }
}
</style>

