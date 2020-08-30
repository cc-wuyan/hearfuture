<template>
  <div class="adultObservation">
    <div class="contain">
      <div class="common-wrapper">
        <div class="space title">检查</div>
        <div class="content-wrapper">
          <div class="chrunk">
            <div class="label top">乳 突：</div>
            <div class="check-wrapper">
              <div class="content">
                <div class="img-left"></div>
                <div class="checkbox">
                  <van-checkbox-group v-model="userInfo.leftMastoid" direction="horizontal">
                    <van-checkbox name="1" shape="square">红肿</van-checkbox>
                    <van-checkbox name="2" shape="square">压痛</van-checkbox>
                    <van-checkbox name="3" shape="square">疤痕</van-checkbox>
                    <van-checkbox name="0" shape="square">无</van-checkbox>
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
                    <van-checkbox name="1" shape="square">红肿</van-checkbox>
                    <van-checkbox name="2" shape="square">压痛</van-checkbox>
                    <van-checkbox name="3" shape="square">疤痕</van-checkbox>
                    <van-checkbox name="0" shape="square">无</van-checkbox>
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
                      <van-checkbox name="1" shape="square">畸形</van-checkbox>
                      <van-checkbox name="2" shape="square">瘘管</van-checkbox>
                      <van-checkbox name="3" shape="square">皮疹</van-checkbox>
                      <van-checkbox name="4" shape="square">糜烂</van-checkbox>
                      <van-checkbox name="5" shape="square">红肿</van-checkbox>
                      <van-checkbox name="6" shape="square">血肿</van-checkbox>
                      <van-checkbox name="7" shape="square">压痛</van-checkbox>
                      <van-checkbox name="8" shape="square">牵拉痛</van-checkbox>
                      <van-checkbox name="9" shape="square">耳周围淋巴结肿大</van-checkbox>
                      <van-checkbox name="10" shape="square">无</van-checkbox>
                    </van-checkbox-group>
                  </div>
                  <div class="other">
                    <el-input v-model="userInfo.leftAuricleDetail" type="textarea" rows="1"></el-input>
                  </div>
                </div>
              </div>
              <div class="content">
                <div class="img-right"></div>
                <div class="flex-col">
                  <div class="checkbox">
                    <van-checkbox-group v-model="userInfo.rightAuricle" direction="horizontal">
                      <van-checkbox name="1" shape="square">畸形</van-checkbox>
                      <van-checkbox name="2" shape="square">瘘管</van-checkbox>
                      <van-checkbox name="3" shape="square">皮疹</van-checkbox>
                      <van-checkbox name="4" shape="square">糜烂</van-checkbox>
                      <van-checkbox name="5" shape="square">红肿</van-checkbox>
                      <van-checkbox name="6" shape="square">血肿</van-checkbox>
                      <van-checkbox name="7" shape="square">压痛</van-checkbox>
                      <van-checkbox name="8" shape="square">牵拉痛</van-checkbox>
                      <van-checkbox name="9" shape="square">耳周围淋巴结肿大</van-checkbox>
                      <van-checkbox name="10" shape="square">无</van-checkbox>
                    </van-checkbox-group>
                  </div>
                  <div class="other">
                    <el-input v-model="userInfo.rightAuricleDetail" type="textarea" rows="1"></el-input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div @click="save()">
      <save-button></save-button>
    </div>
  </div>
</template>
<script>
import api from "../../../../api/api";
import SaveButton from "../../../components/SaveButton";
export default {
  data() {
    return {
      userInfo: {
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
  components: {
    SaveButton,
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
    init() {
      this.getUserInfo();
    },
    getUserInfo() {
      api
        .postFormAPI("patientObservations/getInfo", {
          recordId: localStorage.getItem("recordId"),
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.result == "1") {
            let initData = res.data.data;
            for (let key in this.userInfo) {
              if (initData[key]) {
                if (typeof this.userInfo[key] == "object") {
                  this.userInfo[key] = initData[key].split(",");
                } else {
                  this.userInfo[key] = initData[key];
                }
              }
            }
            // this.userInfo = res.data.data;
          }
          //数据处理
        })
        .catch((err) => console.log(err));
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
        // row[key] = this.userInfo[key];
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
        })
        .catch((err) => console.log(err));
      this.nativeCall({}, "entryHisResult");
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
        // row[key] = this.userInfo[key];
      }
      api
        .postFormAPI("patientObservations/submit", row)
        .then((res) => {
          if (res.data.result == "1") {
            this.nativeCall({ index: 4 }, "updateStep");

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
      width: 88px;
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
        height: 36px;
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
    flex-grow: 1;
    margin-left: 6px;
  }
  .other {
    height: 100%;
    flex-grow: 1;
  }
  .flex-col {
    flex-grow: 1;
    .checkbox {
      margin-bottom: 6px;
    }
    .other {
      margin-left: 6px;
    }
  }
}
</style>

<style lang="scss">
.adultObservation {
  .van-checkbox {
    margin-top: 8px;
    margin-bottom: 8px;
  }
  .el-textarea__inner,
  .el-input__inner {
    padding: 6px;
    font-size: 18px;
  }
}
</style>