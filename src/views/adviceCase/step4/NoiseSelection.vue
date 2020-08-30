<template>
  <div class="OrganizationProfile">
    <div class="content_case" v-if="btnListVideo.length > 0">
      <img :src="btnListVideo[0][wchich].pic[0]" :alt="wchich" />
      <div class="chunk_case">
        <div
          class="chunk"
          v-for="(item, index) in btnListVideo[0]"
          :key="index"
          @click="turn(index)"
        >声音{{index+1}}</div>
      </div>
      <!-- <video controls preload="auto" width="100%" style="display:none;" id="music">
        <source :src="btnListVideo[0][wchich].audio" type="video/mp4" />
      </video> -->
      <audio
        controls="controls"
        style="width:100%;height:100px;display:none;"
        id="music"
        :src="btnListVideo[0][wchich].audio"
      ></audio>
    </div>
  </div>
</template>

<script>
import api from "../../../api/api";
export default {
  data() {
    return {
      wchich: "0",
      btnListVideo: [],
    };
  },
  components: {},
  created() {
    this.init();
  },
  methods: {
    async init() {
      await this.getVideo1("change,noiseScene");
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
          this.btnListVideo.push(res.data.data);
        })
        .catch((err) => console.log(err));
    },
    turn(e) {
      this.wchich = e;
      var obj = document.getElementById("music");
      // obj.pause();
      setTimeout(() => {
        obj.currentTime = 0;
        obj.play();
      }, 500);
    },
  },
  mounted() {
    document.addEventListener("visibilitychange", function () {
      // 用户离开了当前页面
      var music = document.getElementById("music");
      if (music) {
        if (document.visibilityState === "hidden") {
          // console.log("页面不可见");
          music.pause(); //暂停
        }
        if (document.visibilityState === "visible") {
        }
      }
    });
  },
};
</script>

<style scoped lang="scss">
.OrganizationProfile {
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  box-sizing: border-box;
  .content_case {
    width: 80%;
    img {
      width: 100%;
      height: auto;
    }
    .chunk_case {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: #333;
      margin-top: 30px;
    }
    .chunk {
      flex: 1;
      text-align: center;
      padding: 10px 0;
      background: #d7d7d7;
    }
    & .chunk:not(:last-of-type) {
      margin-right: 10px;
    }
    audio {
      display: block;
      height: auto;
      width: 100%;
    }
  }
}
</style>
