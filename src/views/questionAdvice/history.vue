<template>
  <div class="questionAdviceHistory">
    <div class="search_case">
      <div class="left">
        <el-date-picker
          :editable=false
          v-model="start"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
        <div class="line">~</div>
        <el-date-picker
          :editable=false
          v-model="end"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </div>
      <div class="search_btn" @click="select()">查询</div>
    </div>
    <div class="wrapper">
      <div class="content" v-if="initData">
        <div class="row title">
          <div class="flex_1">问卷类型</div>
          <div class="flex_3">问卷名称</div>
          <div class="flex_1">测试评分</div>
          <div class="flex_1_5">测试时间</div>
        </div>
        <div class="row" v-for="(item, index) in initData" :key="index">
          <div class="flex_1">{{item.category}}</div>
          <div class="flex_3">{{item.title}}</div>
          <div class="flex_1">{{item.score}}</div>
          <div class="flex_1_5">{{item.createtime}}</div>
        </div>
      </div>
      <div v-if="initData.length==0" class="nothing">暂无数据</div>
    </div>
  </div>
</template>

<script>
import api from "../../api/api";

export default {
  data() {
    return {
      start: "",
      end: "",
      initData: "",
    };
  },
  computed: {},
  created() {
    this.getData("", "");
  },
  methods: {
    select() {
      if (this.start == "") {
        this.$notify({
          message: "请先填写开始时间！",
        });
        return false;
      }
      if (this.end == "") {
        this.$notify({
          message: "请先填写开始时间！",
        });
        return false;
      }
      this.getData(this.start, this.end);
      // 听学：category_hear；耳鸣：category_tinnitus；康复：category_recovery；
    },
    getData(start, end) {
      api
        .postFormAPI("checkWords/questionList", {
          recordId: localStorage.getItem("recordId"),
          sid: localStorage.getItem("sid"),
          start,
          end,
        })
        .then((res) => {
          if (res.data.result == "1") {
            this.initData = res.data.data;
          }

          //数据处理
        })
        .catch((err) => console.log(err));
    },
  },
  components: {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.questionAdviceHistory {
  margin-top: 30px;
  width: 100%;
  padding: 0 24px;
  box-sizing: border-box;
  .search_case {
    width: 100%;
    height: 67px;
    background: #f9f9f9;
    border-radius: 6px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 18px;
    box-sizing: border-box;
    .line {
      margin: 0 10px;
    }
    .left {
      display: flex;
      align-items: center;
    }
    .search_btn {
      width: 104px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      border: 1px solid #48a0dc;
      border-radius: 20px;
      color: #48a0dc;
      box-sizing: border-box;
    }
  }
  .wrapper {
    margin-top: 20px;
    width: 100%;
    box-sizing: border-box;
    .content {
      width: 100%;
      border: 1px solid #e4e4e4;
      .row {
        width: 100%;
        display: flex;
        height: 57px;
        line-height: 57px;
        text-align: center;
        border-bottom: 1px solid #e4e4e4;
        .flex_1 {
          flex: 1;
          border-right: 1px solid #e4e4e4;
        }
        .flex_1_5 {
          flex: 1.5;
        }
        .flex_3 {
          flex: 3;
          border-right: 1px solid #e4e4e4;
        }
      }
      .row:last-child {
        border-bottom: unset;
      }
      .title {
        background: #f9f9f9;
      }
    }
  }
  .nothing {
    text-align: center;
    padding-top: 20px;
    color: #7d7d7d;
  }
}
</style>
<style lang="scss">
</style>
