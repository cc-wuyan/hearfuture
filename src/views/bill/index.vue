<template>
  <div class="bill">
    <div class="contain">
      <div class="title">收费票据</div>
      <div class="info">
        <div class="info-content">
          <div>票据单号：{{payData.orderNo}}</div>
          <div>交款人：{{name}}</div>
        </div>
        <div class="info-content">
          <div>开票日期：{{payData.date}}</div>
        </div>
      </div>
      <div class="content">
        <div class="flex-row">
          <div class="content-item">
            <div class="case border-b border-r">项目名称</div>
            <div class="money border-b border-r" style="text-align: center">金额（元）</div>
          </div>
          <div class="content-item">
            <div class="case border-b border-r">项目名称</div>
            <div class="money border-b" style="text-align: center">金额（元）</div>
          </div>
        </div>
        <div class="flex-row">
          <div class="content-item" v-for="(item,index) in payData.data" :key="index">
            <div class="case">{{item.title}}</div>
            <div class="money">{{item.price}}</div>
          </div>
        </div>
        <div class="table-bottom">
          <div class="bottom">
            <div>金额合计（大写）：{{capitalizeTotal}}</div>
          </div>
          <div class="bottom">（小写）：{{payData.total}}</div>
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
      payData: [],
      name: "",
      capitalizeTotal: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getData();
    },
    getData() {
      // 获取用户信息
      api
        .postFormAPI("patient/getInfo", {
          patientId: localStorage.getItem("patientId")
        })
        .then(res => {
          if (res.data.result == "1") {
            this.name = res.data.data.truename;
          }
          //数据处理
        })
        .catch(err => console.log(err));

      // 获取票据信息
      api
        .postFormAPI("medicalService/userCharge", {
          sid: localStorage.getItem("sid"),
          recordId: localStorage.getItem("recordId"),
          paystatus:1
        })
        .then(res => {
          if (res.data.result == "1") {
            this.payData = res.data.data;
            this.capitalizeTotal = this.convertCurrency(this.payData.total);
          }
          //数据处理
        })
        .catch(err => console.log(err));
    },

    // 金额转中文大写
    convertCurrency(money) {
      //汉字的数字
      const cnNums = new Array(
        "零",
        "壹",
        "贰",
        "叁",
        "肆",
        "伍",
        "陆",
        "柒",
        "捌",
        "玖"
      );
      //基本单位
      const cnIntRadice = new Array("", "拾", "佰", "仟");
      //对应整数部分扩展单位
      const cnIntUnits = new Array("", "万", "亿", "兆");
      //对应小数部分单位
      const cnDecUnits = new Array("角", "分", "毫", "厘");
      //整数金额时后面跟的字符
      const cnInteger = "整";
      //整型完以后的单位
      const cnIntLast = "元";
      //金额整数部分
      let integerNum;
      //金额小数部分
      let decimalNum;
      //输出的中文金额字符串
      let chineseStr = "";
      //分离金额后用的数组，预定义
      let parts;
      if (money == "") {
        return "";
      }
      money = parseFloat(money);
      if (money == 0) {
        chineseStr = cnNums[0] + cnIntLast + cnInteger;
        return chineseStr;
      }
      //转换为字符串
      money = money.toString();
      if (money.indexOf(".") == -1) {
        integerNum = money;
        decimalNum = "";
      } else {
        parts = money.split(".");
        integerNum = parts[0];
        // 保留两位小数
        decimalNum = parts[1].substr(0, 2);
      }
      //获取整型部分转换
      if (parseInt(integerNum, 10) > 0) {
        let zeroCount = 0;
        const IntLen = integerNum.length;
        for (var i = 0; i < IntLen; i++) {
          let n = integerNum.substr(i, 1);
          let p = IntLen - i - 1;
          let q = p / 4;
          let m = p % 4;
          if (n == "0") {
            zeroCount++;
          } else {
            if (zeroCount > 0) {
              chineseStr += cnNums[0];
            }
            //归零
            zeroCount = 0;
            chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
          }
          if (m == 0 && zeroCount < 4) {
            chineseStr += cnIntUnits[q];
          }
        }
        chineseStr += cnIntLast;
      }
      //小数部分
      if (decimalNum != "") {
        var decLen = decimalNum.length;
        for (var i = 0; i < decLen; i++) {
          var n = decimalNum.substr(i, 1);
          if (n != "0") {
            chineseStr += cnNums[Number(n)] + cnDecUnits[i];
          }
        }
      }
      if (chineseStr == "") {
        chineseStr += cnNums[0] + cnIntLast + cnInteger;
      } else if (decimalNum == "") {
        chineseStr += cnInteger;
      }
      return chineseStr;
    }
  }
};
</script>

<style lang="scss" scoped>
.bill {
  .contain {
    display: flex;
    align-items: center;
    flex-direction: column;
    color: #212121;
    .title {
      font-size: 22px;
      margin: 20px auto;
    }
  }
  .info {
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin: 0 auto;
  }
  .content {
    width: 90%;
    border: 1px solid #212121;
    margin-top: 14px;
    margin-bottom: 20px;
  }
  .flex-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .content-item {
    width: 50%;
    display: flex;
    .case {
      width: 60%;
      flex-shrink: 0;
      text-align: left;
    }
    .money {
      flex-grow: 1;
      text-align: right;
    }
    .case,
    .money {
      padding: 10px 12px;
      align-self: center;
    }
  }
  .table-bottom {
    display: flex;
    padding: 6px 12px;
    margin-top: 30px;
    justify-content: space-around;
    border-top: 1px solid #212121;
    .bottom {
      flex-shrink: 0;
      flex-grow: 1;
    }
  }
  .border-b {
    border-bottom: 1px solid #212121;
  }
  .border-r {
    border-right: 1px solid #212121;
  }
}
</style>
