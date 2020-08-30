<template>
  <div class="historyResult">
    <div class="tip-wrapper">
      <div
        :class="active==index?'active':'tip'"
        v-for="(item,index) in reportType"
        :key="index"
        @click="btnType(index)"
      >{{item.value}}</div>
    </div>
    <div class="chunk">
      <table class="table">
        <tr>
          <th>检测日期</th>
          <th>诊断结果</th>
          <th>诊断内容</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item,index) in reportList" :key="index">
          <td>{{item.checkTime}}</td>
          <td>{{item.result}}</td>
          <td>{{item.content}}</td>
          <td>
            <div class="link" @click="toedit(item)">编辑</div>
            <div class="link" @click="isdelete(item,index)">删除</div>
            <div class="link" @click="checkReport(item)">查看报告</div>
          </td>
        </tr>
      </table>
    </div>
    <div class="add-bottom" @click="addReport"></div>
    <el-dialog title="提示" :visible.sync="dialogVisible" class="dialogModal" width="500px">
      <div class="text">确认删除“{{tip}}”这天的诊断记录？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteItem">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from "../../api/api";

export default {
  data() {
    return {
      active: 0,
      reportType: [],
      reportList: [],
      tip: "",
      deleteId: "",
      deleteIndex: "",
      dialogVisible: false,
    };
  },
  created() {
    // 获取报告类型
    api
      .postFormAPI("patientHistory/getDocumentType", {
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result != 1) {
          // this.family=res.data.data;
          return;
        }
        this.reportType = res.data.data;
      })
      .catch((err) => console.log(err));

    // 获取普通报告列表
    this.getReportList("nornalReport");
  },

  methods: {
    // 获取报告列表
    getReportList(e) {
      api
        .postFormAPI("patientHistory/index", {
          sid: localStorage.getItem("sid"),
          recordId: localStorage.getItem("recordId"),
          type: e,
        })
        .then((res) => {
          if (res.data.result != 1) {
            return;
          }
          this.reportList = res.data.data;
        })
        .catch((res) => console.log(res));
    },
    // 添加按钮跳转到编辑页面
    addReport() {
      this.$router.go(-1);
    },
    toedit(item) {
      this.$router.push({
        path: "editResult",
        query: {
          id: item.id,
        },
      });
    },
    // 删除按钮
    isdelete(item, index) {
      this.dialogVisible = true;
      this.tip = item.checkTime;
      this.deleteId = item.id;
      this.deleteIndex = index;
    },
    // 确认删除
    deleteItem() {
      api
        .postFormAPI("patientHistory/del", {
          sid: localStorage.getItem("sid"),
          id: this.deleteId,
        })
        .then((res) => {
          if (res.data.result != 1) {
            // this.family=res.data.data;
            return;
          }
        })
        .catch((res) => console.log(res));
      this.dialogVisible = false;
      this.reportList.splice(this.deleteIndex, 1);
    },
    // 查看报告
    checkReport(item) {
      this.$router.push({
        path: "reportDetail",
        query: {
          id: item.id,
        },
      });
    },

    // 点击报告类型
    btnType(index) {
      this.active = index;
      this.getReportList(this.reportType[index].key);
    },
  },
};
</script>

<style lang="scss" scoped>
.historyResult {
  margin: 30px 30px 0;
  color: #212121;
  .tip-wrapper {
    display: flex;
    flex-wrap: wrap;
  }
  .tip {
    padding: 10px 14px;
    margin-right: 10px;
    margin-bottom: 10px;
    background: #f9f9f9;
    border-radius: 5px;
    color: #646464;
  }
  .active {
    background: #48a0dc;
    padding: 10px 14px;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    color: #fff;
  }
  .chunk {
    margin-top: 30px;
    .table {
      width: 100%;
      border-collapse: collapse;
      tr {
        height: 48px;
        td:last-of-type {
          text-align: left;
        }
      }
      th,
      td {
        border: 1px solid #e4e4e4;
        text-align: center;
        font-weight: unset;
        padding: 0 10px;
        .link {
          display: inline-block;
          padding: 6px 8px;
          color: #48a0dc;
          a {
            color: #48a0dc;
          }
        }
        .link:active {
          box-shadow: 0px 0px 20px #57ebbe;
          //   background-color: red;
        }
      }
      th {
        background-color: #f9f9f9;
        border-bottom: unset;
      }
    }
  }
  .add-bottom {
    width: 80px;
    height: 80px;
    position: fixed;
    right: 20px;
    bottom: 20px;
    border-radius: 50%;
    margin-bottom: 25px;
    color: #fff;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 12px;
    justify-content: center;
    background: url("../../assets/image/btn/icon_btn_back@2x.png") no-repeat center/contain;
  }
}
</style>

<style lang="scss">
.historyResult {
  .dialogModal {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    .el-dialog {
      margin: unset !important;
      border-radius: 10px;
    }
    .el-dialog__header {
      padding: 0;
      text-align: center;
      margin-top: 34px;
    }
    .el-dialog__headerbtn {
      top: 10px;
      right: 10px;
      font-size: 24px;
    }
    .el-dialog__title {
      font-size: 24px;
      color: #333;
      font-weight: bold;
    }
    .text {
      font-size: 18px;
      text-align: center;
      color: #646464;
    }
  }
}
</style>