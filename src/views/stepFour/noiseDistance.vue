<template>
  <div class="noiseDistance">
    <div class="top_case">
      <div class="role_chunk me">
        <div class="title">本人</div>
        <div class="content">
          <div v-for="(item, index) in imgInsertCase" :key="index" v-show="index<3">
            <img v-if="item" :src="item.pic" alt />
            <img v-else src="../../assets/image/icon_pic_default@2x.png" alt />
            <p v-if="item">{{item.name}}</p>
            <i v-if="item" @click="removeImg(index)"></i>
          </div>
        </div>
      </div>
      <div class="role_chunk with">
        <div class="title">陪同</div>
        <div class="content">
          <div v-for="(item, index) in imgInsertCase" :key="index" v-show="index>2 && index<6">
            <img v-if="item" :src="item.pic" alt />
            <img v-else src="../../assets/image/icon_pic_default@2x.png" alt />
            <p v-if="item">{{item.name}}</p>
            <i v-if="item" @click="removeImg(index)"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="distance_case">
      <div @click="pushImg(0)">
        <img src="../../assets/image/noise_distance1.png" alt />
        <p>近场</p>
      </div>
      <div @click="pushImg(1)">
        <img src="../../assets/image/noise_distance2.png" alt />
        <p>中场2-3m</p>
      </div>
      <div @click="pushImg(2)">
        <img src="../../assets/image/noise_distance3.png" alt />
        <p>远场</p>
      </div>
    </div>
    <div class="pos_case" @click="submit"></div>
  </div>
</template>

<script>
import api from "../../api/api";

export default {
  data() {
    return {
      imgInsertCase: ["", "", "", "", "", ""],
      imgS: [
        {
          pic: require("../../assets/image/noise_distance1.png"),
          name: "近场",
          id: 1,
        },
        {
          pic: require("../../assets/image/noise_distance2.png"),
          name: "中场2-3m",
          id: 2,
        },
        {
          pic: require("../../assets/image/noise_distance3.png"),
          name: "远场",
          id: 3,
        },
      ],
    };
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getInfo();
    },
    getInfo() {
      api
        .postFormAPI("patientChoice/getInfo", {
          recordId: localStorage.getItem("recordId"),
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.result == "1") {
            var soundscapeVal = res.data.data.distance;
            var soundscapeReconfirmVal = res.data.data.distanceReconfirm;
            if (soundscapeVal) {
              soundscapeVal.split(",").forEach((item, index) => {
                this.imgS.forEach((item1, index1) => {
                  if (item == item1.id) {
                    this.imgInsertCase.splice(index, 1, item1);
                  }
                });
              });
            }
            if (soundscapeReconfirmVal) {
              soundscapeReconfirmVal.split(",").forEach((item, index) => {
                this.imgS.forEach((item1, index1) => {
                  if (item == item1.id) {
                    var trueIndex = index + 3;
                    this.imgInsertCase.splice(trueIndex, 1, item1);
                  }
                });
              });
            }
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    pushImg(e) {
      this.imgInsertCase.forEach((item, index) => {
        if (item == "") {
          if (index < 3) {
            var sign = true;
            this.imgInsertCase.forEach((item1, index1) => {
              if (index1 < 3) {
                if (this.imgS[e].id == item1.id) {
                  sign = false;
                }
              }
            });
            if (sign) {
              this.imgInsertCase.splice(index, 1, this.imgS[e]);
              throw new Error();
            } else {
              this.$notify({
                message: "不可选中重复项",
              });
              throw new Error();
            }
          } else {
            var sign = true;
            this.imgInsertCase.forEach((item1, index1) => {
              if (index1 > 2 && index1 < 6) {
                if (this.imgS[e].id == item1.id) {
                  sign = false;
                }
              }
            });
            if (sign) {
              this.imgInsertCase.splice(index, 1, this.imgS[e]);
              throw new Error();
            } else {
              this.$notify({
                message: "不可选中重复项",
              });
              throw new Error();
            }
          }
        }
      });
    },
    removeImg(e) {
      this.imgInsertCase.splice(e, 1, "");
    },
    submit() {
      var soundscapeVal = this.imgInsertCase
        .slice(0, 3)
        .filter((a) => a)
        .map((a) => a.id)
        .join(",");
      var soundscapeReconfirmVal = this.imgInsertCase
        .slice(3, 6)
        .filter((a) => a)
        .map((a) => a.id)
        .join(",");
      var row = {
        recordId: localStorage.getItem("recordId"),
        sid: localStorage.getItem("sid"),
        distance: soundscapeVal,
        distanceReconfirm: soundscapeReconfirmVal,
      };
      for (var key in row) {
        if (row[key] == "") {
          delete row[key];
        }
      }
      api
        .postFormAPI("patientChoice/submit", row)
        .then((res) => {
          if (res.data.result == "1") {
            // this.$notify({
            //   message: res.data.message,
            // });
            var that = this;
            this.$notify({
              message: res.data.message,
              showClose: false,
              onClose(res) {
                that.$router.push({
                  path: "/noiseTarget",
                });
              },
              duration: 1000,
            });
            if (localStorage.getItem("xqpg")) {
              let xqpg = JSON.parse(localStorage.getItem("xqpg"));
              xqpg.includes(3) ? "" : xqpg.push(3);
              localStorage.setItem("xqpg", JSON.stringify(xqpg));
            } else {
              let xqpg = [3];
              localStorage.setItem("xqpg", JSON.stringify(xqpg));
            }
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
.noiseDistance {
  font-size: 16px;
  width: 100%;
  padding: 30px 20px;
  box-sizing: border-box;
  .top_case {
    display: flex;
  }
  .role_chunk {
    flex: 1;
    border-radius: 14px;
    height: 140px;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    margin-bottom: 20px;
    .content {
      flex-grow: 1;
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      div {
        position: relative;
        i {
          display: inline-block;
          width: 28px;
          height: 28px;
          position: absolute;
          right: 0;
          top: 0;
          background: url("../../assets/image/icon_test_close@2x.png")
            center/cover;
        }
      }
    }
    img {
      width: 96px;
      height: 66px;
      border-radius: 10px;
      margin-bottom: 10px;
    }
    .title {
      width: 44px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 8px;
      box-sizing: border-box;
      text-align: center;
    }
  }
  .me {
    .content {
      background: #e6f4ff;
    }
    .title {
      background: #74bcee;
    }
  }
  .with {
    margin-left: 20px;
    .title {
      background: #e6aa05;
    }
    .content {
      background: #fdf9e8;
    }
  }
  .distance_case {
    margin-top: 46px;
    width: 100%;
    display: flex;
    color: #212121;
    div {
      flex: 1;
      text-align: center;
      img {
        width: 156px;
        height: 108px;
        margin-bottom: 12px;
      }
    }
  }
  .pos_case {
    position: fixed;
    right: 18px;
    bottom: 93px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: url("../../assets/image/btn/icon_btn_save@2x.png") no-repeat
      center/contain;
  }
}
</style>
<style lang="scss">
</style>
