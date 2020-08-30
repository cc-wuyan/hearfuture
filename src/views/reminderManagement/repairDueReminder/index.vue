<template>
  <div class="repairDueReminder">
    <div class="type">
      <div class="type-btn" :class="{'active-btn':type=='1'}" @click="typeChange('1')">六十日到期</div>
      <div class="type-btn" :class="{'active-btn':type=='2'}" @click="typeChange('2')">三十日到期</div>
    </div>

    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="truename" fixed label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="phone" label="联系方式"></el-table-column>
        <el-table-column prop="title" label="商品名称"></el-table-column>
        <el-table-column prop="createTime" label="购机日期"></el-table-column>
        <el-table-column prop="repairTime" label="保修期"></el-table-column>
        <el-table-column prop="repairExpire" label="保修到期日期"></el-table-column>
        <el-table-column label="是否回访">
          <template slot-scope="scope">{{scope.row.isVisit == 0 ? "否" : "是"}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.isVisit == 0"
              type="success"
              @click="showTip(scope.row.id)"
            >回访</el-button>
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
  </div>
</template>

<script>
import api from "../../../api/api";

export default {
  data() {
    return {
      type: "1",
      pageLimit: 10,
      total: 0,
      tableData: [],
      page: 1
    };
  },
  created() {
    this.getRepairRemindList("1");
  },
  methods: {
    getRepairRemindList() {
      api
        .postFormAPI("audit/repairRemindList", {
          sid: localStorage.getItem("sid"),
          type: this.type,
          pageLimit: this.pageLimit,
          page: this.page,
        })
        .then((res) => {
          if (res.data.result != "1") {
            return;
          }
          const data = res.data.data.data;
          this.total = Number(res.data.data.total);
          this.tableData = data;

          //数据处理
        })
        .catch((err) => console.log(err));
    },
    // 类型切换按钮
    typeChange(type) {
      this.type = type;
      this.getRepairRemindList("1");
    },
    // 点击下一页
    handleCurrentChange(val) {
      this.page = val;
      this.getRepairRemindList();
    },
    showTip(id) {
      console.log(id);
      this.$msgbox({
        message: "是否已回访",
        title: "提示",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showCancelButton: true,
      })
        .then(() => {
          api
            .postFormAPI("order/visit", {
              sid: localStorage.getItem("sid"),
              id,
            })
            .then((res) => {
              if (res.data.result != "1") {
                this.$message({
                  type: "error",
                  message: "操作失败",
                });
                return;
              }
              this.$message({
                type: "success",
                message: "操作成功",
              });
              this.getRepairRemindList();
              //数据处理
            })
            .catch((err) => console.log(err));
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.repairDueReminder {
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
  .type {
    display: flex;
    margin: 14px 0;
    .type-btn {
      padding: 10px 36px;
      background-color: #f9f9f9;
      font-size: 18px;
      &:first-child {
        margin-right: 6px;
      }
    }
    .active-btn {
      background-color: #74bcee;
      color: #fff;
    }
  }
}
</style>

<style lang="scss">
.repairDueReminder {
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
}
</style>