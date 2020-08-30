<template>
  <div class="commissioningInspection">
    <div class="title">100天三调两评</div>
    <div class="chunk">
      <div class="flex_row">
        <div>第一次调试+第一次评估</div>
        <el-date-picker
          :editable="false"
          v-model="times.firstCheck"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>
      <div class="content_chunk">
        <div>取机时：</div>
        <br />
        <div>
          1.验配师根据患者听力学数据和个性化响度需求，编写相关参数和程序设置，进行第一次调试；
          <br />
          <br />2.进行第一次评估，验证数量与言语清晰度；
          <br />
          <br />3.开展家庭康复课堂第一课。
        </div>
      </div>
    </div>
    <div class="chunk">
      <div class="flex_row">
        <div>第二次调试</div>
        <el-date-picker
          :editable="false"
          v-model="times.secondCheck"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>
      <div class="content_chunk">
        <div>
          佩戴后10-15天：
          <br />
          <br />根据患者受益度调查表及患者使用记录表，进行第二次精细调试。
        </div>
      </div>
    </div>
    <div class="chunk">
      <div class="flex_row">
        <div>第三次调试</div>
        <el-date-picker
          :editable="false"
          v-model="times.thirdCheck"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>
      <div class="content_chunk">
        <div>
          佩戴后30-45天：
          <br />
          <br />1.根据患者受益度调查表及患者使用记录表，进行第三次精细调试；
          <br />
          <br />2.进行家庭康复课堂第二课。
        </div>
      </div>
    </div>
    <div class="chunk">
      <div class="flex_row">
        <div>第二次评估</div>
        <el-date-picker
          :editable="false"
          v-model="times.secondAssessment"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>
      <div class="content_chunk">
        <div>
          佩戴后90-100天：
          <br />
          <br />1.根据患者受益度调查表及患者使用记录表，进行第二次评估，验证物理康复和生理康复结果；
          <br />
          <br />2.进行家庭康复课堂第二课。
        </div>
      </div>
    </div>
    <div class="save_btn" @click="save()"></div>
    <div class="back_btn" @click="toBack()"></div>
  </div>
</template>

<script>
import api from "../../../api/api";
import commom from "../../../utils/common";

export default {
  data() {
    return {
      // 复诊时间
      times: {
        firstCheck: "",
        secondCheck: "",
        thirdCheck: "",
        secondAssessment: "",
      },
    };
  },
  created() {
    // 获取复诊时间
    this.getFormData("privateService/setting", "times", {
      sid: localStorage.getItem("sid"),
      recordId: localStorage.getItem("recordId"),
      patientId: localStorage.getItem("patientId"),
    });
  },
  methods: {
    getFormData(url, field, query) {
      api
        .postFormAPI(url, query)
        .then((res) => {
          if (res.data.result != 1) {
            return;
          }
          const data = res.data.data;
          for (const key in this[field]) {
            if (data.hasOwnProperty(key)) {
              this[field][key] = data[key];
            }
          }

          //数据处理
        })
        .catch((err) => console.log(err));
    },
    save() {
      let data = {
        recordId: localStorage.getItem("recordId"),
        patientId: localStorage.getItem("patientId"),
      };
      data = Object.assign(this.times, data);
      api
        .postFormAPI("privateService/settingSave", data)
        .then((res) => {
          if (res.data.result != 1) {
            this.$notify({
              message: res.data.message,
            });
            return;
          }
          let _this = this;
          this.$notify({
            message: "保存成功",
            duration: 2000,
            onClose() {
              console.log(_this.$router);
              _this.$router.push({ path: "/healthConsultant" });
            },
          });
          this.nativeCall({ index: 20 }, "updateStep");

          //数据处理
        })
        .catch((err) => console.log(err));
    },
    toBack() {
      commom(this);
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
};
</script>

<style lang="scss" scoped>
.commissioningInspection {
  margin: 30px 30px 20px;
  overflow: hidden;
  .title {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }
  .chunk {
    margin: 24px 0;
    .flex_row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .content_chunk {
      border-radius: 6px;
      background-color: #f6f6f6;
      padding: 14px 20px;
      margin-top: 14px;
    }
    .content {
      color: #7d7d7d;
      line-height: 24px;
      margin-top: 10px;
    }
  }
  .save_btn,
  .back_btn {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-left: auto;
    margin-right: 0;
    background: url("../../../assets/image/btn/icon_btn_save@2x.png") no-repeat
      center/contain;
  }
  .back_btn {
    background: url("../../../assets/image/btn/icon_btn_back@2x.png") no-repeat
      center/contain;
  }
}
</style>

<style lang="scss">
.commissioningInspection {
  .el-input__inner {
    height: 38px;
    font-size: 18px;
  }
}
</style>