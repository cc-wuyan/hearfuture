<template>
  <div class="orderReminder">
    <div class="search">
      <div class="search-left">
        <div class="search_chunk">
          <div class="flex_shrink">搜索：</div>
          <div>
            <el-input v-model="search" placeholder="订单号/患者姓名/病例号"></el-input>
          </div>
        </div>
        <div class="search_chunk">
          <div class="flex_shrink">订单状态：</div>
          <div>
            <el-select v-model="status" clearable placeholder>
              <el-option
                v-for="(item,index) in statusOptions"
                :key="index"
                :label="item"
                :value="index"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="search-btn flex_shrink" @click="searchBtn()">搜索</div>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="orderNum" fixed label="订单号" width="220"></el-table-column>
        <el-table-column prop="truename" label="患者姓名" width="180"></el-table-column>
        <el-table-column prop="patientNum" label="病例号" width="180"></el-table-column>
        <el-table-column prop="money" label="实收款" width="100"></el-table-column>
        <el-table-column prop="status" label="订单状态" width="100"></el-table-column>
        <el-table-column prop="createTime" label="下单时间" width="220" sortable></el-table-column>
        <el-table-column prop="takeTime" label="取机时间" width="220" sortable></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text">订单详情</el-button>
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
      search: "",
      status: "",
      statusOptions: [
        "未付款",
        "已付款未发货",
        "已发货未收货",
        "已收货未评价",
        "已取消",
      ],
      pageLimit: 10,
      total: 0,
      tableData: [],
    };
  },
  created() {
    this.getOrderRemindList("1");
  },
  methods: {
    getOrderRemindList(page) {
      api
        .postFormAPI("audit/getOrderRemindList", {
          sid: localStorage.getItem("sid"),
          search: this.search,
          status: this.status,
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
            orderNum: "",
            patientName: "",
            patientNum: "",
            money: "",
            status: "",
            createTime: "",
            takeTime: "",
            id: "",
          };
          data.forEach((item) => {
            for (let key in item) {
              if (obj[key] == undefined) {
                delete item[key];
              }
            }
            item.status = this.statusOptions[Number(item.status)];
          });
          this.tableData = data;
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    // 搜索按钮
    searchBtn() {
      this.getOrderRemindList("1");
    },
    // 点击下一页
    handleCurrentChange(val) {
      this.getOrderRemindList(val);
    },
    // 点击详情,参数为该行数据封装成的对象
    handleClick(row) {
      // const type = this.typeOptions.indexOf(row.type) + 1;
      this.$router.push({
        path: "orderDetail",
        query: {
          businessId: row.businessId,
          // type: type,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.orderReminder {
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
.orderReminder {
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
      font-family: Microsoft YaHei;
    }
    th {
      font-weight: unset;
      background-color: #f9f9f9;
    }
  }
}
</style>