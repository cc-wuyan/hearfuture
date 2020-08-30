<template>
  <div class="reportDetail">
    <div v-for="(item,index) in reportList.images" :key="index">
      <img :src="item" @click="touchImg(item)"/>
    </div>
    <van-image-preview v-model="ImageShow" :images="ImagePreview" maxZoom="3"></van-image-preview>
    <div class="pos_case" @click="returnBack()">
      
    </div>
  </div>
</template>

<script>
import api from "../../api/api";

export default {
  data() {
    return {
      id: this.$route.query.id,
      reportList: [],
      ImageShow: false,
      ImagePreview:[],
    };
  },
  created() {
    //   获取报告详情
    api
      .postFormAPI("patientHistory/info", {
        sid: localStorage.getItem("sid"),
        id: this.id,
      })
      .then((res) => {
        if (res.data.result != 1) {
          return;
        }
        this.reportList = res.data.data;
      })
      .catch((res) => console.log(res));
  },
  methods: {
    returnBack() {
      this.$router.go(-1);
    },
    touchImg(img){
      this.ImagePreview[0] = img;
      this.ImageShow=true;
    }
  },
};
</script>

<style lang="scss" scoped>
.reportDetail {
  margin-top: 30px;
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  div {
    // margin: 0 30px 14px;
    img {
      width: 100%;
    }
  }
  .pos_case {
    position: fixed;
    right: 18px;
    bottom: 27px;
    display: flex;
    flex-direction: column;
    width: 80px;
    height: 80px;
    background: url("../../assets/image/btn/icon_btn_back@2x.png") no-repeat center/contain;

  }
}
</style>