<template>
  <div class="checkLog-components">
    <el-row>
      <el-col :span="24">
        <el-table
          :header-cell-style="{background:'#f3f3f3',borderColor: '#fff'}"
          ref="filterTable"
          border
          fit
          highlight-current-row
          :data="data"
          style="width: 100%;margin: 10px 0"
          :default-sort="{prop: 'date', order: 'ascending'}"
        >
          <el-table-column align="center" prop="title" label="检查项目" width="auto"></el-table-column>
          <el-table-column align="center" label="操作" width="auto">
            <template slot-scope="scope">
              <el-button
                type="mini"
                size="16"
                @click="goInfo(scope.row.type,listQuery)"
                title="立即查看"
              >立即查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { historyDocument } from "@/api/patient";
export default {
  name: "other",
  data() {
    return {
      listQuery: {
        id: 0,
      },
      memorandum: {},
      data: [
        {
          title: "耳镜检查",
          type: "1",
        },
        {
          title: "纯音测听",
          type: "2",
        },
        {
          title: "言语测听",
          type: "3",
        },
      ],
    };
  },
  created() {
    // this.listQuery.id = localStorage.getItem("patientId");
    // this.listQuery.recordId = localStorage.getItem("recordId");
    // historyDocument(this.listQuery).then(res => {
    //   if (res.result == 1) {
    //     setTimeout(() => {
    //       this.loading = false;
    //     }, 1000);
    //     this.data = res.data;
    //   }
    // });
  },
  methods: {
    goInfo(value, query) {
      if (value == 1) {
        this.$router.push({
          // path:'/patient/earcheck/'+query.id+'/'+query.recordId
          path: "/otoscopeReport",
          query: {
            fromRouter: "patient",
          },
        });
      }
      if (value == 2) {
        this.$router.push({
          // path:'/patient/hearing/'+query.id+'/'+query.recordId
          path: "/soundTextReport",
          query: {
            fromRouter: "patient",
          },
        });
      }
      if (value == 3) {
        this.$router.push({
          // path:'/patient/words/'+query.id+'/'+query.recordId
          path: "/speechTextReport",
          query: {
            fromRouter: "patient",
          },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.checkLog-components {
  margin: 0 30px;
  color: #212121;
}
</style>
