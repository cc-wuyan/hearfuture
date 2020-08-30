<template>
  <div class="questionAdviceWrapper">
    <router-view></router-view>
    <div class="tab" v-if="tabShow">
      <router-link replace :to="questionAdviceIndex">问卷咨询</router-link>
      <router-link replace to="questionAdviceHistory">历史记录</router-link>
    </div>
  </div>
</template>

<script>
import api from "../../api/api";

export default {
  data() {
    return {
      tabShow: true,
      questionAdviceIndex:
        "questionAdviceIndex?data=" +
        JSON.stringify({
          page: "questionAdviceWrapper",
          key: "questionnaire_consultation",
        }),
    };
  },
  computed: {},
  created() {
    if (this.$route.query.data) {
      var ruteData = JSON.parse(this.$route.query.data);
      this.ruteData = ruteData;
      this.tabShow =
        this.ruteData.page == "questionAdviceWrapper" ? true : false;
    }

    this.init();
  },
  methods: {
    init() {},
  },
  components: {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.questionAdviceWrapper {
  font-size: 16px;
  .tab {
    width: 100%;
    border: 0px solid #e3e3e3;
    background: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(white),
      to(#e1f6fe)
    );
    background: linear-gradient(180deg, white 0%, #e1f6fe 100%);
    -webkit-box-shadow: 0px 0px 10px #e5e5e5;
    box-shadow: 0px 0px 10px #e5e5e5;
    height: 66px;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    padding: 0 30px;
    a {
      color: #7d7d7d;
      font-size: 18px;
      display: inline-block;
      width: 114px;
      height: 38px;
      text-align: center;
      line-height: 38px;
    }
    .router-link-active {
      color: #fff;
      background: #74bcee;
      border-radius: 19px;
    }
  }
}
</style>
<style lang="scss">
</style>
