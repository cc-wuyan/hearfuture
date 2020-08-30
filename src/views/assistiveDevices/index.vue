<template>
  <div class="assistiveDevices">
    <router-view></router-view>
    <div class="bottom-wrapper">
      <div class="bottom">
        <router-link replace :to="customOrder">助听器定制单</router-link>
        <router-link replace :to="repairOrder">维修单</router-link>
        <!-- <van-tabbar route>
          <van-tabbar-item replace :to="customOrder">助听器定制单</van-tabbar-item>
          <van-tabbar-item replace :to="repairOrder">维修单</van-tabbar-item>
        </van-tabbar>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customOrder:
        "/customOrder" +
        "?sid=" +
        this.$route.query.sid +
        "&recordId=" +
        this.$route.query.recordId +
        "&patientId=" +
        this.$route.query.patientId,
      repairOrder:
        "/repairOrder" +
        "?sid=" +
        this.$route.query.sid +
        "&recordId=" +
        this.$route.query.recordId +
        "&patientId=" +
        this.$route.query.patientId,
    };
  },
  mounted() {},
  created() {},
  methods: {},
  components: {},
};
</script>

<style lang="scss" scoped>
.assistiveDevices {
  .bottom-wrapper {
    width: 75%;
    border: 0px solid rgba(227, 227, 227, 1);
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(225, 246, 254, 1) 100%
    );
    box-shadow: 0px 0px 10px rgba(229, 229, 229, 1);
    height: 66px;
    position: fixed;
    z-index: 9999;
    bottom: 0;

    // .bottom {
    //   position: relative;
    //   width: 90%;
    //   height: 100%;
    //   margin: 0 auto;
    // }
    .bottom {
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
        // flex: 1;
        width: 150px;
        color: #7d7d7d;
        font-size: 18px;
        display: inline-block;
        margin: 0 15px;
        height: 38px;
        text-align: center;
        line-height: 38px;
      }
      .router-link-active {
        color: #fff;
        background: #74bcee;
        border-radius: 10px;
      }
    }
  }
}
</style>
<style lang="scss">
.assistiveDevices {
  .van-tabbar {
    background-color: unset;
    height: 100%;
    align-items: center;
  }

  .van-tabbar--fixed {
    position: unset;
  }

  .van-tabbar-item {
   
    font-weight: bold;
    line-height: 26px;
    color: #7d7d7d;
    -webkit-flex: unset;
    width: 140px;
    height: 50px;
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
