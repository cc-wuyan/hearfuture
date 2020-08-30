<template>
  <div class="select-components">
    <!-- 搜索框 start -->
    <div class="filter-container cc">
      <div class="form_div">
        <span class="form_span">{{$t('table.search')}}：</span>
        <el-input
          onkeydown="if(event.keyCode==32) return false"
          clearable
          style="width: 340px;"
          class="filter-item item_input_cc"
          placeholder="请输入病历号/姓名/手机号码/身份证号/验配师"
          v-model="listQuery.keyword"
        ></el-input>
      </div>
      <div class="form_div">
        <span class="form_span">出生年月：</span>
        <el-date-picker
          :editable=false
          clearable
          style=" vertical-align: middle;"
          v-model="timeArray2"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="getTime"
        ></el-date-picker>
      </div>
      <div class="form_div">
        <span class="form_span">性别：</span>
        <el-select clearable v-model="listQuery.type" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.title" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="form_div">
        <span class="form_span">最近预约时间：</span>
        <el-date-picker
          :editable=false
          clearable
          style=" vertical-align: middle;"
          v-model="timeArray1"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="getTime1"
        ></el-date-picker>
      </div>

      <el-button
        style="margin: 0;"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="searchQuery()"
      >{{$t('table.search')}}</el-button>
    </div>
    <!-- 搜索框 end -->
  </div>
</template>
<script>
// import Listing from "@/mixin/Listing";
export default {
  name: "selectComponents",
  //   mixins: [Listing],
  props: {
    listQuery: {
      type: Object,
      default: () => {
        return {};
      },
    },
    options: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      timeArray1: [],
      timeArray2: [],
    };
  },
  created() {},
  methods: {
    searchQuery() {
      this.$emit("searchQuery", this.listQuery, {
        birthdayStart: this.listQuery.birthdayStart
          ? this.listQuery.birthdayStart
          : "",
        birthdayEnd: this.listQuery.birthdayEnd
          ? this.listQuery.birthdayEnd
          : "",
        appointStart: this.listQuery.appointStart
          ? this.listQuery.appointStart
          : "",
        appointEnd: this.listQuery.appointEnd ? this.listQuery.appointEnd : "",
      });
    },
    getTime(e) {
      if (e == null) {
        e = ["", ""];
      }
      this.listQuery.birthdayStart = e[0];
      this.listQuery.birthdayEnd = e[1];
    },
    getTime1(e) {
      if (e == null) {
        e = ["", ""];
      }
      this.listQuery.appointStart = e[0];
      this.listQuery.appointEnd = e[1];
    },
  },
};
</script>
<style lang='scss' scoped>
.select-components {
  margin: 0 30px;
  color: #212121;
  .form_div {
    display: inline-block;
    margin-right: 10px;
    .form_span {
      line-height: 36px;
      display: inline-block;
      vertical-align: top;
    }
  }
  .search_case {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
  }
}
</style>
