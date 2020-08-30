<template>
  <div class="healthConsultant">
    <div class="contain">
      <!-- <div class="btn_wrapper">
        <div class="set_btn">设置</div>
      </div> -->
      <div class="flex_row">
        <div class="chunk blue" @click="onClick(1)">
          <div class="img">
            <img src="../../../assets/image/icon_service_one@2x.png" alt />
          </div>
          <div class="big_title">调试校验</div>
          <div class="time_tltle">100天</div>
          <div>保证您听得更好</div>
          <ul class="list">
            <li>100天三调两评</li>
            <li>三次家庭康复课堂</li>
            <li>使用与康复指导</li>
            <li>耳膜/外壳改良</li>
          </ul>
        </div>
        <div class="icon"></div>
        <div class="chunk green" @click="onClick(2)">
          <div class="img">
            <img src="../../../assets/image/icon_service_two@2x.png" alt />
          </div>
          <div class="big_title">保障保护</div>
          <div class="time_tltle">1-3年</div>
          <div>保证您成功使用助听器</div>
          <ul class="list">
            <li>1-3年免费保修</li>
            <li>3/6/12年度服务</li>
            <li>免费重编程序</li>
            <li>助听器性能检测保养</li>
          </ul>
        </div>
        <div class="icon"></div>
        <div class="chunk pink" @click="onClick(3)">
          <div class="img">
            <img src="../../../assets/image/icon_service_three@2x.png" alt />
          </div>
          <div class="big_title">持续服务</div>
          <div class="time_tltle">2-5年</div>
          <div>持续满足您的听觉需求</div>
          <ul class="list">
            <li>私人听力顾问</li>
            <li>会员年度服务</li>
            <li>免费咨询支持</li>
            <li>保修延期计划</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="introduce">
      <div class="title">验配师介绍</div>
      <div class="content">{{matcher.introduction}}</div>
    </div>
  </div>
</template>

<script>
import api from "../../../api/api";

export default {
  data() {
    return {
      matcher: {
        orgName: null,
        truename: null,
        introduction: null,
      },
    };
  },
  created() {
    // 验配师信息
    this.getFormData("patientMatchRecord/getMatcherByRecordId", "matcher", {
      recordId: localStorage.getItem("recordId"),
      sid: localStorage.getItem("sid"),
    });
  },
  methods: {
    onClick(e) {
      if (e == 1) {
        this.$router.push("commissioningInspection");
      } else if (e == 2) {
        this.$router.push("protectionGuarantee");
      } else if (e == 3) {
        this.$router.push("continuousService");
      }
    },
    getFormData(url, field, query) {
      api
        .postFormAPI(url, query)
        .then((res) => {
          if (res.data.result != 1) {
            return;
          }
          const data = res.data.data;
          for (const key in this[field]) {
            if (data.hasOwnProperty(key)) {
              this[field][key] = data[key];
            }
          }

          //数据处理
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.healthConsultant {
  padding: 30px 30px 0;
  background-color: #f9f9f9;
  color: #212121;
  overflow: hidden;
  .contain {
    border-radius: 10px;
    background-color: #fff;
    overflow: hidden;
    .btn_wrapper {
      display: flex;
      margin-top: 14px;
      justify-content: flex-end;
    }
    .set_btn {
      width: 70px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      margin-right: 14px;
      background: url("../../../assets/image/set_btn.png") no-repeat
        center/contain;
    }
    .flex_row {
      display: flex;
      margin-top: 30px;
      justify-content: center;
    }
    .chunk {
      display: flex;
      flex-direction: column;
      align-items: center;
      .img {
        width: 124px;
        margin-bottom: 14px;
        img {
          width: 100%;
          vertical-align: top;
        }
      }
      .big_title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 26px;
      }
      .time_tltle {
        width: 150px;
        height: 42px;
        line-height: 42px;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        border-radius: 21px;
        margin-bottom: 18px;
      }
      .list {
        margin: 20px 0;
        li {
          display: flex;
          align-items: center;
          color: #7d7d7d;
          line-height: 36px;
        }
        li::before {
          content: "";
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          margin: 0 6px;
        }
      }
    }
    .blue {
      .big_title,
      .time_tltle {
        color: #48a0dc;
      }
      .time_tltle {
        background-color: #e5f7fe;
      }
      li::before {
        background-color: #24afef;
      }
    }
    .green {
      .big_title,
      .time_tltle {
        color: #88bc1c;
      }
      .time_tltle {
        background-color: #f6fee5;
      }
      li::before {
        background-color: #76a416;
      }
    }
    .pink {
      .big_title,
      .time_tltle {
        color: #ff6363;
      }
      .time_tltle {
        background-color: #fff2f2;
      }
      li::before {
        background-color: #f28b8b;
      }
    }
  }

  .introduce {
    border-radius: 10px;
    background-color: #fff;
    overflow: hidden;
    margin-top: 24px;
    margin-bottom: 24px;
    padding: 16px 20px;
    .title {
      font-size: 20px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      &::before {
        content: "";
        display: inline-block;
        width: 6px;
        height: 20px;
        background: url("../../../assets/image/icon_dot_yellow@2x.png")
          no-repeat center/contain;
        margin-right: 12px;
      }
    }
    .content {
      margin-top: 26px;
      color: #646464;
      text-indent: 2em;
    }
  }
  .icon {
    width: 44px;
    height: 24px;
    background: url("../../../assets/image/icon_service_center@2x.png")
      no-repeat center/contain;
    margin: 0 30px 30px;
    align-self: center;
  }
}
</style>