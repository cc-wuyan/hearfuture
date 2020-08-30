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
        <span>{{userInfo.birthday}}</span>
        <span>民族：</span>
        <span>{{userInfo.nation}}</span>
        <span>病例号：</span>
        <span>{{userInfo.patientNum ? userInfo.patientNum : ''}}</span>
      </div>
      <div class="report-wrapper">
        <div class="flex-row">
          <div class="img-left"></div>
          <div>左耳</div>
        </div>
        <div class="flex-row jc-b">
          <div class="report-img">
            <img :src="leftData.tympanicMembrane" alt />
          </div>
          <div class="report-img">
            <img :src="leftData.secondBend" alt />
          </div>
          <div class="report-img">
            <img :src="leftData.externalAuditoryCanal" alt />
          </div>
        </div>
        <div class="flex-row">
          <div class="img-right"></div>
          <div>右耳</div>
        </div>
        <div class="flex-row jc-b">
          <div class="report-img">
            <img :src="rightData.tympanicMembrane" alt />
          </div>
          <div class="report-img">
            <img :src="rightData.secondBend" alt />
          </div>
          <div class="report-img">
            <img :src="rightData.externalAuditoryCanal" alt />
          </div>
        </div>
        <div class="tips">
          <div>观察所见机器及诊断提示：</div>
          <div>左耳：{{leftData.content}}</div>
          <div>右耳：{{rightData.content}}</div>
        </div>
      </div>
<!--      <div class="user-sign">-->
<!--        <div>本人签字：</div>-->
<!--        <div class="line"></div>-->
<!--        <div>家属签字:</div>-->
<!--        <div class="line"></div>-->
<!--        <div class="line"></div>-->
<!--      </div>-->
<!--      <div class="doctor-sign">-->
<!--        <div>验配中心：</div>-->
<!--        <div>检查日期：{{userInfo.updatetime}}</div>-->
<!--        <div>医生签名：</div>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
  import {earCheck,getInfo } from "@/api/patient";
  export default {
    data() {
      return {
        slogan: "用爱经营 用良心服务 用匠心成就 ",
        userInfo: {
          uid: "",
          name: "",
          sex: "",
          age: "",
          nation: "",
          updatetime: ""
        },
        report: "",
        recordId: "",
        leftData: "",
        rightData: ""
      };
    },
    created() {
      this.recordId = this.$route.params.recordId
      this.patientId = this.$route.params.id
      earCheck({
        recordId: this.recordId,
        ear: "left",
      }).then(res => {
        if (res.result == 1) {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
          this.leftData = res.data;
        }
      });
      earCheck({
        recordId: this.recordId,
        ear: "right",
      }).then(res => {
        if (res.result == 1) {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
          this.rightData = res.data;
        }
      });
      getInfo({
        patientId: this.patientId
      }).then(res => {
        if (res.result == 1) {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
          this.userInfo = res.data;
        }
      });
    }
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
      padding-right: 30px;
      align-items: center;
      justify-content: space-between;
      .img {
        height: 90px;
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
      .button {
        display: flex;
        position: absolute;
        top: 0;
        right: 30px;
        .print {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 82px;
          height: 34px;
          background: #f1f1f1;
          border-radius: 18px;
          margin-right: 14px;
          img {
            width: 14px;
            height: 14px;
          }
          span {
            width: 28px;
            height: 18px;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 18px;
            color: #333;
            padding-left: 4px;
          }
        }
        .close {
          width: 34px;
          height: 34px;
          background: #f1f1f1 url("../../assets/image/tanchu_close@2x.png")
          no-repeat;
          background-size: 14px 14px;
          background-position: center center;
          border-radius: 50%;
        }
      }
    }
    .user-info {
      font-size: 14px;
      line-height: 16px;
      color: #212121;
      margin: 42px auto 0;
      span:nth-of-type(2n + 2) {
        padding: 0 10px;
        border-bottom: 1px solid #212121;
        margin-right: 12px;
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
    .report-wrapper {
      margin: 30px 30px 0;
      .flex-row {
        display: flex;
        align-items: center;
        margin-top: 10px;
        flex-wrap: wrap;
      }
      .jc-b {
        justify-content: space-between;
      }
      .report-img {
        width: 200px;
        height: 200px;
        border: 1px solid #333;
        img {
          width: 100%;
          height: 100%;
        }
        &:nth-last-of-type(2) {
          margin: 0 10px;
        }
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
      /*background: url("../../assets/image/icon_ears_left@2x.png") no-repeat;*/
      background-size: contain;
      margin: 0 6px 0 6px;
      flex-shrink: 0;
    }

    .img-right {
      /*background: url("../../assets/image/icon_ears_right@2x.png") no-repeat;*/
      background-size: contain;
    }
  }
</style>
