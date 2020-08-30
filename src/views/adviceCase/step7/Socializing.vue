<template>
  <div class="OrganizationProfile">
    <div class="chunk" v-if="imageList.length == 4">
      <img width="100%" :src="imageList[componentIndex].pic[0]" />
    </div>
    <bottom-btn :btnList="btnList" :whichCheck="componentIndex" @componentIndex="getComponentIndex"></bottom-btn>
  </div>
</template>

<script>
import BottomBtn from "../components/bottom_btn";
import api from "../../../api/api";

export default {
  data() {
    return {
      componentIndex: 2,
      imageList: [],
      btnList: ["资料", "资讯", "社交", "媒体"],
    };
  },
  components: {
    BottomBtn,
  },
  created() {
    this.init();
    console.log(this.ImageList);
  },
  methods: {
    async init() {
      await this.getImage("achievement,dataInfo");
      await this.getImage("achievement,informationInfo");
      await this.getImage("achievement,socialInfo");
      await this.getImage("achievement,mediaInfo");
      console.log(this.imageList);
    },
    getImage(key) {
      return api
        .postFormAPI("consultingManage/getConsultByCate", {
          category: key,
        })
        .then((res) => {
          if (res.data.result != 1) {
            return;
          }
          this.imageList.push(res.data.data[0]);
          return;
        })
        .catch((err) => console.log(err));
    },
    getComponentIndex(index) {
      this.componentIndex = index;
    },
  },
};
</script>

<style scoped lang="scss">
.OrganizationProfile {
  .chunk {
    box-sizing: border-box;
    height: 100vh;
    padding: 0 30px 66px;
    display: flex;
    align-items: center;
  }
}
</style>
