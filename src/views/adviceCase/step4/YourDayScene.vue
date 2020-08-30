<template>
  <div class="OrganizationProfile">
    <div class="img_wrapper" v-if="btnListVideo.length > 0">
      <img v-for="(item, index) in btnListVideo[0].pic" :key="index" :src="item" />
    </div>
  </div>
</template>

<script>
import api from "../../../api/api";
export default {
  data() {
    return {
      btnListVideo: [],
    };
  },
  components: {},
  created() {
    this.init();
  },
  methods: {
    async init() {
      await this.getVideo1("change,lifeScene");
      console.log(this.btnListVideo);
    },
    getVideo1(e) {
      return api
        .postFormAPI("consultingManage/getConsultByCate", {
          category: e,
        })
        .then((res) => {
          if (res.data.result != 1) {
            return;
          }
          this.btnListVideo.push(res.data.data[0]);
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
  font-size: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  height: 100vh;
  box-sizing: border-box;
  .img_wrapper {
    box-sizing: border-box;
    height: auto;
    width: calc(100% + 10px);
    img {
      width: calc(calc(100% - 30px) / 3);
      margin: 10px 5px;
      height: auto;
      border: 8px solid #ddd;
      box-sizing: border-box;
      border-radius: 4px;
    }
  }
}
</style>
