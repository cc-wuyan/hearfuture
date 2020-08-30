<template>
  <div class="HearingAidTechnology">
    <div class="chunk" v-show="componentIndex==0">
      <img width="100%" class="oneImg" :src="oneImg" />
      <video
        controls
        controlslist="nodownload"
        preload="auto"
        width="100%"
        v-if="oneVideo && componentIndex==0"
      >
        <source :src="oneVideo" type="video/mp4" />
      </video>
    </div>
    <div class="chunk" v-show="componentIndex==1">
      <div class="flex_row">
        <div class="top_btn" :class="{top_btn_select:twoBtn=='0'}" @click="twoBtn='0'">清晰度相关</div>
        <div class="top_btn" :class="{top_btn_select:twoBtn=='1'}" @click="twoBtn='1'">舒适度相关</div>
        <div class="top_btn" :class="{top_btn_select:twoBtn=='2'}" @click="twoBtn='2'">安全性相关</div>
        <div class="top_btn" :class="{top_btn_select:twoBtn=='3'}" @click="twoBtn='3'">便捷性相关</div>
      </div>
      <div class="chunk" v-if="twoBtn==''">
        <img width="100%" src="../../../assets/image/activity_img.png" />
      </div>
      <div v-else>
        <div
          class="chunk"
          v-for="(item, index1) in digitalHearing"
          :key="index1"
          v-show="index1==twoBtn"
        >
          <div
            class="chunk"
            v-for="(item, index2) in item"
            :key="index2+4"
            v-show="index2==threeBtn[index1]"
          >
            <img width="100%" class="oneImg" :src="item.img" />
            <video
              controls
              controlslist="nodownload"
              preload="auto"
              width="100%"
              v-if="oneVideo && componentIndex==1 && index2==threeBtn[index1] && index1==twoBtn"
            >
              <source :src="item.video" type="video/mp4" />
            </video>
          </div>
          <div class="flex_row funbtn_chunk">
            <div
              class="fun_btn"
              :class="{top_btn_select:threeBtn[index1]==index3}"
              @click="funBtn(index1,index3)"
              v-for="(item, index3) in item"
              :key="index3+100"
            >功能点</div>
          </div>
        </div>
      </div>
    </div>
    <bottom-btn :btnList="btnList" @componentIndex="getComponentIndex"></bottom-btn>
  </div>
</template>

<script>
import BottomBtn from "../components/bottom_btn";
import api from "../../../api/api";
import checkLogComponentsVue from "../../patient/components/checkLog-components.vue";
export default {
  data() {
    return {
      componentIndex: 0,
      btnList: ["助听器原理", "数据助听器功能"],
      oneImg: "",
      oneVideo: "",
      twoBtn: "",
      threeBtn: [0, 0, 0, 0],
      digitalHearing: [],
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
      // 获取助听器原理
      this.getConsultByCate("understand,hearingTechnology,hearingAid");

      //   数字助听器功能
      await this.getConsultByCate(
        "understand,hearingTechnology,digitalHearing,definitionCorrelation"
      );
      await this.getConsultByCate(
        "understand,hearingTechnology,digitalHearing,comfortRelated"
      );
      await this.getConsultByCate(
        "understand,hearingTechnology,digitalHearing,safetyRelated"
      );
      await this.getConsultByCate(
        "understand,hearingTechnology,digitalHearing,convenienceRelated"
      );
      console.log(this.digitalHearing);
    },
    getConsultByCate(key) {
      return api
        .postFormAPI("consultingManage/getConsultByCate", {
          category: key,
        })
        .then((res) => {
          if (res.data.result != 1) {
            return;
          }
          switch (true) {
            case key.includes("hearingAid"):
              this.oneImg = res.data.data[0].pic[0];
              this.oneVideo = res.data.data[0].address;
              break;
            case key.includes("digitalHearing"):
              let data = [];
              res.data.data.forEach((item) => {
                data.push({ img: item.pic[0], video: item.address });
              });
              this.digitalHearing.push(data);
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
    funBtn(idnex1, index3) {
      this.$set(this.threeBtn, idnex1, index3);
    },
  },
};
</script>

<style lang="scss" scoped>
.HearingAidTechnology {
  
  font-weight: bold;
  padding: 30px 30px 80px;
  .chunk {
    display: flex;
    align-items: stretch;
    flex-direction: column;
    justify-content: center;
    .oneImg {
      margin-bottom: 30px;
    }
  }
  .flex_row {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    .top_btn {
      height: 38px;
      line-height: 38px;
      border-radius: 19px;
      padding: 0 36px;
      border: 1px solid #212121;
      margin: 30px 0;
    }
    .top_btn_select {
      border: unset;
      background-color: #74bcee;
      color: #fff;
    }
  }
  .funbtn_chunk {
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 30px 0 0;
    .fun_btn {
      height: 38px;
      line-height: 38px;
      border: 1px solid #212121;
      padding: 0 36px;
      margin-bottom: 30px;
      margin-left: 20px;
    }
  }
}
</style>