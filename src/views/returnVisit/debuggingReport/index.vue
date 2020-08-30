<template>
  <div class="debuggingReport">
    <div class="contain">
      <div class="header">
        <img class="img" src="../../../assets/image/logo@2x.png" alt />
        <div class="slogan">{{slogan}}</div>
      </div>
      <div class="header-title">
        <div class="title">调试校验报告单</div>
      </div>
      <div class="user-info">
        <span>姓名：</span>
        <span>{{userInfo.truename}}</span>
        <span>性别：</span>
        <span>{{userInfo.sex == 1 ? '男' : userInfo.sex == 2 ? '女': ''}}</span>
        <span>年龄：</span>
        <span>{{age}}</span>
        <span>病例号：</span>
        <span>{{userInfo.patientNum}}</span>
      </div>
      <div class="report-wrapper">
        <div class="chunk">
          <div class="chunk-label">1、第一次复诊：</div>
          <div class="chunk-content">
            <div class="info">
              预约时间：
              <span>{{times.firstCheck}}</span>
              <div class="mr-100"></div>处置人：
              <span></span>
            </div>
            <table class="table">
              <tr>
                <th>名称</th>
                <th>观察记录</th>
                <th colspan="2">处置内容</th>
                <th>处置结果</th>
              </tr>
              <tr>
                <td rowspan="7">基础调试</td>
                <td rowspan="7" style="text-align:left">
                  <div class="chunk-label">记录：</div>
                  <div class="chunk-content">
                    <div>1、助听器每日使用时间</div>
                    <div>2、记录在家出现的令您不满意的声音</div>
                  </div>
                  <div class="chunk-label">观察：</div>
                  <div class="chunk-content">
                    <div>1、和朋友在家交谈是否有困难；</div>
                    <div>2、在安静的环境下也要让对方一次一次重复讲话；</div>
                    <div>3、卫生间水箱和沐浴的水声是否非常吵；</div>
                    <div>4、意外声音，如警报声是都不舒服。</div>
                  </div>
                </td>
                <td rowspan="4">一调</td>
                <td rowspan="4" style="text-align:left">通用程序调试：</td>
                <td>
                  <van-checkbox
                    v-model="checked"
                    shape="square"
                    label-position="left"
                    disabled
                  >小声能听到</van-checkbox>
                </td>
              </tr>
              <tr>
                <td>
                  <van-checkbox
                    v-model="checked"
                    shape="square"
                    label-position="left"
                    disabled
                  >中声能听清</van-checkbox>
                </td>
              </tr>
              <tr>
                <td>
                  <van-checkbox
                    v-model="checked"
                    shape="square"
                    label-position="left"
                    disabled
                  >大声不震耳</van-checkbox>
                </td>
              </tr>
              <tr>
                <td>
                  <van-checkbox v-model="checked" shape="square" label-position="left" disabled>双声平衡</van-checkbox>
                </td>
              </tr>
              <tr>
                <td rowspan="2">一评</td>
                <td style="text-align:left">数量评估</td>
                <td>
                  <van-checkbox v-model="checked" shape="square" label-position="left" disabled></van-checkbox>
                </td>
              </tr>
              <tr>
                <td style="text-align:left">言语评估</td>
                <td>
                  <van-checkbox v-model="checked" shape="square" label-position="left" disabled></van-checkbox>
                </td>
              </tr>
              <tr>
                <td>一课</td>
                <td style="text-align:left">
                  家庭康复课堂第一课
                  <br />参与人：
                  <span></span>
                </td>
                <td>
                  <van-checkbox v-model="checked" shape="square" label-position="left" disabled></van-checkbox>
                </td>
              </tr>
            </table>
            <div class="info">
              实际到诊时间：
              <span class="flex-grow"></span>用户签字：
              <span class="flex-grow"></span>处置人签字：
              <span class="flex-grow"></span>
            </div>
          </div>
        </div>
        <div class="chunk">
          <div class="chunk-label">2、第二次复诊：</div>
          <div class="chunk-content">
            <div class="info">
              预约时间：
              <span>{{times.secondCheck}}</span>
              <div class="mr-100"></div>处置人：
              <span></span>
            </div>
            <table class="table">
              <tr>
                <th>名称</th>
                <th>观察记录</th>
                <th colspan="2">处置内容</th>
                <th>处置结果</th>
              </tr>
              <tr>
                <td rowspan="5">个性化调试</td>
                <td rowspan="5" style="text-align:left">
                  <div class="chunk-label">记录：</div>
                  <div class="chunk-content">
                    <div>1、助听器使用场景</div>
                    <div>2、记录在户外或商场出现的令您不满意的声音</div>
                  </div>
                  <div class="chunk-label">观察：</div>
                  <div class="chunk-content">
                    <div>1、安静环境下，小范围会议或多人对话时是否要全神贯注才能听清/能否理解对话内容；</div>
                    <div>2、是否可以在噪杂的商店中与营业员交谈；</div>
                    <div>3、交通噪声（汽车刹车声/火车汽笛声）是否觉得吵，或者不舒服；</div>
                    <div>4、当与一人隔着空旷的大房间交流时，是否能够听清。</div>
                  </div>
                </td>
                <td rowspan="4">二调</td>
                <td rowspan="3" style="text-align:left">个性化频率特性调试</td>
                <td>
                  <van-checkbox
                    v-model="checked"
                    shape="square"
                    label-position="left"
                    disabled
                  >50dB双耳清晰度</van-checkbox>
                </td>
              </tr>
              <tr>
                <td>
                  <van-checkbox
                    v-model="checked"
                    shape="square"
                    label-position="left"
                    disabled
                  >60dB双耳清晰度</van-checkbox>
                </td>
              </tr>
              <tr>
                <td>
                  <van-checkbox
                    v-model="checked"
                    shape="square"
                    label-position="left"
                    disabled
                  >80dB双耳清晰度</van-checkbox>
                </td>
              </tr>
              <tr>
                <td style="text-align:left">第二程序设定：户外程序</td>
                <td>
                  <van-checkbox v-model="checked" shape="square" label-position="left" disabled>双声平衡</van-checkbox>
                </td>
              </tr>
              <tr>
                <td>二课</td>
                <td style="text-align:left">
                  家庭康复课堂第二课
                  <br />参与人：
                  <span></span>
                </td>
                <td>
                  <van-checkbox v-model="checked" shape="square" label-position="left" disabled></van-checkbox>
                </td>
              </tr>
            </table>
            <div class="info">
              实际到诊时间：
              <span class="flex-grow"></span>用户签字：
              <span class="flex-grow"></span>处置人签字：
              <span class="flex-grow"></span>
            </div>
          </div>
        </div>
        <div class="chunk">
          <div class="chunk-label">3、第三次复诊：</div>
          <div class="chunk-content">
            <div class="info">
              预约时间：
              <span>{{times.thirdCheck}}</span>
              <div class="mr-100"></div>处置人：
              <span></span>
            </div>
            <table class="table">
              <tr>
                <th>名称</th>
                <th>观察记录</th>
                <th colspan="2">处置内容</th>
                <th>处置结果</th>
              </tr>
              <tr>
                <td rowspan="7">评估调试</td>
                <td rowspan="7" style="text-align:left">
                  <div class="chunk-label">记录：</div>
                  <div>参与社会活动时仍然存在的困难</div>
                  <div class="chunk-label">观察：</div>
                  <div class="chunk-content">
                    <div>1、与许多人共进晚餐时，能否与其中一人交流；</div>
                    <div>2、在礼堂/机场或火车站大厅时能否听清说话者的内容；</div>
                    <div>3、工地的声音是否觉得吵；</div>
                    <div>4、在电影院、剧场、演唱会现场能否听清音响或广播的声音。</div>
                  </div>
                </td>
                <td rowspan="2">三调</td>
                <td style="text-align:left">第三程序设定：电子声</td>
                <td>
                  <van-checkbox v-model="checked" shape="square" label-position="left" disabled></van-checkbox>
                </td>
              </tr>
              <tr>
                <td style="text-align:left">外延附件匹配</td>
                <td>
                  <van-checkbox v-model="checked" shape="square" label-position="left" disabled></van-checkbox>
                </td>
              </tr>
              <tr>
                <td rowspan="4">二评</td>
                <td style="text-align:left">数量评估</td>
                <td>
                  <van-checkbox v-model="checked" shape="square" label-position="left" disabled></van-checkbox>
                </td>
              </tr>
              <tr>
                <td style="text-align:left">言语评估</td>
                <td>
                  <van-checkbox v-model="checked" shape="square" label-position="left" disabled></van-checkbox>
                </td>
              </tr>
              <tr>
                <td style="text-align:left">真耳分析</td>
                <td>
                  <van-checkbox v-model="checked" shape="square" label-position="left" disabled></van-checkbox>
                </td>
              </tr>
              <tr>
                <td style="text-align:left">评估后调试</td>
                <td>
                  <van-checkbox v-model="checked" shape="square" label-position="left" disabled></van-checkbox>
                </td>
              </tr>
              <tr>
                <td>三课</td>
                <td style="text-align:left">
                  家庭康复课堂第三课
                  <br />参与人：
                  <span></span>
                </td>
                <td>
                  <van-checkbox v-model="checked" shape="square" label-position="left" disabled></van-checkbox>
                </td>
              </tr>
            </table>
            <div class="info">
              实际到诊时间：
              <span class="flex-grow"></span>用户签字：
              <span class="flex-grow"></span>处置人签字：
              <span class="flex-grow"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="user-sign">
        <div>本人签字：</div>
        <div class="line"></div>
        <div>家属签字:</div>
        <div class="line"></div>
      </div>
      <div class="doctor-sign">
        <div>验配中心：{{matcher.orgName}}</div>
        <div>检查日期：{{nowdatetime}}</div>
        <div>医生签名：{{matcher.truename}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../../api/api";
export default {
  data() {
    return {
      slogan: "用爱经营 用良心服务 用匠心成就 ",
      userInfo: {
        truename: null,
        sex: null,
        birthday: "",
        patientNum: null,
        updatetime: null,
      },
      matcher: {
        orgName: null,
        truename: null,
      },
      // 当前时间
      nowdatetime: new Date()
        .toLocaleString()
        .replace(/\//g, "-")
        .substring(
          0,
          new Date().toLocaleString().replace(/\//g, "-").indexOf(" ")
        ),
      checked: "",
      // 复诊时间
      times: {
        firstCheck: null,
        secondCheck: null,
        thirdCheck: null,
        secondAssessment: null,
      },
    };
  },
  computed: {
    age() {
      if (this.userInfo.birthday == "") {
        return;
      }
      return (
        new Date().getFullYear() - Number(this.userInfo.birthday.slice(0, 4))
      );
    },
  },
  created() {
    // 获取用户信息
    this.getFormData("patient/getInfo", "userInfo", {
      patientId: localStorage.getItem("patientId"),
      sid: localStorage.getItem("sid"),
    });
    // 获取复诊时间
    this.getFormData("privateService/setting", "times", {
      recordId: localStorage.getItem("recordId"),
      patientId: localStorage.getItem("patientId"),
      sid: localStorage.getItem("sid"),
    });
    // 验配师信息
    this.getFormData("patientMatchRecord/getMatcherByRecordId", "matcher", {
      recordId: localStorage.getItem("recordId"),
      sid: localStorage.getItem("sid"),
    });
  },
  methods: {
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
.debuggingReport {
  .contain {
    display: flex;
    flex-direction: column;
    margin: 0 30px;
    color: #212121;
  }
  .header {
    display: flex;
    width: 100%;
    margin: 20px auto 0;
    align-items: center;
    justify-content: space-between;
    .img {
      height: 40px;
    }
    .slogan {
      font-size: 16px;
      font-weight: bold;
      color: #333;
    }
  }
  .header-title {
    height: 46px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    .title {
      height: 34px;
      font-size: 26px;
      font-weight: bold;
      line-height: 34px;
      color: #333;
    }
  }
  .report-wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    .chunk {
      margin-bottom: 26px;
    }
    .chunk-content {
      padding-left: 1em;
      line-height: 26px;
      .flex-grow {
        display: flex;
        flex-grow: 1;
      }
      .info {
        display: flex;
        width: 100%;
        margin-top: 14px;
      }
      span {
        padding: 0 20px;
        border-bottom: 1px solid #212121;
        min-height: 20px;
      }
    }
    .chunk-label {
      font-weight: bold;
    }
    .table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 14px;
      th,
      td {
        border: 1px solid #212121;
        text-align: center;
        padding: 4px 8px;
      }
    }
  }
  .mr-100 {
    margin-right: 100px;
  }
  .user-info {
    font-size: 18px;
    line-height: 16px;
    color: #212121;
    margin: 42px auto 0;
    span:nth-of-type(2n + 2):not(:last-of-type) {
      padding: 0 10px;
      margin-right: 40px;
    }
  }
  .user-sign {
    width: 90%;
    display: flex;
    margin: 0 auto;
    justify-content: flex-end;
    margin-top: 46px;
    .line {
      width: 100px;
      border-bottom: 1px solid #212121;
      margin-right: 20px;
    }
  }
  .doctor-sign {
    display: flex;
    align-items: center;
    width: 90%;
    margin: 34px auto;
    div {
      flex-grow: 1;
    }
  }
}
</style>

<style lang="scss">
.debuggingReport {
  .van-checkbox__icon--disabled.van-checkbox__icon--checked .van-icon {
    color: #fff;
  }
  .van-checkbox__icon--checked {
    background-color: #1989fa;
  }
  .van-checkbox__icon--disabled .van-icon {
    background-color: unset;
    border-color: #c8c9cc;
  }
  .van-checkbox__label--disabled {
    color: #212121;
    white-space: nowrap;
  }
  .van-checkbox {
    display: flex;
    justify-content: center;
  }
}
</style>
