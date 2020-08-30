<template>
  <div class="RehabilitationVideo">
    <div class="chunk">
      <video
        controls
        preload="auto"
        width="100%"
        v-for="(item, index) in videoList"
        :key="index"
        v-show="componentIndex==index"
        controlslist="nodownload"
        ref="video"
      >
        <source :src="item" type="video/mp4" />
      </video>
    </div>
    <bottom-btn :btnList="btnList" @componentIndex="getComponentIndex"></bottom-btn>
  </div>
</template>

<script>
import BottomBtn from "../components/bottom_btn";
import api from "../../../api/api";
export default {
  data() {
    return {
      componentIndex: 0,
      videoList: [],
      btnList: ["耳鸣康复", "听力康复", "业务范围"],
    };
  },
  watch: {
    componentIndex(newVal, oldVal) {
      this.$refs.video[oldVal].pause();
    },
  },
  components: {
    BottomBtn,
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      await this.getVideo(
        "loveAndProfessional,rehabilitationVideo,tinnitusRecovery"
      );
      await this.getVideo(
        "loveAndProfessional,rehabilitationVideo,hearingRehabilitation"
      );
      await this.getVideo(
        "loveAndProfessional,rehabilitationVideo,scopeOfBusiness"
      );
    },
    getVideo(key) {
      return api
        .postFormAPI("consultingManage/getConsultByCate", {
          category: key,
        })
        .then((res) => {
          if (res.data.result != 1) {
            return;
          }
          this.videoList.push(res.data.data[0].address);
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

<style lang="scss" scoped>
.RehabilitationVideo {
  .chunk {
    box-sizing: border-box;
    height: 100vh;
    padding: 0 30px 66px;
    display: flex;
    align-items: center;
    video {
      max-height: 100%;
    }
  }
}
</style>