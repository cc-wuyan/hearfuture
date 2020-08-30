<template>
  <div class="childRecoveyCase">
    <div class="contain">
      <div class="common-wrapper">
        <div class="title title-width">助听器/人工耳蜗佩戴史</div>
        <div class="content-wrapper">
          <div class="flex-row">
            <div class="flex-case">
              <div class="label">首次佩戴时间：</div>
              <div class="cell calendar">
                <el-date-picker
                  :editable="false"
                  v-model="userInfo.firstWearTime"
                  value-format="yyyy-MM-dd"
                  type="date"
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
          <div class="chunk">
            <div class="chunk-title">现有助听器:</div>
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
                          v-else-if="userInfo.leftAppearanceType!=''"
                        >{{appearances[userInfo.leftAppearanceType]}}</div>
                        <div v-else>--</div>
                        <div class="dropdown_icon"></div>
                      </div>
                    </td>
                    <td>
                      <div class="item-content" @click="showDiolog('brandList','left')">
                        <div v-if="brandList.left>-1">{{brandList.list[brandList.left].value}}</div>
                        <div v-else-if="userInfo.leftBrand!=''">{{brands[userInfo.leftBrand]}}</div>
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
                          v-else-if="userInfo.leftWearTime!=''"
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
                          v-else-if="userInfo.leftSatisfied!=''"
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
                          v-else-if="userInfo.rightAppearanceType!=''"
                        >{{appearances[userInfo.rightAppearanceType]}}</div>
                        <div v-else>--</div>
                        <div class="dropdown_icon"></div>
                      </div>
                    </td>
                    <td>
                      <div class="item-content" @click="showDiolog('brandList','right')">
                        <div v-if="brandList.right>-1">{{brandList.list[brandList.right].value}}</div>
                        <div v-else-if="userInfo.rightBrand!=''">{{brands[userInfo.rightBrand]}}</div>
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
                        <div v-if="wearTimeList.right!=-1">{{wearTimeList.list[wearTimeList.right]}}</div>
                        <div
                          v-else-if="userInfo.rightWearTime!=''"
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
                          v-else-if="userInfo.rightSatisfied!=''"
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
          <div class="chunk">
            <div class="chunk-title">现有助听器不足:</div>
            <div class="checkbox-content">
              <van-checkbox-group v-model="userInfo.audiphoneInsufficient" direction="horizontal">
                <van-checkbox name="1" shape="square">嘈杂环境听不清</van-checkbox>
                <van-checkbox name="2" shape="square">看电视听不清</van-checkbox>
                <van-checkbox name="3" shape="square">打电话听不清</van-checkbox>
                <van-checkbox name="4" shape="square">大声音不舒服</van-checkbox>
                <van-checkbox name="5" shape="square">操作不方便</van-checkbox>
                <van-checkbox name="6" shape="square">小声音听不清</van-checkbox>
                <van-checkbox name="7" shape="square">不易操作</van-checkbox>
                <van-checkbox name="8" shape="square">啸叫</van-checkbox>
                <van-checkbox name="9" shape="square">助听器老化</van-checkbox>
                <van-checkbox name="10" shape="square">美观问题</van-checkbox>
                <div class="checkwithinput_case">
                  <van-checkbox name="11" shape="square"></van-checkbox>
                  <el-input v-model="userInfo.audiphoneInsufficientTitle"></el-input>
                </div>
              </van-checkbox-group>
            </div>
          </div>
        </div>
      </div>
      <div class="common-wrapper">
        <div class="title">言语矫治史</div>
        <div class="content-wrapper">
          <div class="flex-row mb-0">
            <div class="flex-case al-t">
              <van-radio-group v-model="userInfo.isSpeechCorrection" direction="horizontal">
                <van-radio name="1">有</van-radio>
                <van-radio name="0">无</van-radio>
              </van-radio-group>
            </div>
            <div class="flex-case">
              <div class="label al-t">描述：</div>
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
      <div class="common-wrapper">
        <div class="title">语训经历</div>
        <div class="content-wrapper">
          <div class="chunk">
            <div class="chunk-title">1、开始语训年龄：</div>
            <div class="content">
              <van-checkbox-group v-model="userInfo.trainingAge" direction="horizontal">
                <van-checkbox @click="checkRatio('trainingAge', '1')" name="1">3月之内</van-checkbox>
                <van-checkbox @click="checkRatio('trainingAge', '2')" name="2">3岁-6岁</van-checkbox>
                <van-checkbox @click="checkRatio('trainingAge', '3')" name="3">6岁以上</van-checkbox>
              </van-checkbox-group>
            </div>
          </div>
          <div class="chunk">
            <div class="chunk-title">2、语训时间：</div>
            <div class="content">
              <van-checkbox-group v-model="userInfo.trainingTime" direction="horizontal">
                <van-checkbox @click="checkRatio('trainingTime', '1')" name="1">&lt;3月</van-checkbox>
                <van-checkbox @click="checkRatio('trainingTime', '2')" name="2">3月-6月</van-checkbox>
                <van-checkbox @click="checkRatio('trainingTime', '3')" name="3">6月-12月</van-checkbox>
                <van-checkbox @click="checkRatio('trainingTime', '4')" name="4">12-18个月</van-checkbox>
                <van-checkbox @click="checkRatio('trainingTime', '5')" name="5">18-24个月</van-checkbox>
                <van-checkbox @click="checkRatio('trainingTime', '6')" name="6">24-30个月</van-checkbox>
                <van-checkbox @click="checkRatio('trainingTime', '7')" name="7">30个月以上</van-checkbox>
              </van-checkbox-group>
            </div>
          </div>
          <div class="chunk">
            <div class="chunk-title">3、语训机构：</div>
            <div class="content">
              <van-checkbox-group v-model="userInfo.trainingCompany" direction="horizontal">
                <van-checkbox name="1" shape="square">省级中心</van-checkbox>
                <van-checkbox name="2" shape="square">地级市中心</van-checkbox>
                <van-checkbox name="3" shape="square">聋哑学校</van-checkbox>
                <van-checkbox name="4" shape="square">私立语训机构</van-checkbox>
                <van-checkbox name="5" shape="square">幼儿园</van-checkbox>
                <van-checkbox name="6" shape="square">福利院</van-checkbox>
                <van-checkbox name="7" shape="square">街道</van-checkbox>
                <van-checkbox name="8" shape="square">家庭</van-checkbox>
                <van-checkbox name="9" shape="square">其他</van-checkbox>
              </van-checkbox-group>
            </div>
          </div>
          <div class="chunk">
            <div class="flex-row chunk-title">
              <div class="label al-t">4、康复评估：</div>
              <div class="cell">
                <van-field
                  v-model="userInfo.rehabilitationAssessment"
                  rows="1"
                  autosize
                  type="textarea"
                />
              </div>
            </div>
          </div>
          <div class="chunk">
            <div class="chunk-title">5、培训后走向：</div>
            <div class="content">
              <van-checkbox-group v-model="userInfo.trainingResult" direction="horizontal">
                <van-checkbox @click="checkRatio('trainingResult', '1')" name="1">入普通小学</van-checkbox>
                <van-checkbox @click="checkRatio('trainingResult', '2')" name="2">入普通幼儿园</van-checkbox>
                <van-checkbox @click="checkRatio('trainingResult', '3')" name="3">入聋哑学校</van-checkbox>
                <van-checkbox @click="checkRatio('trainingResult', '4')" name="4">在家</van-checkbox>
              </van-checkbox-group>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div @click="save()">
      <save-button></save-button>
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" class="dialogModal" width="500px">
      <div class="options_case">
        <div
          v-for="(item, index) in select.list"
          :key="index"
          class="chunk"
          :class="index == select[whichEar] ? 'sign' : ''"
          @click="choiseRelation(index)"
        >{{item.title?item.title:item}}</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from "../../../../api/api";
import SaveButton from "../../../components/SaveButton";
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
        speechCorrectionDetail: "",
        trainingAge: [],
        trainingTime: [],
        trainingCompany: [],
        rehabilitationAssessment: "",
        trainingResult: [],
        isSpeechCorrection: "",
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
  components: {
    SaveButton,
  },
  created() {
    this.init();
  },
  methods: {
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
                case "trainingAge":
                case "trainingTime":
                case "trainingResult":
                case "audiphoneInsufficient":
                case "trainingCompany":
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
    // 选中关系
    choiseRelation(index) {
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
    showDiolog(list, whichEar) {
      this.whichEar = whichEar;
      this.select = this[list];
      this.dialogVisible = true;
    },
    save() {
      var row = {
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
              name: "childObservation",
            });
          }
          this.$notify({
            message: res.data.message,
          });
        })
        .catch((err) => console.log(err));
    },
    onSaveNoMsg() {
      var row = {
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
  },
};
</script>

<style lang="scss" scoped>
.childRecoveyCase {
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
  }

  .content-wrapper {
    padding: 14px 14px;
    padding-bottom: 0;
    overflow: hidden;
    padding-bottom: 14px;
    .checkwithinput_case {
      display: flex;
      align-items: center;
    }
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
  .title-width {
    width: 220px;
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
  .flex-row {
    display: flex;
    margin-bottom: 30px;
  }
  .flex-case {
    flex-grow: 1;
    display: flex;
    flex-shrink: 0;
    align-items: center;

    align-content: center;
    &:first-child {
      margin-right: 50px;
    }
  }
  .table-item:not(:last-child) {
    border-right: 1px solid #e4e4e4;
  }
  .cell {
    width: 20px;
    flex-grow: 1;
  }
  .label {
    align-self: center;
  }
  .al-t {
    align-self: flex-start;
  }
  .chunk-title {
    margin-bottom: 16px;
  }
  .table_wrapper {
    width: 100%;
    display: flex;
    margin-bottom: 12px;
  }
  .slide_wrapper {
    flex-grow: 1;
    overflow-x: auto;
    .table {
      width: 110%;
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
      white-space: nowrap;
    }
    .calendar {
      width: 120px;
    }
    .text {
      width: 80px;
      flex-grow: 1;
    }
  }

  .content {
    margin-left: 26px;
    border-radius: 2px;
    background-color: #f3f3f3;
    padding: 12px;
    margin-bottom: 16px;
  }
  .no-grow {
    flex: 0;
  }
  .mb-0 {
    margin-bottom: 0;
  }
}
</style>

<style lang="scss">
@import "../../../../assets/css/vanform.css";
.childRecoveyCase {
  .checkbox-content .van-checkbox {
    width: 160px;
  }
  .flex-case .van-radio,
  .flex-case .van-radio-group {
    flex-grow: 1;
  }
  .content .van-radio {
    width: 140px;
  }
  .content .van-checkbox {
    width: 146px;
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
  // dialog
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
        color: #212121;
        text-align: center;
        display: flex;
        justify-content: center;
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
    font-size: 18px;
  }
  .checkwithinput_case .van-checkbox {
    width: unset;
    padding-right: 4px;
    .el-input__inner {
      height: 30px;
    }
  }
  .el-textarea__inner,
  .el-input__inner {
    padding: 6px;
    font-size: 18px;
  }
}
</style>