<template>
  <el-row>
    <div class="sign-components">
      <el-col :span="24">
        <div v-for="item in data" :key="item.id">
          <img :src="item.images" alt />
          <span>{{item.title}}</span>
          <span>{{item.startTime}}开始</span>
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
      .postFormAPI("patient/signActivityList", {
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
.sign-components {
  margin: 0 30px;
  color: #212121;
}
</style>
