<template>
  <div class="continuousService">
    <div class="title">持续服务</div>
    <table class="table">
      <tr class="bg_green">
        <td>会员年度服务</td>
        <td>提醒购买会员卡，延续年度服务</td>
      </tr>
      <tr class="bg_blue">
        <td>延保计划</td>
        <td>保修期道，提醒延保</td>
      </tr>
      <tr class="bg_purple">
        <td>私人听力顾问</td>
        <td>顾问一对一服务</td>
      </tr>
    </table>
    <div class="back_btn" @click="toBack"></div>
  </div>
</template>

<script>
import common from "../../../utils/common";
export default {
  data() {
    return {};
  },
  methods: {
    toBack() {
      common(this);
    },
  },
};
</script>

<style lang="scss" scoped>
.continuousService {
  margin: 30px 30px 0;
  color: #212121;
  .title {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }
  .table {
    border-collapse: collapse;
    text-align: center;
    width: 60%;
    margin: 60px auto 0;
    td {
      height: 70px;
      border: 1px solid #e4e4e4;
    }
  }
  .back_btn {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    position: absolute;
    bottom: 40px;
    right: 30px;
    background: url("../../../assets/image/btn/icon_btn_back@2x.png") no-repeat
      center/contain;
  }
  .bg_green {
    td {
      color: #699701;
      &:first-of-type {
        background-color: #f1ffd1;
      }
    }
  }
  .bg_blue {
    td {
      color: #008287;
      &:first-of-type {
        background-color: #e5feff;
      }
    }
  }
  .bg_purple {
    td {
      color: #584dbc;
      &:first-of-type {
        background-color: #e8f0ff;
      }
    }
  }
}
</style>
