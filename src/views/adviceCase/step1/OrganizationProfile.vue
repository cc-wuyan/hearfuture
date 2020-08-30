<template>
  <div class="OrganizationProfile">
    <div class="chunk" v-show="componentIndex!=3">
      <img
        width="100%"
        v-for="(item, index) in imageList"
        :key="index"
        v-show="componentIndex==index"
        :src="item"
      />
    </div>
    <div class="chunk" v-show="componentIndex==3">
      <video controls preload="auto" width="100%" controlslist="nodownload" ref="video" v-if="video!=''">
        <source :src="video" type="video/mp4" />
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
      imageList: [],
      btnList: ["发展历程", "关于我们", "服务团队", "机构地图"],
      video: "",
    };
  },
  watch: {
    componentIndex(newVal, oldVal) {
      if (oldVal == 3) {
        this.$refs.video.pause();
      }
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
      await this.getImage("loveAndProfessional,orgProfile,developmentHistory");
      await this.getImage("loveAndProfessional,orgProfile,aboutMe");
      await this.getImage("loveAndProfessional,orgProfile,serviceTeam");
      await this.getImage("loveAndProfessional,orgProfile,organizationMap");
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
          if (key.includes("organizationMap")) {
            this.video = res.data.data[0].address;
            return;
          }
          this.imageList.push(res.data.data[0].pic[0]);
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
    img {
      max-height: 100%;
    }
  }
}
</style>
