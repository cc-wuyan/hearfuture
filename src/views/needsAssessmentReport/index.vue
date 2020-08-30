<template>
  <div class="needsAssessmentReport">
    <div class="contain">
      <div class="header">
        <img class="img" src="../../assets/image/logo@2x.png" alt />
        <div class="slogan">{{slogan}}</div>
      </div>
      <div class="header-title">
        <div class="title">听障困难与需求评估报告单</div>
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
          <div class="chunk-label">一、三个最想解决的聆听需求共识</div>
          <div class="chunk-content">
            <table class="table w_65p">
              <tr v-for="(row, index) in soundTable" :key="'tr'+index">
                <td v-for="(ele) in row" :key="ele.id">{{ele.title}}</td>
              </tr>
            </table>
            <table class="table w_25p">
              <tr>
                <td>本人</td>
                <td>家属</td>
              </tr>
              <tr>
                <td>{{choice.soundscape.length > 0 ? getSoundTitle(choice.soundscape[0]) : ''}}</td>
                <td>{{choice.soundscapeReconfirm.length > 0 ? getSoundTitle(choice.soundscapeReconfirm[0]) : ''}}</td>
              </tr>
              <tr>
                <td>{{choice.soundscape.length > 1 ? getSoundTitle(choice.soundscape[1]) : ''}}</td>
                <td>{{choice.soundscapeReconfirm.length > 1 ? getSoundTitle(choice.soundscapeReconfirm[1]) : ''}}</td>
              </tr>
              <tr>
                <td>{{choice.soundscape.length > 2 ? getSoundTitle(choice.soundscape[2]) : ''}}</td>
                <td>{{choice.soundscapeReconfirm.length > 2 ? getSoundTitle(choice.soundscapeReconfirm[2]) : ''}}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="chunk">
          <div class="chunk-label">二、四个级别噪声环境需求评估</div>
          <div class="chunk-content">
            <table class="table w_65p">
              <tr>
                <td class="text_l">
                  强噪声
                  <br />噪杂混乱的背景噪声中
                  <br />长期回引起听力下降，影响健康
                </td>
                <td class="text_l">
                  整体背景噪声&gt;90dB
                  <br />主要噪声源&gt;3个
                  <br />或单一噪声源&gt;100dB
                </td>
              </tr>
              <tr>
                <td class="text_l">
                  噪杂
                  <br />噪杂的背景噪音
                  <br />干扰会话，影响工作休息
                </td>
                <td class="text_l">
                  整体背景噪声70-90dB
                  <br />主要噪声源&gt;3个
                </td>
              </tr>
              <tr>
                <td class="text_l">
                  轻噪声
                  <br />少量有限的背景噪声
                </td>
                <td class="text_l">
                  整体背景噪声45-70dB
                  <br />主要噪声源&lt;2个
                </td>
              </tr>
              <tr>
                <td class="text_l">
                  安静
                  <br />很少有噪声
                </td>
                <td class="text_l">
                  整体背景噪声&lt;45dB
                  <br />无主要噪声源
                </td>
              </tr>
            </table>
            <table class="table w_25p">
              <tr>
                <td>本人</td>
                <td>家属</td>
              </tr>
              <tr>
                <td>{{choice.level.length > 0 ? level[choice.level[0]] : ''}}</td>
                <td>{{choice.levelReconfirm.length > 0 ? level[choice.levelReconfirm[0]] : ''}}</td>
              </tr>
              <tr>
                <td>{{choice.level.length > 1 ? level[choice.level[1]] : ''}}</td>
                <td>{{choice.levelReconfirm.length > 0 ? level[choice.levelReconfirm[1]] : ''}}</td>
              </tr>
              <tr>
                <td>{{choice.level.length > 2 ? level[choice.level[2]] : ''}}</td>
                <td>{{choice.levelReconfirm.length > 0 ? level[choice.levelReconfirm[2]] : ''}}</td>
              </tr>
              <!-- <tr>
                <td>{{choice.level.length > 3 ? level[choice.level[3]] : ''}}</td>
                <td>{{choice.levelReconfirm.length > 0 ? level[choice.levelReconfirm[3]] : ''}}</td>
              </tr>-->
            </table>
          </div>
        </div>
        <div class="chunk">
          <div class="chunk-label">三、近场与远场</div>
          <div class="chunk-content">
            <div class="triangle_chunk">
              <div class="triangle">
                <div class="edge"></div>
              </div>
              <div class="flex_row">
                <div>近场</div>
                <div>≈2m</div>
                <div>远场</div>
              </div>
            </div>
            <table class="table w_25p">
              <tr>
                <td>本人</td>
                <td>家属</td>
              </tr>
              <tr>
                <td>{{choice.distance.length > 0 ? distance[choice.distance[0]] : ''}}</td>
                <td>{{choice.distanceReconfirm.length > 0 ? distance[choice.distanceReconfirm[0]] : ''}}</td>
              </tr>
              <tr>
                <td>{{choice.distance.length > 1 ? distance[choice.distance[1]] : ''}}</td>
                <td>{{choice.distanceReconfirm.length > 1 ? distance[choice.distanceReconfirm[1]] : ''}}</td>
              </tr>
              <tr>
                <td>{{choice.distance.length > 2 ? distance[choice.distance[2]] : ''}}</td>
                <td>{{choice.distanceReconfirm.length > 2 ? distance[choice.distanceReconfirm[2]] : ''}}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="chunk">
          <div class="chunk-label">四、听觉重建的过程和目标</div>
          <div class="chunk-content">
            <table class="table2">
              <tr>
                <td colspan="2" rowspan="2">康复阶段</td>
                <td rowspan="2">目标与内容</td>
                <td rowspan="2">常模</td>
                <td colspan="2">期望达成的时间</td>
              </tr>
              <tr>
                <td>本人</td>
                <td>家属</td>
              </tr>
              <tr>
                <td rowspan="4">康复目标</td>
                <td>察知与适应</td>
                <td class="text_l">
                  初步适应与接收
                  <br />一调一评
                  <br />家庭康复第一课认识助听器
                </td>
                <td>7-10天</td>
                <td>
                  <div v-if="target.adapt">{{target.adapt}}天</div>
                  <div v-else></div>
                </td>
                <td>
                  <div v-if="target.adaptReconfirm">{{target.adaptReconfirm}}天</div>
                  <div v-else></div>
                </td>
              </tr>
              <tr>
                <td>辨别与熟练</td>
                <td class="text_l">
                  个性化频率适应
                  <br />个性化场景适应
                  <br />第二次调试
                </td>
                <td>30-45天</td>
                <td>
                  <div v-if="target.skilled">{{target.skilled}}天</div>
                  <div v-else></div>
                </td>
                <td>
                  <div v-if="target.skilledReconfirm">{{target.skilledReconfirm}}天</div>
                  <div v-else></div>
                </td>
              </tr>
              <tr>
                <td>识别与定型</td>
                <td class="text_l">
                  学会交流/调整生活状态
                  <br />三调两评
                  <br />家庭康复第二课成功使用助听器
                </td>
                <td>90-100天</td>
                <td>
                  <div v-if="target.fixed">{{target.fixed}}天</div>
                  <div v-else></div>
                </td>
                <td>
                  <div v-if="target.fixedReconfirm">{{target.fixedReconfirm}}天</div>
                  <div v-else></div>
                </td>
              </tr>
              <tr>
                <td>理解与成功</td>
                <td class="text_l">
                  改变被动的生活方式
                  <br />回归品质生活
                  <br />3/6/12/年度服务
                </td>
                <td>365天</td>
                <td>
                  <div v-if="target.success">{{target.success}}天</div>
                  <div v-else></div>
                </td>
                <td>
                  <div v-if="target.successReconfirm">{{target.successReconfirm}}天</div>
                  <div v-else></div>
                </td>
              </tr>
            </table>
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
        <div>验配中心：{{orgName}}</div>
        <div>检查日期：{{nowdatetime}}</div>
        <div>医生签名：{{truename}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api/api";

export default {
  data() {
    return {
      slogan: "用爱经营 用良心服务 用匠心成就 ",
      orgName: "",
      truename: "",
      userInfo: {
        truename: null,
        sex: null,
        birthday: "",
        matchTitle: "",
        patientNum: null,
        updatetime: null,
      },
      choice: {
        soundscape: [],
        soundscapeReconfirm: [],
        level: [],
        levelReconfirm: [],
        distance: [],
        distanceReconfirm: [],
      },
      soundTable: [],
      soundScape: [],
      soundScapeObject: {},
      level: {
        "1": "强噪声",
        "2": "噪杂",
        "3": "轻噪声",
        "4": "安静",
      },
      distance: {
        "1": "近场",
        "2": "中场",
        "3": "远场",
      },
      target: {
        adapt: null,
        adaptReconfirm: null,
        skilled: null,
        skilledReconfirm: null,
        fixed: null,
        fixedReconfirm: null,
        success: null,
        successReconfirm: null,
      },
      // 当前时间
      nowdatetime: new Date()
        .toLocaleString()
        .replace(/\//g, "-")
        .substring(
          0,
          new Date().toLocaleString().replace(/\//g, "-").indexOf(" ")
        ),
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
  async created() {
    // 获取用户信息
    api
      .postFormAPI("patient/getInfo", {
        patientId: localStorage.getItem("patientId"),
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result != 1) {
          return;
        }
        const data = res.data.data;
        for (const key in this.userInfo) {
          if (data.hasOwnProperty(key)) {
            this.userInfo[key] = data[key];
          }
        }

        //数据处理
      })
      .catch((err) => console.log(err));

    // 验配师信息
    api
      .postFormAPI("patientMatchRecord/getMatcherByRecordId", {
        recordId: localStorage.getItem("recordId"),
      })
      .then((res) => {
        if (res.data.result == "1") {
          this.orgName = res.data.data.orgName;
          this.truename = res.data.data.truename;
        }
        //数据处理
      })
      .catch((err) => console.log(err));

    // 获取聆听声景图
    await api
      .postFormAPI("soundscape/getAllSoundscape", {
        recordId: localStorage.getItem("recordId"),
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result != 1) {
          return;
        }
        const data = res.data.data;
        this.soundScape = data;
        let tmp = [];
        for (const index in data) {
          tmp.push(data[index]);
          if ((parseInt(index) + 1) % 4 == 0) {
            this.soundTable.push(tmp);
            tmp = [];
          }
          this.soundScapeObject[data[index].id] = data[index];
        }
        if (tmp.length > 0) {
          this.soundTable.push(tmp);
        }
      })
      .catch((err) => console.log(err));

    // 获取三大场景选择
    await api
      .postFormAPI("patientChoice/getInfo", {
        recordId: localStorage.getItem("recordId"),
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result != 1) {
          return;
        }
        const data = res.data.data;
        for (const key in this.choice) {
          if (data.hasOwnProperty(key)) {
            switch (key) {
              case "soundscape":
              case "soundscapeReconfirm":
              case "level":
              case "levelReconfirm":
              case "distance":
              case "distanceReconfirm":
                {
                  data[key] = data[key].split(",");
                }
                break;
            }
            this.choice[key] = data[key];
          }
        }
      })
      .catch((err) => console.log(err));

    // 获取康复目标
    api
      .postFormAPI("patientTarget/getInfo", {
        recordId: localStorage.getItem("recordId"),
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result != 1) {
          return;
        }
        const data = res.data.data;
        for (const key in this.target) {
          if (data.hasOwnProperty(key)) {
            this.target[key] = data[key];
          }
        }

        //数据处理
      })
      .catch((err) => console.log(err));
  },
  mounted() {},
  methods: {
    getSoundTitle(id) {
      if (this.soundScapeObject.hasOwnProperty(id)) {
        return this.soundScapeObject[id].title;
      }
      return "";
    },
  },
};
</script>

<style lang="scss" scoped>
.needsAssessmentReport {
  .contain {
    display: flex;
    flex-direction: column;
    color: #212121;
  }
  .header {
    display: flex;
    margin: 20px 30px 0;
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
    margin: 0 30px;
    margin-top: 50px;
    .chunk {
      margin-bottom: 26px;
    }
    .chunk-content {
      margin-top: 14px;
      display: flex;
      justify-content: space-between;
    }
    .chunk-label {
      font-weight: bold;
    }
    .table {
      border-collapse: collapse;
      td {
        padding: 10px 8px;
        height: 20px;
        text-align: center;
        border: 1px solid #212121;
      }
      .text_l {
        text-align: left;
        line-height: 26px;
      }
    }
    .table2 {
      border-collapse: collapse;
      width: 100%;
      td {
        padding: 6px 8px;
        height: 20px;
        text-align: center;
        border: 1px solid #212121;
      }
      .text_l {
        text-align: left;
        line-height: 26px;
      }
    }
    .w_65p {
      width: 65%;
    }
    .w_25p {
      width: 25%;
      td {
        white-space: nowrap;
      }
    }
  }
  .triangle_chunk {
    width: 480px;
    .triangle {
      height: 146px;
      border: 1px solid #212121;
      border-top: unset;
      border-left: unset;
      position: relative;

      .edge {
        width: 502px;
        border-top: 1px solid #212121;
        transform-origin: center center;
        transform: rotate(-17deg);
        position: relative;
        top: 73px;
        left: -10px;
      }
    }
    .flex_row {
      display: flex;
      justify-content: space-between;
      margin-top: 12px;
    }
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
