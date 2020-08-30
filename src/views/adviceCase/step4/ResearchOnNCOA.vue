<template>
  <div class="OrganizationProfile">
    <div class="img_wrapper" v-if="btnListVideo.length > 0">
      <img
        v-show="which < 0"
        style="height: 400px;margin-right: 320px;"
        src="../../../assets/image/ncoa/img_ask_01@3x.png"
      />
      <div v-if="which > -1">
        <img
          v-for="(item, index) in btnListVideo"
          :key="index"
          v-show="index == which"
          :src="item.pic"
        />
      </div>
    </div>
    <div class="btn">
      <div @click="which = 0">
        <img src="../../../assets/image/20200817193156.png" alt />
        <p>听损问题解决前的影响</p>
      </div>
      <div @click="which = 1">
        <img src="../../../assets/image/20200817193135.png" alt />
        <p>听损问题解决前的影响</p>
      </div>
      <div @click="which = 2">
        <img src="../../../assets/image/20200817193048.png" alt />
        <p>听损问题解决前的影响</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../../api/api";
export default {
  data() {
    return {
      btnListVideo: [
        {
          pic: require("../../../assets/image/ncoa/img_ask_02@3x.png"),
        },
        {
          pic: require("../../../assets/image/ncoa/img_ask_03@3x.png"),
        },
        {
          pic: require("../../../assets/image/ncoa/img_ask_04@3x.png"),
        },
      ],
      which: -1,
    };
  },
  components: {},
  created() {
    // this.init();
  },
  methods: {
    // async init() {
    //   await this.getVideo1("change,NCOA,beforeResolution");
    //   await this.getVideo1("change,NCOA,afterResolution");
    //   await this.getVideo1("change,NCOA,compareViews");
    //   console.log(this.btnListVideo);
    // },
    // getVideo1(e) {
    //   return api
    //     .postFormAPI("consultingManage/getConsultByCate", {
    //       category: e,
    //     })
    //     .then((res) => {
    //       if (res.data.result != 1) {
    //         return;
    //       }
    //       this.btnListVideo.push(res.data.data[0]);
    //     })
    //     .catch((err) => console.log(err));
    // },
    getComponentIndex(index) {
      this.componentIndex = index;
    },
  },
};
</script>

<style scoped lang="scss">
.OrganizationProfile {
  font-size: 16px;
  display: flex;
  justify-content: center;
  padding: 30px;
  height: 100vh;
  box-sizing: border-box;
  flex-direction: column;
  padding: 0 30px;
  box-sizing: border-box;
  .img_wrapper {
    box-sizing: border-box;
    height: auto;
    width: 100%;
    img {
      width: auto;
      display: block;
      margin: 10px auto 40px;
      height: 500px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
  }
  .btn {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    box-sizing: border-box;
    div {
      width: calc(calc(100% - 200px) / 3);
      border: 1px solid #ddd;
      box-shadow: 0 0 10px 0 #ddd;
      padding: 10px;
      box-sizing: border-box;
    }
  }
}
</style>
