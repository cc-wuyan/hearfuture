<template>
  <div class="ProtectionAndGuarantee">
    <div class="chunk">
      <img width="100%" :src="img" />
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
      img: "",
    };
  },
  components: {
    BottomBtn,
  },
  created() {
    api
      .postFormAPI("consultingManage/getConsultByCate", {
        category: "investment,protectionInfo",
      })
      .then((res) => {
        if (res.data.result != 1) {
          return;
        }
        this.img = res.data.data[0].pic[0];
      })
      .catch((err) => console.log(err));
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.ProtectionAndGuarantee {
  .chunk {
    box-sizing: border-box;
    height: 100vh;
    padding: 0 30px 66px;
    display: flex;
    align-items: center;
  }
}
</style>
