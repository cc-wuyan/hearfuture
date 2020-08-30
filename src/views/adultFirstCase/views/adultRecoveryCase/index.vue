<template>
  <div class="adultRecoveryCase">
    <div class="contain">
      <van-form @submit="onSubmit">
        <div class="common-wrapper">
          <div class="title title-width">助听器/人工耳蜗佩戴史</div>
          <div class="content-wrapper">
            <div class="flex-row">
              <div class="flex-case">
                <div class="label">首次佩戴时间：</div>
                <div class="calendar cell">
                  <el-date-picker
                    :editable="false"
                    v-model="userInfo.firstWearTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </div>
              </div>
              <div class="flex-case">
                <div class="label">历史拥有助听器数量：</div>
                <div class="cell">
                  <el-input v-model="userInfo.audiphoneCount"></el-input>
                </div>
              </div>
            </div>
            <div class="chrunk">
              <div class="chrunk-title">现有助听器:</div>
              <div class="table_wrapper">
                <table class="table">
                  <tr>
                    <th></th>
                  </tr>
                  <tr>
                    <td>
                      <div class="img-left"></div>
                    </td>
                  </tr>
                  <tr>
                    <td style="height:68px">
                      <div class="img-right"></div>
                    </td>
                  </tr>
                </table>
                <div class="slide_wrapper">
                  <table class="table">
                    <tr>
                      <th>验配时间</th>
                      <th>外观类型</th>
                      <th>品牌</th>
                      <th>型号</th>
                      <th>价格</th>
                      <th>佩戴时长</th>
                      <th>满意程度</th>
                      <th>有无过敏</th>
                    </tr>
                    <tr>
                      <td>
                        <div class="item-content">
                          <div class="calendar">
                            <el-date-picker
                              :editable="false"
                              v-model="userInfo.leftMatchingTime"
                              type="date"
                              value-format="yyyy-MM-dd"
                            ></el-date-picker>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="item-content" @click="showDiolog('appearanceList','left')">
                          <div
                            v-if="appearanceList.left>-1"
                          >{{appearanceList.list[appearanceList.left].value}}</div>
                          <div
                            v-else-if="userInfo.leftAppearanceType!=''&& userInfo.leftAppearanceType!='0'"
                          >{{appearances[userInfo.leftAppearanceType]}}</div>
                          <div v-else>--</div>
                          <div class="dropdown_icon"></div>
                        </div>
                      </td>
                      <td>
                        <div class="item-content" @click="showDiolog('brandList','left')">
                          <div v-if="brandList.left>-1">{{brandList.list[brandList.left].value}}</div>
                          <div
                            v-else-if="userInfo.leftBrand!=''&& userInfo.leftBrand!='0'"
                          >{{brands[userInfo.leftBrand]}}</div>
                          <div v-else>--</div>
                          <div class="dropdown_icon"></div>
                        </div>
                      </td>
                      <td>
                        <div class="item-content" @click="showDiolog('modelList','left')">
                          <div v-if="modelList.left>-1">{{modelList.list[modelList.left].value}}</div>
                          <div v-else-if="userInfo.leftModel!=''">{{models[userInfo.leftModel]}}</div>
                          <div v-else>--</div>
                          <div class="dropdown_icon"></div>
                        </div>
                      </td>
                      <td>
                        <div class="item-content">
                          <div class="text">
                            <van-field
                              v-model="userInfo.leftPrice"
                              autosize
                              type="textarea"
                              rows="1"
                            />
                          </div>
                          <div>元</div>
                        </div>
                      </td>
                      <td>
                        <div class="item-content" @click="showDiolog('wearTimeList','left')">
                          <div v-if="wearTimeList.left!=-1">{{wearTimeList.list[wearTimeList.left]}}</div>
                          <div
                            v-else-if="userInfo.leftWearTime!=''&& userInfo.leftWearTime!='0'"
                          >{{wearTimeList.list[userInfo.leftWearTime-1]}}</div>
                          <div v-else>--</div>
                          <div class="dropdown_icon"></div>
                        </div>
                      </td>
                      <td>
                        <div class="item-content" @click="showDiolog('satisfiedList','left')">
                          <div
                            v-if="satisfiedList.left!=-1"
                          >{{satisfiedList.list[satisfiedList.left]}}</div>
                          <div
                            v-else-if="userInfo.leftSatisfied!=''&& userInfo.leftSatisfied!='0'"
                          >{{satisfiedList.list[userInfo.leftSatisfied-1]}}</div>
                          <div v-else>--</div>
                          <div class="dropdown_icon"></div>
                        </div>
                      </td>
                      <td>
                        <div class="item-content" @click="showDiolog('isAllergyList','left')">
                          <div
                            v-if="isAllergyList.left!=-1"
                          >{{isAllergyList.list[isAllergyList.left]}}</div>
                          <div
                            v-else-if="userInfo.leftIsAllergy!=''"
                          >{{isAllergyList.list[userInfo.leftIsAllergy]}}</div>
                          <div v-else>--</div>
                          <div class="dropdown_icon"></div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="item-content">
                          <div class="calendar">
                            <el-date-picker
                              :editable="false"
                              v-model="userInfo.rightMatchingTime"
                              type="date"
                              value-format="yyyy-MM-dd"
                            ></el-date-picker>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="item-content" @click="showDiolog('appearanceList','right')">
                          <div
                            v-if="appearanceList.right>-1"
                          >{{appearanceList.list[appearanceList.right].value}}</div>
                          <div
                            v-else-if="userInfo.rightAppearanceType!=''&& userInfo.rightAppearanceType!='0'"
                          >{{appearances[userInfo.rightAppearanceType]}}</div>
                          <div v-else>--</div>
                          <div class="dropdown_icon"></div>
                        </div>
                      </td>
                      <td>
                        <div class="item-content" @click="showDiolog('brandList','right')">
                          <div v-if="brandList.right>-1">{{brandList.list[brandList.right].value}}</div>
                          <div
                            v-else-if="userInfo.rightBrand!=''&& userInfo.rightBrand!='0'"
                          >{{brands[userInfo.rightBrand]}}</div>
                          <div v-else>--</div>
                          <div class="dropdown_icon"></div>
                        </div>
                      </td>
                      <td>
                        <div class="item-content" @click="showDiolog('modelList','right')">
                          <div v-if="modelList.right>-1">{{modelList.list[modelList.right].value}}</div>
                          <div v-else-if="userInfo.rightModel!=''">{{models[userInfo.rightModel]}}</div>
                          <div v-else>--</div>
                          <div class="dropdown_icon"></div>
                        </div>
                      </td>
                      <td>
                        <div class="item-content">
                          <div class="text">
                            <van-field
                              v-model="userInfo.rightPrice"
                              autosize
                              type="textarea"
                              rows="1"
                            />
                          </div>
                          <div>元</div>
                        </div>
                      </td>
                      <td>
                        <div class="item-content" @click="showDiolog('wearTimeList','right')">
                          <div
                            v-if="wearTimeList.right!=-1"
                          >{{wearTimeList.list[wearTimeList.right]}}</div>
                          <div
                            v-else-if="userInfo.rightWearTime!='' && userInfo.rightWearTime!='0'"
                          >{{wearTimeList.list[userInfo.rightWearTime-1]}}</div>
                          <div v-else>--</div>
                          <div class="dropdown_icon"></div>
                        </div>
                      </td>
                      <td>
                        <div class="item-content" @click="showDiolog('satisfiedList','right')">
                          <div
                            v-if="satisfiedList.right!=-1"
                          >{{satisfiedList.list[satisfiedList.right]}}</div>
                          <div
                            v-else-if="userInfo.rightSatisfied!=''&& userInfo.rightSatisfied!='0'"
                          >{{satisfiedList.list[userInfo.rightSatisfied-1]}}</div>
                          <div v-else>--</div>
                          <div class="dropdown_icon"></div>
                        </div>
                      </td>
                      <td>
                        <div class="item-content" @click="showDiolog('isAllergyList','right')">
                          <div
                            v-if="isAllergyList.right!=-1"
                          >{{isAllergyList.list[isAllergyList.right]}}</div>
                          <div
                            v-else-if="userInfo.rightIsAllergy!=''"
                          >{{isAllergyList.list[userInfo.rightIsAllergy]}}</div>
                          <div v-else>--</div>
                          <div class="dropdown_icon"></div>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            <div class="chrunk">
              <div class="chrunk-title">现有助听器不足:</div>
              <div class="checkbox-content">
                <van-checkbox-group v-model="userInfo.audiphoneInsufficient" direction="horizontal">
                  <van-checkbox name="1" shape="square">嘈杂环境听不清</van-checkbox>
                  <van-checkbox name="2" shape="square">看电视听不清</van-checkbox>
                  <van-checkbox name="3" shape="square">打电话听不清</van-checkbox>
                  <van-checkbox name="4" shape="square">大声音不舒服</van-checkbox>
                  <van-checkbox name="5" shape="square">操作不方便</van-checkbox>
                  <van-checkbox name="6" shape="square">小声音听不清</van-checkbox>
                  <van-checkbox name="7" shape="square">啸叫</van-checkbox>
                  <van-checkbox name="8" shape="square">不易操作</van-checkbox>
                  <van-checkbox name="9" shape="square">助听器老化</van-checkbox>
                  <van-checkbox name="10" shape="square">美观问题</van-checkbox>
                  <div class="checkwithinput_case">
                    <van-checkbox name="11" shape="square"></van-checkbox>
                    <div class="other">
                      <van-field v-model="userInfo.audiphoneInsufficientTitle" />
                    </div>
                  </div>
                </van-checkbox-group>
              </div>
            </div>
          </div>
        </div>
        <div class="common-wrapper">
          <div class="title">言语矫治史</div>
          <div class="content-wrapper">
            <div class="flex-row bottom">
              <div class="flex-case">
                <van-radio-group v-model="userInfo.isSpeechCorrection" direction="horizontal">
                  <van-radio name="1">有</van-radio>
                  <van-radio name="0">无</van-radio>
                </van-radio-group>
              </div>
              <div class="flex-case">
                <div class="label">描述：</div>
                <div class="cell">
                  <el-input
                    v-model="userInfo.speechCorrectionDetail"
                    type="textarea"
                    rows="1"
                    @blur="inputBlur"
                    @focus="inputFocus"
                  ></el-input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-form>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" class="dialogModal" width="500px">
      <div class="options_case">
        <div
          v-for="(item, index) in select.list"
          :key="index"
          class="chunk"
          :class="index == select[whichEar] ? 'sign' : ''"
          @click="choise(index)"
        >{{item.title?item.title:item}}</div>
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
      userInfo: {
        firstWearTime: "",
        audiphoneCount: "",
        leftMatchingTime: "",
        rightMatchingTime: "",
        leftAppearanceType: "",
        rightAppearanceType: "",
        leftBrand: "",
        rightBrand: "",
        leftModel: "",
        rightModel: "",
        leftPrice: "",
        rightPrice: "",
        leftWearTime: "",
        rightWearTime: "",
        leftSatisfied: "",
        rightSatisfied: "",
        leftIsAllergy: "",
        rightIsAllergy: "",
        audiphoneInsufficient: [],
        audiphoneInsufficientTitle: "",
        isSpeechCorrection: "",
        speechCorrectionDetail: "",
      },
      dialogVisible: false,
      select: {},
      whichEar: "",
      appearanceList: {
        list: [],
        left: -1,
        right: -1,
        name: "appearance",
      },
      appearances: {},
      brandList: {
        list: [],
        left: -1,
        right: -1,
        name: "brand",
      },
      brands: {},
      modelList: {
        list: [],
        left: -1,
        right: -1,
        name: "model",
      },
      models: {},
      wearTimeList: {
        list: ["0-3个月", "3个月-1年", "一年以上"],
        left: -1,
        right: -1,
        name: "wearTime",
      },

      satisfiedList: {
        list: ["不满意", "满意", "非常满意"],
        left: -1,
        right: -1,
        name: "satisfied",
      },

      isAllergyList: {
        list: ["无", "有"],
        left: -1,
        right: -1,
        name: "isAllergy",
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
    this.init();
  },
  methods: {
    // 初始化数据
    init() {
      // 获取听觉康复史
      api
        .postFormAPI("patientHearrebuildHistory/getInfo", {
          recordId: localStorage.getItem("recordId"),
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.result != "1") {
            return;
          }
          const data = res.data.data;
          // console.log(data);
          for (let key in this.userInfo) {
            if (data.hasOwnProperty(key)) {
              switch (key) {
                case "audiphoneInsufficient":
                  {
                    data[key] = data[key].split(",");
                  }
                  break;
                case "firstWearTime":
                case "leftMatchingTime":
                case "rightMatchingTime":
                  {
                    data[key] == "0" ? (data[key] = "") : "";
                  }
                  break;
              }
              this.userInfo[key] = data[key];
            }
          }
        });

      // 获取数据字典
      this.getDataDictionaryForRelation("appearance");
      this.getDataDictionaryForRelation("brand");
      this.getDataDictionaryForRelation("model");
    },
    // 获取数据字典
    getDataDictionaryForRelation(e) {
      api
        .postFormAPI("common/getDicByKey", {
          key: e,
        })
        .then((res) => {
          if (res.data.result == "1") {
            const data = res.data.data;
            this.$set(this[e + "List"], "list", data);
            for (let i = 0; i < data.length; i++) {
              this.$set(this[e + "s"], data[i].key, data[i].value);
            }
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },

    // 根据关系key获取值
    onSubmit() {},
    showDiolog(list, whichEar) {
      this.whichEar = whichEar;
      this.select = this[list];
      this.dialogVisible = true;
    },
    choise(index) {
      this[this.select.name + "List"][this.whichEar] = index;
      switch (this.select.name) {
        case "isAllergy":
          this.userInfo[this.whichEar + "IsAllergy"] = index + "";
          break;
        case "wearTime":
          this.userInfo[this.whichEar + "WearTime"] = index + 1 + "";
          break;
        case "satisfied":
          this.userInfo[this.whichEar + "Satisfied"] = index + 1 + "";
          break;
        case "appearance":
          this.userInfo[this.whichEar + "AppearanceType"] = this.select.list[
            index
          ].key;
          break;
        case "brand":
          this.userInfo[this.whichEar + "Brand"] = this.select.list[index].key;
          break;
        case "model":
          this.userInfo[this.whichEar + "Model"] = this.select.list[index].key;
          break;
      }
      this.dialogVisible = false;
    },
    onSave() {
      let row = {
        sid: localStorage.getItem("sid"),
        recordId: localStorage.getItem("recordId"),
      };
      for (let key in this.userInfo) {
        if (Array.isArray(this.userInfo[key])) {
          this.userInfo[key].join(",") == ""
            ? ""
            : (row[key] = this.userInfo[key].join(","));
        } else {
          this.userInfo[key] == "" || this.userInfo[key] == null
            ? ""
            : (row[key] = this.userInfo[key]);
        }
        switch (key) {
          case "isSpeechCorrection":
            if (
              this.userInfo[key] == 1 &&
              this.userInfo.speechCorrectionDetail == ""
            ) {
              this.$notify({
                message: "请填写言语矫治史备注",
              });
              return false;
            }
            break;
          default:
        }
      }
      api
        .postFormAPI("patientHearrebuildHistory/submit", row)
        .then((res) => {
          if (res.data.result == "1") {
            this.$router.replace({
              name: "adultObservation",
            });
          }
          this.$notify({
            message: res.data.message,
          });
          //数据处理
        })
        .catch((err) => console.log("err", err));
    },
    onSaveNoMsg() {
      let row = {
        sid: localStorage.getItem("sid"),
        recordId: localStorage.getItem("recordId"),
      };
      for (let key in this.userInfo) {
        if (Array.isArray(this.userInfo[key])) {
          this.userInfo[key].join(",") == ""
            ? ""
            : (row[key] = this.userInfo[key].join(","));
        } else {
          this.userInfo[key] == "" || this.userInfo[key] == null
            ? ""
            : (row[key] = this.userInfo[key]);
        }
      }
      api
        .postFormAPI("patientHearrebuildHistory/submit", row)
        .then((res) => {
          if (res.data.result == "1") {
          }
          //数据处理
        })
        .catch((err) => console.log("err", err));
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
.adultRecoveryCase {
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
  }

  .title {
    width: 130px;
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
    padding-bottom: 14px;
    .checkwithinput_case {
      display: flex;
      align-items: center;
      .van-checkbox {
        width: unset;
      }
    }
  }
  .title-width {
    width: 220px;
  }

  .flex-row {
    display: flex;
    margin-bottom: 30px;
    .flex-case {
      flex-grow: 1;
      display: flex;
      flex-shrink: 0;
      align-items: center;
      align-content: center;
      .cell {
        width: 20px;
        flex-grow: 1;
      }

      &:first-child {
        margin-right: 50px;
      }
    }
    .label {
      align-self: center;
    }
    .al-t {
      align-self: flex-start;
    }
  }
  .chrunk-title {
    margin-bottom: 20px;
  }
  .table_wrapper {
    width: 100%;
    display: flex;
    margin-bottom: 12px;
  }
  .slide_wrapper {
    flex-grow: 1;
    overflow-x: scroll;

    .table {
      width: 1000px;
      th,
      td {
        border-left: unset;
      }
    }
  }

  // 滚动条定义
  ::-webkit-scrollbar {
    height: 16px;
  }
  /*定义滚动条的轨道颜色、内阴影及圆角*/
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #fff;
    border-radius: 2px;
  }
  /*定义滑块颜色、内阴影及圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f1f1f1;
  }

  /*定义两端按钮的样式*/
  // ::-webkit-scrollbar-button {
  //   background-color: cyan;
  // }

  /*定义右下角汇合处的样式*/
  // ::-webkit-scrollbar-corner {
  //   background: khaki;
  // }
  .table {
    border-collapse: collapse;
    th,
    td {
      background-color: #fff;
      height: 52px;
      padding: 0 8px;
      font-weight: unset;
      text-align: center;
      border: 1px solid #e4e4e4;
    }
    th {
      background-color: #f1f1f1;
    }
    .item-content {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .calendar {
      width: 120px;
    }
    .text {
      width: 80px;
      flex-grow: 1;
    }
  }

  .calendar {
    width: 100%;
    display: flex;
    flex-grow: 1;
    align-items: center;
  }
  .no-grow {
    flex: 0;
  }
  .img-left,
  .img-right {
    width: 14px;
    height: 20px;
    background: url("../../../../assets/image/icon_ears_left@2x.png") no-repeat;
    background-size: contain;
    margin: 6px;
  }

  .img-right {
    background: url("../../../../assets/image/icon_ears_right@2x.png") no-repeat;
    background-size: contain;
  }
  .bottom {
    margin-bottom: 0;
  }
  .save-btn {
    width: 80px;
    height: 80px;
    background: url("../../../../assets/image/btn/icon_btn_save@2x.png") no-repeat
      center/contain;
    position: fixed;
    border-radius: 50%;
    bottom: 100px;
    right: 20px;
  }
}
</style>

<style lang="scss">
@import "../../../../assets/css/vanform.css";
.adultRecoveryCase {
  .checkbox-content .van-checkbox__label {
    width: 138px;
  }
  .checkbox-content .van-checkbox {
    flex-grow: 0;
  }
  .flex-case .van-radio,
  .flex-case .van-radio-group {
    flex-grow: 1;
  }
  .calendar {
    .el-input__inner {
      font-size: 18px;
      border: unset;
      color: #646464;
      height: 28px;
    }
    .el-input__icon {
      line-height: 28px;
    }
    .el-date-editor.el-input {
      // width: 120px;
      flex-grow: 1;
    }
    .el-input--suffix .el-input__inner {
      padding: 0;
      padding-right: 25px;
      padding-left: 6px;
    }
    .el-input__prefix {
      left: unset;
      right: 0;
    }
    .el-input__suffix {
      display: none;
    }
  }
  .dropdown_icon {
    // right: 8px;
    margin: 0 6px;
    width: 16px;
    height: 10px;
    background: url("../../../../assets/images/icon_more@2x.png") center/cover;
  }
  .dialogModal {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
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
        background: url("../../../../assets/images/icon_login_bg@2x.png")
          center/cover;
      }
    }
  }
  tr .van-field__control {
    text-align: center;
  }
  .el-textarea__inner,
  .el-input__inner {
    padding: 6px;
    font-size: 18px;
  }
}
</style>