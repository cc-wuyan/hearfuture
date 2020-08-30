<template>
  <div class="healthyProgram">
    <div class="tips_content">
      <span class="tips">影响听力康复的提示</span>
      <div class="input_case">
        <div class="chunk">
          <div class="title">类型</div>
          <div class="ear">
            <i class="left_ear"></i>
            <div class="input_content">
              <div class="dropdown" @click="showDialog('model','leftType')">
                <div v-if="form.leftType">{{formTitle.leftType}}</div>
                <div v-else>选择数据</div>
                <div class="dropdown_icon"></div>
              </div>
              <i class="drop_down"></i>
            </div>
          </div>
          <div class="ear">
            <i class="right_ear"></i>
            <div class="input_content">
              <div class="dropdown" @click="showDialog('model','rightType')">
                <div v-if="form.rightType">{{formTitle.rightType}}</div>
                <div v-else>选择数据</div>
                <div class="dropdown_icon"></div>
              </div>
              <i class="drop_down"></i>
            </div>
          </div>
          <div></div>
        </div>
        <div class="chunk">
          <div class="title">性能</div>
          <div class="ear">
            <i class="left_ear"></i>
            <div class="input_content">
              <div class="dropdown" @click="showDialog('function','leftFunction')">
                <div v-if="form.leftFunction">{{formTitle.leftFunction}}</div>
                <div v-else>选择数据</div>
                <div class="dropdown_icon"></div>
              </div>
              <i class="drop_down"></i>
            </div>
          </div>
          <div class="ear">
            <i class="right_ear"></i>
            <div class="input_content">
              <div class="dropdown" @click="showDialog('function','rightFunction')">
                <div v-if="form.rightFunction">{{formTitle.rightFunction}}</div>
                <div v-else>选择数据</div>
                <div class="dropdown_icon"></div>
              </div>
              <i class="drop_down"></i>
            </div>
          </div>
          <div></div>
        </div>
        <div class="chunk">
          <div class="title">功率</div>
          <div class="ear">
            <i class="left_ear"></i>
            <div class="input_content">
              <div class="dropdown" @click="showDialog('power','leftPower')">
                <div v-if="form.leftPower">{{formTitle.leftPower}}</div>
                <div v-else>选择数据</div>
                <div class="dropdown_icon"></div>
              </div>
              <i class="drop_down"></i>
            </div>
          </div>
          <div class="ear">
            <i class="right_ear"></i>
            <div class="input_content">
              <div class="dropdown" @click="showDialog('power','rightPower')">
                <div v-if="form.rightPower">{{formTitle.rightPower}}</div>
                <div v-else>选择数据</div>
                <div class="dropdown_icon"></div>
              </div>
              <i class="drop_down"></i>
            </div>
          </div>
          <div></div>
        </div>
        <div class="chunk">
          <div class="title">外观</div>
          <div class="ear">
            <i class="left_ear"></i>
            <div class="input_content">
              <div class="dropdown" @click="showDialog('appearance','leftAppearance')">
                <div v-if="form.leftAppearance">{{formTitle.leftAppearance}}</div>
                <div v-else>选择数据</div>
                <div class="dropdown_icon"></div>
              </div>
              <i class="drop_down"></i>
            </div>
          </div>
          <div class="ear">
            <i class="right_ear"></i>
            <div class="input_content">
              <div class="dropdown" @click="showDialog('appearance','rightAppearance')">
                <div v-if="form.rightAppearance">{{formTitle.rightAppearance}}</div>
                <div v-else>选择数据</div>
                <div class="dropdown_icon"></div>
              </div>
              <i class="drop_down"></i>
            </div>
          </div>
          <div></div>
        </div>
        <div class="chunk">
          <div class="title">耳膜</div>
          <div class="ear">
            <i class="left_ear"></i>
            <div class="input_content">
              <div class="dropdown" @click="showDialog('eardrum','leftEardrum')">
                <div v-if="form.leftEardrum">{{formTitle.leftEardrum}}</div>
                <div v-else>选择数据</div>
                <div class="dropdown_icon"></div>
              </div>
              <i class="drop_down"></i>
            </div>
          </div>
          <div class="ear">
            <i class="right_ear"></i>
            <div class="input_content">
              <div class="dropdown" @click="showDialog('eardrum','rightEardrum')">
                <div v-if="form.rightEardrum">{{formTitle.rightEardrum}}</div>
                <div v-else>选择数据</div>
                <div class="dropdown_icon"></div>
              </div>
              <i class="drop_down"></i>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
    <div class="tips_content">
      <span class="tips">选项</span>
      <el-checkbox-group v-model="form.option">
        <table class="content">
          <tr>
            <td>
              <el-checkbox label="1">电子音频发声器</el-checkbox>
            </td>
            <td>
              <el-checkbox label="2">手机音频转接器</el-checkbox>
            </td>
            <td>
              <el-checkbox label="3">无线麦克风</el-checkbox>
            </td>
          </tr>
          <tr>
            <td>
              <el-checkbox label="4">遥控器</el-checkbox>
            </td>
            <td>
              <el-checkbox label="5">FM接收器</el-checkbox>
            </td>
            <td>
              <el-checkbox label="6">FM发射器</el-checkbox>
            </td>
          </tr>
        </table>
      </el-checkbox-group>
    </div>
    <div class="tips_content">
      <span class="tips">听觉重建</span>
      <el-checkbox-group v-model="form.rebuild">
        <el-checkbox label="1">三调两评</el-checkbox>
        <el-checkbox label="2">听觉训练</el-checkbox>
        <el-checkbox label="3">言语矫治</el-checkbox>
        <el-checkbox label="4">门诊指导</el-checkbox>
        <el-checkbox label="5">康复教育</el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="tips_content">
      <span class="tips">临床治疗方案</span>

      <div class="wid_100">
        <el-input
          width="100%"
          :autosize="{ minRows: 4, maxRows: 6 }"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="form.remark"
        ></el-input>
      </div>
    </div>
    <div class="tips_content">
      <span class="tips">效果预估</span>
      <div class="wid_100" @click="show=true">
        <van-image-preview v-model="show" :images="ImagePreview" maxZoom="3"></van-image-preview>
        <img class="effect_estimation" src="../../assets/image/effectEstimation.png" />
      </div>
    </div>
    <div @click="nextStep" class="sign" v-if="form.status=='2'"></div>
    <div class="img_teach" @click="submit" v-else></div>
    <el-dialog title="提示" :visible.sync="dialogVisible" class="dialogModal" width="500px">
      <div class="options_case">
        <div
          v-for="(item, index) in dialogDataList"
          :key="index"
          class="chunk"
          :class="item.id == dialogData[whichEar] ? 'sign' : ''"
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
      userInfo: {
        phone: "",
      },
      textarea: "",
      dialogDataList: [],
      dialogVisible: false,
      chooseList: {},
      dialogData: {
        left: "",
        right: "",
      },
      whichEar: "",
      checkFormParam: "",
      show: false,
      timer: "",

      ImagePreview: [require("../../assets/image/effectEstimation.png")],
      form: {
        status: "",
        reason: "",
        recordId: "",
        leftType: "",
        rightType: "",
        leftFunction: "",
        rightFunction: "",
        leftPower: "",
        rightPower: "",
        leftAppearance: "",
        rightAppearance: "",
        leftEardrum: "",
        rightEardrum: "",
        option: [],
        rebuild: [],
        remark: "",
      },
      formTitle: {
        leftType: "",
        rightType: "",
        leftFunction: "",
        rightFunction: "",
        leftPower: "",
        rightPower: "",
        leftAppearance: "",
        rightAppearance: "",
        leftEardrum: "",
        rightEardrum: "",
        option: [],
        rebuild: [],
        remark: "",
      },
    };
  },
  computed: {},
  created() {
    this.init();
  },
  watch: {
    form: {
      handler(val) {
        if (val.status == "2") {
          clearInterval(this.timer);
        }
      },
      deep: true,
    },
  },
  methods: {
    async init() {
      await this.getInfo();
      this.getChildByKey();
      if (this.form.status == "1") {
        this.timer = setInterval(() => {
          this.getInfo();
        }, 1000);
      }
    },
    getChildByKey() {
      //获取列表选项数据
      api
        .postFormAPI("common/getChildByKey", {
          key: "eardrum",
        })
        .then((res) => {
          if (res.data.result == "1") {
            this.chooseList.eardrum = res.data.data;
            res.data.data.forEach((el) => {
              if (el.id == this.form.leftEardrum) {
                this.formTitle.leftEardrum = el.title;
              }
              if (el.id == this.form.rightEardrum) {
                this.formTitle.rightEardrum = el.title;
              }
            });
          }
        })
        .catch((err) => console.log(err));
      api
        .postFormAPI("common/getChildByKey", {
          key: "model",
        })
        .then((res) => {
          if (res.data.result == "1") {
            this.chooseList.model = res.data.data;
            res.data.data.forEach((el) => {
              if (el.id == this.form.leftType) {
                this.formTitle.leftType = el.title;
              }
              if (el.id == this.form.rightType) {
                this.formTitle.rightType = el.title;
              }
            });
          }
        })
        .catch((err) => console.log(err));
      api
        .postFormAPI("common/getChildByKey", {
          key: "function",
        })
        .then((res) => {
          if (res.data.result == "1") {
            this.chooseList.function = res.data.data;
            res.data.data.forEach((el) => {
              if (el.id == this.form.leftFunction) {
                this.formTitle.leftFunction = el.title;
              }
              if (el.id == this.form.rightFunction) {
                this.formTitle.rightFunction = el.title;
              }
            });
          }
        })
        .catch((err) => console.log(err));
      api
        .postFormAPI("common/getChildByKey", {
          key: "power",
        })
        .then((res) => {
          if (res.data.result == "1") {
            this.chooseList.power = res.data.data;
            res.data.data.forEach((el) => {
              if (el.id == this.form.leftPower) {
                this.formTitle.leftPower = el.title;
              }
              if (el.id == this.form.rightPower) {
                this.formTitle.rightPower = el.title;
              }
            });
          }
        })
        .catch((err) => console.log(err));
      api
        .postFormAPI("common/getChildByKey", {
          key: "appearance",
        })
        .then((res) => {
          if (res.data.result == "1") {
            this.chooseList.appearance = res.data.data;
            res.data.data.forEach((el) => {
              if (el.id == this.form.leftAppearance) {
                this.formTitle.leftAppearance = el.title;
              }
              if (el.id == this.form.rightAppearance) {
                this.formTitle.rightAppearance = el.title;
              }
            });
          }
        })
        .catch((err) => console.log(err));
    },
    // 选中关系
    chooseData(e) {
      this.dialogData[this.whichEar] = e.id;
      this.formTitle[this.checkFormParam] = e.title;
      this.form[this.checkFormParam] = e.id;
      this.dialogVisible = false;
    },
    showDialog(e, d) {
      this.dialogVisible = true;
      this.dialogDataList = this.chooseList[e];
      this.checkFormParam = d;
      d.includes("left") ? (this.whichEar = "left") : (this.whichEar = "right");
      this.form[d] != "" ? (this.dialogData[this.whichEar] = this.form[d]) : "";
    },
    submit() {
      if (this.form.status != "") {
        switch (this.form.status) {
          case "1":
            this.$message({
              message: "正在审核中",
              showClose: true,
              type: "warning",
              offset: 50,
            });
            break;
          case "3":
            this.$message({
              message: `审核失败：${this.form.reason}`,
              showClose: true,
              type: "error",
              offset: 50,
            });
            break;
        }
        return;
      }
      let form = JSON.parse(JSON.stringify(this.form));
      form.option = this.form.option.join(",");
      form.rebuild = this.form.rebuild.join(",");
      form.sid = localStorage.getItem("sid");
      form.recordId = localStorage.getItem("recordId");
      delete form.status;
      delete form.reason;
      api
        .postFormAPI("patientPlan/submit", form)
        .then((res) => {
          if (res.data.result == "1") {
            this.$notify({
              message: res.data.message,
              showClose: false,
              // onClose(res) {
              //   location.reload();
              // },
              duration: 3000,
            });
          }
          this.nativeCall({ index: 13 }, "updateStep");
          location.reload();
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    getInfo() {
      return api
        .postFormAPI("patientPlan/getInfo", {
          recordId: localStorage.getItem("recordId"),
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.result == "1") {
            const data = res.data.data;
            for (let key in this.form) {
              if (data.hasOwnProperty(key)) {
                switch (key) {
                  case "option":
                  case "rebuild":
                    data[key] = data[key].split(",");
                    break;
                  default:
                    break;
                }
                this.form[key] = data[key];
              }
            }
          }
        })
        .catch((err) => console.log(err));
    },

    nextStep() {
      this.nativeCall({}, "postPrescription");
      // 下一步
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
  components: {},
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.healthyProgram {
  font-size: 16px;
  width: 100%;
  padding: 30px 20px;
  box-sizing: border-box;
  .input_case {
    margin-top: 30px;
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
  .tips_content {
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    background: #f9f9f9;
    color: #212121;
    margin-bottom: 20px;
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
      tr {
        display: flex;
        &:first-of-type {
          margin-bottom: 6px;
        }
      }
      td {
        width: 160px;
        padding-right: 12px;
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
          div {
            flex: 1;
          }
        }
      }
    }
  }
  .wid_100 {
    margin: 12px;
  }
  .effect_estimation {
    display: inline-block;
    width: 100%;
  }

  .img_teach {
    position: fixed;
    width: 66px;
    height: 66px;
    bottom: 30px;
    right: 26px;
    background: url("../../assets/image/icon_teacher@2x.png") center/cover;
  }

  .sign {
    position: fixed;
    bottom: 14px;
    right: 14px;
    width: 90px;
    height: 90px;
    background: url("../../assets/image/btn/icon_btn_save@2x.png") center/cover;
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
      font-size: 16px;
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
}
</style>

<style lang="scss">
.healthyProgram .el-checkbox-group {
  padding: 12px 0;
  padding-left: 12px;
}

.healthyProgram .tips_content .el-checkbox__label {
  color: #646464;
}
</style>
