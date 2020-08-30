<template>
  <div class="reviewCaseReport">
    <div class="contain">
      <div class="header">
        <img class="img" src="../../assets/image/logo@2x.png" alt />
        <div class="slogan">{{slogan}}</div>
      </div>
      <div class="header-title">
        <div class="title">复诊病例报告单</div>
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
        <div class="chunk flex-row">
          <span class="chunk-label">一、主诉：</span>
          <span class="span">{{report.mainDetails}}</span>
        </div>
        <div class="chunk flex-row">
          <span class="chunk-label">二、问诊：</span>
          <span class="span">{{report.detail}}</span>
        </div>
      </div>
    </div>
    <div class="fixed_bottom">
      <div class="user-sign">
        <div>本人签字：</div>
        <div class="line"></div>
        <div>家属签字:</div>
        <div class="line"></div>
      </div>
      <div class="doctor-sign">
        <div>验配中心：{{orgName}}</div>
        <div>检查日期：{{nowdatetime}}</div>
        <div>医生签名：{{truename}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api/api";

export default {
  data() {
    return {
      slogan: "用爱经营 用良心服务 用匠心成就 ",
      orgName: "",
      truename: "",
      userInfo: {
        truename: null,
        sex: null,
        nation: null,
        patientNum: null,
        updatetime: null,
        birthday: "",
      },
      // 当前时间
      nowdatetime: new Date()
        .toLocaleString()
        .replace(/\//g, "-")
        .substring(
          0,
          new Date().toLocaleString().replace(/\//g, "-").indexOf(" ")
        ),
      report: {
        mainDetails: null,
        detail: null,
      },
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
    api
      .postFormAPI("patient/getInfo", {
        patientId: localStorage.getItem("patientId"),
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result != 1) {
          return;
        }
        const data = res.data.data;
        for (const key in this.userInfo) {
          if (data.hasOwnProperty(key)) {
            this.userInfo[key] = data[key];
          }
        }

        // 将时间戳转换成年月日
        if (this.userInfo.updatetime) {
          const date = new Date(this.userInfo.updatetime * 1000)
            .toLocaleString()
            .replace(/\//g, "-");
          this.userInfo.updatetime = date.substring(0, date.indexOf(" "));
        }

        //数据处理
      })
      .catch((err) => console.log(err));

    // 验配师信息
    api
      .postFormAPI("patientMatchRecord/getMatcherByRecordId", {
        recordId: localStorage.getItem("recordId"),
      })
      .then((res) => {
        if (res.data.result == "1") {
          this.orgName = res.data.data.orgName;
          this.truename = res.data.data.truename;
        }
        //数据处理
      })
      .catch((err) => console.log(err));

    // 获取现病史
    api
      .postFormAPI("patientReturnvisit/getInfo", {
        recordId: localStorage.getItem("recordId"),
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result != 1) {
          return;
        }
        const data = res.data.data;
        for (const key in this.report) {
          if (data.hasOwnProperty(key)) {
            this.report[key] = data[key];
          }
        }
        //数据处理
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style lang="scss" scoped>
.reviewCaseReport {
  color: #212121;
  .contain {
    display: flex;
    flex-direction: column;
  }
  .header {
    display: flex;
    width: 90%;
    margin: 20px auto 0;
    align-items: center;
    justify-content: space-between;
    .img {
      height: 40px;
    }
    .slogan {
      font-size: 16px;
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
  .report-wrapper {
    display: flex;
    width: 90%;
    flex-direction: column;
    align-self: center;
    align-items: center;
    margin-top: 50px;
    .chunk {
      margin-bottom: 30px;
      width: 100%;
      .chunk-content {
        padding: 14px 2em 0;
        line-height: 26px;
      }
    }
    .chunk-label {
      font-weight: bold;
    }
    .span {
      line-height: 26px;
      border-bottom: 1px solid #212121;
      padding: 0 1em;
      margin: 0 6px;
      flex-grow: 1;
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
  .flex-row {
    display: flex;
    align-items: flex-end;
  }
  .fixed_bottom {
    width: 100%;
    position: fixed;
    bottom: 0px;
  }
}
</style>