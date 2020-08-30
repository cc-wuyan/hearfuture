<template>
  <div class="protectionGuarantee">
    <div class="title">保障保护</div>
    <table class="table">
      <tr class="bg_green">
        <td>3个月</td>
        <td>3个月听力复查提醒</td>
      </tr>
      <tr class="bg_blue">
        <td>6个月</td>
        <td>6个月助听器评估提醒</td>
      </tr>
      <tr class="bg_purple">
        <td>12个月</td>
        <td>12个月年度体检提醒</td>
      </tr>
      <tr class="bg_pink">
        <td>节日关怀</td>
        <td>生日提醒、验配日提醒</td>
      </tr>
      <tr class="bg_orange">
        <td>保修提醒</td>
        <td>保修期前一个月提醒</td>
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
.protectionGuarantee {
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
    background: url("../../../assets/image/btn/icon_btn_back@2x.png") no-repeat
      center/contain;
    position: absolute;
    bottom: 40px;
    right: 30px;
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
  .bg_pink {
    td {
      color: #a22d7a;
      &:first-of-type {
        background-color: #ffe8f7;
      }
    }
  }
  .bg_orange {
    td {
      color: #885b00;
      &:first-of-type {
        background-color: #ffefc2;
      }
    }
  }
}
</style>
