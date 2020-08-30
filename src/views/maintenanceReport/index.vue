<template>
  <div class="maintenanceReport">
    <div class="contain">
      <div class="header">
        <img class="img" src="../../assets/image/logo@2x.png" alt />
        <div class="slogan">{{ slogan }}</div>
      </div>
      <div class="header-title">
        <div class="title">维修报告单</div>
      </div>
      <div class="user-info">
        <span>姓名：</span>
        <span>{{userInfo.truename}}</span>
        <span>性别：</span>
        <span>{{userInfo.sex == 1 ? '男' : userInfo.sex == 2 ? '女': ''}}</span>
        <span>年龄：</span>
        <span>{{age}}</span>
        <span>病例号：</span>
        <span>{{userInfo.patientNum}}</span>
      </div>

      <!-- 表格部分 -->
      <div class="report-wrapper">
        <table class="shop-info">
          <!-- 表头 -->
          <tr>
            <th colspan="4">一、门店信息</th>
            <th colspan="2">客户随单附件</th>
          </tr>

          <tr>
            <td>*维修门店：</td>
            <td>{{renderData.store_title}}</td>
            <td>*收件联系电话：</td>
            <td>{{renderData.contactPhone}}</td>
            <td colspan="2" rowspan="2">
              <div class="left-right">
                <div class="left">
                  <p>
                    <span class="babel">助听器盒：</span>
                    <span class="my-line">{{renderData.box}}</span>个
                  </p>
                  <p>
                    <span class="babel">保修卡：</span>
                    <span class="my-line">{{renderData.guaranteeCard}}</span>张
                  </p>
                  <p>
                    <span class="babel">耳样：</span>
                    <span class="my-line">{{renderData.auricular}}</span>个
                  </p>
                </div>
                <div class="right">
                  <p>
                    <span class="babel">全套包装：</span>
                    <span class="my-line">{{renderData.pack}}</span>
                    个
                  </p>
                  <p>
                    <span class="babel">受话器：</span>
                    <span class="my-line">{{renderData.receiver}}</span>
                    个
                  </p>
                  <p>
                    <span class="babel">其他：</span>
                    <span class="my-line">{{renderData.other}}</span>
                  </p>
                </div>
              </div>
            </td>
          </tr>

          <tr>
            <td>*收货地址：</td>
            <td colspan="3">{{renderData.address}}</td>
          </tr>

          <tr>
            <td>*用户姓名：</td>
            <td colspan="3">{{renderData.name}}</td>
            <td>*联系电话：</td>
            <td>{{renderData.phone}}</td>
          </tr>

          <tr>
            <td>*助听器型号：</td>
            <td>*机身号</td>
            <td>*购买日期</td>
            <td>*维修次数</td>
            <td>
              <div class="top-bottom">
                <div class="top">*维修类型</div>
              </div>
            </td>
            <td>
              <div class="top-bottom">
                <div class="top">*是否保修期内</div>
              </div>
            </td>
          </tr>

          <tr>
            <td>{{renderData.model}}</td>
            <td>{{renderData.body}}</td>
            <td>{{renderData.buyTime}}</td>
            <td>{{renderData.repairTimes}}</td>
            <td>
              <van-checkbox-group
                v-model="renderData.repairType"
                direction="horizontal"
                class="right-translate"
              >
                <van-checkbox name="1" shape="square">维护</van-checkbox>
                <van-checkbox name="2" shape="square">重做</van-checkbox>
              </van-checkbox-group>
            </td>
            <td>
              <van-checkbox-group
                v-model="renderData.isGuarantee"
                direction="horizontal"
                class="right-translate"
              >
                <van-checkbox name="1" shape="square">是</van-checkbox>
                <van-checkbox name="2" shape="square">否</van-checkbox>
              </van-checkbox-group>
            </td>
          </tr>
        </table>

        <table class="maintenance-policies">
          <tr>
            <th>二、维修政策</th>
          </tr>

          <tr>
            <td>
              <p class="left-right">
                <span class="center">维修费用低于：</span>
                <van-checkbox-group direction="horizontal" v-model="renderData.repairMoney">
                  <van-checkbox name="100.00" shape="square">100元</van-checkbox>
                  <van-checkbox name="200.00" shape="square">200元</van-checkbox>
                  <van-checkbox name="300.00" shape="square">300元</van-checkbox>
                  <van-checkbox name="400.00" shape="square">400元</van-checkbox>
                  <van-checkbox name="500.00" shape="square">
                    <span
                      class="my-line"
                      v-if="renderData.repairMoneyOther"
                    >{{renderData.repairMoneyOther}}</span>
                    <span class="my-line" v-else></span>
                    元
                  </van-checkbox>
                </van-checkbox-group>
                <span class="center">同意无需报价直接进行维修（不勾选将视为需报价）</span>
              </p>
            </td>
          </tr>
        </table>

        <table class="fault-description">
          <tr>
            <th colspan="6">三、故障描述</th>
          </tr>

          <tr>
            <td>损坏</td>
            <td>功能失效</td>
            <td>测听质量</td>
            <td colspan="3">外壳故障</td>
          </tr>

          <tr>
            <td style="width: 120px;">
              <van-checkbox-group direction="horizontal" class="list" v-model="renderData.damage">
                <van-checkbox name="1" shape="square">电池仓门</van-checkbox>
                <van-checkbox name="2" shape="square">电池极片</van-checkbox>
                <van-checkbox name="3" shape="square">麦克风网罩</van-checkbox>
                <van-checkbox name="4" shape="square">程序按钮</van-checkbox>
                <van-checkbox name="5" shape="square">换线</van-checkbox>
                <van-checkbox name="6" shape="square">音量控制</van-checkbox>
                <van-checkbox name="7" shape="square">防耳垢装置</van-checkbox>
                <van-checkbox name="8" shape="square">
                  <p>换外壳颜色</p>
                  <span style="color: red;">{{renderData.color}}</span>
                </van-checkbox>
              </van-checkbox-group>
            </td>
            <td style="width: 150px;">
              <van-checkbox-group
                direction="horizontal"
                class="list"
                v-model="renderData.functionalFailure"
              >
                <van-checkbox name="1" shape="square">死机</van-checkbox>
                <van-checkbox name="2" shape="square">耗电</van-checkbox>
                <van-checkbox name="3" shape="square">声音时有时无</van-checkbox>
                <van-checkbox name="4" shape="square">电感失效</van-checkbox>
                <van-checkbox name="5" shape="square">无法编程</van-checkbox>
                <van-checkbox name="6" shape="square">音量控制失灵</van-checkbox>
                <van-checkbox name="7" shape="square">检测清洁</van-checkbox>
                <van-checkbox name="8" shape="square">电池卡住</van-checkbox>
                <van-checkbox name="9" shape="square">无声</van-checkbox>
              </van-checkbox-group>
            </td>
            <td style="width: 150px;">
              <van-checkbox-group
                direction="horizontal"
                class="list"
                v-model="renderData.listenQuality"
              >
                <van-checkbox name="1" shape="square">增益改变</van-checkbox>
                <van-checkbox name="2" shape="square">失真</van-checkbox>
                <van-checkbox name="3" shape="square">声反馈</van-checkbox>
                <van-checkbox name="4" shape="square">噪音</van-checkbox>
                <van-checkbox name="5" shape="square">静止</van-checkbox>
                <van-checkbox name="6" shape="square">强</van-checkbox>
                <van-checkbox name="7" shape="square">轻</van-checkbox>
                <van-checkbox name="8" shape="square">杂音</van-checkbox>
                <van-checkbox name="9" shape="square">内部反馈</van-checkbox>
              </van-checkbox-group>
            </td>
            <td style="width: 140px;">
              <van-checkbox-group
                direction="horizontal"
                class="list"
                v-model="renderData.shellFailure"
              >
                <van-checkbox name="1" shape="square">外壳裂缝</van-checkbox>
                <van-checkbox name="2" shape="square">面板脱落</van-checkbox>
                <van-checkbox name="3" shape="square">堵耳</van-checkbox>
                <van-checkbox name="4" shape="square">外露</van-checkbox>
                <van-checkbox name="5" shape="square">出声口碰到耳道</van-checkbox>
              </van-checkbox-group>
            </td>
            <td style="width: 150px;">
              <van-checkbox-group
                direction="horizontal"
                class="list"
                v-model="renderData.shellFailure"
              >
                <van-checkbox name="1" shape="square">外部反馈</van-checkbox>
                <van-checkbox name="2" shape="square">外滑</van-checkbox>
                <van-checkbox name="3" shape="square">外壳太松</van-checkbox>
                <van-checkbox name="4" shape="square">耳道胀疼</van-checkbox>
                <van-checkbox name="5" shape="square">耳甲腔胀疼</van-checkbox>
                <van-checkbox name="6" shape="square">耳屏/对耳屏胀疼</van-checkbox>
                <van-checkbox name="7" shape="square">不易戴或戴不进</van-checkbox>
              </van-checkbox-group>
            </td>
            <td style="width: 120px;">
              <van-checkbox-group
                direction="horizontal"
                class="end-list"
                v-model="renderData.repairType"
              >
                <van-checkbox name="1" shape="square">仅外壳破损</van-checkbox>
                <van-checkbox name="2" shape="square">
                  <p>口腔张合反馈</p>
                </van-checkbox>
              </van-checkbox-group>
              <p style="position: relative;top: -10px;">(需重取咀嚼耳样)</p>
            </td>
          </tr>

          <tr>
            <td colspan="5">
              <p class="bolder">其他故障描述和客户要求：（*外壳疼痛或胀疼，请在耳样上用油性笔或2B铅笔表明位置）</p>
              <p style="display: block;min-height: 50px;">{{renderData.otherDamage}}</p>
            </td>
            <td colspan="5">
              <p class="bolder">客户特殊要求反馈：</p>
              <p class="bolder">（由门店填写）</p>
              <p style="display: block;min-height: 50px;">{{renderData.needs}}</p>
            </td>
          </tr>
        </table>

        <!-- 门店填写 -->
        <table class="shop-write">
          <tr>
            <th colspan="10">四、以下内容由门店填写</th>
          </tr>

          <tr>
            <td colspan="5" style="width:50%">维修记录及更改零件清单</td>
            <td colspan="5" style="width:50%">
              <div class="left-right">
                <span class="center">客户是否同意维修：</span>
                <van-checkbox-group direction="horizontal" v-model="renderData.isGuarantee">
                  <van-checkbox name="1" shape="square">是</van-checkbox>
                  <van-checkbox name="2" shape="square">不修退回</van-checkbox>
                </van-checkbox-group>
                <span class="center" style="padding-right: 20px;">日期:</span>
              </div>
            </td>
          </tr>

          <tr>
            <td></td>
            <td>零件</td>
            <td>故障描述</td>
            <td>数量</td>
            <td>单价</td>
            <td></td>
            <td>零件</td>
            <td>故障描述</td>
            <td>数量</td>
            <td>单价</td>
          </tr>
          <tr>
            <td class="fixed-width">1</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="fixed-width">6</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td class="fixed-width">2</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="fixed-width">7</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td class="fixed-width">3</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="fixed-width">8</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td class="fixed-width">4</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="fixed-width">9</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td class="fixed-width">5</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="fixed-width">10</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td colspan="5">
              <p class="align-left">费用合计：{{renderData.totalMoney}}</p>
            </td>
            <td colspan="5">
              <div class="left-right">
                <span>维修人员：</span>
                <span>维修日期：</span>
              </div>
            </td>
          </tr>
        </table>
      </div>

      <!-- 底部签字部分 -->
      <div class="fixed_bottom">
        <div class="user-sign">
          <div>本人签字：</div>
          <div class="line"></div>
          <div>家属签字:</div>
          <div class="line"></div>
        </div>
        <div class="doctor-sign">
          <div>验配中心：{{orgName}}</div>
          <div>检查日期：{{nowdatetime}}</div>
          <div>医生签名：{{truename}}</div>
        </div>
      </div>
    </div>

    <!-- <div class="pos_case">
      <div class="chunk" @click="returnBack()">返回</div>
    </div>-->
  </div>
</template>

<script>
import api from "../../api/api";

export default {
  data() {
    return {
      orgName: "",
      truename: "",
      userInfo: {
        truename: null,
        sex: null,
        birthday: "",
        patientNum: null,
        updatetime: null,
      },
      // 当前时间
      nowdatetime: new Date()
        .toLocaleString()
        .replace(/\//g, "-")
        .substring(
          0,
          new Date().toLocaleString().replace(/\//g, "-").indexOf(" ")
        ),
      renderData: {
        id: 0,
        patientId: "",
        store_title: "",
        contactPhone: "",
        address: "",
        name: "",
        phone: "",
        model: "",
        body: "",
        buyTime: "",
        repairTimes: "",
        repairType: [],
        isGuarantee: [],
        other: "",
        repairMoney: [],
        repairMoneyOther: "",
        damageOther: [],
        damage: [],
        otherDamage: [],
        color: "",
        functionalFailure: [],
        listenQuality: [],
        shellFailure: [],
        otherDamage: [],
        totalMoney: "",
        depositMoney: "",
        needs: "",
        OtoId: [],
        takeTime: "",
        box: "",
        pack: "",
        guaranteeCard: "",
        receiver: "",
        auricular: "",
      },
      slogan: "用爱经营 用良心服务 用匠心成就 ",
    };
  },
  computed: {
    age() {
      if (this.userInfo.birthday == "") {
        return;
      }
      return (
        new Date().getFullYear() - Number(this.userInfo.birthday.slice(0, 4))
      );
    },
  },
  created() {
    // 获取用户信息
    api
      .postFormAPI("patient/getInfo", {
        patientId: localStorage.getItem("patientId"),
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result != 1) {
          return;
        }
        const data = res.data.data;
        for (const key in this.userInfo) {
          if (data.hasOwnProperty(key)) {
            this.userInfo[key] = data[key];
          }
        }

        //数据处理
      })
      .catch((err) => console.log(err));

    // 验配师信息
    api
      .postFormAPI("patientMatchRecord/getMatcherByRecordId", {
        recordId: localStorage.getItem("recordId"),
      })
      .then((res) => {
        if (res.data.result == "1") {
          this.orgName = res.data.data.orgName;
          this.truename = res.data.data.truename;
        }
        //数据处理
      })
      .catch((err) => console.log(err));

    this.init();
  },
  methods: {
    init() {
      this.getData();
    },
    returnBack() {
      this.$router.go(-1);
    },
    //获取所有信息
    getData() {
      api
        .postFormAPI("contract/index", {
          recordId: localStorage.getItem("recordId"),
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          this.renderData = res.data.data;

          this.renderData.functionalFailure = res.data.data.functionalFailure.split(
            ","
          );
          this.renderData.listenQuality = res.data.data.listenQuality.split(
            ","
          );
          this.renderData.damage = res.data.data.damage.split(",");
          this.renderData.shellFailure = res.data.data.shellFailure.split(",");

          this.renderData.repairType = res.data.data.repairType.split("");
          this.renderData.isGuarantee = res.data.data.isGuarantee.split("");

          if (
            this.renderData.repairMoney != "100.00" &&
            this.renderData.repairMoney != "200.00" &&
            this.renderData.repairMoney != "300.00" &&
            this.renderData.repairMoney != "400.00"
          ) {
            this.renderData.repairMoneyOther = this.renderData.repairMoney;
            this.renderData.repairMoney = "500.00";
          }
          this.renderData.repairMoney = [res.data.data.repairMoney];
        });
    },
  },
};
</script>

<style lang="scss" scope>
.maintenanceReport {
  color: #212121;
  .pos_case {
    position: fixed;
    right: 18px;
    bottom: 27px;
    display: flex;
    flex-direction: column;
    .chunk {
      width: 55px;
      height: 55px;
      margin-bottom: 24px;
      background: #5d5d5d;
      border-radius: 50%;
      color: #fff;
      display: flex;
      flex-direction: column;
      text-align: center;
      font-size: 12px;
      justify-content: center;
      padding: 0 10px;
      box-sizing: border-box;
    }
    i {
      width: 20px;
      height: 20px;
      background: url("../../assets/images/save.png") center/cover;
    }
    .sign {
      padding: unset;
      align-items: center;
      img {
        margin-bottom: 2px;
      }
    }
    .del {
      background: #f28b8b;
    }
  }
  .contain {
    display: flex;
    flex-direction: column;
    color: #212121;
  }
  .header {
    display: flex;
    margin: 20px 30px 0;
    align-items: center;
    justify-content: space-between;
    .img {
      height: 40px;
    }
    .slogan {
      font-size: 16px;
      font-weight: bold;
      color: #333;
    }
  }
  .header-title {
    height: 46px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    .title {
      height: 34px;
      font-size: 26px;
      font-weight: bold;
      line-height: 34px;
      color: #333;
    }
  }
  .user-info {
    font-size: 18px;
    line-height: 16px;
    color: #212121;
    margin: 42px auto 0;
    span:nth-of-type(2n + 2):not(:last-of-type) {
      padding: 0 10px;
      margin-right: 40px;
    }
  }
  .report-wrapper {
    margin: 0 30px;
    margin-top: 50px;
  }
  table {
    font-size: 14px;
    width: 100%;
    border-collapse: collapse;
    th,
    td {
      font-weight: unset;
      text-align: center;
      border: 1px solid #212121;
      padding: 4px 0;
    }
    th {
      background-color: rgb(231, 227, 227);
      text-align: left;
      padding-left: 5px;
      font-weight: 600;
    }
    td {
      .left,
      .right,
      .top,
      .bottom {
        flex: 1;
        // margin: 0 auto;
      }
    }
    .bottom {
      position: relative;
      left: 10px;
    }
    .list {
      min-height: 180px;
      display: flex;
      flex-direction: column;
      .van-checkbox {
        // padding-bottom: 10px;
        width: 100%;
      }
    }
    .end-list {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 120px;
    }
  }

  .maintenance-policies,
  .fault-description,
  .shop-write {
    th {
      border-top: 0;
    }
  }

  .fixed_bottom {
    width: 100%;
  }

  .doctor-sign {
    display: flex;
    align-items: center;
    width: 90%;
    margin: 34px auto;
    div {
      flex-grow: 1;
    }
  }
  .user-sign {
    width: 90%;
    display: flex;
    margin: 0 auto;
    justify-content: flex-end;
    margin-top: 46px;
    .line {
      width: 100px;
      border-bottom: 1px solid #212121;
      margin-right: 20px;
    }
  }
}
.left-right {
  display: flex;
  justify-content: space-between;
  padding: 0 10px 0 10px;
  text-align: 0 auto;
  .left,
  .right {
    width: 50%;
    .babel {
      display: inline-block;
      width: 60px;
      text-align: justify;
      text-justify: distribute-all-lines; /*ie6-8*/
      text-align-last: justify; /* ie9*/
      -moz-text-align-last: justify; /*ff*/
      -webkit-text-align-last: justify; /*chrome 20+*/
    }
  }
}
.top-bottom {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.van-checkbox-group {
  padding: 10px;
  // display: flex;
  // flex-direction: column;
  // justify-content: space-between;
}
.center {
  position: relative;
  top: 10px;
}
.bolder {
  text-align: left;
  padding-left: 5px;
  font-weight: 600;
}
.bottom-padding {
  padding-bottom: 30px;
}
.right-translate {
  position: relative;
  right: -25px;
}
.align-left {
  text-align: left;
  padding-left: 10px;
}
.fixed-width {
  width: 30px;
}
.van-checkbox__icon {
  font-size: 14px;
}
.my-line {
  display: inline-block;
  width: 30px;
  border-bottom: 1px solid #212121;
}
</style>
