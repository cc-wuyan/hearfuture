<template>
  <div class="caseSubmission">
    <div class="type">
      <div class="type-btn" :class="{'active-btn':type=='1'}" @click="typeChange('1')">质控审核</div>
      <div class="type-btn" :class="{'active-btn':type=='2'}" @click="typeChange('2')">质控提交</div>
    </div>
    <div class="search">
      <div class="search-left">
        <div class="search_chunk">
          <div class="flex_shrink">搜索：</div>
          <div>
            <el-input v-model="search" placeholder="处方号/患者姓名/病例号" style="min-width:200px"></el-input>
          </div>
        </div>
        <div class="search_chunk">
          <div class="flex_shrink">审核状态：</div>
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
        <el-table-column prop="number" fixed label="处方号" width="150"></el-table-column>
        <el-table-column prop="patientNum" label="病例号" width="180"></el-table-column>
        <el-table-column prop="truename" label="患者姓名" width="100"></el-table-column>
        <el-table-column prop="status" label="审核状态" width="100"></el-table-column>
        <el-table-column prop="content" label="反馈内容" width="100"></el-table-column>
        <el-table-column prop="createtime" label="提交时间" width="220" sortable></el-table-column>
        <el-table-column prop="updatetime" label="反馈时间" width="220" sortable></el-table-column>
        <el-table-column fixed="right" label="操作" width="140">
          <template slot-scope="scope">
            <el-button v-if="type =='1'" @click="auditClick(scope.row)" type="text">审核</el-button>
            <el-button @click="handleClick(scope.row)" type="text">查看病例</el-button>
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
    <el-dialog title="审核" :visible.sync="dialogVisible" center class="dialogModal">
      <div>
        <div class="dialogLabel">是否通过：</div>
        <el-radio v-model="auditStatus" label="1">是</el-radio>
        <el-radio v-model="auditStatus" label="2">否</el-radio>
      </div>
      <div class="dialogcontent">
        <div class="dialogLabel">反馈内容：</div>
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
      search: "",
      status: "",
      type: "1",
      statusOptions: ["未审核", "已通过", "未通过"],
      pageLimit: 10,
      total: 0,
      tableData: [],

      id: "",
      auditStatus: "",
      content: "",
      dialogVisible: false,
    };
  },
  created() {
    this.getQualityControlList("1");
  },
  methods: {
    getQualityControlList(page) {
      api
        .postFormAPI("audit/getQualityControlList", {
          sid: localStorage.getItem("sid"),
          type: this.type,
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
            number: "",
            patientNum: "",
            truename: "",
            status: "",
            content: "",
            createtime: "",
            updatetime: "",
            id: "",
          };
          data.forEach((item) => {
            for (let key in item) {
              if (obj[key] == "undefined") {
                delete item[key];
              }
            }
            // item.status = this.statusOptions[Number(item.status)];
          });
          this.tableData = data;
          // this.tableData = [
          //   {
          //     number: "121212",
          //     patientNum: "",
          //     truename: "",
          //     status: "",
          //     content: "",
          //     createtime: "2020-08-18 13:20:50",
          //     updatetime: "",
          //     id: "",
          //     patientId: "",
          //   },
          // ];

          //数据处理
        })
        .catch((err) => console.log(err));
    },
    // 类型切换按钮
    typeChange(type) {
      this.type = type;
      this.getQualityControlList("1");
    },
    // 搜索按钮
    searchBtn() {
      this.getQualityControlList("1");
    },
    // 点击下一页
    handleCurrentChange(val) {
      this.getQualityControlList(val);
    },
    // 点击详情,参数为该行数据封装成的对象
    handleClick(row) {
      let canEdit = "1";
      if(this.type == 2) {
        canEdit = "";
      }
      this.$router.push({
        name: "patient",
        query: {
          active: "firstDiagnosis",
          sid: localStorage.getItem("sid"),
          recordId: row.recordId,
          patientId: row.patientId,
          back: "1",
          canEdit
        },
      });
    },

    // 点击审核
    auditClick(row) {
      this.auditStatus = "";
      this.content = "";
      this.id = row.id;
      this.dialogVisible = true;
    },
    // 审核点击确定按钮
    submit() {
      if (this.auditStatus == "" || this.content == "") {
        this.$alert("请将内容填写完整！", {
          confirmButtonText: "确定",
        });
        return;
      }
      this.dialogVisible = false;

      // 提交审核结果
      api
        .postFormAPI("audit/auditQualityControl", {
          sid: localStorage.getItem("sid"),
          id: this.id,
          status: this.auditStatus,
          content: this.content,
        })
        .then((res) => {
          if (res.data.result != "1") {
            return;
          }
          this.$notify({
            message: res.data.message,
          });
          //数据处理
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.caseSubmission {
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
.caseSubmission {
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
}
</style>