<template>
  <div class="noiseTarget">
    <p class="title">康复目标</p>
    <table class="table_case">
      <tr>
        <td rowspan="2">康复阶段</td>
        <td rowspan="2" style="width: 280px;">目标与内容</td>
        <td rowspan="2">常模</td>
        <td colspan="2">期望达成的时间</td>
      </tr>
      <tr>
        <td>本人</td>
        <td>家属</td>
      </tr>
      <tr>
        <!-- <td rowspan="4">康复目标</td> -->
        <td>察知与适应</td>
        <td>
          <p>初步适应与接受</p>
          <p>一调一评</p>
          <p style="word-break: break-word;white-space: normal;">家庭康复第一课认识助听器</p>
        </td>
        <td>7-10天</td>
        <td class="day_case">
          <el-input type="number" v-model="form.adapt" placeholder></el-input>
          <span>天</span>
        </td>
        <td class="day_case">
          <el-input type="number" v-model="form.adaptReconfirm" placeholder></el-input>
          <span>天</span>
        </td>
      </tr>

      <tr>
        <td>辨别与熟练</td>
        <td>
          <p>个性化频率适应</p>
          <p>个性化场景适应</p>
          <p>第二次调试</p>
        </td>
        <td>30-45天</td>
        <td class="day_case">
          <el-input type="number" v-model="form.skilled" placeholder></el-input>
          <span>天</span>
        </td>
        <td class="day_case">
          <el-input type="number" v-model="form.skilledReconfirm" placeholder>天</el-input>
          <span>天</span>
        </td>
      </tr>

      <tr>
        <td>理解与定型</td>
        <td>
          <p style="word-break: break-word;white-space: normal;">学会交流/调整生活状态</p>
          <p>三调两评</p>
          <p style="word-break: break-word;white-space: normal;">家庭康复第二课成功使用助听器</p>
        </td>
        <td>90-100天</td>
        <td class="day_case">
          <el-input type="number" v-model="form.fixed" placeholder @focus="inputFocus" @blur="inputBlur"></el-input>
          <span>天</span>
        </td>
        <td class="day_case">
          <el-input type="number" v-model="form.fixedReconfirm" placeholder @focus="inputFocus" @blur="inputBlur"></el-input>
          <span>天</span>
        </td>
      </tr>

      <tr>
        <td>认知与成功</td>
        <td>
          <p style="word-break: break-word;white-space: normal;">改变被动的生活方式</p>
          <p>回归品质生活</p>
          <p style="word-break: break-word;white-space: normal;">3/6/12/年度服务/调整生活状态</p>
        </td>
        <td>365天</td>
        <td class="day_case">
          <el-input
            type="number"
            v-model="form.success"
            placeholder
            @focus="inputFocus"
            @blur="inputBlur"
          ></el-input>
          <span>天</span>
        </td>
        <td class="day_case">
          <el-input
            type="number"
            v-model="form.successReconfirm"
            placeholder
            @focus="inputFocus"
            @blur="inputBlur"
          ></el-input>
          <span>天</span>
        </td>
      </tr>
    </table>
    <div class="pos_case" @click="submit"></div>
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
      form: {
        recordId: 0,
        successReconfirm: "",
        fixedReconfirm: "",
        skilledReconfirm: "",
        adaptReconfirm: "",
        success: "",
        fixed: "",
        skilled: "",
        adapt: "",
      },
    };
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    init() {
      api
        .postFormAPI("patientTarget/getInfo", {
          recordId: localStorage.getItem("recordId"),
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.result == "1") {
            const data = res.data.data;
            for (let key in this.form) {
              if (data.hasOwnProperty(key)) {
                this.form[key] = data[key];
              }
            }
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    submit() {
      this.form.sid = localStorage.getItem("sid");
      this.form.recordId = localStorage.getItem("recordId");
      api
        .postFormAPI("patientTarget/submit", this.form)
        .then((res) => {
          if (res.data.result == "1") {
            // this.$notify({
            //   message: res.data.message,
            // });
            var that = this;
            this.$notify({
              message: res.data.message,
              showClose: false,
              onClose(res) {
                that.$router.push({
                  path: "/noiseSummary",
                });
              },
              duration: 1000,
            });
            if (localStorage.getItem("xqpg")) {
              let xqpg = JSON.parse(localStorage.getItem("xqpg"));
              xqpg.includes(4) ? "" : xqpg.push(4);
              localStorage.setItem("xqpg", JSON.stringify(xqpg));
            } else {
              let xqpg = [4];
              localStorage.setItem("xqpg", JSON.stringify(xqpg));
            }
          }
          //数据处理
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
    startFitting(res1) {
      if (localStorage.getItem("recordId")) {
        api
          .postFormAPI("patientMatchRecord/startMatch", {
            recordId: localStorage.getItem("recordId"),
          })
          .then((res) => {
            this.nativeCall(
              {
                patientId: localStorage.getItem("patientId"),
                recordId: localStorage.getItem("recordId"),
                res: res1,
              },
              "startFitting"
            );
          })
          .catch((res) => console.log(res));
      } else {
        this.$notify({
          message: "请先保存个人信息！",
        });
      }
    },
    inputBlur() {
      this.nativeCall({ focus: false }, "inputFocus");
    },
    inputFocus() {
      this.nativeCall({ focus: true }, "inputFocus");
    },
  },
  components: {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.noiseTarget {
  font-size: 16px;
  width: 100%;
  padding: 30px 20px;
  box-sizing: border-box;
  .title {
    font-size: 34px;
    text-align: center;
    margin: 20px 0 40px;
    font-weight: bold;
  }
  .table_case {
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;
    word-break: break-all;
    tr,
    td {
      border: 1px solid #ddd;
      text-align: center;
      //   line-height: 42px;
      height: 42px;
      padding: 10px;
      line-height: 30px;
      min-height: 42px;
      white-space: nowrap;
      box-sizing: border-box;
      span {
        display: inline-block;
      }
    }
    tr:nth-child(1) {
      background: #f1f1f1;
    }
    tr:nth-child(2) {
      background: #f1f1f1;
    }
  }
  .pos_case {
    position: fixed;
    right: 18px;
    bottom: 93px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: url("../../assets/image/btn/icon_btn_save@2x.png") no-repeat
      center/contain;
  }
}
</style>
<style lang="scss">
.noiseTarget .day_case {
  padding: 10px 0 !important;
  .el-input {
    width: 80px;
    margin-right: 4px;
    .el-input__inner {
      // width: 100px;
      text-align: center;
    }
  }
}
</style>
