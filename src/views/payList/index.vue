<template>
  <div class="payList">
    <div class="contain">
      <div class="title">听力医学服务收费单</div>
      <div class="chunk">
        <div class="flex-row">
          <div class="item table-title">项目名称</div>
          <div class="item table-title">服务内容</div>
          <div class="money table-title">价格</div>
        </div>
        <div v-if="payData">
          <div class="flex-row" v-for="(item, index) in payData" :key="index">
            <div class="item">{{item.type}}</div>
            <div class="item">{{item.title}}</div>
            <div class="money">{{item.price}}</div>
          </div>
        </div>
      </div>
      <div class="total">
        <span>合计：{{payDataTotal}}元</span>
      </div>
      <div class="bottom_btn">
        <div class="backbutton" @click="back">返回</div>
        <div class="paybutton" @click="askPay">支付</div>
      </div>
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" class="dialogPayModal" width="500px">
      <div class="options_case">
        <p class="titile">支付</p>
        <p class="money">
          金额
          <span>￥{{payDataTotal}}</span>
        </p>
        <div class="img_case">
          <div>
            <div class="top">
              <img src="../../assets/image/icon_home_newbuy_weixin@2x.png" alt />
              <p>微信支付</p>
            </div>
            <div class="qr">
              <div ref="qrCodeUrl" id="qrcode"></div>
            </div>
          </div>
          <!-- <div>
            <div class="top">
              <img src="../../assets/image/icon_home_newbuy_zfpay@2x.png" alt />
              <p>支付宝</p>
            </div>
            <div class="qr">
              <img :src="zfpayImg" alt />
            </div>
          </div>-->
        </div>
        <div class="btn"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from "../../api/api";
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      historyId: [],
      payData: [],
      payDataTotal: "",
      dialogVisible: false,
      weixinImg: "",
      zfpayImg: "",
      serverListData: [],
      ids: "",
      orderNo: "",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      api
        .postFormAPI("medicalService/userCharge", {
          sid: localStorage.getItem("sid"),
          recordId: localStorage.getItem("recordId"),
          paystatus: 0,
        })
        .then((res) => {
          if (res.data.result == "1") {
            this.payData = res.data.data.data;
            this.payDataTotal = res.data.data.total;
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    getPayData() {
      // api
      //   .postFormAPI("match/settingInfo", {
      //     sid: localStorage.getItem("sid"),
      //   })
      //   .then((res) => {
      //     if (res.data.result == "1") {
      //       var getQrData = res.data.data;
      //       this.weixinImg = getQrData.wxpayImg.url;
      //       this.zfpayImg = getQrData.alipayImg.url;
      //       this.dialogVisible = true;
      //     }
      //     //数据处理
      //   })
      //   .catch((err) => console.log(err));
      var code = this.$route.query.code;
      this.orderNo = this.$route.query.orderNo;
      this.dialogVisible = true;
      this.$nextTick(function () {
        this.creatQrCode(code);
        this.timer = setInterval(this.queryOrder, 3000);
      });
    },
    creatQrCode(url) {
      this.$refs.qrCodeUrl.innerHTML = "";
      new QRCode(this.$refs.qrCodeUrl, {
        text: url,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
      });
    },
    askPay() {
      this.getPayData();
    },
    setHasPay() {
      api
        .postFormAPI("medicalService/payOrder", {
          sid: localStorage.getItem("sid"),
          recordId: localStorage.getItem("recordId"),
        })
        .then((res) => {
          if (res.data.result == "1") {
            this.$notify({
              message: res.data.message,
            });
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    queryOrder() {
      api
        .postFormAPI("medicalService/queryOrder", {
          sid: localStorage.getItem("sid"),
          orderNo: this.orderNo,
        })
        .then((res) => {
          if (res.data.result == "1") {
            if (res.data.data == 1) {
              var that = this;

              this.$notify({
                message: "支付成功",
                onClose(res) {
                  that.$router.push({
                    path: "/bill",
                  });
                },
                duration: 1000,
              });
              this.dialogVisible = false;
              clearInterval(this.timer);
            }
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    back() {
      this.$router.push({
        name: "servicesList",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.payList {
  .contain {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    color: #212121;
  }
  .title {
    align-self: center;
    margin-top: 30px;
    font-size: 20px;
  }
  .chunk {
    margin: 40px 30px 0;
    //   border: 1px solid red;
    border: 1px solid #e4e4e4;
  }
  .flex-row {
    display: flex;
    .item,
    .money {
      flex-grow: 1;
      text-align: center;
      width: 36%;
      padding: 6px 0;
      border-right: 1px solid #e4e4e4;
    }
    .item {
      text-align: left;
      padding-left: 6px;
    }
    .money {
      width: 10%;
      border-right: none;
      text-align: right;
      padding-right: 6px;
    }
    .table-title {
      background-color: #f9f9f9;
      font-weight: bold;
      padding: 14px 0;
      text-align: center;
    }
    &:not(:last-of-type) {
      border-bottom: 1px solid #e4e4e4;
    }
  }
  .total {
    position: relative;
    margin-right: 30px;
    font-size: 20px;
    align-self: flex-end;
    margin-top: 20px;
  }
  .paybutton,
  .backbutton {
    width: 138px;
    height: 42px;
    line-height: 42px;
    border-radius: 21px;
    color: #fff;
    text-align: center;
    background: url("../../assets/image/btn/icon_login_bg@2x.png") no-repeat
      center/contain;
  }
  .paybutton {
    margin-left: 100px;
    background: url("../../assets/image/btn/icon_login_bg@2x(1).png") no-repeat
      center/contain;
  }
  .bottom_btn {
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }
}
</style>

<style lang="scss">
.dialogPayModal {
  .titile {
    font-size: 32px;
    color: #333;
    font-weight: bold;
    margin: 24px auto 36px;
    text-align: center;
  }
  .money {
    font-size: 20px;
    color: #333;
    text-align: center;
    span {
      color: #fc3c3c;
      font-size: 52px;
    }
  }
  .btn {
    width: 190px;
    height: 40px;
    margin: 50px auto 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    //background: linear-gradient(180deg, #64c9ff, #3173b7);
    color: #fff;
    font-size: 18px;
  }
  .img_case {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 50px;
    box-sizing: border-box;
    margin-top: 30px;
    .top {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;

      img {
        width: 30px;
        height: 30px;
        margin-right: 10px;
      }
    }
    // .top:last-child {
    //   margin-left: 75px;
    // }
    .qr {
      width: 100%;
      margin: 20px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 140px;
        height: 140px;
      }
    }
  }
  .img_case > div {
    flex: 1;
    padding: 20px 0;
    border: 1px solid #c1c1c1;
    box-sizing: border-box;
    background: #fff;
  }
  // .img_case > div:last-child {
  //   margin-left: 75px;
  // }
  display: flex;
  align-items: center;
  justify-content: center;
  .el-dialog__body {
    padding: 0;
    background: #f9f9f9;
  }
  font-size: 18px;
  // .el-dialog__header {
  //   padding: 0;
  //   display: none;
  // }
  .el-dialog__title {
    padding: 0;
    display: none;
  }
  .el-dialog {
    width: calc(100% - 320px) !important;
    margin: unset !important;
    background: #f9f9f9;
  }
  .el-icon-close:before {
    font-size: 30px;
  }
}
</style>
