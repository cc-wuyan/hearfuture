<template>
  <div class="childCurrentCase">
    <div class="contain">
      <van-form @submit="onSubmit">
        <div class="common-wrapper">
          <div class="title">听力损失病史</div>
          <div class="content-wrapper">
            <div class="chunk">
              <div class="left-label">发现听力损失的年龄：</div>
              <div class="right-content">
                <van-checkbox-group v-model="userInfo.childrenFindTime" direction="horizontal">
                  <van-checkbox @click="checkRatio('childrenFindTime', '1')" name="1">&lt;3月</van-checkbox>
                  <van-checkbox @click="checkRatio('childrenFindTime', '2')" name="2">3月-6月</van-checkbox>
                  <van-checkbox @click="checkRatio('childrenFindTime', '3')" name="3">6月-1岁</van-checkbox>
                  <van-checkbox @click="checkRatio('childrenFindTime', '4')" name="4">3岁-6岁</van-checkbox>
                  <van-checkbox @click="checkRatio('childrenFindTime', '5')" name="5">6岁以上</van-checkbox>
                </van-checkbox-group>
              </div>
            </div>
            <div class="chunk m">
              <div class="left-label">
                <span>听力残疾等级</span>
                <br />
                <span>(听力损失dB):</span>
              </div>
              <div class="right-content radio-w">
                <van-checkbox-group v-model="userInfo.childrenDisabilityLevel" direction="horizontal">
                  <van-checkbox @click="checkRatio('childrenDisabilityLevel', '1')" name="1">一级聋(听力损失&gt;90dB)</van-checkbox>
                  <van-checkbox @click="checkRatio('childrenDisabilityLevel', '2')" name="2">二级聋(听力损失71-90dB)</van-checkbox>
                  <van-checkbox @click="checkRatio('childrenDisabilityLevel', '3')" name="3">一级重听(听力损失56-70dB)</van-checkbox>
                  <van-checkbox @click="checkRatio('childrenDisabilityLevel', '4')" name="4">二级重听(听力损失40-55dB)</van-checkbox>
                  <van-checkbox @click="checkRatio('childrenDisabilityLevel', '5')" name="5">听力未查</van-checkbox>
                  <van-checkbox @click="checkRatio('childrenDisabilityLevel', '6')" name="6">
                    <el-input v-model="userInfo.childrenDisabilityLevelTitle"></el-input>
                  </van-checkbox>
                </van-checkbox-group>
              </div>
            </div>
            <div class="chunk">
              <div class="left-label">语训前语言能力：</div>
              <div class="right-content radio-w">
                <van-checkbox-group v-model="userInfo.childrenLanguageAbility" direction="horizontal">
                  <van-checkbox @click="checkRatio('childrenLanguageAbility', '1')" name="1">不会说话</van-checkbox>
                  <van-checkbox @click="checkRatio('childrenLanguageAbility', '2')" name="2">只会说几个单词</van-checkbox>
                  <van-checkbox @click="checkRatio('childrenLanguageAbility', '3')" name="3">只会说少数几句</van-checkbox>
                  <van-checkbox @click="checkRatio('childrenLanguageAbility', '4')" name="4">基本能交谈但语音不清</van-checkbox>
                </van-checkbox-group>
              </div>
            </div>
          </div>
        </div>
      </van-form>
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
        childrenFindTime: [],
        childrenDisabilityLevel: [],
        childrenLanguageAbility: [],
        childrenDisabilityLevelTitle: "",
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
    onSubmit(values) {
      console.log("submit", values);
    },
    init() {
      this.getUserInfo();
    },
    getUserInfo() {
      api
        .postFormAPI("patientHpi/getInfo", {
          recordId: localStorage.getItem("recordId"),
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.result == "1") {
            const data = res.data.data;
            for (let key in this.userInfo) {
              if (data.hasOwnProperty(key)) {
                switch (key) {
                  case "childrenFindTime":
                  case "childrenDisabilityLevel":
                  case "childrenLanguageAbility":
                    {
                      data[key] = data[key].split(",");
                    }
                    break;
                }
                this.userInfo[key] = data[key];
              }
            }
          }
        })
        .catch((err) => console.log(err));
    },
    save() {
      for (let key in this.userInfo) {
        switch (key) {
          case "childrenDisabilityLevel":
            if (
              this.userInfo[key] == 6 &&
              this.userInfo.childrenDisabilityLevelTitle == ""
            ) {
              this.$notify({
                message: "请填写听力残疾等级备注",
              });
              return false;
            }
            break;
          default:
        }
      }
      let userInfo = JSON.parse(JSON.stringify(this.userInfo));
      api
        .postFormAPI("patientHpi/submit", {
          childrenFindTime: userInfo.childrenFindTime.join(","),
          childrenDisabilityLevel: userInfo.childrenDisabilityLevel.join(","),
          childrenLanguageAbility: userInfo.childrenLanguageAbility.join(","),
          childrenDisabilityLevelTitle: userInfo.childrenDisabilityLevelTitle,
          sid: localStorage.getItem("sid"),
          recordId: localStorage.getItem("recordId"),
        })
        .then((res) => {
          if (res.data.result == "1") {
            this.$router.replace({
              name: "childOldCase",
            });

          }
          this.$notify({
            message: res.data.message,
          });
        })
        .catch((err) => console.log(err));
    },
    onSaveNoMsg() {
      let userInfo = JSON.parse(JSON.stringify(this.userInfo));
      api
        .postFormAPI("patientHpi/submit", {
          childrenFindTime: userInfo.childrenFindTime.join(","),
          childrenDisabilityLevel: userInfo.childrenDisabilityLevel.join(","),
          childrenLanguageAbility: userInfo.childrenLanguageAbility.join(","),
          childrenDisabilityLevelTitle: userInfo.childrenDisabilityLevelTitle,
          sid: localStorage.getItem("sid"),
          recordId: localStorage.getItem("recordId"),
        })
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
.childCurrentCase {
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
  .chunk {
    display: flex;
    align-items: center;
    .left-label {
      width: 116px;
      margin-right: 20px;
      flex-shrink: 0;
    }
    .right-content {
      flex-grow: 1;
      background-color: #f3f3f3;
      padding: 6px 12px;
    }
  }
  .m {
    margin-top: 14px;
    margin-bottom: 14px;
  }
}
</style>
<style lang="scss">
@import "../../../../assets/css/vanform.css";
.childCurrentCase {
  .right-content .van-radio,
  .right-content .van-radio-group {
    flex-grow: 1;
  }
  .radio-w .van-radio {
    width: 240px;
  }
  .el-textarea__inner,
  .el-input__inner {
    padding: 6px;
    font-size: 18px;
  }
}
</style>