<template>
  <div class="problem_info">
    <div class="flex_row">
      <div class="label">标题：</div>
      <div class="title">{{title}}</div>
    </div>
    <div class="flex_row">
      <div class="label">内容：</div>
      <div class="content" v-html="content"></div>
    </div>
  </div>
</template>

<script>
import api from "../../../api/api";

export default {
  data() {
    return {
      title: "",
      content: "",
    };
  },
  created() {
    api
      .postFormAPI("question/appDetail", {
        id: this.$route.query.id,
      })
      .then((res) => {
        if (res.data.result != 1) {
          return;
        }
        this.title = res.data.data.title;
        this.content = res.data.data.content;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style lang="scss" scoped>
.problem_info {
  font-size: 16px;
  font-family: PingFang SC;
  color: #212121;
  line-height: 30px;
  margin: 60px 30px 0;
  .label {
    color: #7d7d7d;
    margin-right: 12px;
  }
  .flex_row {
    display: flex;
    align-items: flex-start;
    &:first-child {
      margin-bottom: 14px;
    }
  }
}
</style>