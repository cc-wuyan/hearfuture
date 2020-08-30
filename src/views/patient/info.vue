<template>
  <div class="info">
    <!-- 列表页 start -->
    <div>
      <div
        v-if="this.$route.query.back"
        style="margin:12px;text-align:right"
        @click="backCaseSubmission"
      >{{this.$route.query.back=="1"?"返回病例提交列表":"返回审核详情"}}</div>
      <div class="info">
        <div class="img">
          <img v-if="userInfo.avatar!=''" :src="userInfo.avatar" />
          <img v-else-if="userInfo.sex=='2'" src="../../assets/image/icon_top_head_woman@2x.png" />
          <img v-else src="../../assets/image/icon_top_head_man@2x.png" />
        </div>
        <div class="flex_col">
          <div class="name">{{userInfo.truename}}</div>
          <div class="flex_row">
            <div>客户来源：{{userInfo.source}}</div>
            <div>客户等级：{{userInfo.memberLevel}}</div>
            <div>验配中心：{{userInfo.matchTitle}}</div>
            <div>验配师：{{userInfo.matcherName}}</div>
          </div>
        </div>
        <div class="top_btn">
          <div class="btn" @click="conSumbit">质控提交</div>
          <div class="btn" @click="caseRep">病例报告</div>
          <!-- <div class="btn" @click="temSet">模板设置</div> -->
        </div>
      </div>
      <div style="position: relative;">
        <el-tabs v-model="active" @tab-click="handleClick">
          <el-tab-pane v-if="isEditInfo == false" :label="'基本信息'" name="baseInfo"></el-tab-pane>
          <el-tab-pane v-if="isEditInfo" :label="'基本信息'" name="baseInfoEdit"></el-tab-pane>
          <el-tab-pane :label="'首诊病例'" name="firstDiagnosis"></el-tab-pane>
          <el-tab-pane :label="'复诊与随访'" name="follow"></el-tab-pane>
          <el-tab-pane :label="'检验检测记录'" name="checkLog"></el-tab-pane>
          <el-tab-pane :label="'在用助听器'" name="aid"></el-tab-pane>
          <el-tab-pane :label="'其他记录'" name="other"></el-tab-pane>
          <el-tab-pane :label="'销售记录'" name="sale"></el-tab-pane>
          <el-tab-pane :label="'转介记录'" name="share"></el-tab-pane>
          <el-tab-pane :label="'报名记录'" name="sign"></el-tab-pane>
        </el-tabs>
      </div>
      <!-- v-loading="listLoading" -->
      <component :is="active" @changeTab="changeTab" :canEdit="this.$route.query.canEdit"></component>
    </div>
    <!-- 列表页 end -->
  </div>
</template>

<script>
import api from "../../api/api";
import common from "../../utils/common";
import firstDiagnosis from "./components/firstDiagnosis-components";
import follow from "./components/follow-components";
import checkLog from "./components/checkLog-components";
import aid from "./components/aid-components";
import other from "./components/other-components";
import sale from "./components/sale-components";
import share from "./components/share-components";
import sign from "./components/sign-components";
import baseInfo from "./components/baseInfo-components";
import baseInfoEdit from "./components/baseInfo-edit-components";

export default {
  name: "userManagerList",
  data() {
    return {
      listLoading: true,
      timeArray: [],
      userInfo: {},
      active: "baseInfo",
      isEditInfo: false,

      // 客户来源
      wayType: [],
    };
  },
  components: {
    firstDiagnosis: firstDiagnosis,
    follow: follow,
    checkLog: checkLog,
    aid: aid,
    other: other,
    sale: sale,
    share: share,
    sign: sign,
    baseInfo: baseInfo,
    baseInfoEdit: baseInfoEdit,
  },
  created() {
    // 检验检测报告返回时，回到检验检测页面
    if (this.$route.query.active == "checkLog") {
      this.active = this.$route.query.active;
      this.$router.go(-1);
    }

    let patient_sid = this.queryParams("sid") || localStorage.getItem("sid");
    localStorage.setItem("patient_sid", patient_sid);
    localStorage.setItem("sid", patient_sid);
    let patient_recordId =
      this.queryParams("recordId") || localStorage.getItem("recordId");
    localStorage.setItem("patient_recordId", patient_recordId);
    localStorage.setItem("recordId", patient_recordId);
    let patient_patientId =
      this.queryParams("patientId") || localStorage.getItem("patientId");
    localStorage.setItem("patient_patientId", patient_patientId);
    localStorage.setItem("patientId", patient_patientId);

    api
      .postFormAPI("patient/getInfo", {
        sid: patient_sid,
        patientId: patient_patientId,
        // sid: localStorage.getItem("sid"),
        // patientId: localStorage.getItem("patientId"),
      })
      .then((res) => {
        if (res.data.result != "1") {
          return;
        }
        const source = res.data.data.source;
        this.userInfo = res.data.data;

        // 获取来源数据字典
        api
          .postFormAPI("common/getDicByKey", {
            key: "wayType",
            sid: patient_sid,
          })
          .then((res) => {
            if (res.data.result != 1) {
              return;
            }
            let sourceList = {};
            res.data.data.forEach((item) => {
              sourceList[item.key] = item.value;
            });
            if (source != "") {
              let sourceArr = source.split(",");
              sourceArr = sourceArr.map((item) => sourceList[item]);
              this.userInfo.source = sourceArr.join("-");
            }
          })
          .catch((err) => console.log(err));
        //数据处理
      })
      .catch((err) => console.log(err));
  },
  methods: {
    handleClick(tab) {
      this.active = tab.name;
    },
    changeTab(view) {
      if (view == "baseInfoEdit") {
        this.isEditInfo = true;
        this.active = "baseInfoEdit";
      } else if (view == "baseInfo") {
        this.isEditInfo = false;
        this.active = "baseInfo";
      }
    },
    queryParams(paramName) {
      let param = this.$route.query;
      if (param.hasOwnProperty(paramName)) {
        return param[paramName];
      }
      return "";
    },
    nativeCall(param, nativeMethodName) {
      param = this.queryParams(param);
      document.location = "js://" + nativeMethodName + "?" + param;
    },
    conSumbit() {
      this.nativeCall({}, "qualityControlSubmission");
    },
    caseRep() {
      this.$router.push({
        path: "/medicalReport",
      });
      // this.nativeCall({}, "medicalReport");
    },
    temSet() {
      this.nativeCall({}, "templateSetting");
    },
    backCaseSubmission() {
      common(this);
    },
  },
};
</script>
<style lang='scss' scoped>
.info {
  color: #212121;
  position: relative;
  .info {
    display: flex;
    margin: 14px;
    .img {
      width: 120px;
      height: 120px;
      margin-right: 24px;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
        vertical-align: top;
      }
    }
    .name {
      line-height: 80px;
    }
    .flex_row {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      line-height: 26px;
      padding-bottom: 12px;
      justify-content: space-between;
      div {
        width: 50%;
      }
    }
    .flex_col {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  .top_btn {
    position: absolute;
    display: flex;
    top: 12px;
    right: 30px;
    .btn {
      color: #fff;
      width: 110px;
      padding: 10px 0;
      text-align: center;
      background-color: #409eff;
      border-radius: 6px;
      &:not(:last-of-type) {
        margin-right: 10px;
      }
    }
  }
}
</style>

<style lang="scss">
.info {
  .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding-left: 20px;
  }
  .el-tabs__nav-scroll {
    width: 100%;
    overflow-x: scroll;
  }
  .el-tabs__nav-prev,
  .el-tabs__nav-next {
    display: none;
  }
  
}
</style>
