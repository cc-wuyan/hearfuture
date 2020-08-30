<!--  -->
<template>
  <div class="app-container">
    <!-- 列表页 start -->
    <div>
      <div>
        <selectComponents @searchQuery="searchQuery" :options="options" :listQuery="listQuery"></selectComponents>
      </div>

      <!-- v-loading="listLoading" -->
      <el-table
        class="table_cc"
        v-loading="loading"
        :header-cell-style="{background:'#f3f3f3',borderColor: '#fff',}"
        ref="filterTable"
        border
        :load="load"
        :data="list"
        style="width: 100%;margin: 10px 0"
      >
        <el-table-column align="center" prop="patientNum" label="患者编号" width="180"></el-table-column>
        <el-table-column align="center" prop="truename" label="姓名" width="auto"></el-table-column>
        <el-table-column align="center" prop="phone" label="手机号码" width="auto"></el-table-column>
        <el-table-column align="center" prop="sex" label="性别" width="auto"></el-table-column>
        <el-table-column align="center" prop="birthday" label="出生年月" width="auto"></el-table-column>
        <el-table-column align="center" prop="cardNum" label="身份证号" width="auto"></el-table-column>
        <el-table-column align="center" prop="matcherName" label="验配师" width="auto"></el-table-column>
        <el-table-column align="center" prop="id" label="会员ID" width="auto"></el-table-column>
        <el-table-column align="center" prop="relationship" label="亲友关系" width="auto"></el-table-column>
        <el-table-column align="center" prop="appointTime" label="最近预约时间" width="auto"></el-table-column>
        <el-table-column align="center" label="操作" width="300px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="goInfo(scope.row.id,scope.row.recordId)"
              title="修改"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="listQuery.page"
          :page-sizes="[10,20,30, 50]"
          :page-size="listQuery.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <!-- 列表页 End -->
  </div>
</template>
<script>
import Listing from "@/mixin/Listing";
import { index } from "@/api/patient";
import selectComponents from "./components/select-components";
export default {
  name: "matchprocessList",
  mixins: [Listing],
  components: {
    selectComponents
  },
  data() {
    return {
      loading: false,
      options: [
        {
          id: -1,
          title: "全部"
        },
        {
          id: 1,
          title: "男"
        },
        {
          id: 2,
          title: "女"
        }
      ],
      list: [],
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      }
    };
  },
  created() {},
  methods: {
    getList() {
      this.loading = true;
      index(this.listQuery).then(res => {
        if (res.result == 1) {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
          res.data.rows.forEach(el => {
            el.hasChildren = true;
          });
          this.list = res.data.rows;
          this.total = parseInt(res.data.total);
        }
      });
    },
    searchQuery(e, arr) {
      this.listQuery = e;
      if (arr) {
        this.listQuery.birthdayStart = arr["birthdayStart"];
        this.listQuery.birthdayEnd = arr["birthdayEnd"];
        this.listQuery.appointStart = arr["appointStart"];
        this.listQuery.appointEnd = arr["appointEnd"];
      } else {
        this.listQuery.birthdayStart = "";
        this.listQuery.birthdayEnd = "";
        this.listQuery.appointEnd = "";
        this.listQuery.appointStart = "";
      }
      this.getList();
    },
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        getPidList({ pid: tree.id }).then(res => {
          if (res.result == 1) {
            resolve(res.data);
          } else {
            this.$message.error(res.message);
          }
        });
      }, 1000);
    },
    goInfo(value, recordId) {
      this.$router.push({
        path: "/patient/info/" + value + "/" + recordId
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.cc {
  background: #f3f3f3;
  padding: 20px 20px 10px;
  margin-bottom: 10px;
  font-size: 15px;
  .form_div {
    display: inline-block;
    margin-right: 10px;
    .form_span {
      line-height: 36px;
      display: inline-block;
      vertical-align: top;
    }
  }
}
</style>
<style>
.table_cc .el-table__row--level-1 {
  background: #f2f2f2;
}
</style>
