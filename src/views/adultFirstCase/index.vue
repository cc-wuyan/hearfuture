<template>
  <div class="adultIndex">
    <router-view></router-view>
    <div class="bottom-wrapper">
      <div class="bottom">
        <van-tabbar route>
          <van-tabbar-item replace to="/adultCurrentCase">现病史</van-tabbar-item>
          <van-tabbar-item replace to="/adultOldCase">既往史</van-tabbar-item>
          <van-tabbar-item replace to="/adultRecoveryCase">听觉康复史</van-tabbar-item>
          <van-tabbar-item replace to="/adultObservation">观察所见</van-tabbar-item>
        </van-tabbar>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  created() {},
  methods: {},
  components: {},
};
</script>

<style lang="scss" scoped>
.adultIndex {
  .bottom-wrapper {
    width: 100%;
    border: 0px solid rgba(227, 227, 227, 1);
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(225, 246, 254, 1) 100%
    );
    box-shadow: 0px 0px 10px rgba(229, 229, 229, 1);
    height: 66px;
    position: fixed;
    bottom: 0;

    .bottom {
      position: relative;
      width: 90%;
      height: 100%;
      margin: 0 auto;
    }
  }
}
</style>
<style lang="scss">
.adultIndex {
  .van-tabbar {
    background-color: unset;
    height: 100%;
    align-items: center;
  }

  .van-tabbar--fixed {
    position: unset;
  }

  .van-tabbar-item {
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 18px;
    color: #7d7d7d;
    -webkit-flex: unset;
    width: 114px;
    height: 38px;
    margin-right: 30px;
    display: block;
  }

  .van-tabbar-item--active {
    color: #fff;
    background: url(../../assets/image/icon_login_bg@2x.png) no-repeat;
    background-size: contain;
  }
  .van-tabbar-item__text {
    text-align: center;
    margin-top: 9px;
  }
}
</style>