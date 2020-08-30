<template>
  <div class="visitDueReminder">
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="createTime" fixed label="日期" width="220"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="150"></el-table-column>
        <el-table-column prop="type" label="回访事项" width="100"></el-table-column>
        <el-table-column prop="truename" label="回访验配师" width="120"></el-table-column>
        <el-table-column prop="visitTime" label="回访日期" width="220"></el-table-column>
        <el-table-column prop="visitContent" label="回访结果" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.visitContent!=''" type="text" disabled>已登记</el-button>
            <el-button v-else @click="handleClick(scope.row)" type="text">登记</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <el-pagination
      :page-size="pageLimit"
      :pager-count="7"
      @current-change="handleCurrentChange"
      layout="total, prev, pager, next"
      :total="total"
    ></el-pagination>

    <!-- 弹出框 -->
    <el-dialog :visible.sync="dialogVisible" center class="dialogModal">
      <div>
        <div class="dialogLabel">回访日期：</div>
        <el-date-picker
          :editable=false
          v-model="time"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
      </div>
      <div class="dialogcontent">
        <div class="dialogLabel">回访内容：</div>
        <el-input type="textarea" :rows="1" v-model="content" placeholder="请输入"></el-input>
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

export default {
  data() {
    return {
      pageLimit: 10,
      total: 0,
      tableData: [],

      dialogVisible: false,
      content: "",
      time: "",
      id: "",
      page: "",
    };
  },
  created() {
    this.getVisitIndex("1");
  },
  methods: {
    // 获取回访提醒
    getVisitIndex(page) {
      api
        .postFormAPI("visit/index", {
          sid: localStorage.getItem("sid"),
          pageLimit: this.pageLimit,
          page:page==""?"1":page,
        })
        .then((res) => {
          if (res.data.result != "1") {
            return;
          }
          const data = res.data.data.rows;
          this.total = Number(res.data.data.total);
          const obj = {
            createTime: "",
            name: "",
            phone: "",
            type: "",
            truename: "",
            visitTime: "",
            visitContent: "",
            id: "",
          };
          data.forEach((item) => {
            for (let key in item) {
              if (obj[key] == undefined) {
                delete item[key];
              }
            }
          });
          this.tableData = data;
        })
        .catch((err) => console.log(err));
    },

    //登记按钮
    handleClick(row) {
      // this.visitTime = row.visitTime;
      // this.visitContent = row.visitContent;
      this.id = row.id;
      this.dialogVisible = true;
    },

    submit() {
      if (this.time == "" || this.content == "") {
        this.$alert("请将内容填写完整！", {
          confirmButtonText: "确定",
        });
        return;
      }
      this.dialogVisible = false;
      api
        .postFormAPI("visit/edit", {
          sid: localStorage.getItem("sid"),
          id: this.id,
          visitTime: this.time,
          visitContent: this.content,
        })
        .then((res) => {
          this.$notify({
            message: res.data.message,
          });
          if (res.data.result != "1") {
            return;
          }
        })
        .catch((err) => console.log(err));

      this.getVisitIndex(this.page);
    },

    // 点击下一页
    handleCurrentChange(val) {
      this.getVisitIndex(val);
      this.page = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.visitDueReminder {
  color: #212121;
  margin: 0 30px;

  .table {
    margin-top: 20px;
    margin-bottom: 20px;
    th {
      background-color: #f9f9f9;
    }
    .el-button--text {
      font-size: 18px;
    }
  }
  .dialogcontent {
    display: flex;
    margin-top: 24px;
  }
  .dialogLabel {
    width: 120px;
    text-align: right;
    display: inline-block;
    flex-shrink: 0;
    margin-right: 8px;
  }
}
</style>

<style lang="scss">
.visitDueReminder {
  .el-input__inner {
    padding: 6px 8px;
    padding-left: 32px;
    height: 32px;
    font-size: 18px;
  }
  .el-input__icon {
    line-height: 32px;
  }
  .table {
    .cell {
      color: #212121;
      text-align: center;
      font-size: 18px;
      font-family: Microsoft YaHei;
    }
    th {
      font-weight: unset;
      background-color: #f9f9f9;
    }
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
}
</style>