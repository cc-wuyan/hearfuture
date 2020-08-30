<template>
  <div class="index">
    <div>
      <router-link to="SevenStep1PutFile">七步法第一步建档-基本信息（完成）</router-link>
    </div>
    <div>
      <router-link :to="adultQuestion">七步法第一步建档-成人问卷（完成）</router-link>
    </div>
    <!-- <div>
      <router-link :to="childQuestion">七步法第一步建档-儿童问卷（完成）</router-link>
    </div> -->
    <div>
      <router-link to="SevenStep1DetailInfo">七步法第一步建档-详细信息（完成）</router-link>
    </div>
    <div>
      <router-link :to="adultReport">七步法第一步建档-成人报告（完成）</router-link>
    </div>
    <!-- <div>
      <router-link :to="childReport">七步法第一步建档-儿童报告（完成）</router-link>
    </div> -->
    <!-- <div>
      <router-link to="adultFirstCase">七步法第二步建档-成人首诊病例（完成）</router-link>
    </div>
    <div>
      <router-link to="childFirstCase">七步法第二步建档-儿童首诊病例（完成）</router-link>
    </div> -->
    <!-- <div>
      <router-link to="reviewCase">七步法第二步建档-复诊病历（完成）</router-link>
    </div> -->
    <!-- <div>
      <router-link to="adultFirstReport">七步法第二步建档-成人首诊病例报告（完成）</router-link>
    </div>
    <div>
      <router-link to="childFirstReport">七步法第二步建档-儿童首诊病例报告（完成）</router-link>
    </div> -->
    <!-- <div>
      <router-link to="reviewCaseReport">七步法第二步建档-复诊病历报告单（完成）</router-link>
    </div> -->
    <!-- <div>
      <router-link to="bill">七步法第二步建档-收费票据（完成）</router-link>
    </div> -->
    <div>
      <router-link to="editResult">七步法第二步建档-历史结果录入（完成）</router-link>
    </div>
    <!-- <div>
      <router-link to="servicesList">七步法第二步建档-听力医学服务（完成）</router-link>
    </div> -->
    <!-- <div>
      <router-link to="otoscopeReport">七步法第三步检验检测-耳窥镜检查报告（完成）</router-link>
    </div>
    <div>
      <router-link to="soundTextReport">七步法第三步检验检测-纯音测听报告（完成）</router-link>
    </div>
    <div>
      <router-link to="speechTextReport">七步法第三步检验检测-言语测听报告（完成）</router-link>
    </div>
    <div>
      <router-link :to="questionnaireReport">七步法第三步检验检测-问卷报告单（完成）</router-link>
    </div> -->
    <!-- <div>
      <router-link :to="questionAdviceWrapper">七步法第三步问卷咨询-问卷咨询（完成）</router-link>
    </div> -->
    <!-- <div>
      <router-link to="specailReport">七步法第三步问卷咨询-听觉改善分级问卷（完成）</router-link>
    </div> -->
    <div>
      <router-link to="diagnosisReport">七步法第四步处方方案-诊断报告（完成）</router-link>
    </div>
    <div>
      <router-link to="needsAssessment">七步法第四步处方方案-需求评估（完成）</router-link>
    </div>
    <!-- <div>
      <router-link to="healthyProgram">七步法第四步处方方案-康复方案（完成）</router-link>
    </div> -->
    <!-- <div>
      <router-link to="diareportReport">七步法第四步检验检测-听觉言语诊断报告（完成）</router-link>
    </div> -->
    <!-- <div>
      <router-link to="needsAssessmentReport">七步法第四步检验检测-听障困难与需求评估报告（完成）</router-link>
    </div> -->
    <!-- <div>
      <router-link :to="benefit_assess">七步法第五步检验检测-助听器受益度评估问卷（完成）</router-link>
    </div>
    <div>
      <router-link :to="cure_assess">七步法第五步检验检测-声治疗效果评估问卷（完成）</router-link>
    </div>
    <div>
      <router-link to="hearingAidTestReport">七步法第五步检验检测-助听器选配试验（调试）报告（完成）</router-link>
    </div>
    <div>
      <router-link to="clinicalEvaluationReport">七步法第五步检验检测-助听器/人工耳蜗临床效果评估报告（完成）</router-link>
    </div>
    <div>
      <router-link :to="hearingAidProfitabilityReport">七步法第五步检验检测-助听器受益度评估报告（完成）</router-link>
    </div>
    <div>
      <router-link :to="acousticTherapyReport">七步法第五步检验检测-声治疗效果评估报告（完成）</router-link>
    </div>
    <div>
      <router-link to="assistiveDevices">七步法第六步检验检测-定制单和维修单（完成）</router-link>
    </div> -->
    <!-- <div>
      <router-link to="customReport">七步法第六步定制报告表（完成）</router-link>
    </div>
    <div>
      <router-link to="maintenanceReport">七步法第六步维修报告表（未完成）</router-link>
    </div> -->
    <div>
      <router-link to="healthConsultant">七步法第七步检验检测-私人健康顾问（完成）</router-link>
    </div>
    <!-- <div>
      <router-link to="medicalReport">七步法第七步检验检测-就诊报告（完成）</router-link>
    </div> -->
    <!-- <div>
      <router-link to="medicalAdvice">七步法第七步检验检测-医嘱（完成）</router-link>
    </div>
    <div>
      <router-link to="debuggingReport">七步法第七步检验检测-调试校验报告（完成）</router-link>
    </div>
    <div>
      <router-link to="medicalReport">七步法第七步检验检测-就诊报告（完成）</router-link>
    </div>
    <div>
      <router-link to="medicalAdviceReport">七步法第七步检验检测-医嘱报告（完成）</router-link>
    </div> -->
    <!-- <div>
      <router-link to="auditReminder">病例管理（提醒管理）-审核提醒（完成）</router-link>
    </div>
    <div>
      <router-link to="orderReminder">病例管理（提醒管理）-订单提醒（完成）</router-link>
    </div>
    <div>
      <router-link to="caseSubmission">病例管理-病例提交（完成）</router-link>
    </div>
    <div>
      <router-link to="appointmentReminder">病例管理-预约提醒（完成）</router-link>
    </div>
    <div>
      <router-link to="consultationReminder">病例管理-会诊提醒（完成）</router-link>
    </div> -->
    <div>
      <router-link to="visitReminder">病例管理-回访提醒（完成）</router-link>
    </div>
    <!-- <div>
      <router-link to="birthdayReminder">病例管理-生日提醒（完成）</router-link>
    </div>
    <div>
      <router-link to="repairDueReminder">病例管理-保修到期提醒（完成）</router-link>
    </div> -->
    <div>
      <router-link to="patient">电子病例</router-link>
    </div>
    <!-- <div>
      <router-link to="OrganizationProfile">咨询1-机构简介</router-link>
    </div>
    <div>
      <router-link to="RehabilitationVideo">咨询1-康复视频资料</router-link>
    </div>
    <div>
      <router-link to="SoundFailure">咨询2-声音失效</router-link>
    </div>
    <div>
      <router-link to="AuditoryPathology">咨询2-听觉病理</router-link>
    </div>
    <div>
      <router-link to="MentalProcessPatients">咨询2-听障患者心路历程</router-link>
    </div> -->
    <div>
      <router-link to="AmazingListening">咨询3-神奇的听力</router-link>
    </div>
    <!-- <div>
      <router-link to="HearingAidTechnology">咨询3-助听科技</router-link>
    </div>
    <div>
      <router-link to="HearingWorldWithEars">咨询3-双耳听世界</router-link>
    </div>
    <div>
      <router-link to="YourDayScene">咨询4-你的一日生活场景</router-link>
    </div>
    <div>
      <router-link to="NoiseSelection">咨询4-噪声选择</router-link>
    </div>
    <div>
      <router-link to="HearingHealthPathology">咨询4-听觉健康病理</router-link>
    </div>
    <div>
      <router-link to="ResearchOnNCOA">咨询4-ncoa研究</router-link>
    </div>
    <div>
      <router-link to="ProductSelection">咨询5-产品选择</router-link>
    </div>
    <div>
      <router-link to="SuccessfulUse">咨询5-成功使用</router-link>
    </div>
    <div>
      <router-link to="ProtectionAndGuarantee">咨询5-保护保障</router-link>
    </div>
    <div>
      <router-link to="InvestingFuture">咨询6-投资未来</router-link>
    </div>
    <div>
      <router-link to="JourneyOfRehabilitation">咨询6-康复之旅</router-link>
    </div>
    <div>
      <router-link to="ListeningClub">咨询6-听友俱乐部</router-link>
    </div>
    <div>
      <router-link to="Data">咨询7-资料</router-link>
    </div>
    <div>
      <router-link to="Information">咨询7-资讯</router-link>
    </div>
    <div>
      <router-link to="Socializing">咨询7-社交</router-link>
    </div>
    <div>
      <router-link to="Media">咨询7-媒体</router-link>
    </div> -->
    <div>
      <router-link to="commonProblem">设置-常见问题列表</router-link>
    </div>
    <div>
      <router-link to="userPortrait">设置-用户画像</router-link>
    </div>
    <div>
      <router-link to="teamPortrait">设置-团队画像</router-link>
    </div>
  </div>
</template>


<script>
import api from "../api/api";

export default {
  data() {
    return {
      adultQuestion:
        "questionAdviceWrapper?data=" +
        JSON.stringify({
          page: "adultQuestion",
          key: "health_questionnaire_adult",
        }),
      childQuestion:
        "questionAdviceWrapper?data=" +
        JSON.stringify({
          page: "childQuestion",
          key: "health_questionnaire_child",
        }),
      questionAdviceWrapper:
        "questionAdviceWrapper?data=" +
        JSON.stringify({
          page: "questionAdviceWrapper",
          key: "questionnaire_consultation",
        }),
      benefit_assess:
        "questionAdviceWrapper?data=" +
        JSON.stringify({
          page: "adultQuestion",
          key: "benefit_assess",
        }),
      cure_assess:
        "questionAdviceWrapper?data=" +
        JSON.stringify({
          page: "adultQuestion",
          key: "cure_assess",
        }),
      adultReport:
        "questionnaireReport?data=" +
        JSON.stringify({
          page: "adultReport",
          key: "health_questionnaire_adult",
        }),
      childReport:
        "questionnaireReport?data=" +
        JSON.stringify({
          page: "childReport",
          key: "health_questionnaire_child",
        }),
      questionnaireReport:
        "questionnaireReport?data=" +
        JSON.stringify({
          page: "questionnaireReport",
          key: "questionnaire_consultation",
        }),
      hearingAidProfitabilityReport:
        "questionnaireReport?data=" +
        JSON.stringify({
          page: "hearingAidProfitabilityReport",
          key: "benefit_assess",
        }),
      acousticTherapyReport:
        "questionnaireReport?data=" +
        JSON.stringify({
          page: "acousticTherapyReport",
          key: "cure_assess",
        }),
    };
  },
  created() {},
  methods: {},
  components: {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.index {
  font-size: 36px;
}
</style>
