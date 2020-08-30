<template>
  <el-row>
    <div class="share-components">
      <el-col :span="24">
        <span>{{data.total}}</span>
        <div v-for="item in data.list" :key="item.id">
          <img :src="item.avatar" alt />
          <span>{{item.truename}}</span>
          <span>{{item.sharePoints}}</span>
        </div>
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
    // this.listQuery.id = this.$route.params.id;
    api
      .postFormAPI("patient/shareList", {
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
.share-components {
  margin: 0 30px;
  color: #212121;
}
</style>
