<template>
  <div class="JourneyOfRehabilitation">
    <div class="chunk">
      <video controls preload="auto" width="100%" controlslist="nodownload"  v-if="video!=''" >
        <source :src="video" type="video/mp4"/>
      </video>
    </div>
    <bottom-btn></bottom-btn>
  </div>
</template>

<script>
import BottomBtn from "../components/bottom_btn";
import api from "../../../api/api";
export default {
  data() {
    return {
      video: "",
    };
  },
  components: {
    BottomBtn,
  },
  created() {
    api
      .postFormAPI("consultingManage/getConsultByCate", {
        category: "regression,rehabilitationInfo",
      })
      .then((res) => {
        if (res.data.result != 1) {
          return;
        }
        this.video = res.data.data[0].address;
      })
      .catch((err) => console.log(err));
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.JourneyOfRehabilitation {
  .chunk {
    box-sizing: border-box;
    height: 100vh;
    padding: 0 30px 66px;
    display: flex;
    align-items: center;
    video{
      max-height: 100%;
    }
  }
}
</style>
