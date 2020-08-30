<template>
  <div class="appointmentReminder">
    <div class="search">
      <div class="search-left">
        <div class="search_chunk">
          <div class="flex_shrink">搜索：</div>
          <div style="width:250px">
            <el-input v-model="search" placeholder="预约单号/患者姓名/病例号"></el-input>
          </div>
        </div>
        <div class="search_chunk">
          <div class="flex_shrink">预约时间：</div>
          <div>
            <el-date-picker
              :editable="false"
              v-model="timeRange"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:250px"
            ></el-date-picker>
          </div>
        </div>
      </div>
      <div class="search-btn flex_shrink" @click="searchBtn()">搜索</div>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="number" fixed label="预约单号"></el-table-column>
        <el-table-column prop="patientName" label="患者姓名"></el-table-column>
        <el-table-column prop="patientNum" label="病例号"></el-table-column>
        <el-table-column prop="amount" label="金额"></el-table-column>
        <el-table-column prop="startTime" label="预约时间" sortable></el-table-column>
        <el-table-column prop="areaCodeName" label="地址"></el-table-column>
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
      starttime: "",
      endtime: "",
      timeRange: [],

      pageLimit: 10,
      total: 0,
      tableData: [],
    };
  },
  created() {
    this.getScheduleList("1");
  },
  methods: {
    getScheduleList(page) {
      api
        .postFormAPI("audit/getScheduleList", {
          sid: localStorage.getItem("sid"),
          search: this.search,
          starttime: this.starttime,
          endtime: this.endtime,
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
            patientName: "",
            patientNum: "",
            amount: "",
            startTime: "",
            areaCodeName: "",
          };
          data.forEach((item) => {
            for (let key in item) {
              if (obj[key] == undefined) {
                delete item[key];
              }
            }
            // item.status = this.statusOptions[Number(item.status)];
          });
          this.tableData = data;
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    // 搜索按钮
    searchBtn() {
      this.starttime = this.timeRange[0];
      this.endtime = this.timeRange[1];
      this.getScheduleList("1");
    },
    // 点击下一页
    handleCurrentChange(val) {
      this.getScheduleList(val);
    },
  },
};
</script>

<style lang="scss" scoped>
.appointmentReminder {
  color: #212121;
  margin: 0 30px;
  .search {
    display: flex;
    flex-wrap: wrap;
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
.appointmentReminder {
  .el-input__inner {
    padding: 6px 8px;
    height: 32px;
    font-size: 18px;
  }
  .el-input__icon {
    height: auto;
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
  .el-date-editor .el-range-input {
    font-size: 18px;
  }
  .el-date-editor .el-range-separator {
    height: auto;
  }
}
</style>