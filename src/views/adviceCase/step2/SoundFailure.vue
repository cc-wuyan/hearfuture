<template>
  <div class="OrganizationProfile">
    <div v-if="btnListVideo.length > 0">
      <div
        class="video_wrapper"
        v-for="(item, index) in btnListVideo"
        :key="index"
        v-show="componentIndex==index"
      >
        <video
          v-if="componentIndex==index"
          controls
          controlslist="nodownload"
          preload="auto"
          width="100%"
        >
          <source :src="item.address" type="video/mp4" />
        </video>
      </div>
    </div>
    <bottom-btn :btnList="btnList" @componentIndex="getComponentIndex"></bottom-btn>
  </div>
</template>

<script>
import api from "../../../api/api";
import BottomBtn from "../components/bottom_btn";
export default {
  data() {
    return {
      componentIndex: 0,
      btnList: ["声音失效的危害", "你不是唯一的", "耳聋治疗原则"],
      btnListVideo: [],
    };
  },
  components: {
    BottomBtn,
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      await this.getVideo1("about,soundfailure1,soundFailure");
      await this.getVideo1("about,soundfailure1,youNotOnly");
      await this.getVideo1("about,soundfailure1,deafnessTreatment");
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
