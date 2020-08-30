<template>
  <div class="ListeningClub">
    <div class="chunk">
      <img
        width="100%"
        v-for="(item, index) in imageList"
        :key="index"
        v-show="componentIndex==index"
        :src="item"
      />
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
      btnList: ["会员日", "俱乐部", "公益活动"],
      imageList: [],
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
      await this.getImage("regression,listeningClub,memberDay");
      await this.getImage("regression,listeningClub,club");
      await this.getImage("regression,listeningClub,publicActivities");
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
.ListeningClub {
  .chunk {
    box-sizing: border-box;
    height: 100vh;
    padding: 0 30px 66px;
    display: flex;
    align-items: center;
    img{
      max-height: 100%;
    }
  }
}
</style>
