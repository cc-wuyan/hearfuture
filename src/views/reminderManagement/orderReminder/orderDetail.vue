<template>
  <div class="orderDetail">
    <header>
      <div class="user_info">
        <div>顾客姓名：</div>
        <div>订购日期：</div>
      </div>
      <div class="total">2888.00</div>
    </header>
    <!-- <table class="table">
      <caption>助听器</caption>
      <tr>
        <th>厂家</th>
        <th>系列</th>
        <th>型号</th>
        <th>部位</th>
        <th>原价(元)</th>
        <th>活动价(元)</th>
      </tr>
      <tr>
        <td>{{item.brand}}</td>
        <td>{{item.series}}</td>
        <td>{{item.model}}</td>
        <td>{{item.ear}}</td>
        <td>{{item.price}}</td>
        <td>{{item.money}}</td>
      </tr>
    </table>
    <table class="table">
      <caption>无线辅件</caption>
      <tr>
        <th>厂家</th>
        <th>系列</th>
        <th>型号</th>
        <th>部位</th>
        <th>原价(元)</th>
        <th>活动价(元)</th>
      </tr>
      <tr>
        <td>{{item.brand}}</td>
        <td>{{item.series}}</td>
        <td>{{item.model}}</td>
        <td>{{item.ear}}</td>
        <td>{{item.price}}</td>
        <td>{{item.money}}</td>
      </tr>
    </table>
    <table class="table">
      <caption>听力医学服务</caption>
      <tr>
        <th>厂家</th>
        <th>系列</th>
        <th>型号</th>
        <th>部位</th>
        <th>原价(元)</th>
        <th>活动价(元)</th>
      </tr>
      <tr>
        <td>{{item.brand}}</td>
        <td>{{item.series}}</td>
        <td>{{item.model}}</td>
        <td>{{item.ear}}</td>
        <td>{{item.price}}</td>
        <td>{{item.money}}</td>
      </tr>
    </table> -->
    <footer>
      <div>
        取机时间：
        <span>2020-08-08</span>
      </div>
      <div>
        保修时长：
        <span>2010-02-06</span>
      </div>
    </footer>
  </div>
</template>

<script>
import api from "../../../api/api";
export default {
  created() {
    console.log(this.$route.query.businessId);
    this.getEquipmentInfo();
  },
  methods: {
    // 获取辅听器具购买详情
    getEquipmentInfo() {
      api
        .postFormAPI("audit/equipmentInfo", {
          sid: localStorage.getItem("sid"),
          recordId: localStorage.getItem("recordId"),
          businessId: this.$route.query.businessId,
        })
        .then((res) => {
          if (res.data.result != "1") {
            return;
          }
          const data = res.data.data;
          data.forEach((item) => {
            if (item.type == "助听器") {
              this.ztq = item.list;
            }
            if (item.type == "无线辅件") {
              this.wxfj = item.list;
            }
            if (item.type == "无线辅件") {
              this.wxfj = item.list;
            }
          });

          //数据处理
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.orderDetail {
  font-size: 12px;
  color: #212121;
  margin: 0 46px;
  header {
    height: 86px;
    background: #fff;
    box-shadow: 0px 1px 10px rgba(236, 236, 236, 1);
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    padding: 16px 10px;
    padding-right: 18px;
    margin-top: 24px;
    .user_info {
      color: #6e6e6e;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }
    .total {
      align-self: center;
      color: #fc3c3c;
      font-size: 38px;
      font-weight: bold;
      &::before {
        content: "￥";
        font-size: 20px;
        font-weight: normal;
      }
    }
  }
  .table {
    margin-top: 30px;
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;
    border-collapse: collapse;
    text-align: center;

    caption {
      font-size: 16px;
      text-align: left;
      margin-bottom: 14px;
      font-weight: bold;
      display: flex;
      align-items: center;
      &::before {
        content: "";
        display: inline-block;
        width: 6px;
        height: 6px;
        background-color: #24afef;
        margin-right: 10px;
      }
    }

    th,
    td {
      border: 1px solid #e4e4e4;
      padding: 0 14px;
    }
    th {
      background-color: #efefef;
      height: 36px;
      font-weight: normal;
    }
    td {
      padding: 6px;
      height: 40px;
      color: #7d7d7d;
    }
  }
  footer {
    display: flex;
    justify-content: space-between;
    margin: 30px 128px 0 0;
    span {
      color: #7d7d7d;
    }
  }
}
</style>