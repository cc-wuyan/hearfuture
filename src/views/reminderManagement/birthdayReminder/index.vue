<template>
  <div class="birthdayReminder">
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="patientNum" fixed label="病例号"></el-table-column>
        <el-table-column prop="truename" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="手机号码"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="birthday" label="出生年月" sortable></el-table-column>
      </el-table>
    </div>
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
      pageLimit: 10,
      total: 0,
      tableData: [],
    };
  },
  created() {
    this.getBirthdayRemindList("1");
  },
  methods: {
    getBirthdayRemindList(page) {
      api
        .postFormAPI("audit/getBirthdayRemindList", {
          sid: localStorage.getItem("sid"),
          pageLimit: this.pageLimit,
          page,
        })
        .then((res) => {
          if (res.data.result != "1") {
            return;
          }
          const data = res.data.data.data;
          this.total = Number(res.data.data.total);
          const obj = {
            patientNum: "",
            truename: "",
            phone: "",
            sex: "",
            birthday: "",
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
      this.getBirthdayRemindList("1");
    },
    // 点击下一页
    handleCurrentChange(val) {
      this.getBirthdayRemindList(val);
    },
  },
};
</script>

<style lang="scss" scoped>
.birthdayReminder {
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
}
</style>

<style lang="scss">
.birthdayReminder {
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
      text-align: center;
      font-size: 16px;
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
}
</style>