<template>
  <div class="reviewCase">
    <div class="contain">
      <div class="common-wrapper">
        <div class="title">复诊病历</div>
        <div class="content-wrapper">
          <div class="chunk">
            <div class="label">主 诉：</div>
            <div class="right-chunk">
              <van-field v-model="mainDetails" autosize type="textarea" rows="3" />
            </div>
          </div>
          <div class="chunk mt">
            <div class="label">问 诊：</div>
            <div class="right-chunk">
              <van-field v-model="detail" autosize type="textarea" rows="3" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="save-btn" @click="onSave"></div>
  </div>
</template>

<script>
import api from "../../api/api";

export default {
  data() {
    return {
      detail: "",
      mainDetails: "",
    };
  },
  created() {},
  methods: {
    onSave() {
      let userInfo = {
        detail: this.detail.trim(),
        mainDetails: this.mainDetails.trim(),
      };
      let row = {
        sid: localStorage.getItem("sid"),
        recordId: localStorage.getItem("recordId"),
      };
      for (let key in userInfo) {
        if (userInfo[key].trim() != "") {
          row[key] = userInfo[key].trim();
        }
      }
      api
        .postFormAPI("patientReturnvisit/submit", row)
        .then((res) => {
          if (res.data.result == "1") {
            this.$notify({
              message: res.data.message,
            });
            this.nativeCall({ index: 4 }, "updateStep");
            this.$router.push("editResult");
          } else {
            this.$notify({
              message: res.data.message,
            });
          }
        })
        .catch((res) => console.log(err));
    },
    nativeCall(param, nativeMethodName) {
      // console.log(param);
      // console.log(nativeMethodName);
      param = this.queryParams(param);
      // console.log(param);

      document.location = "js://" + nativeMethodName + "?" + param;
    },
    queryParams(data, isPrefix = false) {
      console.log(data);
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
  },
};
</script>

<style lang="scss" scoped>
.reviewCase {
  color: #212121;
  .contain {
    margin: 30px 30px;
    margin-bottom: 80px;
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
    .label {
      width: 70px;
    }
    .right-chunk {
      flex-grow: 1;
    }
  }
  .mt {
    margin-top: 24px;
  }
  .save-btn {
    width: 80px;
    height: 80px;
    background: url("../../assets/image/btn/icon_btn_save@2x.png") no-repeat
      center/contain;
    color: #fff;
    position: fixed;
    border-radius: 50%;
    bottom: 100px;
    right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      font-size: 14px;
      width: 90%;
      text-align: center;
    }
  }
}
</style>

<style lang="scss">
@import "../../assets/css/vanform.css";
</style>