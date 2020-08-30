<template>
  <div class="diagnosisReport">
    <div class="input_case">
      <div class="chunk">
        <div class="title">程度</div>
        <div class="ear">
          <i class="left_ear"></i>
          <div class="input_content">
            <div class="dropdown" @click="showDialog('degree','leftDegree')">
              <div v-if="form.leftDegree">{{formTitle.leftDegree}}</div>
              <div v-else>选择程度</div>
              <div class="dropdown_icon"></div>
            </div>
            <i class="drop_down"></i>
          </div>
        </div>
        <div class="ear">
          <i class="right_ear"></i>
          <div class="input_content">
            <div class="dropdown" @click="showDialog('degree','rightDegree')">
              <div v-if="form.rightDegree">{{formTitle.rightDegree}}</div>
              <div v-else>选择程度</div>
              <div class="dropdown_icon"></div>
            </div>
            <i class="drop_down"></i>
          </div>
        </div>
        <div></div>
      </div>
      <div class="chunk">
        <div class="title">性质</div>
        <div class="ear">
          <i class="left_ear"></i>
          <div class="input_content">
            <div class="dropdown" @click="showDialog('nature','leftNature')">
              <div v-if="form.leftNature">{{formTitle.leftNature}}</div>
              <div v-else>选择性质</div>
              <div class="dropdown_icon"></div>
            </div>
            <i class="drop_down"></i>
          </div>
        </div>
        <div class="ear">
          <i class="right_ear"></i>
          <div class="input_content">
            <div class="dropdown" @click="showDialog('nature','rightNature')">
              <div v-if="form.rightNature">{{formTitle.rightNature}}</div>
              <div v-else>选择性质</div>
              <div class="dropdown_icon"></div>
            </div>
            <i class="drop_down"></i>
          </div>
        </div>
        <div></div>
      </div>
      <div class="chunk">
        <div class="title">疾病</div>
        <div class="ear">
          <i class="left_ear"></i>
          <div class="input_content">
            <div class="dropdown" @click="showDialog('disease','leftDisease')">
              <div v-if="form.leftDisease">{{formTitle.leftDisease}}</div>
              <div v-else>选择疾病</div>
              <div class="dropdown_icon"></div>
            </div>
            <i class="drop_down"></i>
          </div>
        </div>
        <div class="ear">
          <i class="right_ear"></i>
          <div class="input_content">
            <div class="dropdown" @click="showDialog('disease','rightDisease')">
              <div v-if="form.rightDisease">{{formTitle.rightDisease}}</div>
              <div v-else>选择疾病</div>
              <div class="dropdown_icon"></div>
            </div>
            <i class="drop_down"></i>
          </div>
        </div>
        <div></div>
      </div>
      <div class="chunk">
        <div class="title">合并症状</div>
        <div class="ear">
          <i class="left_ear"></i>
          <el-checkbox-group size="large" v-model="form.leftComplication">
            <el-checkbox label="1">重振</el-checkbox>
            <el-checkbox label="2">听觉过敏</el-checkbox>
            <el-checkbox label="3">耳鸣</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="ear">
          <i class="right_ear"></i>
          <el-checkbox-group size="large" v-model="form.rightComplication">
            <el-checkbox label="1">重振</el-checkbox>
            <el-checkbox label="2">听觉过敏</el-checkbox>
            <el-checkbox label="3">耳鸣</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <div class="echarts_case">
      <div>
        <div class="echart1"></div>
        <p>言语识别率(%)</p>
      </div>
      <div>
        <div class="echart2"></div>
        <p>竞争性环境言语识别率(%)</p>
      </div>
      <div>
        <div class="echart3"></div>
        <p>视觉代偿率(%)</p>
      </div>
      <div>
        <div class="echart4"></div>
        <p>整体反应能力下降率(%)</p>
      </div>
    </div>
    <div class="tips_content">
      <span class="tips">影响听力康复的提示</span>
      <table class="content">
        <tr>
          <td class="name">特殊听力损失情况</td>
          <td class="checkbox">
            <el-checkbox-group size="large" v-model="form.hearingLoss">
              <el-checkbox label="1">听力损失非对称性</el-checkbox>
              <el-checkbox label="2">言语分辨力明显下降</el-checkbox>
              <el-checkbox label="3">突发性听力损失</el-checkbox>
              <el-checkbox label="4">陡降型听力损失</el-checkbox>
              <el-checkbox label="5">大声音明显不耐受</el-checkbox>
              <el-checkbox label="6">波动性听力下降</el-checkbox>
              <el-checkbox label="7">一侧耳已经无法由助听器获得帮助</el-checkbox>
            </el-checkbox-group>
          </td>
        </tr>
        <tr>
          <td class="name">影响操作及佩戴的情况</td>
          <td>
            <el-checkbox-group size="large" v-model="form.impactSituation">
              <el-checkbox label="1">视力障碍</el-checkbox>
              <el-checkbox label="2">手灵活性差</el-checkbox>
              <el-checkbox label="3">戴眼镜</el-checkbox>
              <el-checkbox label="4">易出汗</el-checkbox>
            </el-checkbox-group>
          </td>
        </tr>
        <tr>
          <td class="name">其他与听力康复相关情况</td>
          <td>
            <el-checkbox-group size="large" v-model="form.otherSituation">
              <el-checkbox label="1">认知障碍</el-checkbox>
              <el-checkbox label="2">情绪障碍</el-checkbox>
            </el-checkbox-group>
          </td>
        </tr>
        <tr>
          <td class="name">听觉改善主观意愿及配合度</td>
          <td class="by_ten_case">
            <div class="by_ten">
              <div class="col">抵触</div>
              <div class="center">
                <div :class="form.coordination == 1 ? 'sign' :''" @click="changeNum(1)">1</div>
                <div :class="form.coordination == 2 ? 'sign' :''" @click="changeNum(2)">2</div>
                <div :class="form.coordination == 3 ? 'sign' :''" @click="changeNum(3)">3</div>
                <div :class="form.coordination == 4 ? 'sign' :''" @click="changeNum(4)">4</div>
                <div :class="form.coordination == 5 ? 'sign' :''" @click="changeNum(5)">5</div>
                <div :class="form.coordination == 6 ? 'sign' :''" @click="changeNum(6)">6</div>
                <div :class="form.coordination == 7 ? 'sign' :''" @click="changeNum(7)">7</div>
                <div :class="form.coordination == 8 ? 'sign' :''" @click="changeNum(8)">8</div>
                <div :class="form.coordination == 9 ? 'sign' :''" @click="changeNum(9)">9</div>
                <div :class="form.coordination == 10 ? 'sign' :''" @click="changeNum(10)">10</div>
              </div>
              <div class="col">愿意</div>
            </div>
          </td>
        </tr>
        <tr>
          <td class="name">主要交流对象</td>
          <td>
            <el-checkbox-group size="large" v-model="form.mainTalker">
              <el-checkbox label="1" style="width:60px">家人</el-checkbox>
              <el-checkbox label="2" style="width:60px">朋友</el-checkbox>
              <el-checkbox label="3" style="width:60px">同事</el-checkbox>
            </el-checkbox-group>
          </td>
        </tr>
      </table>
    </div>
    <div class="pos_case" @click="submit"></div>
    <el-dialog title="提示" :visible.sync="dialogVisible" class="dialogModal" width="500px">
      <div class="options_case">
        <div
          v-for="(item, index) in dialogDataList"
          :key="index"
          class="chunk"
          :class="item.value == dialogData ? 'sign' : ''"
          @click="chooseData(item)"
        >{{item.title}}</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from "../../api/api";

export default {
  data() {
    return {
      numVal: -1,
      userInfo: {
        type: [],
      },
      recordId: "",
      dialogDataList: [],
      visualRatio: {},
      responseDecreased: {},
      dialogVisible: false,
      //0-听力正常，1-轻微听力损失，2-轻度听力损失，3-中度听力损失，4-中等重度听力损失,5-重度听力损失,6-极度听力损失
      chooseList: {
        degree: [
          {
            title: "听力正常",
            value: "0",
          },
          
          {
            title: "轻度听力损失",
            value: "2",
          },
          {
            title: "中度听力损失",
            value: "3",
          },
          
          {
            title: "重度听力损失",
            value: "5",
          },
          {
            title: "极度听力损失",
            value: "6",
          },
        ],
        // 1-传导性，2-感应神经性，3-混合性
        nature: [
          {
            title: "传导性",
            value: "1",
          },
          {
            title: "感应神经性",
            value: "2",
          },
          {
            title: "混合性",
            value: "3",
          },
        ],
        // 1传导性，2-中耳畸形，3-中耳炎，4-耳硬化症，5感应神经性，6-内耳畸形,7-药物性,8-突发性，9-老年性，10-梅尼埃病，11混合性
        disease: [
         
          {
            title: "中耳畸形",
            value: "2",
          },
          {
            title: "中耳炎",
            value: "3",
          },
          {
            title: "耳硬化症",
            value: "4",
          },
          
          {
            title: "内耳畸形",
            value: "6",
          },
          {
            title: "药物性",
            value: "7",
          },
          {
            title: "突发性",
            value: "8",
          },
          {
            title: "老年性",
            value: "9",
          },
          {
            title: "突发性",
            value: "10",
          },
          {
            title: "梅尼埃病",
            value: "11",
          },
          
        ],
      },
      dialogData: "",
      checkFormParam: "",
      form: {
        recordId: localStorage.getItem("recordId"),
        leftDegree: "",
        rightDegree: "",
        leftNature: "",
        rightNature: "",
        leftDisease: "",
        rightDisease: "",
        leftComplication: [],
        rightComplication: [],
        speechRecognitionRate: 0,
        environmentalSpeechRecognitionRate: 0,
        visualCompensationRate: 0,
        overallDeclineRate: 0,
        hearingLoss: [],
        impactSituation: [],
        otherSituation: [],
        coordination: "",
        mainTalker: [],
      },
      formTitle: {
        rightComplication: "",
        leftDegree: "",
        rightDegree: "",
        leftNature: "",
        rightNature: "",
        leftDisease: "",
        rightDisease: "",
        leftComplication: "",
        speechRecognitionRate: "",
        environmentalSpeechRecognitionRate: "",
        visualCompensationRate: "",
        overallDeclineRate: "",
        hearingLoss: "",
        impactSituation: "",
        otherSituation: "",
        coordination: "",
        mainTalker: "",
      },
      noVisual: 0,
    };
  },
  computed: {},
  created() {
    this.recordId = localStorage.getItem("recordId");
    this.init();
    this.getInfo();
  },
  methods: {
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
            this.visualRatio =
              parseFloat(res.data.data.visual) -
              parseFloat(res.data.data.noVisual);
            var arr = this.formatData(this.visualRatio);
            this.chart(".echart3", arr);
            // 获取整体反应下降率-2.0
            api
              .postFormAPI("checkWords/responseDecreased", {
                recordId: this.recordId,
                type: "3",
                sid: localStorage.getItem("sid"),
              })
              .then((res) => {
                if (res.data.result == "1") {
                  this.responseDecreased =
                    parseFloat((res.data.data.advantage / 120) * 100) -
                    parseInt(noVisual);
                  var arr1 = this.formatData(
                    this.responseDecreased.toFixed("2")
                  );
                  this.chart(".echart4", arr1);
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
            var arr = this.formatData(res.data.data.accuracyrate);
            this.chart(".echart1", arr);
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
            var arr = this.formatData(res.data.data.accuracyrate);
            this.chart(".echart2", arr);
          }
        })
        .catch((err) => console.log(err));
    },
    // 选中关系
    chooseData(e) {
      this.dialogData = e.value;
      this.formTitle[this.checkFormParam] = e.title;
      this.form[this.checkFormParam] = e.value;
      this.dialogVisible = false;
    },
    showDialog(e, d) {
      this.dialogVisible = true;
      this.dialogDataList = this.chooseList[e];
      this.checkFormParam = d;
    },
    chart(e, d) {
      var dom = document.querySelector(e);
      var echarts = this.$echarts.init(dom);
      var option = {
        title: {
          // text: "某站点用户访问来源",
          // subtext: "纯属虚构",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        color: ["#FFE01E", "#4A9FDE"],
        series: [
          {
            name: "",
            type: "pie",
            // radius: "55%",
            center: ["50%", "60%"],
            label: {
              normal: {
                show: true,
                position: "inner",
              },
            },
            data: [
              {
                value: Number(d[0]),
                name: Number(d[0]) + "%",
              },
              {
                value: Number(d[1]),
                name: Number(d[1]) + "%",
              },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      echarts.setOption(option);
    },
    formatData(d) {
      var arr = [];
      var diff = 100 - parseFloat(d);
      arr.push(parseFloat(d));
      arr.push(parseFloat(diff));
      return arr;
    },
    changeNum(e) {
      // this.numVal = e;
      this.form.coordination = e;
    },
    getInfo() {
      api
        .postFormAPI("patientDiareport/getInfo", {
          recordId: this.recordId,
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.result == "1") {
            const data = res.data.data;
            for (let key in this.form) {
              // if (typeof this.form[key] == "object") {
              //   if (data.hasOwnProperty(key)) {
              //     this.form[key] = data[key].split(",");
              //   }
              // } else {
              //   if (data.hasOwnProperty(key)) {
              //     this.form[key] = data[key];
              //   }
              // }
              if (data.hasOwnProperty(key)) {
                this.form[key] = data[key];
              }
              if (
                key == "mainTalker" ||
                key == "hearingLoss" ||
                key == "impactSituation" ||
                key == "otherSituation" ||
                key == "leftComplication" ||
                key == "rightComplication"
              ) {
                if (data[key] != null) {
                  this.form[key] = data[key].split(",");
                } else {
                  this.form[key] = [];
                }
              }
              if (key == "leftDegree" || key == "rightDegree") {
                this.chooseList.degree.forEach((el) => {
                  if (data[key] == el.value) {
                    this.formTitle[key] = el.title;
                  }
                });
              }
              if (key == "leftNature" || key == "rightNature") {
                this.chooseList.nature.forEach((el) => {
                  if (data[key] == el.value) {
                    this.formTitle[key] = el.title;
                  }
                });
              }
              if (key == "leftDisease" || key == "rightDisease") {
                this.chooseList.disease.forEach((el) => {
                  if (data[key] == el.value) {
                    this.formTitle[key] = el.title;
                  }
                });
              }
            }
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    submit() {
      let form = JSON.parse(JSON.stringify(this.form));
      form.leftComplication = this.form.leftComplication.join(",");
      form.rightComplication = this.form.rightComplication.join(",");
      form.hearingLoss = this.form.hearingLoss.join(",");
      form.impactSituation = this.form.impactSituation.join(",");
      form.otherSituation = this.form.otherSituation.join(",");
      form.mainTalker = this.form.mainTalker.join(",");
      form.sid = localStorage.getItem("sid");
      api
        .postFormAPI("patientDiareport/submit", form)
        .then((res) => {
          if (res.data.result == "1") {
            this.$notify({
              message: res.data.message,
              showClose: false,
              // onClose(res) {
              //   location.reload();
              // },
              duration: 2000,
            });
            // this.$router.push({
            //   path: "/diareportReport",
            // });
            this.nativeCall({ index: 0 }, "diagnosisReport");
            this.nativeCall({ index: 11 }, "updateStep");
          } else {
            this.$notify({
              message: res.data.message,
              showClose: false,
              duration: 2000,
            });
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    nativeCall(param, nativeMethodName) {
      // param = this.queryParams(param);
      // document.location = "js://" + nativeMethodName + "?" + param;
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
      return _result.length ? prefix + _result.join("&") : "";
    },
  },
  components: {},
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.diagnosisReport {
  width: 100%;
  padding: 0 24px;
  box-sizing: border-box;
  padding-top: 1px;
  font-size: 16px;
  .input_case {
    margin-top: 14px;
    padding: 20px;
    box-sizing: border-box;
    background: #f9f9f9;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    .chunk {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 20px;
      .title {
        width: 80px;
        text-align-last: justify;
      }
      .ear {
        width: calc(calc(100% - 140px) / 2);
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 30px;
        .left_ear {
          width: 14px;
          height: 20px;
          display: block;
          flex-shrink: 0;
          background: url("../../assets/image/icon_ears_left@2x.png")
            center/cover;
        }
        .right_ear {
          width: 14px;
          height: 20px;
          flex-shrink: 0;
          display: block;
          background: url("../../assets/image/icon_ears_right@2x.png")
            center/cover;
        }
        .drop_down {
          position: absolute;
          right: 10px;
          top: 0;
          bottom: 0;
          margin: auto;
          width: 16px;
          height: 10px;
          flex-shrink: 0;
          display: block;
          background: url("../../assets/image/icon_more@2x.png") center/cover;
        }
        .input_content {
          margin-left: 10px;
          flex-grow: 1;
          background: #fff;
          height: 40px;
          position: relative;
          line-height: 40px;
          padding: 0 10px;
          box-sizing: border-box;
        }
      }
    }
    .chunk:first-child {
      margin-top: unset;
    }
  }
  .echarts_case {
    width: 100%;
    height: 130px;
    display: flex;
  }
  .echarts_case > div {
    flex: 1;
    height: 100%;
    div {
      height: 100px;
    }
    p {
      height: 30px;
      text-align: center;
      line-height: 30px;
    }
  }
  .tips_content {
    margin-top: 14px;
    width: 100%;
    box-sizing: border-box;
    background: #f9f9f9;
    color: #212121;
    .tips {
      display: inline-block;
      background: #ebf2f5;
      color: #5091c7;
      font-weight: bold;
      padding: 10px;
      box-sizing: border-box;
      border-bottom-right-radius: 6px;
    }
    .content {
      padding: 20px;
      padding-top: 0px;
      box-sizing: border-box;
      .name {
        width: 230px;
        flex-shrink: 0;
      }
      tr {
        padding: 15px 0 0;
        display: flex;
      }
    }
    .by_ten_case {
      flex-grow: 1;
      .by_ten {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-right: 30px;
        box-sizing: border-box;
        .col {
          color: #74bcee;
        }
        .center {
          display: flex;
          flex-grow: 1;
          padding: 0 20px;
          justify-content: space-around;
          div {
            width: 20px;
            height: 20px;
            border-radius: 10px;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
          }
          .sign {
            background: #74bcee;
            color: #fff;
          }
        }
      }
    }
  }
  .dialogModal {
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
      font-size: 16px;
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
  .pos_case {
    position: fixed;
    right: 18px;
    bottom: 27px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: url("../../assets/image/btn/icon_btn_save@2x.png") no-repeat
      center/contain;
  }
}
</style>
<style lang="scss">
.diagnosisReport .ear .el-checkbox-group {
  margin-left: 10px;
  .el-checkbox {
    margin: 3px 10px 3px 0;
    width: auto;
  }
}

.diagnosisReport .tips_content .el-checkbox__label {
  color: #646464;
}
.diagnosisReport .el-checkbox {
  width: 180px;
  margin-bottom: 6px;
}
</style>
