<template>
  <div class="otoscopeReport">
    <div class="contain">
      <div class="header">
        <img class="img" src="../../assets/image/logo@2x.png" />
        <div class="slogan">{{slogan}}</div>
      </div>
      <div class="header-title">
        <div class="title">耳窥镜检查报告单</div>
      </div>
      <div class="user-info">
        <span>姓名：</span>
        <span>{{userInfo.truename}}</span>
        <span>性别：</span>
        <span>{{userInfo.sex == 1 ? '男' : userInfo.sex == 2 ? '女': ''}}</span>
        <span>年龄：</span>
        <span>{{age}}</span>

        <span>病例号：</span>
        <span>{{userInfo.patientNum ? userInfo.patientNum : ''}}</span>
      </div>
      <div class="report-wrapper">
        <div class="flex-row">
          <div class="img-left"></div>
          <div>左耳</div>
        </div>
        <div class="flex-row jc-b">
          <img :src="leftData.tympanicMembrane" />
          <img :src="leftData.secondBend"  />
          <img :src="leftData.externalAuditoryCanal"   />
         
        </div>
        <div class="flex-row">
          <div class="img-right"></div>
          <div>右耳</div>
        </div>
        <div class="flex-row jc-b">
          <img :src="rightData.tympanicMembrane" />
          <img :src="rightData.secondBend"   />
          <img :src="rightData.externalAuditoryCanal"  />
          
        </div>
        <div class="tips">
          <div>观察所见机器及诊断提示：</div>
          <div>左耳：{{leftData.content}}</div>
          <div>右耳：{{rightData.content}}</div>
        </div>
      </div>
      <!-- <div class="fixed_bottom"> -->
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
      <div class="back_btn" @click="toBack" v-if="this.$route.query.fromRouter">返回</div>
    </div>
    </div>
  <!-- </div> -->
</template>

<script>
import api from "../../api/api";
import common from "../../utils/common";
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
      report: "",
      recordId: "",
      leftData: "",
      rightData: "",
      passRoute: "",
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
    this.recordId = localStorage.getItem("recordId");

    api
      .postFormAPI("earmirror/report", {
        recordId: this.recordId,
        ear: "left",
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result == "1") {
          this.leftData = res.data.data;
        }
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

    // 获取
    api
      .postFormAPI("earmirror/report", {
        recordId: this.recordId,
        ear: "right",
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result == "1") {
          this.rightData = res.data.data;
        }
      })
      .catch((err) => console.log(err));

    // 获取用户信息
    api
      .postFormAPI("patient/getInfo", {
        patientId: localStorage.getItem("patientId"),
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result == "1") {
          const data = res.data.data;
          for (const key in this.userInfo) {
            if (data.hasOwnProperty(key)) {
              this.userInfo[key] = data[key];
            }
          }
        }
        //数据处理
      })
      .catch((err) => console.log(err));
  },
  methods: {
    toBack() {
      this.$router.replace({
        name: "patient",
        query: {
          active: "checkLog",
        },
      });
      // this.$router.go(-1, { active: "checkLog" });
    },
  },
};
</script>
<style lang="scss" scoped>
.otoscopeReport {
  .contain {
    color: #212121;
    display: flex;
    flex-direction: column;
  }
  .header {
    display: flex;
    margin: 20px 30px 0;
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
      margin-right: 50px;
    }
  }
  .user-sign {
    width: 90%;
    display: flex;
    margin: 0 auto;
    justify-content: flex-end;
    margin-top: 80px;
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
  .report-wrapper {
    margin: 30px 30px 0;
    .flex-row {
      display: flex;
      align-items: center;
      margin-top: 10px;
      flex-wrap: wrap;
      img{
        width: 30%;
      }
    }
    .jc-b {
      justify-content: space-between;
    }
    
    .tips {
      margin-top: 20px;
      line-height: 30px;
    }
  }
  .img-left,
  .img-right {
    width: 14px;
    height: 20px;
    background: url("../../assets/image/icon_ears_left@2x.png") no-repeat;
    background-size: contain;
    margin: 0 6px 0 6px;
    flex-shrink: 0;
  }

  .img-right {
    background: url("../../assets/image/icon_ears_right@2x.png") no-repeat;
    background-size: contain;
  }
  .fixed_bottom {
    width: 100%;
    position: fixed;
    bottom: 0;
  }
  .back_btn {
    width: 54px;
    height: 54px;
    position: fixed;
    right: 20px;
    bottom: 20px;
    border-radius: 50%;
    background: #5d5d5d;
    margin-bottom: 25px;
    color: #fff;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 12px;
    justify-content: center;
  }
}
</style>
