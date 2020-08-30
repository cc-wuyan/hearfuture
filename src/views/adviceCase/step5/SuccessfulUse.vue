<template>
  <div class="SuccessfulUse">
    <div class="chunk flex_col" v-show="componentIndex==0">
      <div class="flex_row">
        <div
          class="top_btn"
          :class="{top_btn_select:classBtn==index}"
          @click="classBtn=index"
          v-for="(item, index) in rehabilitationClass"
          :key="item.id"
        >{{item.title}}</div>
      </div>
      <div>
        <video
          controls
          preload="auto"
          width="100%"
          v-show="classBtn==index"
          v-for="(item,index) in rehabilitationClass"
          :key="index"
          ref="video1"
          controlslist="nodownload"
        >
          <source :src="item.address" type="video/mp4" />
        </video>
      </div>
    </div>
    <div class="chunk" v-show="componentIndex==1">
      <img width="100%" :src="listeningSkill" />
    </div>
    <div class="chunk" v-show="componentIndex==2">
      <div class="three_btn">
        <div
          class="top_btn"
          :class="{top_btn_select:instruBtn==index}"
          @click="instruBtn=index"
          v-for="(item, index) in deafAidInstructions"
          :key="item.id"
        >{{item.title}}</div>
      </div>
      <div class="three_video">
        <video
          controls
          preload="auto"
          width="100%"
          v-show="instruBtn==index"
          v-for="(item,index) in deafAidInstructions"
          :key="index"
          ref="video2"
          controlslist="nodownload"
        >
          <source :src="item.address" type="video/mp4" />
        </video>
      </div>
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
      btnList: ["家庭康复课堂", "聆听技巧", "助听器使用说明"],
      rehabilitationClass: [],
      classBtn: 0,
      listeningSkill: "",
      deafAidInstructions: [],
      instruBtn: 0,
    };
  },
  watch: {
    componentIndex(newVal, oldVal) {
      switch (oldVal) {
        case 0:
          this.$refs.video1.forEach((item) => {
            item.pause();
          });
          break;
        case 2:
          this.$refs.video2.forEach((item) => {
            item.pause();
          });
          break;
        default:
          break;
      }
    },
    classBtn(newVal, oldVal) {
      this.$refs.video1[oldVal].pause();
    },
    instruBtn(newVal, oldVal) {
      this.$refs.video2[oldVal].pause();
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
      this.getConsultByCate("investment,successfulInfo,rehabilitationClass");
      this.getConsultByCate("investment,successfulInfo,listeningSkill");
      this.getConsultByCate("investment,successfulInfo,deafAidInstructions");
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
            case key.includes("rehabilitationClass"):
              this.rehabilitationClass = res.data.data;
              break;
            case key.includes("listeningSkill"):
              this.listeningSkill = res.data.data[0].pic[0];
              break;
            case key.includes("deafAidInstructions"):
              this.deafAidInstructions = res.data.data;
              break;
            default:
              break;
          }
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
.SuccessfulUse {
  
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
    align-items: stretch;
    flex-direction: column;
  }
  .flex_row {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .top_btn {
    height: 38px;
    line-height: 38px;
    text-align: center;
    border-radius: 19px;
    padding: 0 36px;
    border: 1px solid #74bcee;
    color: #74bcee;
    margin: 30px 0;
  }
  .top_btn_select {
    border: unset;
    background-color: #74bcee;
    color: #fff;
  }
  .three_btn {
    height: 100%;
    overflow-y: scroll;
    padding-top: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .top_btn {
      margin: 0 0 30px;
    }
  }
  .three_video {
    flex-grow: 1;
    margin-left: 30px;
  }
}
</style>
