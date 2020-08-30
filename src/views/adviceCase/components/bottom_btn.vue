<template>
  <div class="btn_chunk">
    <div
      class="btn"
      v-for="(item, index) in btnList"
      :key="index"
      @click="selectBtn(index)"
      :class="{btn_select:selectIndex==index}"
    >{{item}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectIndex: 0,
    };
  },
  props: ["btnList", "whichCheck"],
  created() {
    if (this.whichCheck) {
      this.selectIndex = this.whichCheck;
    }
  },
  methods: {
    selectBtn(index) {
      this.selectIndex = index;
      this.$emit("componentIndex", index);
    },
  },
};
</script>

<style lang="scss" scoped>
.btn_chunk {
  font-weight: bold;
  width: 100%;
  border: 0px solid rgba(227, 227, 227, 1);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(225, 246, 254, 1) 100%
  );
  box-shadow: 0px 0px 10px rgba(229, 229, 229, 1);
  height: 66px;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  padding-left: 12px;
  .btn {
    color: #7d7d7d;
    height: 38px;
    line-height: 38px;
    border-radius: 19px;
    padding: 0 36px;
    margin-left: 4px;
  }
  .btn_select {
    background-color: #74bcee;
    color: #fff;
  }
}
</style>