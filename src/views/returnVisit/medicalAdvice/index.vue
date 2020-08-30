<template>
  <div class="medicalAdvice">
    <div class="search">
      <div class="flex_row">
        <div class="label">预约日期：</div>
        <el-date-picker
          :editable="false"
          v-model="info.appointTime"
          type="date"
          placeholder="请选择"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <div class="label">预约事项：</div>
        <el-select v-model="info.appointProject" placeholder="请选择">
          <el-option
            v-for="item in appointProjects"
            :key="item.id"
            :label="item.title"
            :value="item.key"
          ></el-option>
        </el-select>
        <div class="label">预约门店：</div>
        <el-input v-model="info.appointStore" placeholder="请输入"></el-input>
      </div>
      <el-select v-model="adviceindex" placeholder="请选择医嘱模板" @change="selectTemplate">
        <el-option v-for="(item,index) in adviceTitle" :key="index" :label="item" :value="index"></el-option>
      </el-select>
    </div>
    <div class="content">
      <el-input type="textarea" :rows="20" v-model="info.adviceContent"></el-input>
    </div>
    <div class="btn">
      <div class="submit_btn" @click="submit"></div>
      <div class="finish_btn" @click="finish"></div>
    </div>
  </div>
</template>

<script>
import api from "../../../api/api";
export default {
  data() {
    return {
      info: {
        appointTime: "",
        appointProject: "",
        appointStore: "",
        adviceContent: "",
      },
      adviceTitle: [],
      adviceContents: [],
      adviceindex: "",
      appointProjects: [],
    };
  },
  created() {
    this.getListTemplate();
    this.getDataDictionary();
    // 回写数据
    this.init();
  },
  methods: {
    // 获取医嘱模板
    getListTemplate() {
      api
        .postFormAPI("doctorAdvice/listTemplate", {
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.result != 1) {
            return;
          }
          const data = res.data.data;
          for (let i = 0; i < data.length; i++) {
            this.$set(this.adviceTitle, i, data[i].title);
            this.$set(this.adviceContents, i, data[i].content);
          }
        })
        .catch((err) => console.log(err));
    },

    // 获取预约事项
    getDataDictionary() {
      api
        .postFormAPI("common/getDicByKey", {
          key: "appointProject",
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.result != "1") {
            return;
          }
          this.appointProjects = res.data.data;
          //数据处理
        })
        .catch((err) => console.log(err));
    },

    //初始化数据回写
    init() {
      api
        .postFormAPI("doctorAdvice/index", {
          sid: localStorage.getItem("sid"),
          recordId: localStorage.getItem("recordId"),
          patientId: localStorage.getItem("patientId"),
        })
        .then((res) => {
          if (res.data.result != 1) {
            return;
          }
          const data = res.data.data;
          for (const key in data) {
            if (this.info.hasOwnProperty(key)) {
              this.info[key] = data[key];
            }
          }
        })
        .catch((err) => console.log(err));
    },
    selectTemplate() {
      this.info.adviceContent = this.adviceContents[this.adviceindex];
    },
    submit() {
      for (const key in this.info) {
        if (this.info[key].trim() == "") {
          this.$notify({
            message: "请将数据填写完整！",
          });
          return;
        }
      }
      this.info.sid = localStorage.getItem("sid");
      this.info.recordId = localStorage.getItem("recordId");
      this.info.patientId = localStorage.getItem("patientId");
      api
        .postFormAPI("doctorAdvice/save", this.info)
        .then((res) => {
          if (res.data.result != 1) {
            this.$notify({
              message: res.data.message,
            });
            return;
          }
          this.$notify({
            title: "医嘱已提交完成",
            message: "等待审核通过",
            showClose: false,
            type: "success",
            iconClass: "success",
            duration: 1000,
          });
          this.nativeCall({ index: 23 }, "updateStep");
        })
        .catch((err) => console.log(err));
    },
    nativeCall(param, nativeMethodName) {
      param = this.queryParams(param);
      document.location = "js://" + nativeMethodName + "?" + param;
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

    finish() {
      this.nativeCall({}, "endDiagnosis");
    },
  },
};
</script>

<style lang="scss" scoped>
.medicalAdvice {
  color: #212121;
  margin: 30px 30px 0;
  .search {
    border-radius: 6px;
    background-color: #f9f9f9;
    padding: 16px 12px;
  }
  .flex_row {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    .label {
      flex-shrink: 0;
      &:not(:first-of-type) {
        margin-left: 20px;
      }
    }
  }
  .content {
    border-radius: 6px;
    background-color: #f9f9f9;
    padding: 12px 16px;
    margin-top: 20px;
  }
  .btn {
    position: fixed;
    bottom: 90px;
    right: 20px;
  }
  .submit_btn,
  .finish_btn {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: url("../../../assets/image/btn/icon_btn_end@2x.png") no-repeat
      center/contain;
  }
  .submit_btn {
    background: url("../../../assets/image/btn/icon_btn_enter@2x.png") no-repeat
      center/contain;
  }
}
</style>

<style lang="scss">
.medicalAdvice {
  .el-input__inner {
    height: 36px;
    font-size: 18px;
  }
  .el-input__icon {
    line-height: 36px;
  }
  .el-input {
    width: auto;
  }
  .success {
    width: 200px;
    height: 200px;
    background-color: red;
  }
}
</style>