<template>
  <div class="auditDetail">
    <header>
      <div class="type">{{typeOptions[type-1]}}审核</div>
      <div class="check" @click="checkCase">查看病例</div>
    </header>
    <div class="service" v-if="type=='1'">
      <table class="table">
        <tr>
          <th>服务项目</th>
          <th>服务内容</th>
          <th>价格</th>
        </tr>
        <tr v-for="(item,index) in tyl.patientCharge" :key="index">
          <td>{{item.title}}</td>
          <td>{{item.type}}</td>
          <td>{{item.price}}</td>
        </tr>
      </table>
      <div class="totalPrice">合计：{{tyl.totalCharge}}&nbsp;元</div>
    </div>
    <div class="case" v-if="type=='2'">
      <table class="table">
        <tr>
          <th></th>
          <th>右耳</th>
          <th>左耳</th>
        </tr>
        <tr>
          <td class="bg">类型</td>
          <td>{{kf.rightData.deafAidType}}</td>
          <td>{{kf.leftData.deafAidType}}</td>
        </tr>
        <tr>
          <td class="bg">性能</td>
          <td>{{kf.rightData.performance}}</td>
          <td>{{kf.leftData.performance}}</td>
        </tr>
        <tr>
          <td class="bg">功率</td>
          <td>{{kf.rightData.power}}</td>
          <td>{{kf.leftData.power}}</td>
        </tr>
        <tr>
          <td class="bg">外观</td>
          <td>{{kf.rightData.exterior}}</td>
          <td>{{kf.leftData.exterior}}</td>
        </tr>
        <tr>
          <td class="bg">耳膜</td>
          <td>{{kf.rightData.eardrum}}</td>
          <td>{{kf.leftData.eardrum}}</td>
        </tr>
        <tr>
          <td class="bg">选配</td>
          <td>{{kf.rightData.parts}}</td>
          <td>{{kf.leftData.parts}}</td>
        </tr>
        <tr>
          <td class="bg">听觉重构</td>
          <td colspan="2">{{kf.hearRebuild}}</td>
        </tr>
        <tr>
          <td class="bg">言语矫治</td>
          <td colspan="2">{{kf.speechTherapy}}</td>
        </tr>
        <tr>
          <td class="bg">临床治疗方案</td>
          <td colspan="2">{{kf.remark}}</td>
        </tr>
      </table>
    </div>
    <div class="purchase" v-if="type=='3'">
      <table class="table" v-for="item in goods" :key="item.id">
        <caption>{{item.type}}</caption>
        <tr>
          <th>标题</th>
          <th>厂家</th>
          <th>系列</th>
          <th>型号</th>
          <th>部位</th>
          <th>原价</th>
        </tr>
        <tr v-for="i in item.list" :key="i.id">
          <td>{{i.title}}</td>
          <td>{{i.brand}}</td>
          <td>{{i.series}}</td>
          <td>{{i.model}}</td>
          <td>{{i.ear}}</td>
          <td>{{i.price}}</td>
        </tr>
      </table>
    </div>
    <div class="advice" v-if="type=='4'">
      <div class="content">
        <el-input v-model="adviceContent" placeholder type="textarea" rows="30" disabled></el-input>
      </div>
    </div>
    <div class="btn_chunk">
      <div class="left_btn" @click="dialogVisible=true">审核</div>
      <div class="right_btn" @click="cancel">取消</div>
    </div>
    <el-dialog title="审核" :visible.sync="dialogVisible" center class="dialogModal">
      <div>
        <div class="dialogLabel">是否审核通过：</div>
        <el-radio v-model="status" label="1">通过</el-radio>
        <el-radio v-model="status" label="2">不通过</el-radio>
      </div>
      <div class="dialogcontent">
        <div class="dialogLabel">原因：</div>
        <el-input type="textarea" :rows="1" v-model="reason" placeholder="请输入"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from "../../../api/api";
import common from "../../../utils/common";

export default {
  data() {
    return {
      businessId: this.$route.query.businessId,
      type: this.$route.query.type + "",
      typeOptions: ["听力医学服务", "康复方案", "辅听器具购买", "医嘱"],
      dialogVisible: false,
      status: "",
      reason: "",
      // 听力医学列表和总价格
      tyl: {
        patientCharge: [],
        totalCharge: "",
      },

      // 康复方案左右耳详情
      kf: {
        leftData: [],
        rightData: [],
        speechTherapy: "",
        hearRebuild: "",
        remark: "",
      },

      // 辅听器具购买
      goods: {},

      // 医嘱
      adviceContent: "",
    };
  },
  created() {
    switch (this.type) {
      case "1":
        this.getPatientCharge();
        break;
      case "2":
        this.getRecoveryPlanInfo();
        break;
      case "3":
        this.getEquipmentInfo();
        break;
      case "4":
        this.getDoctorAdviceInfo();
        break;
    }
  },
  methods: {
    // 获取听力医学服务收费单详情
    getPatientCharge() {
      api
        .postFormAPI("audit/patientChargeInfo", {
          sid: localStorage.getItem("sid"),
          recordId: this.$route.query.recordId,
          businessId: this.businessId,
        })
        .then((res) => {
          if (res.data.result != "1") {
            return;
          }
          this.tyl.patientCharge = res.data.data.data;
          this.tyl.totalCharge = res.data.data.total;
          //数据处理
        })
        .catch((err) => console.log(err));
    },

    // 获取康复方案详情
    getRecoveryPlanInfo() {
      api
        .postFormAPI("audit/getRecoveryPlanInfo", {
          sid: localStorage.getItem("sid"),
          recordId: this.$route.query.recordId,
          businessId: this.businessId,
        })
        .then((res) => {
          if (res.data.result != "1") {
            return;
          }
          this.kf.leftData = res.data.data.left;
          this.kf.rightData = res.data.data.right;
          this.kf.speechTherapy = res.data.data.speechTherapy;
          this.kf.hearRebuild = res.data.data.hearRebuild;
          this.kf.remark = res.data.data.remark;
          //数据处理
        })
        .catch((err) => console.log(err));
    },

    // 获取辅听器具购买详情
    getEquipmentInfo() {
      api
        .postFormAPI("audit/equipmentInfo", {
          sid: localStorage.getItem("sid"),
          recordId: this.$route.query.recordId,
          businessId: this.businessId,
        })
        .then((res) => {
          if (res.data.result != "1") {
            return;
          }

          this.goods = res.data.data;
        })

        //数据处理

        .catch((err) => console.log(err));
    },

    // 获取医嘱详情
    getDoctorAdviceInfo() {
      api
        .postFormAPI("audit/doctorAdviceInfo", {
          sid: localStorage.getItem("sid"),
          recordId: this.$route.query.recordId,
          businessId: this.businessId,
        })
        .then((res) => {
          if (res.data.result != "1") {
            return;
          }
          this.adviceContent = res.data.data.adviceContent;
          //数据处理
        })
        .catch((err) => console.log(err));
    },

    // 取消按钮
    cancel() {
      this.$router.go(-1);
    },

    // 审核确定
    submit() {
      if (this.status == "2" && this.reason == "") {
        this.$alert("不通过请输入原因", {
          confirmButtonText: "确定",
        });
        return;
      }
      this.dialogVisible = false;
      // 提交审核结果
      api
        .postFormAPI("audit/setStatus", {
          sid: localStorage.getItem("sid"),
          businessId: this.businessId,
          type: this.type,
          status: this.status,
          reason: this.reason,
        })
        .then((res) => {
          if (res.data.result == "1") {
            common(this);
          }
          this.$notify({
            message: res.data.message,
          });
          //数据处理
        })
        .catch((err) => console.log(err));
    },

    // 查看病例
    checkCase() {
      this.$router.push({
        path: "/patient",
        query: {
          sid: localStorage.getItem("sid"),
          recordId: this.$route.query.recordId,
          patientId: this.$route.query.patientId,
          back: "2",
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.auditDetail {
  color: #212121;
  margin: 30px 30px 0;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .type {
      font-size: 20px;
      font-weight: bold;
    }
    .check {
      background-color: #74bcee;
      color: #fff;
      font-size: 20px;
      border-radius: 6px;
      padding: 6px 10px;
      text-align: center;
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
      font-size: 18px;
      text-align: left;
      margin-bottom: 14px;
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
      font-size: 16px;
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
  .totalPrice {
    width: 80%;
    margin: 30px auto 0;
    text-align: right;
    font-size: 20px;
    font-weight: bold;
  }
  .advice {
    width: 80%;
    border-radius: 6px;
    border: 1px solid #dcdfe6;
    margin: 30px auto 0;
    padding: 30px 12px;
    line-height: 28px;
    .content {
      padding-left: 1em;
    }
  }
  .btn_chunk {
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }
  .left_btn {
    background-color: #74bcee;
    color: #fff;
    border-radius: 6px;
    padding: 6px 10px;
    text-align: center;
    margin-right: 20px;
  }
  .right_btn {
    border: 1px solid #dcdfe6;
    border-radius: 6px;
    padding: 6px 10px;
    text-align: center;
  }

  .dialogcontent {
    display: flex;
    margin-top: 24px;
  }
  .dialogLabel {
    width: 128px;
    text-align: right;
    display: inline-block;
    flex-shrink: 0;
    margin-right: 8px;
  }
}
</style>

<style lang="scss">
.auditDetail {
  .el-button,
  .el-radio__label,
  .el-dialog__body,
  .el-textarea__inner {
    font-size: 18px;
  }

  .el-textarea__inner {
    padding: 6px;
  }
  .dialogModal {
    display: flex;
    align-items: center;
    justify-content: center;
    .el-dialog {
      border-radius: 10px;
      margin: unset !important;
    }
  }
  .el-textarea.is-disabled .el-textarea__inner {
    background-color: unset;
    border-color: unset;
    color: unset;
  }

  .el-textarea__inner {
    font-size: 18px;
  }
}
</style>
