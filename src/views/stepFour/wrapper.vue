<template>
  <div class="needsAssessmentWrapper">
    <router-view></router-view>
    <div class="tab">
      <router-link replace to="needsAssessment">聆听声景选择</router-link>
      <router-link replace to="noiseLevelSelection">噪声级别选择</router-link>
      <router-link replace to="noiseDistance">聆听距离选择</router-link>
      <router-link replace to="noiseTarget">挑战与目标</router-link>
      <router-link replace to="noiseSummary">总结确认</router-link>
    </div>
  </div>
</template>

<script>
import api from "../../api/api";

export default {
  data() {
    return {};
  },
  computed: {},
  created() {
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
.needsAssessmentWrapper {
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
    box-sizing: border-box;
    a {
      flex: 1;
      color: #7d7d7d;
      font-size: 18px;
      display: inline-block;
      padding: 0 14px;
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
