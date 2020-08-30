<template>
  <div class="customReport">
    <div class="contain">
      <div class="header">
        <img class="img" src="../../assets/image/logo@2x.png" alt />
        <div class="slogan">{{ slogan }}</div>
      </div>
      <div class="header-title">
        <div class="title">定制报告单</div>
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
          <div class="chunk-label">一、临床诊断</div>
          <div class="chunk-content">
            <table class="table">
              <!-- 表头 -->
              <tr>
                <th></th>
                <th>左耳</th>
                <th>右耳</th>
              </tr>
              <!-- 首行 -->
              <tr>
                <td></td>
                <td>
                  <div class="top">
                    <span>品牌：{{dataDictionary.brand[renderData.brandLeft]}}</span>
                    <span>系列：{{dataDictionary.series[renderData.seriesLeft]}}</span>
                    <span>型号：{{dataDictionary.model[renderData.modelLeft]}}</span>
                  </div>
                  <div class="bottom">
                    <span>颜色：{{dataDictionary.color[renderData.colorLeft]}}</span>
                    <span>机身码：{{dataDictionary.code[renderData.codeLeft]}}</span>
                    <span>保修年限：{{dataDictionary.guarantee[renderData.guaranteeLeft]}}</span>
                  </div>
                </td>

                <td>
                  <div class="top">
                    <span>品牌：{{dataDictionary.brand[renderData.brandRight]}}</span>
                    <span>系列：{{dataDictionary.series[renderData.seriesRight]}}</span>
                    <span>型号：{{dataDictionary.model[renderData.modelRight]}}</span>
                  </div>
                  <div class="bottom">
                    <span>颜色：{{dataDictionary.color[renderData.colorRight]}}</span>
                    <span>机身码：{{dataDictionary.code[renderData.codeRight]}}</span>
                    <span>保修年限：{{dataDictionary.guarantee[renderData.guaranteeRight]}}</span>
                  </div>
                </td>
              </tr>
              <!-- 类型 -->
              <tr>
                <td>类型</td>
                <td>
                  <span>{{dataDictionary.type[renderData.typeLeft]}}</span>
                </td>
                <td>
                  <span>{{dataDictionary.type[renderData.typeRight]}}</span>
                </td>
              </tr>
              <!-- 功率 -->
              <tr>
                <td>功率</td>
                <td>
                  <span>{{dataDictionary.power[renderData.powerLeft]}}</span>
                </td>
                <td>
                  <span>{{dataDictionary.power[renderData.powerRight]}}</span>
                </td>
              </tr>
            </table>
          </div>

          <!-- 助听器定制选项 -->
          <div class="chunk-label">二、助听器定制选项</div>
          <div class="chunk-content">
            <table class="table">
              <!-- 表头 -->
              <tr>
                <th></th>
                <th>左耳</th>
                <th>右耳</th>
              </tr>
              <!-- 类型 -->
              <tr>
                <td rowspan="3">定制机</td>
                <td>
                  <div class="row">
                    <span>外壳颜色：</span>
                    <van-checkbox-group direction="horizontal" v-model="renderData.shellColorLeft">
                      <van-checkbox name="1" shape="square">蓝色</van-checkbox>
                      <van-checkbox name="2" shape="square">肉色</van-checkbox>
                      <van-checkbox name="3" shape="square">透明</van-checkbox>
                      <van-checkbox name="4" shape="square">自定义</van-checkbox>
                    </van-checkbox-group>
                  </div>
                  <div class="row">
                    <span>面板颜色：</span>
                    <van-checkbox-group direction="horizontal" v-model="renderData.panelColorLeft">
                      <van-checkbox name="1" shape="square">肉色</van-checkbox>
                      <van-checkbox name="2" shape="square">褐色</van-checkbox>
                      <van-checkbox name="3" shape="square">灰色</van-checkbox>
                      <van-checkbox name="0" shape="square">自定义</van-checkbox>
                    </van-checkbox-group>
                  </div>
                </td>
                <td>
                  <div class="row">
                    <span>外壳颜色：</span>
                    <van-checkbox-group direction="horizontal" v-model="renderData.shellColorRight">
                      <van-checkbox name="1" shape="square">蓝色</van-checkbox>
                      <van-checkbox name="2" shape="square">肉色</van-checkbox>
                      <van-checkbox name="3" shape="square">透明</van-checkbox>
                      <van-checkbox name="4" shape="square">自定义</van-checkbox>
                    </van-checkbox-group>
                  </div>
                  <div class="row">
                    <span>面板颜色：</span>
                    <van-checkbox-group direction="horizontal" v-model="renderData.panelColorRight">
                      <van-checkbox name="1" shape="square">肉色</van-checkbox>
                      <van-checkbox name="2" shape="square">褐色</van-checkbox>
                      <van-checkbox name="3" shape="square">灰色</van-checkbox>
                      <van-checkbox name="0" shape="square">自定义</van-checkbox>
                    </van-checkbox-group>
                  </div>
                </td>
              </tr>
              <!-- 定制机第二栏 -->
              <tr>
                <td>
                  <!-- 第一行 -->
                  <div class="row-left-right">
                    <div class="left">
                      <span>过第二弯：</span>
                      <span>{{dataDictionary.secondBend[renderData.secondBendLeft]}}</span>
                    </div>
                    <div class="right">
                      <span>音量按钮：</span>
                      <span>{{dataDictionary.volumeButton[renderData.volumeButtonLeft]}}</span>
                    </div>
                  </div>
                  <!-- 第二行 -->
                  <div class="row-left-right">
                    <div class="left">
                      <span>程序开关：</span>
                      <span>{{dataDictionary.programSwitch[renderData.programSwitchLeft]}}</span>
                    </div>
                    <div class="right">
                      <span>拉线：</span>
                      <span>{{dataDictionary.wire[renderData.wireLeft]}}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <!-- 第一行 -->
                  <div class="row-left-right">
                    <div class="left">
                      <span>过第二弯：</span>
                      <span>{{dataDictionary.secondBend[renderData.secondBendRight]}}</span>
                    </div>
                    <div class="right">
                      <span>音量按钮：</span>
                      <span>{{dataDictionary.volumeButton[renderData.volumeButtonRight]}}</span>
                    </div>
                  </div>
                  <!-- 第二行 -->
                  <div class="row-left-right">
                    <div class="left">
                      <span>程序开关：</span>
                      <span>{{dataDictionary.programSwitch[renderData.programSwitchRight]}}</span>
                    </div>
                    <div class="right">
                      <span>拉线：</span>
                      <span>{{dataDictionary.wire[renderData.wireRight]}}</span>
                    </div>
                  </div>
                </td>
              </tr>
              <!-- 定制机第三栏 -->
              <tr>
                <td>
                  <div class="row-left-right">
                    <div class="left">
                      <span>防尘方式：</span>
                      <span>{{dataDictionary.dustProof[renderData.dustProofLeft]}}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="row-left-right">
                    <div class="left">
                      <span>防尘方式：</span>
                      <span>{{dataDictionary.dustProof[renderData.dustProofRight]}}</span>
                    </div>
                  </div>
                </td>
              </tr>
              <!-- 受话器外壳 -->
              <tr>
                <td>RIC受话器外壳</td>
                <td>
                  <div class="row-left-right">
                    <div class="left">
                      <span>受话器长度：</span>
                      <span>{{dataDictionary.receiver[renderData.receiverLeft]}}</span>
                    </div>
                    <div class="right">
                      <span>外壳拉线：</span>
                      <span>{{dataDictionary.wireShell[renderData.wireShellLeft]}}</span>
                    </div>
                  </div>
                  <div class="row-left-right">
                    <div class="left">
                      <span>是否封闭：</span>
                      <span>{{dataDictionary.close[renderData.closeLeft]}}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="row-left-right">
                    <div class="left">
                      <span>受话器长度：</span>
                      <span>{{dataDictionary.receiver[renderData.receiverRight]}}</span>
                    </div>
                    <div class="right">
                      <span>拉线：</span>
                      <span>{{dataDictionary.wireShell[renderData.wireShellRight]}}</span>
                    </div>
                  </div>
                  <div class="row-left-right">
                    <div class="left">
                      <span>是否封闭：</span>
                      <span>{{dataDictionary.close[renderData.closeRight]}}</span>
                    </div>
                  </div>
                </td>
              </tr>
              <!-- 耳膜 -->
              <tr>
                <td rowspan="2">耳膜</td>
                <!-- 耳膜1栏 -->
                <td>
                  <div class="row-left-right">
                    <div class="left">
                      <span>材质：</span>
                      <span>{{dataDictionary.material[renderData.materialLeft]}}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="row-left-right">
                    <div class="left">
                      <span>材质：</span>
                      <span>{{dataDictionary.material[renderData.materialRight]}}</span>
                    </div>
                  </div>
                </td>
              </tr>
              <!-- 耳膜二栏 -->
              <tr>
                <td>
                  <div class="row-left-right">
                    <div class="left">
                      <span>声学：</span>
                      <span>{{dataDictionary.acoustics[renderData.acousticsLeft]}}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="row-left-right">
                    <div class="left">
                      <span>声学：</span>
                      <span>{{dataDictionary.acoustics[renderData.acousticsRight]}}</span>
                    </div>
                  </div>
                </td>
              </tr>
              <!-- 通气孔 -->
              <tr>
                <td>通气孔</td>
                <td>
                  <div class="row-left-right">
                    <div class="left">
                      <span>直径（mm）：</span>
                      <span>{{dataDictionary.diameter[renderData.diameterLeft]}}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="row-left-right">
                    <div class="left">
                      <span>直径（mm）：</span>
                      <span>{{dataDictionary.diameter[renderData.diameterRight]}}</span>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>

          <!-- 电子声、远场聆听方案 -->
          <div class="chunk-label">三、电子声、远场聆听方案</div>
          <div class="chunk-content">
            <table class="table">
              <!-- 类型 -->
              <tr>
                <td>类型</td>
                <td colspan="7">
                  <van-checkbox-group direction="horizontal" v-model="renderData.listenType">
                    <van-checkbox name="1" shape="square">手机伴侣</van-checkbox>
                    <van-checkbox name="2" shape="square">电视伴侣系列</van-checkbox>
                    <van-checkbox name="3" shape="square">蓝牙麦克风系列</van-checkbox>
                    <van-checkbox name="4" shape="square">遥控器系列</van-checkbox>
                    <van-checkbox name="5" shape="square">FM系列</van-checkbox>
                    <van-checkbox name="6" shape="square">耳鸣系列</van-checkbox>
                  </van-checkbox-group>
                </td>
              </tr>
              <!-- 品名 -->
              <tr>
                <td class="babel-fixed-wdith">品名</td>
                <!-- {{ renderData.listenProduct }} -->
                <td class="null-fixed-width">{{renderData.listenProduct}}</td>
                <td class="babel-fixed-wdith">品牌</td>
                <td class="null-fixed-width">{{renderData.listenBrand}}</td>
                <td class="babel-fixed-wdith">型号</td>
                <td class="null-fixed-width">{{renderData.listenModel}}</td>
                <td class="babel-fixed-wdith">数量</td>
                <td class="null-fixed-width">{{renderData.listenNum}}</td>
              </tr>
            </table>
          </div>

          <!-- 零附件耗材 -->
          <div class="chunk-label">四、零附件耗材</div>
          <div class="chunk-content">
            <table class="table">
              <!-- 耳保健 -->
              <tr>
                <td>耳保健</td>
                <td colspan="7">
                  <van-checkbox-group direction="horizontal" v-model="renderData.earCare">
                    <!-- <van-checkbox-group direction="horizontal"> -->
                    <van-checkbox name="1" shape="square">耳保健套装</van-checkbox>
                    <van-checkbox name="2" shape="square">耳道清洁喷雾</van-checkbox>
                    <van-checkbox name="3" shape="square">幼儿耳道清洁液</van-checkbox>
                    <van-checkbox name="4" shape="square">清洁消毒喷雾</van-checkbox>
                    <van-checkbox name="5" shape="square">维E乳</van-checkbox>
                    <van-checkbox name="6" shape="square">防噪音耳塞</van-checkbox>
                    <van-checkbox name="7" shape="square">耳光笔</van-checkbox>
                  </van-checkbox-group>
                </td>
              </tr>
              <!-- 助听器护理 -->
              <tr>
                <td>助听器护理</td>
                <td colspan="7">
                  <div class="row">
                    <van-checkbox-group direction="horizontal" v-model="renderData.aidAcceptance">
                      <!-- <van-checkbox-group direction="horizontal"> -->
                      <van-checkbox name="1" shape="square">测电仪</van-checkbox>
                      <van-checkbox name="2" shape="square">吹气球</van-checkbox>
                      <van-checkbox name="3" shape="square">小刷子</van-checkbox>
                      <van-checkbox name="4" shape="square">通气杆</van-checkbox>
                      <van-checkbox name="5" shape="square">小改锥</van-checkbox>
                      <van-checkbox name="6" shape="square">电耳镜</van-checkbox>
                      <van-checkbox name="7" shape="square">双耳听筒</van-checkbox>
                      <van-checkbox name="8" shape="square">耳背机挂绳</van-checkbox>
                      <van-checkbox name="9" shape="square">电子干燥器</van-checkbox>
                      <van-checkbox name="10" shape="square">助听器盒子</van-checkbox>
                      <van-checkbox name="11" shape="square">干燥盒</van-checkbox>
                      <van-checkbox name="12" shape="square">干燥剂</van-checkbox>
                      <van-checkbox name="13" shape="square">助听器护理套装</van-checkbox>
                    </van-checkbox-group>
                  </div>
                </td>
              </tr>
              <!-- 配件及耗材 -->
              <tr>
                <td>配件及耗材</td>
                <td colspan="7">
                  <div class="row">
                    <van-checkbox-group direction="horizontal" v-model="renderData.parts">
                      <!-- <van-checkbox-group direction="horizontal"> -->
                      <van-checkbox name="1" shape="square">耳钩</van-checkbox>
                      <van-checkbox name="2" shape="square">受话器</van-checkbox>
                      <van-checkbox name="3" shape="square">细声管</van-checkbox>
                      <van-checkbox name="4" shape="square">耳机头</van-checkbox>
                      <van-checkbox name="5" shape="square">导线</van-checkbox>
                    </van-checkbox-group>
                  </div>
                  <div class="row">
                    <van-checkbox-group
                      direction="horizontal"
                      v-model="renderData.consumablesPrice"
                    >
                      <van-checkbox name="1" shape="square">电池</van-checkbox>
                      <van-checkbox name="2" shape="square">耵聍罩</van-checkbox>
                      <van-checkbox name="3" shape="square">防尘条（短）</van-checkbox>
                      <van-checkbox name="4" shape="square">防尘条（长）</van-checkbox>
                      <van-checkbox name="5" shape="square">三件套</van-checkbox>
                      <van-checkbox name="6" shape="square">耳塞</van-checkbox>
                    </van-checkbox-group>
                  </div>
                </td>
              </tr>
              <!-- 品名 -->
              <tr>
                <td class="babel-fixed-wdith">品名</td>
                <td class="null-fixed-width">{{renderData.partProduct}}</td>
                <td class="babel-fixed-wdith">品牌</td>
                <td class="null-fixed-width">{{renderData.partBrand}}</td>
                <td class="babel-fixed-wdith">型号</td>
                <td class="null-fixed-width">{{renderData.partModel}}</td>
                <td class="babel-fixed-wdith">品名</td>
                <td>{{renderData.partNum}}</td>
              </tr>
            </table>
          </div>

          <!-- 底部表格 -->
          <div class="chunk-label"></div>
          <div class="chunk-content">
            <table class="table">
              <tr>
                <td>
                  <div class="column">
                    <span>耳道与耳廊情况备注：</span>
                    <van-checkbox-group direction="horizontal" v-model="renderData.earRemark">
                      <!-- <van-checkbox-group direction="horizontal"> -->
                      <van-checkbox name="1" shape="square">耳廊偏硬</van-checkbox>
                      <van-checkbox name="2" shape="square">耳道畸形</van-checkbox>
                      <van-checkbox name="3" shape="square">耳道皮肤松弛</van-checkbox>
                      <van-checkbox name="4" shape="square">耳科手术</van-checkbox>
                      <van-checkbox name="5" shape="square">耳道炎症</van-checkbox>
                      <van-checkbox name="6" shape="square">耳道内壁敏感</van-checkbox>
                      <van-checkbox name="7" shape="square">耵聍过多</van-checkbox>
                      <van-checkbox name="8" shape="square">油性耳垢</van-checkbox>
                      <van-checkbox name="9" shape="square">鼓膜穿透（干）</van-checkbox>
                      <van-checkbox name="10" shape="square">中耳炎</van-checkbox>
                      <van-checkbox name="11" shape="square">其他</van-checkbox>
                    </van-checkbox-group>
                  </div>
                </td>
                <td>
                  <div class="column">
                    <span>历史助听器备注：</span>
                    <textarea cols="30" v-model="renderData.aidHistoryRemark"></textarea>
                  </div>
                </td>
                <td>
                  <div class="column">
                    <span>订单备注：</span>
                    <textarea cols="30" v-model="renderData.orderRemark"></textarea>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <!-- 底部签字部分 -->
      <div class="fixed_bottom">
        <div class="user-sign">
          <div>取机日期：</div>
          <div class="line">{{renderData.takeTime}}</div>
          <div>订单金额:</div>
          <div class="line">{{renderData.money}}</div>
          <div>审核人:</div>
          <!-- {{ renderData.matcherName?'无':renderData.matcherName }} -->
          <div class="line"></div>
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
        patientNum: null,
        updatetime: null,
      },
      // 当前时间
      nowdatetime: new Date()
        .toLocaleString()
        .replace(/\//g, "-")
        .substring(
          0,
          new Date().toLocaleString().replace(/\//g, "-").indexOf(" ")
        ),
      renderData: {
        shellColorLeft: [],
        panelColorLeft: [],
        shellColorRight: [],
        panelColorRight: [],
        listenType: [],
        earCare: [],
        aidAcceptance: [],
        parts: [],
        consumablesPrice: [],
        earRemark: [],
      },
      hearingData: {},
      keyList: [
        "diameter",
        "ventilation",
        "material",
        "close",
        "wireShell",
        "receiver",
        "wire",
        "programSwitch",
        "volumeButton",
        "secondBend",
        "color",
        "code",
        "guarantee",
        "type",
        "brand",
        "series",
        "acoustics",
        "dustProof",
        "model",
        "power",
        "type",
      ],
      dataDictionary: {
        diameter: {},
        ventilation: {},
        material: {},
        close: {},
        wireShell: {},
        receiver: {},
        wire: {},
        programSwitch: {},
        volumeButton: {},
        secondBend: {},
        color: {},
        code: {},
        guarantee: {},
        type: {},
        brand: {},
        series: {},
        acoustics: {},
        dustProof: {},
        model: {},
        power: {},
        type: {},
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

    for (let index = 0; index < this.keyList.length; index++) {
      await this.getValueByKey(this.keyList[index]);
    }
    // this.keyList.forEach((el) => {
    //   this.getValueByKey(el);
    // });

    this.getData();
  },
  methods: {
    //获取所有数据
    getData() {
      // contract/eardrumInfo
      api
        .postFormAPI("contract/eardrumInfo", {
          recordId: localStorage.getItem("recordId"),
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.result != 1) {
            return;
          }
          let renderData = res.data.data;
          for (let i in res.data.data) {
            if (res.data.data[i] === null) {
              renderData[i] = "";
            }
          }
          for (const key in this.renderData) {
            renderData[key]
              ? (renderData[key] = renderData[key].split(","))
              : "";
          }
          this.renderData = renderData;
        });
    },
    //数据字典查询值
    getValueByKey(key) {
      api
        .postFormAPI("common/getChildByKey", {
          key: key,
        })
        .then((res) => {
          if (res.data.result == "1") {
            let data = res.data.data;
            let obj = {};
            for (const index in data) {
              obj[data[index].id] = data[index].title;
            }
            this.dataDictionary[key] = obj;
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.customReport {
  color: #212121;
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
      width: 100%;
      box-sizing: border-box;
      padding: 14px 0 0 1em;
      line-height: 26px;
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      .flex-grow {
        display: flex;
        flex-grow: 1;
      }
    }
    .chunk-label {
      font-weight: bold;
    }
    .table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
      th,
      td {
        font-weight: unset;
        text-align: center;
        border: 1px solid #212121;
        padding: 4px 0;
        .top,
        .bottom {
          display: flex;
          justify-content: space-between;
          padding: 0 10px 0 10px;
        }
        .bottom {
          left: 0;
        }
        .row {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
        }
        .row-left-right {
          display: flex;
          justify-content: space-between;
          .left,
          .right {
            display: flex;
          }
          .left {
            .van-checkbox-group {
              flex: 1;
            }
          }
        }
        .column {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .van-checkbox-group {
            flex: 1;
          }
          span {
            text-align: left;
          }
          textarea {
            flex-shrink: 1;
            border: 0;
            text-align: left;
            resize: none;
          }
        }
      }
      th:nth-child(1) {
        width: 50px;
      }
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
  .fixed_bottom {
    width: 100%;
  }
  .van-checkbox-group {
    margin-left: 10px;
    display: flex;
    .van-checkbox {
      display: flex;
    }
  }
}
.column-center {
  // position: relative;
  top: -20px;
}
/deep/ .van-checkbox__icon {
  font-size: 10px;
}
.babel-fixed-wdith {
  width: 80px;
}
.null-fixed-width {
  width: 100px;
}
.my-line {
  width: 50px;
  border-bottom: 1px solid #212121;
  margin-right: 20px;
}
</style>
