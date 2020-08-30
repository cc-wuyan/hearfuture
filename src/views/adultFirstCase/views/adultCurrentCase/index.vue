<template>
  <div class="adultCurrentCase">
    <div class="contain">
      <van-form @submit="onSubmit">
        <div class="common-wrapper">
          <div class="title space">主诉</div>
          <div class="content-wrapper">
            <el-input v-model="userInfo.mainDetails" @click.native="focusSelect('主诉','mainDetails')"></el-input>
          </div>
        </div>
        <div class="common-wrapper">
          <div class="title">听力损失病史</div>
          <div class="center-form">
            <div class="center-left">
              <p>发现听力损失的时间：</p>
              <p>发病进程：</p>
              <p>大声有无不舒服：</p>
              <p>自己感觉哪只耳朵更好一些：</p>
            </div>
            <div class="center-right-wrapper">
              <div class="center-right">
                <div class="option-wrapper">
                  <div class="option-item">
                    <div class="img-left"></div>
                    <div class="dropdown" @click="showDiolog('leftFindTime')">
                      <div>{{leftFindTimeList.list[leftFindTimeList.index]}}</div>
                      <div class="dropdown_icon"></div>
                    </div>
                  </div>
                  <div class="option-item">
                    <div class="img-left"></div>
                    <div class="dropdown" @click="showDiolog('leftProcess')">
                      <div>{{leftProcessList.list[leftProcessList.index]}}</div>
                      <div class="dropdown_icon"></div>
                    </div>
                  </div>
                  <div class="option-item">
                    <div class="img-left"></div>
                    <div class="dropdown" @click="showDiolog('leftBigsound')">
                      <div>{{leftBigsoundList.list[leftBigsoundList.index]}}</div>
                      <div class="dropdown_icon"></div>
                    </div>
                  </div>
                </div>
                <div class="option-wrapper">
                  <div class="option-item">
                    <div class="img-right"></div>
                    <div class="dropdown" @click="showDiolog('rightFindTime')">
                      <div>{{rightFindTimeList.list[rightFindTimeList.index]}}</div>
                      <div class="dropdown_icon"></div>
                    </div>
                  </div>
                  <div class="option-item">
                    <div class="img-right"></div>
                    <div class="dropdown" @click="showDiolog('rightProcess')">
                      <div>{{rightProcessList.list[rightProcessList.index]}}</div>
                      <div class="dropdown_icon"></div>
                    </div>
                  </div>
                  <div class="option-item">
                    <div class="img-right"></div>
                    <div class="dropdown" @click="showDiolog('rightBigsound')">
                      <div>{{rightBigsoundList.list[rightBigsoundList.index]}}</div>
                      <div class="dropdown_icon"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="right-bottom">
                <van-checkbox-group v-model="userInfo.goodEar" direction="horizontal">
                  <van-checkbox @click="checkRatio('goodEar', '1')" name="1" label-position="left">
                    <div class="img-left"></div>
                  </van-checkbox>
                  <van-checkbox @click="checkRatio('goodEar', '2')" name="2" label-position="left">
                    <div class="img-right"></div>
                  </van-checkbox>
                  <van-checkbox @click="checkRatio('goodEar', '3')" name="3" label-position="left">
                    <div class="img-left"></div>
                    <div class="img-right" style="margin-left: 10px;"></div>
                  </van-checkbox>
                </van-checkbox-group>
              </div>
            </div>
          </div>
        </div>
        <div class="common-wrapper">
          <div class="title">听损伴随病状</div>
          <div class="bottom-form">
            <div class="bottom-item">
              <div class="left-label">耳痛：</div>
              <div class="right-wrapper">
                <div class="field-wrapper">
                  <div class="img-left"></div>
                  <div class="field">
                    <el-input
                      v-model="userInfo.leftEarache"
                      rows="1"
                      type="textarea"
                      @click.native="focusSelect('左耳耳痛','leftEarache')"
                    ></el-input>
                  </div>
                </div>
                <div class="field-wrapper">
                  <div class="img-right"></div>
                  <div class="field">
                    <el-input
                      v-model="userInfo.rightEarache"
                      rows="1"
                      type="textarea"
                      @click.native="focusSelect('右耳耳痛','rightEarache')"
                    ></el-input>
                  </div>
                </div>
              </div>
            </div>
            <div class="bottom-item">
              <div class="left-label">耳鸣：</div>
              <div class="right-wrapper">
                <div class="field-wrapper">
                  <div class="img-left"></div>
                  <div class="field">
                    <el-input
                      v-model="userInfo.leftTinnitus"
                      rows="1"
                      type="textarea"
                      @click.native="focusSelect('左耳耳鸣','leftTinnitus')"
                    ></el-input>
                  </div>
                </div>
                <div class="field-wrapper">
                  <div class="img-right"></div>
                  <div class="field">
                    <el-input
                      v-model="userInfo.rightTinnitus"
                      rows="1"
                      type="textarea"
                      @click.native="focusSelect('右耳耳鸣','rightTinnitus')"
                    ></el-input>
                  </div>
                </div>
              </div>
            </div>
            <div class="bottom-item">
              <div class="left-label">流脓：</div>
              <div class="right-wrapper">
                <div class="select-wrapper">
                  <div class="img-left"></div>
                  <div class="purulentTime">
                    <van-checkbox-group v-model="userInfo.leftFester" direction="horizontal">
                      <van-checkbox @click="checkRatio('leftFester', '1')" name="1">新发</van-checkbox>
                      <van-checkbox @click="checkRatio('leftFester', '2')" name="2">陈旧</van-checkbox>
                    </van-checkbox-group>
                  </div>
                  <div class="flex-row">
                    <van-checkbox v-model="userInfo.leftFesterDense" shape="square">脓液</van-checkbox>
                    <van-checkbox v-model="userInfo.leftFesterContinue" shape="square">持续</van-checkbox>
                    <van-checkbox v-model="userInfo.leftFesterSmelly" shape="square">有臭味</van-checkbox>
                  </div>
                </div>
                <div class="select-wrapper">
                  <div class="img-right"></div>
                  <div class="purulentTime">
                    <van-checkbox-group v-model="userInfo.rightFester" direction="horizontal">
                      <van-checkbox @click="checkRatio('rightFester', '1')" name="1">新发</van-checkbox>
                      <van-checkbox @click="checkRatio('rightFester', '2')" name="2">陈旧</van-checkbox>
                    </van-checkbox-group>
                  </div>
                  <div class="flex-row">
                    <van-checkbox v-model="userInfo.rightFesterDense" shape="square">脓液</van-checkbox>
                    <van-checkbox v-model="userInfo.rightFesterContinue" shape="square">持续</van-checkbox>
                    <van-checkbox v-model="userInfo.rightFesterSmelly" shape="square">有臭味</van-checkbox>
                  </div>
                </div>
              </div>
            </div>
            <div class="bottom-item bottom-item-single">
              <div class="left-label">其他：</div>
              <div class="right-wrapper">
                <div class="select-wrapper" >
                  <van-checkbox v-model="userInfo.isVertigo" shape="square">眩晕</van-checkbox>
                  <van-checkbox v-model="userInfo.isAbnormalgait" shape="square">步态异常</van-checkbox>
                  <van-checkbox v-model="userInfo.isUnsteadystanding" shape="square">站立不稳</van-checkbox>
                  <div class="left-label" style="margin-right:0px;margin-left:6px">描述：</div>
                  <div class="field" style="width:0px">
                    <el-input v-model="userInfo.details" @click.native="focusSelect('听损症状描述','details')"></el-input>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="bottom-item bottom-item-single">
              <div class="left-label">描述：</div>
              <div class="right-wrapper">
                <div class="field">
                  <el-input
                    v-model="userInfo.details"
                    rows="1"
                    type="textarea"
                    @click.native="focusSelect('听损症状描述','details')"
                  ></el-input>
                </div>
              </div>
            </div>-->
          </div>
        </div>
        <div class="common-wrapper">
          <div class="title">语言障碍</div>
          <div class="content-wrapper">
            <div class="field-wrapper">
              <div class="label">语言发育问题：</div>
              <div class="field">
                <el-input
                  v-model="userInfo.speakGrowth"
                  rows="1"
                  type="textarea"
                  @click.native="focusSelect('语言发育问题','speakGrowth')"
                ></el-input>
              </div>
            </div>
            <div class="field-wrapper">
              <div class="label">语言清楚度：</div>
              <div class="field">
                <el-input
                  v-model="userInfo.clarity"
                  rows="1"
                  type="textarea"
                  @click.native="focusSelect('语言清楚度','clarity')"
                ></el-input>
              </div>
            </div>
            <div class="field-wrapper">
              <div class="label">表达与沟通能力：</div>
              <div class="field">
                <el-input
                  v-model="userInfo.talk"
                  rows="1"
                  type="textarea"
                  @click.native="focusSelect('表达与沟通能力','talk')"
                ></el-input>
              </div>
            </div>
          </div>
        </div>
      </van-form>
    </div>
    <!-- 标签化录入 -->
    <el-dialog
      :title="selectTitle"
      :visible.sync="labelSelect"
      class="labelDialog"
      width="600px"
      @opened="openDialog"
    >
      <div class="flex_row">
        <div
          v-for="(item, index) in labelList"
          :key="index"
          :style="{'background-color':item.ischecked?'#a9a9a9':'#f9f9f9'}"
          @click="clickLabel(index)"
        >{{item.value}}</div>
      </div>
      <div class="labelSave" @click="labelSave"></div>
      <div class="content_chunk">
        <div class="tips">描述：</div>
        <el-input type="textarea" ref="textarea" :rows="3" v-model="selectContent"></el-input>
      </div>
    </el-dialog>

    <!-- 选择框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" class="dialogModal" width="500px">
      <div class="options_case">
        <div
          v-for="(item, index) in select.list"
          :key="index"
          class="chunk"
          :class="index == select.index ? 'sign' : ''"
          @click="choise(index)"
        >{{item}}</div>
      </div>
    </el-dialog>
    <div class="save-btn" @click="onSave"></div>
  </div>
</template>

<script>
import api from "../../../../api/api";

export default {
  data() {
    return {
      labelSelect: false,
      selectTitle: "",
      labelList: [],
      selectContent: "",
      labelType: "",

      userInfo: {
        mainDetails: "",
        leftFindTime: "",
        rightFindTime: "",
        leftProcess: "",
        rightProcess: "",
        leftBigsound: "",
        rightBigsound: "",
        goodEar: [],
        leftEarache: "",
        rightEarache: "",
        leftTinnitus: "",
        rightTinnitus: "",
        leftFester: [],
        rightFester: [],
        leftFesterDense: "",
        rightFesterDense: "",
        leftFesterContinue: "",
        rightFesterContinue: "",
        leftFesterSmelly: "",
        rightFesterSmelly: "",
        isVertigo: "",
        isAbnormalgait: "",
        isUnsteadystanding: "",
        details: "",
        talk: "",
        clarity: "",
        speakGrowth: "",
      },
      dialogVisible: false,
      select: {},
      leftFindTimeList: {
        list: ["最近7天", "1个月", "3个月", "4-6个月", "1-5年"],
        index: -1,
        name: "leftFindTime",
      },
      rightFindTimeList: {
        list: ["最近7天", "1个月", "3个月", "4-6个月", "1-5年"],
        index: -1,
        name: "rightFindTime",
      },
      leftProcessList: {
        list: ["渐进性", "突发性", "波动性"],
        index: -1,
        name: "leftProcess",
      },
      rightProcessList: {
        list: ["渐进性", "突发性", "波动性"],
        index: -1,
        name: "rightProcess",
      },
      leftBigsoundList: {
        list: ["无", "有"],
        index: -1,
        name: "leftBigsound",
      },
      rightBigsoundList: {
        list: ["无", "有"],
        index: -1,
        name: "rightBigsound",
      },
    };
  },
  watch: {
    userInfo: {
      handler(val) {
        this.onSaveNoMsg();
      },
      deep: true,
    },
  },
  created() {
    api
      .postFormAPI("patientHpi/getInfo", {
        recordId: localStorage.getItem("recordId"),
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result != "1") {
          return;
        }

        const data = res.data.data;
        for (let key in this.userInfo) {
          if (data.hasOwnProperty(key)) {
            switch (key) {
              case "leftFesterDense":
              case "leftFesterContinue":
              case "leftFesterSmelly":
              case "rightFesterDense":
              case "rightFesterContinue":
              case "rightFesterSmelly":
              case "isVertigo":
              case "isAbnormalgait":
              case "isUnsteadystanding":
                {
                  data[key] == "0" ? (data[key] = false) : (data[key] = true);
                }
                break;
              case "leftFindTime":
              case "rightFindTime":
              case "leftProcess":
              case "rightProcess":
                {
                  this[key + "List"].index = data[key] - 1;
                }
                break;
              case "leftBigsound":
              case "rightBigsound":
                {
                  this[key + "List"].index = data[key];
                }
                break;
              case "goodEar":
              case "leftFester":
              case "rightFester":
                {
                  data[key] = data[key].split(",");
                }
                break;
            }
            this.userInfo[key] = data[key];
          }
        }
        //数据处理
      });
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
    showDiolog(list) {
      this.select = this[list + "List"];
      this.dialogVisible = true;
    },
    choise(index) {
      this[this.select.name + "List"].index = index;
      if (
        this.select.name == "leftBigsound" ||
        this.select.name == "rightBigsound"
      ) {
        this.userInfo[this.select.name] = index + "";
      } else {
        this.userInfo[this.select.name] = index + 1 + "";
      }
      this.dialogVisible = false;
    },
    onSaveNoMsg() {
      // 数据预处理
      let row = {
        sid: localStorage.getItem("sid"),
        recordId: localStorage.getItem("recordId"),
      };
      for (let key in this.userInfo) {
        if (Array.isArray(this.userInfo[key])) {
          this.userInfo[key].join(",") == ""
            ? ""
            : (row[key] = this.userInfo[key].join(","));
        } else if (typeof this.userInfo[key] == "boolean") {
          this.userInfo[key] ? (row[key] = "1") : (row[key] = "0");
        } else {
          this.userInfo[key] == "" || this.userInfo[key] == null
            ? ""
            : (row[key] = this.userInfo[key]);
        }
      }
      // 提交服务器
      api
        .postFormAPI("patientHpi/submit", row)
        .then((res) => {
          if (res.data.result == "1") {
            // console.log(res);
          }
          // this.$notify({
          //   message: res.data.message
          // });

          //数据处理
        })
        .catch((err) => console.log(err));
    },
    onSave() {
      // 数据预处理
      let row = {
        sid: localStorage.getItem("sid"),
        recordId: localStorage.getItem("recordId"),
      };
      for (let key in this.userInfo) {
        if (Array.isArray(this.userInfo[key])) {
          this.userInfo[key].join(",") == ""
            ? ""
            : (row[key] = this.userInfo[key].join(","));
        } else if (typeof this.userInfo[key] == "boolean") {
          this.userInfo[key] ? (row[key] = "1") : (row[key] = "0");
        } else {
          this.userInfo[key] == "" || this.userInfo[key] == null
            ? ""
            : (row[key] = this.userInfo[key]);
        }
      }
      // 提交服务器
      api
        .postFormAPI("patientHpi/submit", row)
        .then((res) => {
          if (res.data.result == "1") {
            // console.log(res);
            this.$router.replace({
              name: "adultOldCase",
            });
          }
          this.$notify({
            message: res.data.message,
          });

          //数据处理
        })
        .catch((err) => console.log(err));
    },
    checkRatio(key, value) {
      if (this.userInfo[key].length <= 0) {
        return;
      }
      this.userInfo[key] = [value];
      console.log(this.userInfo[key]);
    },

    // 点击弹出选择框
    async focusSelect(title, key) {
      this.labelList = [];
      this.selectContent = "";
      this.labelType = key;

      switch (key) {
        case "mainDetails":
          key = "complaintTip";
          break;
        case "leftEarache":
        case "rightEarache":
          key = "earacheTip";
          break;
        case "leftTinnitus":
        case "rightTinnitus":
          key = "tinnitusTip";
          break;
        case "details":
          key = "describeTip";
          break;
        case "speakGrowth":
          key = "languageDevelopmentTip";
          break;
        case "clarity":
          key = "languageClarityTip";
          break;
        case "talk":
          key = "communicationSkillsTip";
          break;
      }
      await this.getChildByKey(key);
      this.labelSelect = true;
      this.selectTitle = title;
    },
    // 打开弹窗的回调
    openDialog() {
      this.$refs.textarea.focus();
    },
    //获取标签
    getChildByKey(key) {
      return api
        .postFormAPI("common/getChildByKey", {
          key,
        })
        .then((res) => {
          if (res.data.result != 1) {
            return;
          }
          const data = res.data.data;
          data.forEach((item) => {
            this.labelList.push({ value: item.value, ischecked: false });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 选择标签
    clickLabel(index) {
      // 选中时
      if (!this.labelList[index].ischecked) {
        this.selectContent = `${this.selectContent}${this.labelList[index].value}，`;
      } else {
        this.selectContent = this.selectContent.replace(
          this.labelList[index].value + "，",
          ""
        );
      }
      this.$set(
        this.labelList[index],
        "ischecked",
        !this.labelList[index].ischecked
      );
    },
    // 保存内容
    labelSave() {
      this.userInfo[this.labelType] = this.selectContent;
      this.labelSelect = false;
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
    inputBlur() {
      this.nativeCall({ focus: false }, "inputFocus");
    },
    inputFocus() {
      this.nativeCall({ focus: true }, "inputFocus");
    },
  },
};
</script>

<style lang="scss" scoped>
.adultCurrentCase {
  .contain {
    margin: 30px 30px;
    margin-bottom: 80px;
    color: #212121;
  }

  .common-wrapper {
    background-color: #f9f9f9;
    border-radius: 6px;
    margin-bottom: 14px;
    overflow: hidden;
    padding-bottom: 14px;
  }

  .title {
    width: 150px;
    height: 44px;
    background-color: #ebf2f5;
    border-radius: 6px 0px 14px 0px;
    text-align: center;
    line-height: 44px;
    font-weight: bold;
    color: #5091c7;
    font-size: 18px;
  }

  .content-wrapper {
    padding: 14px 14px;
    padding-bottom: 0;
    overflow: hidden;
  }

  .img-left,
  .img-right {
    width: 14px;
    height: 20px;
    background: url("../../../../assets/image/icon_ears_left@2x.png") no-repeat;
    background-size: contain;
    margin: 0 6px 0 6px;
    flex-shrink: 0;
  }

  .img-right {
    background: url("../../../../assets/image/icon_ears_right@2x.png") no-repeat;
    background-size: contain;
  }
  .space {
    letter-spacing: 26px;
  }
  .center-form {
    display: flex;
    padding: 0 14px;

    .center-left {
      flex-shrink: 0;
      display: flex;
      height: 220px;
      flex-direction: column;
      justify-content: space-between;
      p {
        height: 48px;
        line-height: 48px;
      }
    }
    .center-right-wrapper {
      flex-grow: 1;
    }
    .center-right {
      flex-grow: 1;
      display: flex;
      .option-wrapper {
        height: 164px;
        width: 20px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        &:not(:last-child) {
          margin-right: 22px;
        }

        .option-item {
          display: flex;
          height: 48px;
          align-items: center;
          background-color: #f3f3f3;

          .dropdown {
            flex-grow: 1;
            height: 38px;
            margin-right: 10px;
            display: flex;
            align-items: center;
            background: #fff;
            color: #646464;
            padding: 0 8px;
            justify-content: space-between;
          }
        }
      }
    }
  }
  .right-bottom {
    height: 48px;
    margin-top: 10px;
    background-color: #f3f3f3;
    display: flex;
    align-items: center;

    .img-right {
      margin-left: 25px;
    }
  }
  .field-wrapper {
    display: flex;
    align-items: center;
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
  .field {
    flex-grow: 1;
  }
  .left-label {
    flex-shrink: 0;
    margin: 14px 38px 0 0;
  }
  .bottom-form {
    padding: 0 14px;

    .bottom-item {
      display: flex;
      margin-top: 10px;

      .right-wrapper {
        flex-grow: 1;
        flex-direction: column;
        justify-content: space-around;
        background-color: #f3f3f3;
        padding: 8px 10px 8px 0;

        .select-wrapper {
          display: flex;
          align-items: center;
          .purulentTime {
            margin-right: 46px;
            margin-left: 12px;
          }
          &:not(:last-of-type) {
            margin-bottom: 12px;
          }
        }
      }
    }

    .bottom-item-single {
      align-items: center;
      background-color: none;
      .left-label {
        margin-top: 0px;
      }

      .right-wrapper {
        background-color: #f9f9f9;
      }
    }
  }
  .flex-row {
    display: flex;
  }
  .save-btn {
    width: 80px;
    height: 80px;
    background: url("../../../../assets/image/btn/icon_btn_save@2x.png")
      no-repeat center/contain;
    position: fixed;
    border-radius: 50%;
    bottom: 100px;
    right: 20px;
  }
  .label {
    width: 144px;
    flex-shrink: 0;
  }
}
</style>
<style lang="scss">
.adultCurrentCase {
  .labelDialog {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin-top: 130px;
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
    .el-dialog__body {
      font-size: 18px;
    }

    .labelSave {
      position: absolute;
      z-index: 10;
      right: 14px;
      margin: auto;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: url("../../../../assets/image/btn/icon_btn_save@2x.png")
        center/cover;
      margin-left: auto;
    }
    .flex_row {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 40px;
      div {
        margin: 6px 0px;
        margin-right: 16px;
        padding: 0 30px;
        background-color: #f9f9f9;
        color: #212121;
        height: 42px;
        line-height: 42px;
        border-radius: 6px;
      }
    }
    .el-textarea {
      box-sizing: border-box;
      padding: 30px 16px 0px;
      font-size: 18px;
    }
    .content_chunk {
      background-color: #f9f9f9;
      padding-bottom: 14px;
      .tips {
        color: #5091c7;
        padding: 10px 0;
        width: 122px;
        text-align: center;
        font-weight: bold;
        border-radius: 6px 0px 14px 0px;
        background-color: #ebf2f5;
      }
    }
  }
  .el-input {
    font-size: 18px;
  }
  .right-bottom .van-checkbox,
  .right-bottom .van-checkbox-group {
    flex-grow: 1;
  }
  .dropdown_icon {
    width: 16px;
    height: 10px;
    background: url("../../../../assets/images/icon_more@2x.png") center/cover;
  }

  .van-checkbox__label--left {
    display: flex;
    align-items: center;
  }

  // dialog
  .dialogModal {
    display: flex;
    align-items: center;
    justify-content: center;
    .el-dialog {
      margin: unset !important;
      border-radius: 10px;
    }
    .el-dialog__header {
      font-size: 18px;
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
        background: url("../../../../assets/images/icon_login_bg@2x.png")
          center/cover;
      }
    }
  }
  .van-checkbox {
    margin-right: 12px;
  }
  .el-textarea__inner {
    padding: 6px;
    font-size: 18px;
  }
}
</style>