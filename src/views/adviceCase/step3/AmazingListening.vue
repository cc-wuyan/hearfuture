<template>
  <div class="AmazingListening">
    <div class="chunk" v-show="componentIndex==0">
      <img width="100%" :src="ImagePreview[0]" @click="ImageShow=true" />
      <van-image-preview v-model="ImageShow" :images="ImagePreview" maxZoom="3"></van-image-preview>
    </div>
    <div class="chunk flex_col" v-show="componentIndex==1">
      <div class="flex_row">
        <div class="top_btn" :class="{top_btn_select:symptomBtn[0]}" @click="selectSymptom(0)">耳垢</div>
        <div class="top_btn" :class="{top_btn_select:symptomBtn[1]}" @click="selectSymptom(1)">中耳炎</div>
        <div class="top_btn" :class="{top_btn_select:symptomBtn[2]}" @click="selectSymptom(2)">耳硬化症</div>
        <div class="top_btn" :class="{top_btn_select:symptomBtn[3]}" @click="selectSymptom(3)">老年性失能</div>
      </div>
      <div class="content">
        <div class="flex_row">
          <div class="flex_col">
            <img
              class="bell"
              height="120px"
              src="../../../assets/image/auditory_material/bell.png"
              @click="playAudio(0)"
            />
            <img
              height="120px"
              width="60px"
              src="../../../assets/image/auditory_material/people.png"
              @click="playAudio(2)"
            />
          </div>
          <div class="ear_chunk">
            <img width="100%" src="../../../assets/image/auditory_material/normal.png" />
            <img
              class="ear_symptom"
              width="100%"
              v-show="symptomBtn[0]"
              src="../../../assets/image/auditory_material/earwax.png"
            />
            <img
              class="ear_symptom"
              width="100%"
              v-show="symptomBtn[3]"
              src="../../../assets/image/auditory_material/hearing_loss.png"
            />
            <img
              class="ear_symptom"
              width="100%"
              style="z-index: 10"
              v-show="symptomBtn[2]"
              src="../../../assets/image/auditory_material/otosclerosis.png"
            />
            <img
              class="ear_symptom"
              width="100%"
              v-show="symptomBtn[1]"
              src="../../../assets/image/auditory_material/tympanitis.png"
            />
          </div>
          <audio ref="audio" controls="controls" style="display:none"></audio>
        </div>
      </div>
    </div>
    <div class="chunk" v-show="componentIndex==2">
      <video controls preload="auto" controlslist="nodownload" width="100%" v-if="threeVideo!=''" ref="video">
        <source :src="threeVideo" type="video/mp4" />
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
      btnList: ["听觉解剖", "听觉生理", "神奇的听力"],
      ImagePreview: [],
      ImageShow: false,
      threeVideo: "",
      symptomBtn: [false, false, false, false],
      audio: [
        require("../../../assets/video/bell-normal.mp3"),
        require("../../../assets/video/bell-conduc.mp3"),
        require("../../../assets/video/people-normal.mp3"),
        require("../../../assets/video/people-conduc.mp3"),
      ],
    };
  },
  watch: {
    componentIndex(newVal, oldVal) {
      switch (oldVal) {
        case 1:
          this.$refs.audio.pause();
          break;
        case 2:
          this.$refs.video.pause();
          break;
        default:
          break;
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
    init() {
      // 获取听觉解剖
      this.getConsultByCate("understand,amazingListening,hearingAnatomy");
      // 听觉生理
      this.getConsultByCate("understand,amazingListening,hearingPhysiology");
      // 神奇的听力
      this.getConsultByCate("understand,amazingListening,amazingListening1");
    },
    getComponentIndex(index) {
      this.componentIndex = index;
    },
    getConsultByCate(key) {
      api
        .postFormAPI("consultingManage/getConsultByCate", {
          category: key,
        })
        .then((res) => {
          if (res.data.result != 1) {
            return;
          }
          switch (true) {
            case key.includes("hearingAnatomy"):
              this.ImagePreview.push(res.data.data[0].pic[0]);
              break;
            case key.includes("amazingListening1"):
              this.threeVideo = res.data.data[0].address;
              break;
            default:
              break;
          }
        })
        .catch((err) => console.log(err));
    },
    selectSymptom(index) {
      this.$set(this.symptomBtn, index, !this.symptomBtn[index]);
    },
    playAudio(e) {
      // this.$refs.audio.pause();
      // 判断是否选中症状
      const symptom = this.symptomBtn.every((item) => !item);
      if (symptom) {
        this.$refs.audio.src = this.audio[e];
      } else {
        this.$refs.audio.src = this.audio[e + 1];
      }
      this.$refs.audio.play();
    },
  },
};
</script>

<style scoped lang="scss">
.AmazingListening {
  
  .chunk {
    box-sizing: border-box;
    height: 100vh;
    padding: 0 30px 66px;
    display: flex;
    align-items: center;
    img,
    video {
      max-height: 100%;
    }
  }
  .flex_col {
    display: flex;
    align-items: stretch;
    flex-direction: column;
  }
  .flex_row {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .top_btn {
      height: 38px;
      line-height: 38px;
      text-align: center;
      border-radius: 19px;
      padding: 0 36px;
      border: 1px solid #74bcee;
      margin: 30px 0;
      color: #74bcee;
    }
    .top_btn_select {
      border: unset;
      background-color: #74bcee;
      color: #fff;
    }
  }
  .ear_chunk {
    width: 780px;
    height: 380px;
    position: relative;
    .ear_symptom {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .content {
    height: 100%;
    display: flex;
    align-items: center;
    .flex_row {
      width: 100%;
    }
    .flex_col {
      align-items: center;
    }
  }
  .bell {
    margin-bottom: 84px;
  }
}
</style>
