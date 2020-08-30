<template>
  <div class="auditReminder">
    <div class="search">
      <div class="search-left">
        <div class="search_chunk">
          <div class="flex_shrink">搜索：</div>
          <div>
            <el-input v-model="search" style="width:190px" placeholder="验配师/患者/审核编号"></el-input>
          </div>
        </div>
        <div class="search_chunk">
          <div class="flex_shrink">审核状态：</div>
          <div>
            <el-select v-model="status" clearable placeholder style="width:100px;">
              <el-option
                v-for="(item,index) in statusOptions"
                :key="index"
                :label="item"
                :value="index+1"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="search_chunk">
          <div class="flex_shrink">审核类型：</div>
          <div>
            <el-select v-model="type" clearable placeholder style="width:150px;">
              <el-option
                v-for="(item,index) in typeOptions"
                :key="index"
                :label="item"
                :value="index+3"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="search-btn flex_shrink" @click="searchBtn()">搜索</div>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="number" fixed label="审核编号" width="150"></el-table-column>
        <el-table-column prop="type" label="审核类型" width="180"></el-table-column>
        <el-table-column prop="truename" label="验配师姓名" width="120"></el-table-column>
        <el-table-column prop="patientName" label="患者姓名" width="100"></el-table-column>
        <el-table-column prop="status" label="审核状态" width="100"></el-table-column>
        <el-table-column prop="createtime" label="提交时间" width="180" sortable></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text">详情</el-button>
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
  </div>
</template>

<script>
import api from "../../../api/api";
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      search: "",
      status: "",
      type: "",
      pageLimit: 10,
      statusOptions: ["未审核", "已通过", "未通过"],
      typeOptions: ["听力医学服务", "康复方案", "辅听器具购买", "医嘱"],
    };
  },
  created() {
    let patient_sid = this.queryParams("sid") || localStorage.getItem("sid");
    localStorage.setItem("patient_sid", patient_sid);
    this.searchList("1");
  },
  methods: {
    searchList(page) {
      api
        .postFormAPI("audit/getReviewList", {
          sid: localStorage.getItem("patient_sid"),
          // sid: localStorage.getItem("sid"),
          status: this.status,
          type: this.type,
          search: this.search,
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
            number: "",
            type: "",
            truename: "",
            patientName: "",
            status: "",
            createtime: "",
            businessId: "",
            recordId: "",
            patientId: "",
          };
          data.forEach((item) => {
            for (let key in item) {
              if (obj[key] == undefined) {
                delete item[key];
              }
            }
            item.type = this.typeOptions[Number(item.type) - 1];
            item.status = this.statusOptions[Number(item.status) - 1];
          });
          this.tableData = data;
          // this.tableData = [
          //   {
          //     number: "222",
          //     type: "康复方案",
          //     truename: "",
          //     patientName: "",
          //     status: "",
          //     createtime: "",
          //     businessId: "",
          //   },
          // ];

          //数据处理
        })
        .catch((err) => console.log(err));
    },
    // 搜索按钮
    searchBtn() {
      this.searchList("1");
    },
    // 点击下一页
    handleCurrentChange(val) {
      this.searchList(val);
    },
    // 点击详情,参数为该行数据封装成的对象
    handleClick(row) {
      const type = this.typeOptions.indexOf(row.type) + 1;
      console.log(type);
      this.$router.push({
        path: "auditDetail",
        query: {
          patientId: row.patientId,
          businessId: row.businessId,
          type: type,
          patientId: row.patientId,
          recordId: row.recordId,
        },
      });
    },
    queryParams(paramName) {
      let param = this.$route.query;
      if (param.hasOwnProperty(paramName)) {
        return param[paramName];
      }
      return "";
    },
  },
};
</script>

<style lang="scss" scoped>
.auditReminder {
  color: #212121;
  margin: 0 30px;
  .search {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background-color: #f9f9f9;
    padding: 12px 6px 12px 16px;
    .search-left {
      display: flex;
      flex-grow: 1;
      align-items: center;
    }
    .search_chunk {
      display: flex;
      align-items: center;
      margin-right: 20px;
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
  .dropdown {
    flex-grow: 1;
    height: 30px;
    width: 120px;
    display: flex;
    align-items: center;
    background: #fff;
    padding: 0 8px;
    justify-content: space-between;
    border-radius: 6px;
    border: 1px solid #dcdfe6;
  }
  .dropdown_icon {
    width: 16px;
    height: 10px;
    background: url("../../../assets/images/icon_more@2x.png") center/cover;
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
.auditReminder {
  .el-input__inner {
    padding: 6px 8px;
    height: 32px;
    font-size: 18px;
  }
  .el-input__icon {
    line-height: 32px;
  }
  // .el-select{
  //   width: 60%;
  // }
  .table {
    .cell {
      color: #212121;
      text-align: center;
      font-size: 18px;
    }
    th {
      font-weight: unset;
      background-color: #f9f9f9;
    }
  }
}
</style>

