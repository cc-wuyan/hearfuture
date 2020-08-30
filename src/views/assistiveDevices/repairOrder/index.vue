<template>
  <div class="repairOrder">
    <div class="chunk">
      <div class="chunk_title">门店信息</div>
      <div class="content">
        <el-form :model="form" :rules="rules" ref="ruleForm">
          <div class="flex_row mb-20">
            <div class="flex_row left">
              <div class="dot_label">维修门店</div>
              <el-form-item prop="store_title">
                <el-input v-model="form.store_title"></el-input>
              </el-form-item>
            </div>
            <div class="flex_row right">
              <div class="dot_label">收件联系电话</div>
              <el-form-item prop="contactPhone">
                <el-input v-model="form.contactPhone"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="flex_row mb-20">
            <div class="flex_row left">
              <div class="dot_label">用户姓名</div>
              <el-form-item prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </div>
            <div class="flex_row right">
              <div class="dot_label">收货地址</div>
              <el-form-item prop="address">
                <el-input v-model="form.address"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="flex_row mb-20">
            <div class="flex_row left">
              <div class="dot_label">助听器型号</div>
              <el-form-item prop="model">
                <el-input v-model="form.model"></el-input>
              </el-form-item>
            </div>
            <div class="flex_row right">
              <div class="dot_label">机身号</div>
              <el-form-item prop="body">
                <el-input v-model="form.body"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="flex_row mb-20">
            <div class="flex_row left">
              <div class="dot_label">购买日期</div>
              <el-form-item prop="buyTime">
                <el-input v-model="form.buyTime"></el-input>
              </el-form-item>
            </div>
            <div class="flex_row right">
              <div class="dot_label">维修次数</div>
              <el-form-item prop="repairTimes">
                <el-input v-model="form.repairTimes"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="flex_row mb-20">
            <div class="flex_row left">
              <div class="dot_label">维修类型</div>
              <el-form-item prop="repairType" style="margin-bottom: 0px;">
                <el-radio-group v-model="form.repairType" direction="horizontal">
                  <el-radio label="1" style="width:60px">维修</el-radio>
                  <el-radio label="2" style="width:60px">重做</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <div class="flex_row right">
              <div class="dot_label">是否保修期内</div>
              <el-form-item prop="isGuarantee" style="margin-bottom: 0px;">
                <el-radio-group v-model="form.isGuarantee" direction="horizontal">
                  <el-radio label="1" style="width:60px">是</el-radio>
                  <el-radio label="2" style="width:60px">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <div class="flex_row">
          <div class="al-t">客户随单附件：</div>
          <div class="flex_row wrap">
            <div>助听器盒</div>
            <el-input v-model="form.box" @blur="inputBlur" @focus="inputFocus"></el-input>
            <div>个，全套包装</div>
            <el-input v-model="form.pack" @blur="inputBlur" @focus="inputFocus"></el-input>
            <div>个，保修卡</div>
            <el-input v-model="form.guaranteeCard" @blur="inputBlur" @focus="inputFocus"></el-input>
            <div>张，受话器</div>
            <el-input v-model="form.receiver" @blur="inputBlur" @focus="inputFocus"></el-input>
            <div>个，耳样</div>
            <el-input v-model="form.auricular" @blur="inputBlur" @focus="inputFocus"></el-input>
            <div>个；其他</div>
            <el-input v-model="form.other" @blur="inputBlur" @focus="inputFocus"></el-input>
          </div>
        </div>
      </div>
    </div>
    <div class="chunk">
      <div class="chunk_title">维修政策</div>
      <div class="content">
        <div class="tips">不勾选将视为需报价</div>
        <div class="flex_row">
          <div class="label">维修费用低于</div>
          <div class="select_chunk has_other">
            <el-radio-group v-model="form.repairMoney" direction="horizontal">
              <el-radio label="100">100元</el-radio>
              <el-radio label="200">200元</el-radio>
              <el-radio label="300">300元</el-radio>
              <el-radio label="400">400元</el-radio>
              <el-radio label="500" class="other_radio">
                <div class="checkwithinput_case">
                  其他费用
                  <div class="other">
                    <el-input
                      v-model="form.repairMoneyOther"
                      @blur="inputBlur"
                      @focus="inputFocus"
                    />
                  </div>
                </div>
              </el-radio>
            </el-radio-group>

            <!-- <el-radio-group v-model="form.repairMoney" direction="horizontal">
              <el-radio label="100">100元</el-radio>
              <el-radio label="200">200元</el-radio>
              <el-radio label="300">300元</el-radio>
              <el-radio label="400">400元</el-radio>
              <div class="checkwithinput_case" style="margin-top: 5px;">
                <el-radio label="500" style="margin-right: 0px;" class="hide_label"></el-radio>
                <van-field
                  v-model="form.repairMoneyOther"
                  placeholder="其他"
                  style="margin-left:10px;"
                />
              </div>
            </el-radio-group>-->
          </div>
        </div>
      </div>
    </div>
    <div class="chunk">
      <div class="chunk_title">故障描述</div>
      <div class="content">
        <div class="flex_row mb-20">
          <div class="al-t w-8">损坏</div>
          <div class="select_chunk has_other">
            <el-checkbox-group v-model="form.damage" direction="horizontal">
              <el-checkbox label="1" shape="square">电池仓门</el-checkbox>
              <el-checkbox label="2" shape="square">电池极片</el-checkbox>
              <el-checkbox label="3" shape="square">程序按钮</el-checkbox>
              <el-checkbox label="4" shape="square">音量控制</el-checkbox>
              <el-checkbox label="5" shape="square">拉线</el-checkbox>
              <el-checkbox label="6" shape="square">麦克风网罩</el-checkbox>
              <el-checkbox label="7" shape="square">防耳垢装置</el-checkbox>
              <div class="checkwithinput_case">
                <el-checkbox class="no_label" label="8" shape="square"></el-checkbox>
                <van-field
                  v-model="form.damageOther"
                  placeholder="其他"
                  @blur="inputBlur"
                  @focus="inputFocus"
                />

                <!-- <div class="dropdown" >
                  <div v-if="form.damageOther">{{form.damageOther}}</div>
                  <div v-else>换外壳颜色</div>
                  <div class="dropdown_icon"></div>
                </div>-->
              </div>
            </el-checkbox-group>
          </div>
        </div>
        <div class="flex_row mb-20">
          <div class="al-t w-8">功能失效</div>
          <div class="select_chunk">
            <el-checkbox-group v-model="form.functionalFailure" direction="horizontal">
              <el-checkbox label="1" shape="square">死机</el-checkbox>
              <el-checkbox label="2" shape="square">耗电</el-checkbox>
              <el-checkbox label="3" shape="square">电感失效</el-checkbox>
              <el-checkbox label="4" shape="square">无法编程</el-checkbox>
              <el-checkbox label="5" shape="square">无声</el-checkbox>
              <el-checkbox label="6" shape="square">检测清洁</el-checkbox>
              <el-checkbox label="7" shape="square">电池卡住</el-checkbox>
              <el-checkbox label="8" shape="square">声音时有时无</el-checkbox>
              <el-checkbox label="9" shape="square">音量控制失灵</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="flex_row mb-20">
          <div class="al-t w-8">测听质量</div>
          <div class="select_chunk">
            <el-checkbox-group v-model="form.listenQuality" direction="horizontal">
              <el-checkbox label="1" shape="square">强</el-checkbox>
              <el-checkbox label="2" shape="square">轻</el-checkbox>
              <el-checkbox label="3" shape="square">杂音</el-checkbox>
              <el-checkbox label="4" shape="square">静止</el-checkbox>
              <el-checkbox label="5" shape="square">噪声</el-checkbox>
              <el-checkbox label="6" shape="square">失真</el-checkbox>
              <el-checkbox label="7" shape="square">声反馈</el-checkbox>
              <el-checkbox label="8" shape="square">内部反馈</el-checkbox>
              <el-checkbox label="9" shape="square">音量增益改变</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="flex_row mb-20">
          <div class="al-t w-8">外壳故障</div>
          <div class="select_chunk">
            <el-checkbox-group v-model="form.shellFailure" direction="horizontal">
              <el-checkbox label="3" shape="square">堵耳</el-checkbox>
              <el-checkbox label="4" shape="square">外露</el-checkbox>
              <el-checkbox label="10" shape="square">外滑</el-checkbox>
              <el-checkbox label="5" shape="square">出声口碰到耳道</el-checkbox>
              <el-checkbox label="2" shape="square">面板脱落</el-checkbox>
              <el-checkbox label="6" shape="square">外部反馈</el-checkbox>
              <el-checkbox label="1" shape="square">外壳裂缝</el-checkbox>
              <el-checkbox label="11" shape="square">不易戴或戴不进</el-checkbox>
              <el-checkbox label="7" shape="square">外壳太松</el-checkbox>
              <el-checkbox label="9" shape="square">耳甲腔胀痛</el-checkbox>
              <el-checkbox label="8" shape="square">耳道胀痛</el-checkbox>
              <el-checkbox label="12" shape="square">耳屏/对耳屏胀痛</el-checkbox>
              <el-checkbox label="13" shape="square">仅外壳破损</el-checkbox>
              <el-checkbox label="14" shape="square">口腔张合反馈（需重取咀嚼耳样）</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="mb-20">
          其他故障描述和客户需求
          <span style="margin-left:16px">（*外壳疼痛或胀痛，请勾选耳样上的位置）</span>
        </div>
        <div class="bottom">
          <div class="blank_img">
            <el-input
              type="textarea"
              v-model="form.needs"
              :rows="7"
              @blur="inputBlur"
              @focus="inputFocus"
            ></el-input>
          </div>
          <div class="ear_img">
            <img src="../../../assets/image/ear_sample.png" />
          </div>
          <div class="two_line">
            <el-checkbox-group v-model="form.otherDamage" direction="horizontal">
              <el-checkbox label="1" shape="square">1.耳甲腔</el-checkbox>
              <el-checkbox label="2" shape="square">2.耳道</el-checkbox>
              <el-checkbox label="3" shape="square">3.耳轮角</el-checkbox>
              <el-checkbox label="4" shape="square">4.耳屏</el-checkbox>
              <el-checkbox label="5" shape="square">5.对耳屏</el-checkbox>
              <el-checkbox label="6" shape="square">6.对耳轮</el-checkbox>
              <el-checkbox label="7" shape="square">7.耳轮</el-checkbox>
              <el-checkbox label="8" shape="square">8.三角窝</el-checkbox>
              <el-checkbox label="9" shape="square">9.基底</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
    </div>
    <div class="save_btn" @click="submit"></div>
  </div>
</template>

<script>
import api from "../../../api/api";

export default {
  data() {
    return {
      name: "",
      radio: "",
      checkList: [],
      rules: {
        need: [{ required: true, message: "数据不能为空", trigger: "blur" }],
      },
      form: {
        id: 0,
        recordId: this.$route.query.recordId,
        patientId: this.$route.query.patientId,
        store_title: "",
        contactPhone: "",
        address: "",
        name: "",
        phone: "",
        model: "",
        body: "",
        buyTime: "",
        repairTimes: "",
        repairType: "",
        isGuarantee: "",
        other: "",
        repairMoney: "",
        repairMoneyOther: "",
        damageOther: "",
        damage: [],
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
      formCancel: {
        recordId: this.$route.query.recordId,
        patientId: this.$route.query.patientId,
        store_title: "",
        contactPhone: "",
        address: "",
        name: "",
        phone: "",
        model: "",
        body: "",
        buyTime: "",
        repairTimes: "",
        repairType: "",
        isGuarantee: "",
        other: "",
        repairMoney: "",
        repairMoneyOther: "",
        damageOther: "",
        damage: [],
        color: "",
        functionalFailure: [],
        listenQuality: [],
        shellFailure: [],
        otherDamage: [],
        totalMoney: "",
        depositMoney: "",
        OtoId: "",
        takeTime: "",
        box: "",
        pack: "",
        guaranteeCard: "",
        receiver: "",
        auricular: "",
      },
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) {
          return;
        }
      });
      let form = JSON.parse(JSON.stringify(this.form));
      form.damage = this.form.damage.join(",");
      form.functionalFailure = this.form.functionalFailure.join(",");
      form.listenQuality = this.form.listenQuality.join(",");
      form.shellFailure = this.form.shellFailure.join(",");
      form.otherDamage = this.form.otherDamage.join(",");
      form.repairMoney = this.form.repairMoney;
      form.sid = this.$route.query.sid;
      api
        .postFormAPI("contract/submit", form)
        .then((res) => {
          if (res.data.result == "1") {
            this.$notify({
              message: res.data.message,
              showClose: false,
              onClose(res) {
                location.reload();
              },
              duration: 3000,
            });
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    cancel() {
      this.form = this.formCancel;
    },
    getInfo() {
      api
        .postFormAPI("contract/index", {
          recordId: this.$route.query.recordId,
          sid: this.$route.query.sid,
        })
        .then((res) => {
          if (res.data.result == "1") {
            const data = res.data.data;
            for (let key in this.form) {
              if (data.hasOwnProperty(key)) {
                this.form[key] = data[key];
              }
              if (
                key == "damage" ||
                key == "functionalFailure" ||
                key == "listenQuality" ||
                key == "shellFailure" ||
                key == "otherDamage"
              ) {
                if (data[key] != null && data[key].length > 0) {
                  var arr = data[key].split(",");
                  this.form[key] = arr;
                }
                if (data[key] == null) {
                  this.form[key] = [];
                }
              }
              if (key == "repairMoney") {
                var num = parseInt(data[key]);
                var trueNum = String(num);
                this.$set(this.form, key, trueNum);
              }
              if (key == "repairMoneyOther") {
                if (data[key]) {
                  var num = parseInt(data[key]);
                  var trueNum = String(num);
                  this.$set(this.form, "repairMoney", "500");
                  this.$set(this.form, "repairMoneyOther", data[key]);
                }
              }
            }
            console.log(this.form.repairMoney);
            console.log(this.form.repairMoneyOther);
          }
        })
        .catch((err) => console.log(err));
    },
    queryParams(data, isPrefix = false) {
      let prefix = isPrefix ? "?" : "";
      let _result = [];
      for (let key in data) {
        let value = data[key];
        // 去掉为空的参数
        if (["", undefined, null].includes(value)) {
          continue;
        }
        if (value.constructor === Array) {
          value.forEach((_value) => {
            _result.push(
              encodeURIComponent(key) + "[]=" + encodeURIComponent(_value)
            );
          });
        } else {
          _result.push(
            encodeURIComponent(key) + "=" + encodeURIComponent(value)
          );
        }
      }
      // console.log(_result.length ? prefix + _result.join("&") : "");
      return _result.length ? prefix + _result.join("&") : "";
    },
    nativeCall(param, nativeMethodName) {
      // console.log(param);
      // console.log(nativeMethodName);
      param = this.queryParams(param);
      // console.log(param);

      document.location = "js://" + nativeMethodName + "?" + param;
    },
    inputBlur() {
      this.nativeCall({ focus: false }, "inputFocus");
    },
    inputFocus() {
      this.nativeCall({ focus: true }, "inputFocus");
    },
  },
};
</script>

<style lang="scss" scoped>
.repairOrder {
  color: #212121;
  margin: 30px 30px 90px;

  .chunk {
    background-color: #f9f9f9;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    margin-bottom: 14px;
    .chunk_title {
      width: 116px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      font-weight: bold;
      border-radius: 6px 0px 14px 0px;
      background-color: #ebf2f5;
      color: #5091c7;
    }
    .content {
      margin: 16px;
      .mb-20 {
        margin-bottom: 20px;
      }
    }
    .flex_row {
      display: flex;
      align-items: center;
      flex-grow: 1;

      .al-t {
        flex-shrink: 0;
        align-self: flex-start;
        margin-top: 12px;
        margin-right: 6px;
      }
      .w-8 {
        width: 80px;
        text-align: right;
        margin-right: 16px;
      }
      .label {
        flex-shrink: 0;
        margin-right: 16px;
      }
    }
    .left {
      margin-right: 26px;
      .dot_label {
        width: 104px;
        text-align: right;
      }
    }
    .right .dot_label {
      width: 124px;
      text-align: right;
    }
    .dot_label {
      margin-right: 16px;
      flex-shrink: 0;
      &::before {
        content: "*";
        color: #fc3c3c;
        margin-right: 6px;
        vertical-align: middle;
      }
    }
    .wrap {
      flex-wrap: wrap;
      line-height: 50px;
    }
  }
  .tips {
    color: #aaa;
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .select_chunk {
    border-radius: 2px;
    background-color: #f3f3f3;
    padding: 14px 12px;
    flex-grow: 1;
    border-radius: 2px;
  }
  .checkwithinput_case {
    display: flex;
    align-items: center;
    .other {
      margin-left: 12px;
    }
  }
  .bottom {
    display: flex;
    .blank_img {
      flex-shrink: 0;
      width: 220px;
      border-radius: 2px;
    }
    .ear_img {
      width: 198px;
      flex-shrink: 0;
      margin: 0 16px;
      img {
        width: 100%;
      }
    }
  }
  .dropdown {
    height: 30px;
    width: 120px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    background: #fff;
    color: #646464;
    padding: 0 8px;
    margin-left: 6px;
    justify-content: space-between;
    .dropdown_icon {
      width: 16px;
      height: 10px;
      background: url("../../../assets/images/icon_more@2x.png") center/cover;
    }
  }
  .save_btn {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    position: fixed;
    right: 20px;
    bottom: 90px;
    background: url("../../../assets/image/btn/icon_btn_save@2x.png") no-repeat
      center/contain;
  }
  .pos_case {
    position: fixed;
    right: 18px;
    bottom: 48px;
    display: flex;
    flex-direction: column;
    z-index: 99999;
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
      background: url("../../../assets/images/save.png") center/cover;
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
  .two_line {
    // width: 200px;
    & /deep/ .el-checkbox {
      width: 100px;
      margin-right: 20px;
      margin-top: 3px;
      margin-bottom: 3px;
    }
  }
}
</style>

<style lang="scss">
.repairOrder {
  .hide_label {
    .el-radio__label {
      display: none;
      font-size: 18px;
    }
  }
  .el-input {
    font-size: 18px;
  }
  .el-input__inner {
    border-radius: 2px;
    padding: 0 6px;
    border: unset;
  }
  .el-input__inner:hover {
    border: unset;
  }
  .wrap .el-input {
    width: 50px;
    margin: 0 10px;
    .el-input__inner {
      text-align: center;
      height: 38px;
      line-height: 38px;
    }
  }
  .el-radio__label {
    color: #212121;
  }
  .el-radio-group .el-radio:not(:last-of-type) {
    margin-right: 30px;
  }
  //   优先级
  .select_chunk .checkwithinput_case .el-radio {
    margin-right: 10px;
  }
  .select_chunk .el-checkbox {
    margin-right: 10px;
  }
  .checkwithinput_case .van-cell {
    padding: 0 6px;
    height: 38px;
    line-height: 38px;
    width: 120px;
    .van-cell__value {
      font-size: 18px;
    }
  }
  .el-checkbox {
    margin-top: 8px;
    margin-bottom: 8px;
    width: 130px;
  }
  .checkwithinput_case .el-checkbox {
    width: auto;
  }

  .no_label .el-checkbox__label {
    display: none;
  }
  .other_radio {
    display: flex;
    align-items: center;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .has_other {
    .el-checkbox-group,
    .el-radio-group {
      display: flex;
      flex-wrap: wrap;
    }
    .el-radio-group {
      flex-wrap: nowrap;
      align-items: center;
    }
    .el-radio-group .el-radio {
      margin-right: 16px;
    }
  }
}
</style>
