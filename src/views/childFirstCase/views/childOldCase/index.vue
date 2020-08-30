<template>
  <div class="childOldCase">
    <div class="contain">
      <van-form @submit="onSubmit">
        <div class="common-wrapper">
          <div class="title">妊娠史</div>
          <div class="content-wrapper">
            <div class="chunk">
              <div class="left-label">怀孕期间是否有受到病毒感染：</div>
              <div class="right-content bgc p-lr">
                <van-radio-group v-model="userInfo.pregnantIsInfected" direction="horizontal">
                  <van-radio name="1">
                    <div class="chunk">
                      <span>是，发生于孕期第</span>
                      <div class="text">
                        <el-input v-model="userInfo.pregnantInfectedWeek"></el-input>
                      </div>
                      <span>周</span>
                    </div>
                  </van-radio>
                  <van-radio name="2">不确定</van-radio>
                  <van-radio name="0">否</van-radio>
                </van-radio-group>
              </div>
            </div>
            <div class="chunk">
              <div class="left-label">若是，受何种病毒感染：</div>
              <div class="right-content bgc p-lr mt-14">
                <van-checkbox-group v-model="userInfo.pregnantInfectedVirus" direction="horizontal">
                  <van-checkbox name="1" shape="square">巨细胞病毒</van-checkbox>
                  <van-checkbox name="2" shape="square">疱疹病毒</van-checkbox>
                  <van-checkbox name="3" shape="square">麻疹</van-checkbox>
                  <van-checkbox name="4" shape="square">水痘</van-checkbox>
                  <van-checkbox name="5" shape="square">弓形体</van-checkbox>
                  <div class="checkwithinput_case">
                    <van-checkbox name="6" shape="square"></van-checkbox>
                    <el-input v-model="userInfo.pregnantInfectedVirusTitle"></el-input>
                  </div>
                </van-checkbox-group>
              </div>
            </div>
            <div class="chunk">
              <div class="left-label">孕期中，曾经口服药物：</div>
              <div class="right-content bgc p-lr mt-14">
                <div class="checkbox-flex">
                  <van-checkbox-group v-model="userInfo.pregnantMedicine" direction="horizontal">
                    <van-checkbox name="1" shape="square">抽烟</van-checkbox>
                    <van-checkbox name="2" shape="square">喝酒</van-checkbox>
                    <van-checkbox name="3" shape="square">中药</van-checkbox>
                    <div class="checkwithinput_case">
                      <van-checkbox name="4" shape="square"></van-checkbox>
                      <el-input v-model="userInfo.pregnantMedicineTitle"></el-input>
                    </div>
                  </van-checkbox-group>
                </div>
              </div>
            </div>
            <div class="chunk">
              <div class="left-label">是否有以下症状：</div>
              <div class="right-content bgc p-lr mt-14">
                <div class="checkbox-flex">
                  <van-checkbox-group v-model="userInfo.otherSymptom" direction="horizontal">
                    <van-checkbox name="1" shape="square">妊娠毒血症</van-checkbox>
                    <van-checkbox name="2" shape="square">妊娠高血压</van-checkbox>
                    <div class="checkwithinput_case">
                      <van-checkbox name="3" shape="square"></van-checkbox>
                      <el-input v-model="userInfo.otherSymptomTitle"></el-input>
                    </div>
                  </van-checkbox-group>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="common-wrapper">
          <div class="title">出生记录</div>
          <div class="content-wrapper">
            <div class="chunk">
              <span>怀孕周数</span>
              <div class="text">
                <el-input v-model="userInfo.pregnancyWeek"></el-input>
              </div>
              <span class="text-c">周，出生体重</span>
              <div class="text">
                <el-input v-model="userInfo.birthWeight"></el-input>
              </div>
              <span class="text-c">KG</span>
            </div>
            <div class="chunk">
              <div>产程中是否使用产钳或真空吸引器，是否有吸氧：</div>
              <div class="right-content p-lr radio-flex">
                <van-radio-group v-model="userInfo.isOxygen" direction="horizontal">
                  <van-radio name="1">
                    <div class="chunk">
                      <span>是</span>
                      <div class="text right-content">
                        <el-input v-model="userInfo.isOxygenTitle" @blur="inputBlur"
                  @focus="inputFocus"></el-input>
                      </div>
                    </div>
                  </van-radio>
                  <van-radio name="0">否</van-radio>
                </van-radio-group>
              </div>
            </div>
            <div class="chunk">
              <div>产期缺氧：</div>
              <div class="right-content p-lr">
                <van-radio-group v-model="userInfo.isHypoxia" direction="horizontal">
                  <van-radio name="1">是</van-radio>
                  <van-radio name="2">否</van-radio>
                </van-radio-group>
              </div>
            </div>
            <div class="chunk">
              <div>是否有过新生儿特护病房(NICU)：</div>
              <div class="right-content p-lr radio-flex">
                <van-radio-group v-model="userInfo.isNICU" direction="horizontal">
                  <van-radio name="1">
                    <div class="chunk">
                      <span>是，住</span>
                      <div class="text">
                        <el-input v-model="userInfo.isNICUDay" @blur="inputBlur"
                  @focus="inputFocus"></el-input>
                      </div>
                      <span>天，原因</span>
                      <div class="text right-content">
                        <el-input v-model="userInfo.isNICUreason" @blur="inputBlur"
                  @focus="inputFocus"></el-input>
                      </div>
                    </div>
                  </van-radio>
                  <van-radio name="0">否</van-radio>
                </van-radio-group>
              </div>
            </div>
            <div class="chunk">
              <div>婴儿出生是否黄疸：</div>
              <div class="right-content p-lr">
                <van-radio-group v-model="userInfo.isJaundice" direction="horizontal">
                  <van-radio name="1">是</van-radio>
                  <van-radio name="0">否</van-radio>
                </van-radio-group>
              </div>
            </div>
            <div class="chunk">
              <div style="padding-left:2em">第</div>
              <div class="text">
                <el-input v-model="userInfo.JaundiceDay" @blur="inputBlur"
                  @focus="inputFocus"></el-input>
              </div>
              <div class="text-c">天出现，需要</div>
              <div class="text">
                <el-input v-model="userInfo.JaundiceIsIllumination" @blur="inputBlur"
                  @focus="inputFocus"></el-input>
              </div>
              <div class="text-c">照光</div>
              <div class="text">
                <el-input v-model="userInfo.JaundiceIlluminationDay" @blur="inputBlur"
                  @focus="inputFocus"></el-input>
              </div>
              <div class="text-c">天，</div>
              <div class="text">
                <el-input v-model="userInfo.JaundiceExchangeBlood" @blur="inputBlur"
                  @focus="inputFocus"></el-input>
              </div>
              <div class="text-c">换血</div>
              <div class="text right-content">
                <el-input v-model="userInfo.JaundiceExchangeBloodDetail" @blur="inputBlur"
                  @focus="inputFocus"></el-input>
              </div>
            </div>
          </div>
        </div>
        <div class="common-wrapper">
          <div class="title">家族史</div>
          <div class="content-wrapper">
            <div class="chunk">
              <div class="right-content m-r al-top">
                <div class="chunk">
                  <div class="no-shrink">家族成员中是否有听障：</div>
                  <div class="right-content">
                    <van-radio-group v-model="userInfo.hasFamilyOtopathy" direction="horizontal">
                      <van-radio name="1">有</van-radio>
                      <van-radio name="0">无</van-radio>
                    </van-radio-group>
                  </div>
                </div>
                <div class="chunk mt-12">
                  <div class="no-shrink">发病时间：</div>
                  <div class="calendar">
                    <el-date-picker
                      :editable="false"
                      v-model="userInfo.familyOtopathyFindTime"
                      type="month"
                      value-format="yyyy-MM"
                    ></el-date-picker>
                  </div>
                </div>
              </div>
              <div class="right-content">
                <div class="chunk">
                  <div class="no-shrink">与患者关系：</div>
                  <div class="right-content dropdown krl_relaction" @click="showDiolog()">
                    <div
                      v-if="this.relationships[this.relation_sign] != undefined"
                    >{{this.relationships[this.relation_sign].value}}</div>
                    <div v-else></div>
                    <div class="dropdown_icon"></div>
                  </div>
                  <!-- <div class="right-content dropdown"></div> -->
                </div>
                <div class="chunk mt-12">
                  <div class="no-shrink">描述：</div>
                  <div class="right-content">
                    <el-input
                      v-model="userInfo.familyOtopathyDetail"
                      rows="1"
                      type="textarea"
                      @blur="inputBlur"
                  @focus="inputFocus"
                    ></el-input>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-14">后天性耳聋高危因素</div>
            <div class="bgc p mt-12">
              <van-checkbox-group v-model="userInfo.acquiredFactors" direction="horizontal">
                <van-checkbox name="1" shape="square">高烧</van-checkbox>
                <van-checkbox name="2" shape="square">中耳炎</van-checkbox>
                <van-checkbox name="3" shape="square">使用耳聋性药物</van-checkbox>
                <van-checkbox name="4" shape="square">流行性传染病</van-checkbox>
                <van-checkbox name="5" shape="square">产伤</van-checkbox>
                <van-checkbox name="6" shape="square">噪音性</van-checkbox>
                <van-checkbox name="7" shape="square">其他</van-checkbox>
                <van-checkbox name="8" shape="square">严重头部外伤</van-checkbox>
                <van-checkbox name="9" shape="square">先天性</van-checkbox>
              </van-checkbox-group>
            </div>
            <div class="mt-14">耳聋基因检测结果：</div>
            <div class="bgc p mt-12">
              <van-checkbox-group v-model="userInfo.geneResults" direction="horizontal">
                <van-checkbox name="1" shape="square">GJB2</van-checkbox>
                <van-checkbox name="2" shape="square">GJB3</van-checkbox>
                <van-checkbox name="3" shape="square">12SrRNA</van-checkbox>
                <van-checkbox name="4" shape="square">SLCA4</van-checkbox>
                <van-checkbox name="5" shape="square">未查</van-checkbox>
                <van-checkbox name="6" shape="square">其他</van-checkbox>
                <van-checkbox name="7" shape="square">纯和突变</van-checkbox>
                <van-checkbox name="8" shape="square">杂合突变</van-checkbox>
                <van-checkbox name="9" shape="square">正常(野生型)</van-checkbox>
              </van-checkbox-group>
            </div>
            <div class="mt-14">内耳形态评估：</div>
            <div class="chunk mt-12">
              <div>HR-CT：</div>
              <div class="right-content m-r">
                <el-input
                  v-model="userInfo.HRCT"
                  rows="1"
                  type="textarea"
                  @blur="inputBlur"
                  @focus="inputFocus"
                ></el-input>
              </div>
              <div>HR-MRJ：</div>
              <div class="right-content">
                <el-input
                  v-model="userInfo.HRMRJ"
                  rows="1"
                  type="textarea"
                  @blur="inputBlur"
                  @focus="inputFocus"
                ></el-input>
              </div>
            </div>
          </div>
        </div>
      </van-form>
    </div>
    <div @click="save()">
      <save-button></save-button>
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" class="dialogModal" width="500px">
      <div class="options_case">
        <div
          v-for="(item, index) in relationships"
          :key="index"
          class="chunk"
          :class="index == relation_sign ? 'sign' : ''"
          @click="choiseRelation(index)"
        >{{item.title}}</div>
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
      name: "",
      radio: "",
      checkbox: [],
      show: false,
      dialogVisible: false,
      relationships: [],
      relation_sign: -1,
      userInfo: {
        pregnantIsInfected: "",
        pregnantInfectedWeek: "",
        pregnantInfectedVirus: [],
        pregnantInfectedVirusTitle: "",
        pregnantMedicine: [],
        pregnantMedicineTitle: "",
        otherSymptom: [],
        otherSymptomTitle: "",
        pregnancyWeek: "",
        birthWeight: "",
        isOxygen: "",
        isOxygenTitle: "",
        isHypoxia: "",
        isNICU: "",
        isNICUDay: "",
        isNICUreason: "",
        isJaundice: "",
        JaundiceDay: "",
        JaundiceIsIllumination: "",
        JaundiceIlluminationDay: "",
        JaundiceExchangeBlood: "",
        JaundiceExchangeBloodDetail: "",
        hasFamilyOtopathy: "",
        familyOtopathyRelation: "",
        familyOtopathyFindTime: "",
        familyOtopathyDetail: "",
        acquiredFactors: [],
        geneResults: [],
        HRMRJ: "",
        HRCT: "",
      },
    };
  },
  created() {
    this.init();
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
  methods: {
    onSubmit() {
      // console.log("submit", values);
    },
    showPopup() {
      this.show = true;
    },
    init() {
      this.getUserInfo();
      this.getDataDictionaryForRelation("relationship");
    },
    // 获取数据字典-关系
    getDataDictionaryForRelation(e) {
      api
        .postFormAPI("common/getDicByKey", {
          key: e,
        })
        .then((res) => {
          if (res.data.result == "1") {
            this[e + "s"] = res.data.data;
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    showDiolog() {
      this.dialogVisible = true;
    },
    // 选中关系
    choiseRelation(e) {
      this.relation_sign = e;
      this.userInfo.familyOtopathyRelation = this.relationships[e].key;
      this.dialogVisible = false;
    },
    getUserInfo() {
      api
        .postFormAPI("patientPh/getInfo", {
          recordId: localStorage.getItem("recordId"),
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.result == "1") {
            const data = res.data.data;
            for (let key in this.userInfo) {
              if (data.hasOwnProperty(key)) {
                switch (key) {
                  case "pregnantInfectedVirus":
                  case "pregnantMedicine":
                  case "otherSymptom":
                  case "acquiredFactors":
                  case "geneResults":
                    {
                      data[key] = data[key].split(",");
                    }
                    break;
                  case "familyOtopathyRelation":
                    {
                      api
                        .postFormAPI("common/getDicByKey", {
                          key: "relationship",
                        })
                        .then((res) => {
                          // console.log(res);
                          if (res.data.result == "1") {
                            const relation = res.data.data;
                            for (let i = 0; i < relation.length; i++) {
                              if (relation[i].key == data[key]) {
                                this.relation_sign = i;
                                break;
                              }
                            }
                          }
                          //数据处理
                        })
                        .catch((err) => console.log(err));
                    }
                    break;
                  case "familyOtopathyFindTime":
                    {
                      data[key] == "0" ? (data[key] = "") : "";
                    }
                    break;
                }
                this.userInfo[key] = data[key];
              }
            }
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    save() {
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
          case "pregnantIsInfected":
            if (this.userInfo[key] != 1) {
              this.userInfo.pregnantInfectedWeek = "";
            }
            if (
              this.userInfo[key] == 1 &&
              this.userInfo.pregnantInfectedWeek == ""
            ) {
              this.$notify({
                message: "请填写孕期受到病毒感染第几周",
              });
              return false;
            }
            break;
          case "isOxygen":
            if (this.userInfo[key] == 1 && this.userInfo.isOxygenTitle == "") {
              this.$notify({
                message: "请填写产程中是否使用产钳或真空吸引器，是否有吸氧备注",
              });
              return false;
            }
            break;
          case "isNICU":
            if (this.userInfo[key] == 1 && this.userInfo.isNICUDay == "") {
              this.$notify({
                message: "请填写有过新生儿特护病房天数",
              });
              return false;
            }
            if (this.userInfo[key] == 1 && this.userInfo.isNICUreason == "") {
              this.$notify({
                message: "请填写有过新生儿特护病房备注",
              });
              return false;
            }
            break;
          case "isJaundice":
            if (this.userInfo[key] == 1 && this.userInfo.JaundiceDay == "") {
              this.$notify({
                message: "请填写婴儿出生第几天出现黄疸",
              });
              return false;
            }
            if (
              this.userInfo[key] == 1 &&
              this.userInfo.JaundiceIsIllumination == ""
            ) {
              this.$notify({
                message: "请填写婴儿黄疸照光备注",
              });
              return false;
            }
            if (
              this.userInfo[key] == 1 &&
              this.userInfo.JaundiceIlluminationDay == ""
            ) {
              this.$notify({
                message: "请填写婴儿黄疸照光天数",
              });
              return false;
            }
            if (
              this.userInfo[key] == 1 &&
              this.userInfo.JaundiceExchangeBlood == ""
            ) {
              this.$notify({
                message: "请填写婴儿黄疸换血备注1",
              });
              return false;
            }
            if (
              this.userInfo[key] == 1 &&
              this.userInfo.JaundiceExchangeBloodDetail == ""
            ) {
              this.$notify({
                message: "请填写婴儿黄疸换血备注2",
              });
              return false;
            }
            break;
          default:
        }
      }
      api
        .postFormAPI("patientPh/submit", row)
        .then((res) => {
          if (res.data.result == "1") {
            this.$router.replace({
              name: "childRecoveryCase",
            });

          }
          this.$notify({
            message: res.data.message,
          });
        })
        .catch((err) => console.log(err));
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
        .postFormAPI("patientPh/submit", row)
        .then((res) => {
          if (res.data.result == "1") {

          }
        })
        .catch((err) => console.log(err));
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
.childOldCase {
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
      .van-checkbox {
        width: unset;
      }
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

  .mt-12 {
    margin-top: 12px;
  }
  .mt-14 {
    margin-top: 12px;
  }
  .chunk {
    display: flex;
    align-items: center;
    .left-label {
      width: 146px;
      margin-right: 20px;
      flex-shrink: 0;
    }
    .right-content {
      flex-grow: 1;
    }
    .m-r {
      margin-right: 34px;
    }
  }
  .text {
    width: 48px;
    margin: 0 8px;
  }

  .bgc {
    background-color: #f3f3f3;
  }
  .p {
    padding: 6px 12px;
  }
  .p-lr {
    padding: 0px 12px;
  }
  .dropdown {
    height: 30px;
  }
  .no-shrink {
    flex-shrink: 0;
  }
  .al-top {
    align-self: flex-start;
  }
  .text-c {
    color: #646464;
  }
  .calendar {
    width: 100%;
    display: flex;
    flex-grow: 1;
    align-items: center;
  }
}
</style>

<style lang="scss">
@import "../../../../assets/css/vanform.css";
.childOldCase {
  .calendar {
    .el-input__inner {
      font-size: 18px;
      border: unset;
      color: #646464;
      height: 32px;
    }
    .el-input__icon {
      line-height: 32px;
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

  .radio-flex .van-radio {
    &:not(:last-of-type) {
      flex-grow: 1;
    }
  }
  .radio-flex .van-radio__label {
    flex-grow: 1;
  }
  .dropdown_icon {
    // right: 8px;
    width: 16px;
    height: 10px;
    background: url("../../../../assets/images/icon_more@2x.png") center/cover;
  }
  .krl_relaction {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    padding: 0 8px;
  }
  .right-content .van-checkbox-group {
    margin: 4px 0;
  }
  .checkwithinput_case .van-checkbox {
    margin-right: 0px;
    padding-right: 10px;
  }
  .el-textarea__inner,
  .el-input__inner {
    padding: 6px;
    font-size: 18px;
  }
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
</style>
