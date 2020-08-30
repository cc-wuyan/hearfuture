<template>
  <div class="commonProblem">
    <div class="search">
      <div class="search-left">
        <div class="search_chunk">
          <div class="flex_shrink">搜索：</div>
          <div style="width:220px">
            <el-input v-model="search" placeholder="请输入问题标题"></el-input>
          </div>
        </div>
      </div>
      <div class="search-btn flex_shrink" @click="searchBtn()">搜索</div>
    </div>
    <div class="add_btn" @click="addProblem()">添加</div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="title" label="标题" width="auto"></el-table-column>
        <el-table-column prop label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="problemInfo(scope.row)" type="text">详情</el-button>
            <el-button @click="editorProblem(scope.row)" type="text">编辑</el-button>
            <el-button @click="deleteProblem(scope.row)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      :page-size="pageLimit"
      :pager-count="7"
      @current-change="handleCurrentChange"
      layout="total, prev, pager, next"
      :total="total"
    ></el-pagination>
    <el-dialog title="提示" :visible.sync="sureDelete" class="dialogModal" width="500px">
      <div class="text">确认删除问题“{{deleteTitle}}”？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sureDelete = false">取 消</el-button>
        <el-button type="primary" @click="deleteItem">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from "../../../api/api";

export default {
  data() {
    return {
      search: "",
      pageLimit: 10,
      total: 0,
      tableData: [],
      deleteTitle: "",
      deleteId: "",
      sureDelete: false,
    };
  },
  created() {
    this.getScheduleList("1");
  },
  methods: {
    getScheduleList(page) {
      api
        .postFormAPI("question/index", {
          sid: localStorage.getItem("sid"),
          search: this.search,
          pageLimit: this.pageLimit,
          page,
        })
        .then((res) => {
          if (res.data.result != "1") {
            return;
          }
          const data = res.data.data.rows;
          this.total = Number(res.data.data.total);
          const obj = {
            id: "",
            title: "",
          };
          data.forEach((item) => {
            for (let key in item) {
              if (obj[key] == undefined) {
                delete item[key];
              }
            }
          });
          this.tableData = data;
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    // 搜索按钮
    searchBtn() {
      this.getScheduleList("1");
    },
    // 点击下一页
    handleCurrentChange(val) {
      this.getScheduleList(val);
    },
    // 删除按钮
    deleteProblem(e) {
      this.deleteTitle = e.title;
      this.deleteId = e.id;
      this.sureDelete = true;
    },
    //删除问题
    deleteItem() {
      api
        .postFormAPI("question/appDel", {
          sid: localStorage.getItem("sid"),
          id: this.deleteId,
        })
        .then((res) => {
          if (res.data.result != "1") {
            this.$notify({
              message: res.data.message,
            });
            this.sureDelete = false;
            return;
          }
          this.getScheduleList("1");
          this.$notify({
            message: res.data.message,
          });
          this.sureDelete = false;
        })
        .catch((err) => console.log(err));
    },
    // 查看详情按钮
    problemInfo(e) {
      this.$router.push({
        name: "commonProblemInfo",
        query: {
          id: e.id,
        },
      });
    },
    // 编辑按钮
    editorProblem(e) {
      this.$router.push({
        name: "commonProblemadd",
        query: {
          id: e.id,
        },
      });
    },

    // 添加问题按钮
    addProblem() {
      this.$router.push("commonProblemadd");
    },
  },
};
</script>

<style lang="scss" scoped>
.commonProblem {
  color: #212121;
  margin: 0 30px;
  .search {
    display: flex;
    align-items: center;
    background-color: #f9f9f9;
    padding: 12px 50px 12px 16px;
    .search-left {
      display: flex;
      flex-grow: 1;
      align-items: center;
    }
    .search_chunk {
      display: flex;
      align-items: center;
      margin-right: 30px;
    }
    .search-btn {
      background-color: #74bcee;
      color: #fff;
      font-size: 18px;
      border-radius: 6px;
      padding: 6px 10px;
      text-align: center;
    }
    .flex_shrink {
      flex-shrink: 0;
    }
  }
  .add_btn {
    width: 64px;
    background-color: #74bcee;
    color: #fff;
    font-size: 18px;
    text-align: center;
    border-radius: 6px;
    padding: 6px 0;
    margin: 20px 12px 0 auto;
  }
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
}
</style>

<style lang="scss">
.commonProblem {
  .el-input__inner {
    padding: 6px 8px;
    height: 32px;
    font-size: 18px;
  }
  .el-input__icon {
    height: auto;
  }

  .table {
    .cell {
      color: #212121;
      font-size: 18px;
      text-align: center;
      font-family: Microsoft YaHei;
    }
    th {
      font-weight: unset;
      background-color: #f9f9f9;
    }
  }
  .el-date-editor .el-range-input {
    font-size: 18px;
  }
  .el-date-editor .el-range-separator {
    height: auto;
  }
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
      font-size: 16px;
      text-align: center;
      color: #646464;
    }
  }
}
</style>