<template>
  <div class="medicalAdviceReport">
    <div class="contain">
      <div class="header">
        <img class="img" src="../../../assets/image/logo@2x.png" alt />
        <div class="slogan">{{slogan}}</div>
      </div>
      <div class="header-title">
        <div class="title">医嘱报告单</div>
      </div>
      <div class="user-info">
        <span>姓名：</span>
        <span>{{userInfo.truename}}</span>
        <span>性别：</span>
        <span>{{userInfo.sex == 1 ? '男' : userInfo.sex == 2 ? '女': ''}}</span>
        <span>年龄：</span>
        <span>{{age}}</span>
        <span>病例号：</span>
        <span>{{userInfo.patientNum}}</span>
      </div>
      <div class="report-wrapper">
        <el-input v-model="advice.adviceContent" placeholder type="textarea" rows="30" disabled></el-input>
      </div>
      <div class="fixed_bottom">
        <div class="user-sign">
          <div>本人签字：</div>
          <div class="line"></div>
          <div>家属签字:</div>
          <div class="line"></div>
        </div>
        <div class="doctor-sign">
          <div>验配中心：{{matcher.orgName}}</div>
          <div>检查日期：{{nowdatetime}}</div>
          <div>医生签名：{{matcher.truename}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../../api/api";

export default {
  data() {
    return {
      slogan: "用爱经营 用良心服务 用匠心成就 ",
      userInfo: {
        truename: null,
        sex: null,
        birthday: "",
        patientNum: null,
        updatetime: null,
      },
      matcher: {
        orgName: null,
        truename: null,
      },
      advice: { adviceContent: null },
      // 当前时间
      nowdatetime: new Date()
        .toLocaleString()
        .replace(/\//g, "-")
        .substring(
          0,
          new Date().toLocaleString().replace(/\//g, "-").indexOf(" ")
        ),
    };
  },
  computed: {
    age() {
      if (this.userInfo.birthday == "") {
        return;
      }
      return (
        new Date().getFullYear() - Number(this.userInfo.birthday.slice(0, 4))
      );
    },
  },
  created() {
    // 获取用户信息
    this.getFormData("patient/getInfo", "userInfo", {
      patientId: localStorage.getItem("patientId"),
      sid: localStorage.getItem("sid"),
    });
    // 获取医嘱
    this.getFormData("doctorAdvice/index", "advice", {
      recordId: localStorage.getItem("recordId"),
      sid: localStorage.getItem("sid"),
      patientId: localStorage.getItem("patientId"),
    });
    // 验配师信息
    this.getFormData("patientMatchRecord/getMatcherByRecordId", "matcher", {
      recordId: localStorage.getItem("recordId"),
      sid: localStorage.getItem("sid"),
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
  },
};
</script>

<style lang="scss" scoped>
.medicalAdviceReport {
  color: #212121;
  .contain {
    display: flex;
    flex-direction: column;
    margin: 0 30px;
  }
  .header {
    display: flex;
    width: 100%;
    margin: 20px auto 0;
    align-items: center;
    justify-content: space-between;
    .img {
      height: 40px;
    }
    .slogan {
      font-weight: bold;
      color: #333;
    }
  }
  .header-title {
    height: 46px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    .title {
      height: 34px;
      font-size: 26px;
      font-weight: bold;
      line-height: 34px;
      color: #333;
    }
  }
  .report-wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    .chunk {
      margin-bottom: 26px;
    }
    .chunk-content {
      width: 100%;
      box-sizing: border-box;
      padding: 14px 0 0 1em;
      line-height: 26px;
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      .flex-grow {
        display: flex;
        flex-grow: 1;
      }
    }
  }
  .user-info {
    font-size: 18px;
    line-height: 16px;
    color: #212121;
    margin: 42px auto 0;
    span:nth-of-type(2n + 2):not(:last-of-type) {
      padding: 0 10px;
      margin-right: 40px;
    }
  }
  .user-sign {
    width: 90%;
    display: flex;
    margin: 0 auto;
    justify-content: flex-end;
    margin-top: 46px;
    .line {
      width: 100px;
      border-bottom: 1px solid #212121;
      margin-right: 20px;
    }
  }
  .doctor-sign {
    display: flex;
    align-items: center;
    width: 90%;
    margin: 34px auto;
    div {
      flex-grow: 1;
    }
  }
  .fixed_bottom {
    width: 100%;
    position: fixed;
    bottom: 0;
  }
}
</style>

<style lang="scss">
.medicalAdviceReport {
  .el-textarea.is-disabled .el-textarea__inner {
    background-color: unset;
    border-color: unset;
    color: unset;
  }

  .el-textarea__inner {
    border: unset;
    padding: unset;
    font-size: 18px;
  }
}
</style>