<template>
  <div class="adultObservation">
    <div class="contain">
      <div class="common-wrapper">
        <div class="space title">检查</div>
        <div class="content-wrapper">
          <div class="chrunk">
            <div class="label">一般检查：</div>
            <div class="flex-row">
              <div class="flex-case">
                <div class="name">身高</div>
                <div class="text">
                  <el-input v-model="userInfo.height"></el-input>
                </div>
                <div class="unit">CM</div>
              </div>
              <div class="flex-case">
                <div class="name">体重</div>
                <div class="text">
                  <el-input v-model="userInfo.weight"></el-input>
                </div>
                <div class="unit">KG</div>
              </div>
            </div>
          </div>
          <div class="chrunk">
            <div class="label">视 力：</div>
            <div class="flex-row">
              <div class="flex-case">
                <div class="name">左</div>
                <div class="text">
                  <el-input v-model="userInfo.leftVision"></el-input>
                </div>
                <div class="unit"></div>
              </div>
              <div class="flex-case">
                <div class="name">右</div>
                <div class="text">
                  <div class="text">
                    <el-input v-model="userInfo.rightVision"></el-input>
                  </div>
                </div>
                <div class="unit"></div>
              </div>
            </div>
          </div>
          <div class="chrunk">
            <div class="label top">乳 突：</div>
            <div class="check-wrapper">
              <div class="content">
                <div class="img-left"></div>
                <div class="checkbox">
                  <van-checkbox-group v-model="userInfo.leftMastoid" direction="horizontal">
                    <van-checkbox
                      name="0"
                      shape="square"
                      @click="userInfo.leftMastoid.indexOf('0')!=-1?userInfo.leftMastoid=['0']:userInfo.leftMastoid=[]"
                    >无</van-checkbox>
                    <van-checkbox
                      name="1"
                      shape="square"
                      :disabled="userInfo.leftMastoid.indexOf('0')!=-1?true:false"
                    >红肿</van-checkbox>
                    <van-checkbox
                      name="2"
                      shape="square"
                      :disabled="userInfo.leftMastoid.indexOf('0')!=-1?true:false"
                    >压痛</van-checkbox>
                    <van-checkbox
                      name="3"
                      shape="square"
                      :disabled="userInfo.leftMastoid.indexOf('0')!=-1?true:false"
                    >疤痕</van-checkbox>
                  </van-checkbox-group>
                </div>
                <div class="other">
                  <el-input v-model="userInfo.leftMastoidDetail"></el-input>
                </div>
              </div>
              <div class="content">
                <div class="img-right"></div>
                <div class="checkbox">
                  <van-checkbox-group v-model="userInfo.rightMastoid" direction="horizontal">
                    <van-checkbox
                      name="0"
                      shape="square"
                      @click="userInfo.rightMastoid.indexOf('0')!=-1?userInfo.rightMastoid=['0']:userInfo.rightMastoid=[]"
                    >无</van-checkbox>
                    <van-checkbox
                      name="1"
                      shape="square"
                      :disabled="userInfo.rightMastoid.indexOf('0')!=-1?true:false"
                    >红肿</van-checkbox>
                    <van-checkbox
                      name="2"
                      shape="square"
                      :disabled="userInfo.rightMastoid.indexOf('0')!=-1?true:false"
                    >压痛</van-checkbox>
                    <van-checkbox
                      name="3"
                      shape="square"
                      :disabled="userInfo.rightMastoid.indexOf('0')!=-1?true:false"
                    >疤痕</van-checkbox>
                  </van-checkbox-group>
                </div>
                <div class="other">
                  <el-input v-model="userInfo.rightMastoidDetail"></el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="chrunk">
            <div class="label top">耳 廓：</div>
            <div class="check-wrapper">
              <div class="content">
                <div class="img-left"></div>
                <div class="flex-col">
                  <div class="checkbox">
                    <van-checkbox-group v-model="userInfo.leftAuricle" direction="horizontal">
                      <van-checkbox
                        name="10"
                        shape="square"
                        @click="userInfo.leftAuricle.indexOf('10')!=-1?userInfo.leftAuricle=['10']:userInfo.leftAuricle=[]"
                      >无</van-checkbox>
                      <van-checkbox
                        name="1"
                        shape="square"
                        :disabled="userInfo.leftAuricle.indexOf('10')!=-1?true:false"
                      >畸形</van-checkbox>
                      <van-checkbox
                        name="2"
                        shape="square"
                        :disabled="userInfo.leftAuricle.indexOf('10')!=-1?true:false"
                      >瘘管</van-checkbox>
                      <van-checkbox
                        name="3"
                        shape="square"
                        :disabled="userInfo.leftAuricle.indexOf('10')!=-1?true:false"
                      >皮疹</van-checkbox>
                      <van-checkbox
                        name="4"
                        shape="square"
                        :disabled="userInfo.leftAuricle.indexOf('10')!=-1?true:false"
                      >糜烂</van-checkbox>
                      <van-checkbox
                        name="8"
                        shape="square"
                        :disabled="userInfo.leftAuricle.indexOf('10')!=-1?true:false"
                      >牵拉痛</van-checkbox>
                      <van-checkbox
                        name="5"
                        shape="square"
                        :disabled="userInfo.leftAuricle.indexOf('10')!=-1?true:false"
                      >红肿</van-checkbox>
                      <van-checkbox
                        name="6"
                        shape="square"
                        :disabled="userInfo.leftAuricle.indexOf('10')!=-1?true:false"
                      >血肿</van-checkbox>
                      <van-checkbox
                        name="7"
                        shape="square"
                        :disabled="userInfo.leftAuricle.indexOf('10')!=-1?true:false"
                      >压痛</van-checkbox>
                      <van-checkbox
                        name="9"
                        shape="square"
                        :disabled="userInfo.leftAuricle.indexOf('10')!=-1?true:false"
                      >耳周围淋巴结肿大</van-checkbox>
                    </van-checkbox-group>
                  </div>
                  <div class="other">
                    <el-input
                      v-model="userInfo.leftAuricleDetail"
                      @click.native="focusSelect('左耳廓症状','leftAuricleDetail')"
                    ></el-input>
                  </div>
                </div>
              </div>
              <div class="content">
                <div class="img-right"></div>
                <div class="flex-col">
                  <div class="checkbox">
                    <van-checkbox-group v-model="userInfo.rightAuricle" direction="horizontal">
                      <van-checkbox
                        name="10"
                        shape="square"
                        @click="userInfo.rightAuricle.indexOf('10')!=-1?userInfo.rightAuricle=['10']:userInfo.rightAuricle=[]"
                      >无</van-checkbox>
                      <van-checkbox
                        name="1"
                        shape="square"
                        :disabled="userInfo.rightAuricle.indexOf('10')!=-1?true:false"
                      >畸形</van-checkbox>
                      <van-checkbox
                        name="2"
                        shape="square"
                        :disabled="userInfo.rightAuricle.indexOf('10')!=-1?true:false"
                      >瘘管</van-checkbox>
                      <van-checkbox
                        name="3"
                        shape="square"
                        :disabled="userInfo.rightAuricle.indexOf('10')!=-1?true:false"
                      >皮疹</van-checkbox>
                      <van-checkbox
                        name="4"
                        shape="square"
                        :disabled="userInfo.rightAuricle.indexOf('10')!=-1?true:false"
                      >糜烂</van-checkbox>
                      <van-checkbox
                        name="8"
                        shape="square"
                        :disabled="userInfo.rightAuricle.indexOf('10')!=-1?true:false"
                      >牵拉痛</van-checkbox>
                      <van-checkbox
                        name="5"
                        shape="square"
                        :disabled="userInfo.rightAuricle.indexOf('10')!=-1?true:false"
                      >红肿</van-checkbox>
                      <van-checkbox
                        name="6"
                        shape="square"
                        :disabled="userInfo.rightAuricle.indexOf('10')!=-1?true:false"
                      >血肿</van-checkbox>
                      <van-checkbox
                        name="7"
                        shape="square"
                        :disabled="userInfo.rightAuricle.indexOf('10')!=-1?true:false"
                      >压痛</van-checkbox>
                      <van-checkbox
                        name="9"
                        shape="square"
                        :disabled="userInfo.rightAuricle.indexOf('10')!=-1?true:false"
                      >耳周围淋巴结肿大</van-checkbox>
                    </van-checkbox-group>
                  </div>
                  <div class="other">
                    <el-input
                      v-model="userInfo.rightAuricleDetail"
                      @click.native="focusSelect('右耳廓症状','rightAuricleDetail')"
                    ></el-input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
        height: "",
        weight: "",
        leftVision: "",
        rightVision: "",
        leftMastoid: [],
        leftMastoidDetail: "",
        rightMastoid: [],
        rightMastoidDetail: "",
        leftAuricle: [],
        leftAuricleDetail: "",
        rightAuricle: [],
        rightAuricleDetail: "",
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
      .postFormAPI("patientObservations/getInfo", {
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
              case "leftMastoid":
              case "rightMastoid":
              case "leftAuricle":
              case "rightAuricle":
                {
                  data[key] != ""
                    ? (data[key] = data[key].split(","))
                    : (data[key] = []);
                }
                break;
            }
            this.userInfo[key] = data[key];
          }
        }
      });
  },
  methods: {
    showDiolog(list) {
      this.select = this[list + "List"];
      this.dialogVisible = true;
    },
    choise(index) {
      this[this.select.name + "List"].index = index;
      this.userInfo[this.select.name] = this.select.list[index];
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
          this.userInfo[key] == "" ? "" : (row[key] = this.userInfo[key]);
        }
      }

      api
        .postFormAPI("patientObservations/submit", row)
        .then((res) => {
          if (res.data.result == "1") {
            this.nativeCall({ index: 4 }, "updateStep");
          }
          this.$notify({
            message: res.data.message,
          });
          //数据处理
        })
        .catch((err) => console.log("err", err));
      this.nativeCall({}, "entryHisResult");
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
          this.userInfo[key] == "" ? "" : (row[key] = this.userInfo[key]);
        }
      }

      api
        .postFormAPI("patientObservations/submit", row)
        .then((res) => {
          if (res.data.result == "1") {
            this.nativeCall({ index: 4 }, "updateStep");
          }
          //数据处理
        })
        .catch((err) => console.log("err", err));
    },

    // 弹出框选择选项后
    choiseRelation(index) {
      if (this.changeVal == "time") {
        this.userInfo.familyOtopathyFindTime = this.timeVal[index].key;
        this.timeRelation_sign = index;
      } else {
        this.relation_sign = index;
        this.userInfo.familyOtopathyRelation = this.relationships[index].key;
      }
      this.dialogVisible = false;
    },
    // 点击弹出选择框
    async focusSelect(title, key) {
      this.labelList = [];
      this.selectContent = "";
      this.labelType = key;
      key = "auricleTip";
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
.adultObservation {
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
  .chrunk {
    display: flex;
    align-items: center;
    &:not(:last-child) {
      margin-bottom: 16px;
    }
    .label {
      width: 94px;
      text-align: right;
      margin-right: 24px;
      flex-shrink: 0;
    }
    .top {
      height: 100%;
      align-self: flex-start;
      margin-top: 10px;
    }
  }
  .flex-row {
    display: flex;
    flex-grow: 1;
    .flex-case {
      flex-grow: 1;
      display: flex;
      align-items: center;
      .name {
        width: 46px;
        text-align: left;
        flex-shrink: 0;
      }
      .unit {
        width: 36px;
        text-align: right;
        margin-right: 98px;
        flex-shrink: 0;
      }
      .text {
        flex-grow: 1;
        width: 20px;
        height: 36px;
        display: flex;
        align-items: center;
        color: #646464;
      }
    }
  }
  .check-wrapper {
    flex-grow: 1;
    .content {
      display: flex;
      align-items: center;
      padding: 6px;
      background-color: #f3f3f3;
      border-radius: 2px;
      &:first-child {
        margin-bottom: 12px;
      }
    }
  }
  .checkbox {
    margin-left: 6px;
  }
  .other {
    height: 100%;
    flex-grow: 1;
    & /deep/ .el-input {
      width: 180px;
    }
  }
  .flex-col {
    flex-grow: 1;

    .other {
      margin-left: 6px;
      margin-top: 6px;
    }
  }
  .dropdown {
    flex-grow: 1;
    height: 30px;
    display: flex;
    align-items: center;
    background: #fff;
    padding: 0 8px;
    justify-content: space-between;
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
}
</style>

<style lang="scss">
.adultObservation {
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
  .van-checkbox__label {
    min-width: 46px;
    margin: 4px 6px;
  }
  .dropdown_icon {
    // right: 8px;
    width: 16px;
    height: 10px;
    background: url("../../../../assets/images/icon_more@2x.png") center/cover;
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
  .el-textarea__inner,
  .el-input__inner {
    padding: 6px;
    font-size: 18px;
  }
}
</style>