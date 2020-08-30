<template>
  <el-row>
    <div class="sale-components">
      <el-col :span="24">
        <table class="table" v-for="(item,index) in data.goods " :key="40+index">
          <caption>{{item.type}}</caption>
          <tr>
            <th>厂家</th>
            <th>系列</th>
            <th>型号</th>
            <th>部位</th>
            <th>原价</th>
          </tr>
          <tr v-for="list in item.list" :key="list.id">
            <td>{{list.brand}}</td>
            <td>{{list.series}}</td>
            <td>{{list.model}}</td>
            <td>{{list.ear}}</td>
            <td>{{list.price}}</td>
          </tr>
        </table>

        <table class="table">
          <caption>定制单</caption>
          <tr>
            <th>定制单类型</th>
            <th>订购时间</th>
            <th>操作</th>
          </tr>
          <tr v-if="data.order==undefined || data.order.length ==0">
            <td colspan="5">暂无数据</td>
          </tr>
          <tr v-for="item in data.order" :key="item.id">
            <td>{{item.type=='eardrum'?'助听器定制单':'助听器维修单'}}</td>
            <td>{{item.time}}</td>
            <td>
              <!-- <el-button type="text" size="mini" title="付尾款">付尾款</el-button> -->
              <router-link
                v-if="item.type=='eardrum'"
                :to="'/customReport'"
                style="margin-right:15px;"
              >
                <el-button type="text" size="mini" title="详情">详情</el-button>
              </router-link>
              <router-link
                v-if="item.type!='eardrum'"
                :to="'/maintenanceReport'"
                style="margin-right:15px;"
              >
                <el-button type="text" size="mini" title="详情">详情</el-button>
              </router-link>
            </td>
          </tr>
        </table>

        <div class="caption">听力医学服务器</div>
        <el-table
          :header-cell-style="{background:'#f3f3f3',borderColor: '#fff'}"
          ref="filterTable"
          border
          fit
          highlight-current-row
          :data="data.service"
          style="width: 100%;margin: 10px 0"
          :default-sort="{prop: 'date', order: 'ascending'}"
        >
          <el-table-column align="center" prop="type" label="服务类型" width="auto"></el-table-column>
          <el-table-column align="center" prop="title" label="服务内容" width="auto"></el-table-column>
          <el-table-column align="center" prop="price" label="价格" width="auto"></el-table-column>
          <el-table-column align="center" prop="createtime" label="订购时间" width="auto"></el-table-column>
        </el-table>
      </el-col>
    </div>
  </el-row>
</template>
<script>
import api from "../../../api/api";
export default {
  name: "sign",
  data() {
    return {
      listQuery: {
        id: 0,
      },
      data: {},
    };
  },
  created() {
    this.listQuery.id = this.$route.params.id;
    api
      .postFormAPI("patient/saleList", {
        recordId: localStorage.getItem("recordId"),
        id: localStorage.getItem("patientId"),
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result == 1) {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
          this.data = res.data.data;
        }
        //数据处理
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style lang="scss" scoped>
.sale-components {
  margin: 0 30px;
  color: #212121;
  .table {
    margin-bottom: 30px;
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;
    border-collapse: collapse;
    text-align: center;

    th,
    td {
      font-size: 14px;
      border: 1px solid #e4e4e4;
      padding: 0 14px;
    }
    th {
      background-color: #efefef;
      height: 36px;
      font-weight: normal;
    }
    td {
      padding: 6px;
      height: 40px;
      color: #7d7d7d;
    }
  }
  caption,
  .caption {
    font-size: 16px;
    text-align: left;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    &::before {
      content: "";
      display: inline-block;
      width: 6px;
      height: 6px;
      background-color: #24afef;
      margin-right: 10px;
    }
  }
}
</style>
