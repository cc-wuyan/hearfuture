<template>
  <div class="servicesList">
    <div class="wrapper" v-if="leftData">
      <!-- for  -->
      <div class="chunk red" v-for="(item,index) in leftData" :key="index">
        <div class="label-wrapper">
          <img :src="item.list[0].img" />
          <div class="label">{{item.type}}</div>
        </div>
        <div class="checkbox">
          <div v-for="(item,index) in item.list" :key="'case'+index">
            <el-checkbox
              ref="checkArrDom"
              :label="item.id"
              border
              :checked="item.isCheck == 1 ? true : false"
            >
              <div class="content">{{item.title}}</div>
              <div>{{item.price}}</div>
            </el-checkbox>
          </div>
        </div>
      </div>
    </div>
    <div v-if="rightData" class="wrapper">
      <div class="chunk blue" v-for="(item,index) in rightData" :key="index">
        <div class="label-wrapper">
          <img :src="item.list[0].img" />
          <div class="label">{{item.type}}</div>
        </div>
        <div class="checkbox">
          <div v-for="(item,index) in item.list" :key="'case'+index">
            <el-checkbox
              ref="checkArrDom"
              :label="item.id"
              border
              :checked="item.isCheck == 1 ? true : false"
            >
              <div class="content">{{item.title}}</div>
              <div>{{item.price}}</div>
            </el-checkbox>
          </div>
        </div>
      </div>
    </div>

    <div class="pay-btn" @click="toFirstCase"></div>

    <!-- <div class="pay-btn pay_list" @click="gotoPayList">
      <div>收费单</div>
    </div>-->
  </div>
</template>

<script>
import api from "../../api/api";
export default {
  data() {
    return {
      color: "red",
      orderNo: "",
      leftData: [],
      rightData: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getDataIsPay();
      this.getData();
    },
    getData() {
      api
        .postFormAPI("medicalService/index", {
          recordId: localStorage.getItem("recordId"),
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.result == "1") {
            var initData = res.data.data;
            if (initData.length > 0) {
              initData.forEach((item, index) => {
                if (index % 2 == 0) {
                  this.leftData.push(item);
                } else {
                  this.rightData.push(item);
                }
              });
            }
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    getDataIsPay() {
      api
        .postFormAPI("medicalService/userCharge", {
          sid: localStorage.getItem("sid"),
          recordId: localStorage.getItem("recordId"),
        })
        .then((res) => {
          if (res.data.result == "1") {
            this.payData = res.data.data;
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    toFirstCase() {
      let domArr = this.$refs.checkArrDom;
      let InitIds = [];
      if (domArr.length > 0) {
        domArr.forEach((item, index) => {
          if (item.isChecked) {
            InitIds.push(item.label);
          }
        });
      }
      if (InitIds.length > 0) {
      } else {
        this.$notify({
          message: "请至少选择一项",
        });
        return false;
      }
      let ids = InitIds.join(",");

      api
        .postFormAPI("medicalService/charge", {
          ids: ids,
          sid: localStorage.getItem("sid"),
          recordId: localStorage.getItem("recordId"),
        })
        .then((res) => {
          if (res.data.result == 1) {
            let _this = this;
            this.$notify({
              message: "选择成功！",
              duration: 1000,
              showClose: false,
              onClose() {
                _this.$router.push({
                  name: "payList",
                  query: {
                    ids: ids,
                    code: encodeURI(res.data.data.payData.code_url),
                    orderNo: encodeURI(res.data.data.orderNumber),
                  },
                });
              },
            });
            this.nativeCall({ index: 6 }, "updateStep");
          } else {
            this.$notify({
              message: res.data.message,
              duration: 1000,
              showClose: false,
            });
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    gotoPayList() {
      this.$router.push({
        name: "payList",
        query: {},
      });
    },
    queryParams(data, isPrefix = false) {
      let prefix = isPrefix ? "?" : "";
      let _result = [];
      for (let key in data) {
        let value = data[key];
        // 去掉为空的参数
        if (["", undefined, null].includes(value)) {
          continue;
        }
        if (value.constructor === Array) {
          value.forEach((_value) => {
            _result.push(
              encodeURIComponent(key) + "[]=" + encodeURIComponent(_value)
            );
          });
        } else {
          _result.push(
            encodeURIComponent(key) + "=" + encodeURIComponent(value)
          );
        }
      }
      // console.log(_result.length ? prefix + _result.join("&") : "");
      return _result.length ? prefix + _result.join("&") : "";
    },
    nativeCall(param, nativeMethodName) {
      // console.log(param);
      // console.log(nativeMethodName);
      param = this.queryParams(param);
      // console.log(param);

      document.location = "js://" + nativeMethodName + "?" + param;
    },
  },
};
</script>

<style lang="scss" scoped>
.servicesList {
  //   position: relative;
  color: #212121;
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  width: 100%;
  justify-content: center;
  .wrapper {
    display: flex;
    flex-direction: column;
  }
  .wrapper:first-child {
    margin-right: 30px;
  }
  .chunk {
    width: 370px;
    display: flex;
    align-items: center;
    margin-bottom: 14px;
    .label-wrapper {
      width: 76px;
      margin-right: 4px;
      flex-shrink: 0;
      align-self: stretch;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      img {
        width: 30px;
      }
      .label {
        margin-top: 8px;
        text-align: center;
      }
    }
    .checkbox {
      flex-grow: 1;
      .content {
        white-space: normal;
        margin-right: 14px;
      }
      div {
        white-space: normal;
      }
    }
  }
  .pay-btn {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    color: #fff;
    position: fixed;
    right: 20px;
    bottom: 20px;
    background: url("../../assets/image/btn/icon_btn_order@2x.png") no-repeat
      center/contain;
  }
  .pay_list {
    bottom: 112px;
  }
}
</style>

<style lang="scss">
.servicesList {
  .el-checkbox {
    display: flex;
    align-items: center;
    margin: 0;
    color: #212121;
    font-weight: 400;
  }
  .el-checkbox__input {
    flex-shrink: 0;
  }
  .el-checkbox.is-bordered + .el-checkbox.is-bordered {
    margin-left: 0;
    margin-top: 4px;
  }
  .el-checkbox.is-bordered {
    padding: 6px 10px;
    height: auto;
  }
  .el-checkbox__label {
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
  }
  .is-bordered {
    border: unset;
  }
  //   选中后的样式
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #fff;
  }
  .el-checkbox__inner::after {
    border-color: #409eff;
    top: 2px;
    left: 5px;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #fff;
    border: unset;
  }

  .el-checkbox__inner {
    -webkit-transition: unset;
    transition: unset;
  }
  .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: #dcdfe6;
  }
  .is-checked {
    background-color: #409eff;
  }
  .red {
    .label-wrapper {
      background-color: #fff8f8;
    }
    .el-checkbox {
      background-color: #fff8f8;
    }
    .is-checked {
      background-color: #fc3c3c;
    }

    .el-checkbox__inner::after {
      border-color: #fc3c3c;
    }
  }
  .blue {
    .label-wrapper {
      background-color: #f2fbff;
    }
    .el-checkbox {
      background-color: #f2fbff;
    }
    .is-checked {
      background-color: #74bcee;
    }

    .el-checkbox__inner::after {
      border-color: #74bcee;
    }
  }
  .green {
    .label-wrapper {
      background-color: #f1f8f1;
    }
    .el-checkbox {
      background-color: #f1f8f1;
    }
    .is-checked {
      background-color: #88bc1c;
    }

    .el-checkbox__inner::after {
      border-color: #88bc1c;
    }
  }
  .yellow {
    .label-wrapper {
      background-color: #fffaec;
    }
    .el-checkbox {
      background-color: #fffaec;
    }
    .is-checked {
      background-color: #ef9014;
    }

    .el-checkbox__inner::after {
      border-color: #ef9014;
    }
  }
  .purple {
    .label-wrapper {
      background-color: #f2f5ff;
    }
    .el-checkbox {
      background-color: #f2f5ff;
    }
    .is-checked {
      background-color: #667fd1;
    }

    .el-checkbox__inner::after {
      border-color: #667fd1;
    }
  }
}
</style>
