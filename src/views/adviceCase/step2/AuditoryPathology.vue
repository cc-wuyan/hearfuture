<template>
  <div class="OrganizationProfile">
    <div v-if="btnListVideo.length > 0">
      <div class="video_wrapper" v-for="(item, index) in btnListVideo" :key="index">
        <video controls preload="auto" controlslist="nodownload" width="100%">
          <source :src="item.address" type="video/mp4" />
        </video>
      </div>
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
      await this.getVideo1("about,hearingCase");
      console.log(this.btnListVideo);
    },
    getVideo1(e) {
      api
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
  .img_wrapper {
    box-sizing: border-box;
    height: 100vh;
    padding: 0 30px 66px;
    display: flex;
    align-items: center;
  }
  .video_wrapper {
    box-sizing: border-box;
    height: 100vh;
    padding: 0 30px 66px;
    display: flex;
    align-items: center;
  }
}
</style>
