<template>
  <div class="questionnaireReport">
    <div class="title">问卷咨询报告</div>
    <div class="chunk">
      <div
        class="text"
        v-for="(item,index) in questionList"
        :key="index"
        @click="interReport(item)"
      >{{index+1}}.{{item.title}}</div>
    </div>
  </div>
</template>

<script>
import api from "../../api/api";

export default {
  data() {
    return {
      questionList: [],
      keyArr: [
        "health_questionnaire_adult",
        "health_questionnaire_child",
        "questionnaire_consultation",
        "benefit_assess",
        "cure_assess",
      ],
    };
  },
  created() {
    if (this.$route.query.data) {
      var ruteData = JSON.parse(this.$route.query.data);
      this.ruteData = ruteData;
    }
    if (this.ruteData.page == "all") {
      this.keyArr.forEach((item) => {
        this.getData(item);
      });
    } else {
      this.getDataGiven(this.ruteData.key);
    }
  },
  methods: {
    getData(key) {
      api
        .postFormAPI("patientTestpaper/getPaperListByStep", {
          recordId: localStorage.getItem("recordId"),
          sid: localStorage.getItem("sid"),
          processKey: key,
        })
        .then((res) => {
          if (res.data.result == "1") {
            const data = res.data.data;
            data.forEach((item) => {
              if (item) {
                this.questionList.push(item);
              }
            });
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    getDataGiven(key) {
      api
        .postFormAPI("patientTestpaper/getPaperListByStep", {
          recordId: localStorage.getItem("recordId"),
          sid: localStorage.getItem("sid"),
          processKey: key,
        })
        .then((res) => {
          if (res.data.result == "1") {
            const data = res.data.data;
            data.forEach((item) => {
              if (item) {
                this.questionList.push(item);
              }
            });
            if (this.questionList.length == 1) {
              this.interReportReplace(this.questionList[0]);
            }
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    interReport(e) {
      localStorage.setItem("reportListData", JSON.stringify(e));
      this.$router.push({
        path: "reportList",
      });
    },
    interReportReplace(e) {
      localStorage.setItem("reportListData", JSON.stringify(e));
      this.$router.replace({
        path: "reportList",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.questionnaireReport {
  margin-top: 30px;
  line-height: 37px;
  .title {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
  }
  .chunk {
    margin: 30px 24px 0;
    border-radius: 6px;
    background-color: #f9f9f9;
    padding: 24px;
    display: flex;
    flex-wrap: wrap;
  }
  .text {
    width: 50%;
    margin: 10px 0;
    text-decoration: underline;
  }
}
</style>