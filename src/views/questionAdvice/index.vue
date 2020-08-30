<template>
  <div class="questionAdviceIndex">
    <div class="content" v-if="initData">
      <div v-if="initData[0]">
        <div class="title">{{initData[0][0].ContentTitle}}</div>
        <div class="chunk" v-for="(item, index) in initData[0]" :key="index">
          <div
            class="list"
            @click="gotoQuestion(item.id)"
            :style="{'border-color': item.isComplete == 1 ? '#76A416' : ''}"
          >{{item.title}}</div>
          <div v-if="item.isComplete == 1" class="img_success"></div>
        </div>
      </div>
      <div v-if="initData[1]">
        <div class="title">{{initData[1][0].ContentTitle}}</div>
        <div class="chunk" v-for="(item, index) in initData[1]" :key="index">
          <div
            class="list"
            @click="gotoQuestion(item.id)"
            :style="{'border-color': item.isComplete == 1 ? '#76A416' : ''}"
          >{{item.title}}</div>
          <div v-if="item.isComplete == 1" class="img_success"></div>
        </div>
      </div>
      <div v-if="initData[2]">
        <div class="title">{{initData[2][0].ContentTitle}}</div>
        <div class="chunk" v-for="(item, index) in initData[2]" :key="index">
          <div
            class="list"
            @click="gotoQuestion(item.id)"
            :style="{'border-color': item.isComplete == 1 ? '#76A416' : ''}"
          >{{item.title}}</div>
          <div v-if="item.isComplete == 1" class="img_success"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api/api";

export default {
  data() {
    return {
      initData: [],
      ruteData: "",
    };
  },
  computed: {},
  created() {
    if (this.$route.query.data) {
      var ruteData = JSON.parse(this.$route.query.data);
      this.ruteData = ruteData;
    }
    this.init();
  },
  methods: {
    init() {
      if (this.ruteData.page == "questionAdviceWrapper") {
        this.getData(); //
      } else {
        this.getDataGiven(this.ruteData.key);
      }
    },
    getData() {
      // 听学：category_hear；耳鸣：category_tinnitus；康复：category_recovery；
      api
        .postFormAPI("patientTestpaper/getPaperListByStep", {
          processKey: "questionnaire_consultation",
          recordId: localStorage.getItem("recordId"),
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.result == "1") {
            let initData = res.data.data;
            let row = [[], [], []];
            initData.forEach((item, index) => {
              if (item.category == "category_recovery") {
                item.ContentTitle = "耳聋";
                row[0].push(item);
              }

              if (item.category == "category_tinnitus") {
                item.ContentTitle = "耳鸣";
                row[1].push(item);
              }
              if (item.category == "category_hear") {
                item.ContentTitle = "眩晕";
                row[2].push(item);
              }
            });
            row[0].unshift({
              id: "special",
              title: "听觉改善分级问卷(COSI)声景选择",
              hasAnalysis: "0",
              isComplete:localStorage.getItem("specailReport") || 0,
              ContentTitle: "耳聋",
            });
            row.forEach((item, index) => {
              if (item.length == 0) {
                row.splice(index, 1);
              }
            });
            this.initData = row;
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    getDataGiven(apiKey) {
      // 听学：category_hear；耳鸣：category_tinnitus；康复：category_recovery；
      api
        .postFormAPI("patientTestpaper/getPaperListByStep", {
          processKey: apiKey,
          recordId: localStorage.getItem("recordId"),
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.result == "1") {
            let initData = res.data.data;
            let row = [[]];
            initData.forEach((item, index) => {
              if (item.processKey == "health_questionnaire_adult") {
                item.ContentTitle = "成人问卷";
                row[0].push(item);
              }
              if (item.processKey == "health_questionnaire_child") {
                item.ContentTitle = "儿童问卷";
                row[0].push(item);
              }
              if (item.processKey == "benefit_assess") {
                item.ContentTitle = "儿童问卷";
                row[0].push(item);
              }
              if (item.processKey == "cure_assess") {
                item.ContentTitle = "儿童问卷";
                row[0].push(item);
              }
            });
            let newRow = row.forEach((item, index) => {
              if (item.length == 0) {
                row.splice(index, 1);
              }
            });
            this.initData = row;
            console.log(row);
            if (row[0].length == 1) {
              this.gotoQuestionReplace(row[0][0].id);
            }
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    gotoQuestion(e) {
      if (e == "special") {
        this.$router.push({
          name: "specailReport",
        });
      } else {
        this.$router.push({
          name: "questionList",
          query: {
            id: e,
          },
        });
      }
    },
    gotoQuestionReplace(e) {
      if (e == "special") {
        this.$router.replace({
          name: "specailReport",
        });
      } else {
        this.$router.replace({
          name: "questionList",
          query: {
            id: e,
          },
        });
      }
    },
  },
  components: {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.questionAdviceIndex {
  font-size: 16px;
  margin-top: 30px;
  .content {
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;
    padding-top: 1px;
    display: flex;
    justify-content: space-around;
    .title {
      margin-top: 10px;
      margin-bottom: 35px;
      font-size: 20px;
      font-weight: bold;
      color: #333;
      text-align: center;
    }
    .chunk {
      width: 100%;
      margin-bottom: 14px;
      position: relative;
      .img_success {
        position: absolute;
        right: 9px;
        width: 25px;
        top: 0;
        bottom: 0;
        margin: auto;
        height: 25px;
        border-radius: 12.5px;
        background: url("../../assets/image/icon_pay_success@2x.png")
          center/cover;
      }
    }
    .chunk:last-child {
      margin-bottom: unset;
    }
    .list {
      width: 100%;
      height: 57px;
      border-radius: 28.5px;
      border: 1px solid #e5e5e5;
      color: #7d7d7d;
      box-shadow: 0 0 10px 0 #e5e5e5;
      box-sizing: border-box;
      white-space: nowrap;
      line-height: 57px;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 20px;
      text-align: center;
    }
  }
  .content > div {
    width: calc(calc(100% - 60px) / 3);
  }
  .content:last-child {
  }
}
</style>
<style lang="scss">
</style>
