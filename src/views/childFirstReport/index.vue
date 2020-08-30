<template>
  <div class="childFirstReport">
    <div class="contain">
      <div class="header">
        <img class="img" src="../../assets/image/logo@2x.png" />
        <div class="slogan">{{slogan}}</div>
      </div>

      <div class="header-title">
        <div class="title">首诊病例</div>
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
          <div class="flex" v-for="(item,index) in family" :key="index">
            <div v-if="relationships[item.relation]">{{relationships[item.relation]}}姓名：</div>
            <div class="span">{{item.truename}}</div>
            <div>工作单位：</div>
            <div class="span flex-grow">{{item.company}}</div>
            <div>联系电话：</div>
            <div class="span flex-grow">{{item.phone}}</div>
          </div>
          <div class="flex">
            <div>户口地址：</div>
            <div class="span flex-grow">
              <span v-if="areaFlag">{{userInfo.area}}，</span>
              <span>{{userInfo.address}}</span>
            </div>
          </div>
        </div>
        <div class="chunk">
          <div class="chunk-label">一、现病史</div>
          <div class="chunk-content">
            <div>1、发现听损年龄：</div>
            <van-checkbox-group v-model="hpi.childrenFindTime" direction="horizontal" disabled>
              <van-checkbox name="1" shape="square">&lt;3月</van-checkbox>
              <van-checkbox name="2" shape="square">6月-1岁</van-checkbox>
              <van-checkbox name="3" shape="square">3岁-6岁</van-checkbox>
              <van-checkbox name="4" shape="square">6岁以上</van-checkbox>
            </van-checkbox-group>
          </div>
          <div class="chunk-content">
            <div>2、听力残疾等级(听力损失dB)：</div>
            <div class="checkbox-grow">
              <van-checkbox-group
                v-model="hpi.childrenDisabilityLevel"
                direction="horizontal"
                disabled
              >
                <van-checkbox name="1" shape="square">一级聋(听力损失&gt;91dB)</van-checkbox>
                <van-checkbox name="2" shape="square">二级聋(听力损失71-90dB)</van-checkbox>
                <van-checkbox name="3" shape="square">一级重听(听力损失56-70dB)</van-checkbox>
                <van-checkbox name="4" shape="square">二级重听(听力损失40-55dB)</van-checkbox>
                <van-checkbox name="5" shape="square">听力未查</van-checkbox>
                <van-checkbox name="6" shape="square">
                  其他
                  <div class="span flex-grow">{{hpi.childrenDisabilityLevelTitle}}</div>
                </van-checkbox>
              </van-checkbox-group>
            </div>
          </div>
          <div class="chunk-content">
            <div>3、语训前语言能力：</div>
            <van-checkbox-group
              v-model="hpi.childrenLanguageAbility"
              direction="horizontal"
              disabled
            >
              <van-checkbox name="1" shape="square">不会说话</van-checkbox>
              <van-checkbox name="2" shape="square">只会说几个单词</van-checkbox>
              <van-checkbox name="3" shape="square">只会说少数短句</van-checkbox>
              <van-checkbox name="4" shape="square">基本能交谈但语音不清</van-checkbox>
            </van-checkbox-group>
          </div>
        </div>
        <div class="chunk">
          <div class="chunk-label">二、既往史</div>
          <div class="chunk-content">
            <div>1、妊娠史</div>
            <div class="chunk-content">
              <div>①怀孕期间是否有受到病毒感染：</div>
              <div class="checkbox-grow">
                <van-checkbox-group v-model="ph.pregnantIsInfected" direction="horizontal" disabled>
                  <van-checkbox name="0" shape="square">否</van-checkbox>
                  <van-checkbox name="2" shape="square">不确定</van-checkbox>
                  <van-checkbox name="1" shape="square">
                    是，发生于孕期第
                    <div class="span">{{ph.pregnantInfectedWeek}}</div>
                    <div>周</div>
                  </van-checkbox>
                </van-checkbox-group>
              </div>
            </div>
            <div class="chunk-content">
              <div>②若是，受何种病毒感染：</div>
              <div class="checkbox-grow flex-grow">
                <van-checkbox-group
                  v-model="ph.pregnantInfectedVirus"
                  direction="horizontal"
                  disabled
                >
                  <van-checkbox name="1" shape="square">巨细胞病毒</van-checkbox>
                  <van-checkbox name="2" shape="square">疱疹病毒</van-checkbox>
                  <van-checkbox name="3" shape="square">麻疹</van-checkbox>
                  <van-checkbox name="4" shape="square">水痘</van-checkbox>
                  <van-checkbox name="5" shape="square">弓形体</van-checkbox>
                  <van-checkbox name="6" shape="square">
                    其他
                    <div class="span flex-grow">{{ph.pregnantInfectedVirusTitle}}</div>
                  </van-checkbox>
                </van-checkbox-group>
              </div>
            </div>
            <div class="chunk-content">
              <div>③孕期中曾经口服药物：</div>
              <div class="checkbox-grow flex-grow">
                <van-checkbox-group v-model="ph.pregnantMedicine" direction="horizontal" disabled>
                  <van-checkbox name="1" shape="square">抽烟</van-checkbox>
                  <van-checkbox name="2" shape="square">喝酒</van-checkbox>
                  <van-checkbox name="3" shape="square">中药</van-checkbox>
                  <van-checkbox name="4" shape="square">
                    其他说明：
                    <div class="span flex-grow">{{ph.pregnantMedicineTitle}}</div>
                  </van-checkbox>
                </van-checkbox-group>
              </div>
            </div>
            <div class="chunk-content">
              <div>④是否有以下症状：</div>
              <div class="checkbox-grow flex-grow">
                <van-checkbox-group v-model="ph.otherSymptom" direction="horizontal" disabled>
                  <van-checkbox name="1" shape="square">妊娠病血症</van-checkbox>
                  <van-checkbox name="2" shape="square">妊娠高血压</van-checkbox>
                  <van-checkbox name="3" shape="square">
                    其他说明：
                    <div class="span flex-grow">{{ph.otherSymptomTitle}}</div>
                  </van-checkbox>
                </van-checkbox-group>
              </div>
            </div>
          </div>
          <div class="chunk-content">
            <div>2、出生记录</div>
            <div class="chunk-content">
              <div>①怀孕周数</div>
              <div class="span">{{ph.pregnancyWeek}}</div>
              <div>周，出生体重</div>
              <div class="span">{{ph.birthWeight}}</div>
              <div>KG</div>
            </div>
            <div class="chunk-content">
              <div>②产程中是否使用产钳或真空吸引器，是否有吸氧：</div>
              <div class="checkbox-grow">
                <van-checkbox-group v-model="ph.isOxygen" direction="horizontal" disabled>
                  <van-checkbox name="0" shape="square">否</van-checkbox>
                  <van-checkbox name="1" shape="square">
                    是，
                    <div>说明：</div>
                    <div class="span">{{ph.isOxygenTitle}}</div>
                  </van-checkbox>
                </van-checkbox-group>
              </div>
            </div>
            <div class="chunk-content">
              <div>③产期缺氧：</div>
              <div class="checkbox-grow">
                <van-checkbox-group v-model="ph.isHypoxia" direction="horizontal" disabled>
                  <van-checkbox name="2" shape="square">否</van-checkbox>
                  <van-checkbox name="1" shape="square">是</van-checkbox>
                </van-checkbox-group>
              </div>
            </div>
            <div class="chunk-content">
              <div>④是否有过新生儿特护病房(NICU)：</div>
              <div class="checkbox-grow">
                <van-checkbox-group v-model="ph.isNICU" direction="horizontal" disabled>
                  <van-checkbox name="0" shape="square">否</van-checkbox>
                  <van-checkbox name="1" shape="square">
                    是，住
                    <div class="span">{{ph.isNICUDay}}</div>
                    <div>天，原因</div>
                    <div class="span">{{ph.isNICUreason}}</div>
                  </van-checkbox>
                </van-checkbox-group>
              </div>
            </div>
            <div class="chunk-content">
              <div>⑤婴儿出生是否黄疸：</div>
              <van-checkbox-group v-model="ph.isJaundice" direction="horizontal" disabled>
                <van-checkbox name="0" shape="square">否</van-checkbox>
                <van-checkbox name="1" shape="square">是</van-checkbox>
              </van-checkbox-group>
              <div>住</div>
              <div class="span">{{ph.JaundiceDay}}</div>
              <div>天，出现，需要</div>
              <div class="span">{{ph.JaundiceIsIllumination}}</div>
              <div>照光</div>
              <div class="span">{{ph.JaundiceIlluminationDay}}</div>
              <div>天，</div>
              <div class="span">{{ph.JaundiceExchangeBlood}}</div>
              <div>换血说明</div>
              <div class="span flex-grow">{{ph.JaundiceExchangeBloodDetail}}</div>
            </div>
          </div>
          <div class="chunk-content">
            <div>3、家族记录</div>
            <div class="chunk-content">
              <div>①家族成员中是否有听障：</div>
              <div class="checkbox-grow">
                <van-checkbox-group v-model="ph.hasFamilyOtopathy" direction="horizontal" disabled>
                  <van-checkbox name="0" shape="square">无</van-checkbox>
                  <van-checkbox name="1" shape="square">
                    有，
                    <div
                      v-if="relationships[ph.familyOtopathyRelation]"
                    >谁：{{relationships[ph.familyOtopathyRelation]}}</div>
                    <div v-else>谁：</div>
                  </van-checkbox>
                </van-checkbox-group>
              </div>
            </div>
            <div class="chunk-content">
              <div>②后天性耳聋高危因素：</div>
              <van-checkbox-group v-model="ph.acquiredFactors" direction="horizontal" disabled>
                <van-checkbox name="1" shape="square">高烧</van-checkbox>
                <van-checkbox name="2" shape="square">中耳炎</van-checkbox>
                <van-checkbox name="3" shape="square">使用耳聋性药物</van-checkbox>
                <van-checkbox name="4" shape="square">流行性传染病</van-checkbox>
                <van-checkbox name="5" shape="square">产伤</van-checkbox>
                <van-checkbox name="6" shape="square">严重头部外伤</van-checkbox>
                <van-checkbox name="7" shape="square">噪音性</van-checkbox>
                <van-checkbox name="8" shape="square">其他</van-checkbox>
                <van-checkbox name="9" shape="square">先天性</van-checkbox>
              </van-checkbox-group>
            </div>
            <div class="chunk-content">
              <div>③耳聋基因检测结果：</div>
              <van-checkbox-group v-model="ph.geneResults" direction="horizontal" disabled>
                <van-checkbox name="1" shape="square">GJB2</van-checkbox>
                <van-checkbox name="2" shape="square">GJB3</van-checkbox>
                <van-checkbox name="3" shape="square">12SrRNA</van-checkbox>
                <van-checkbox name="4" shape="square">SLCA4</van-checkbox>
                <van-checkbox name="5" shape="square">未查</van-checkbox>
                <van-checkbox name="6" shape="square">其他</van-checkbox>
                <van-checkbox name="7" shape="square">纯和突变</van-checkbox>
                <van-checkbox name="8" shape="square">杂合突变</van-checkbox>
                <van-checkbox name="9" shape="square">正常(野生型)</van-checkbox>
              </van-checkbox-group>
            </div>
            <div class="chunk-content">
              <div>④内耳形态评估：HR-CT</div>
              <div class="span flex-grow">{{ph.HRCT}}</div>
              <div>，HR-MRJ</div>
              <div class="span flex-grow">{{ph.HRMRJ}}</div>
            </div>
          </div>
        </div>
        <div class="chunk">
          <div class="chunk-label">三、听力康复史：</div>
          <div class="chunk-content">
            <div>1、历史检查报告记录(纯音测听/声阻抗/OAE/ABR等，就诊时间/就诊单位/检查项目/检查结果)：</div>
            <div class="chunk-content">
              <div class="span flex-grow" v-for="(item, index) in historyList" :key="item.id">{{index+1}}.测听类型：{{item.type}}，就诊时间：{{item.checkTime}}，就诊单位：{{item.organization}}，检查内容：{{item.content}}，检查结果：{{item.result}}</div>
            </div>
          </div>
          <div class="chunk-content">
            <div>2、助听器/人工耳蜗佩戴史：</div>
            <div>首次佩戴时间：</div>
            <div class="span">{{hearrebuildHistory.firstWearTime}}</div>
            <div>，历史拥有助听器：</div>
            <div class="span">{{hearrebuildHistory.audiphoneCount}}</div>
            <div>台。</div>
            <div class="chunk-content">
              <table class="table">
                <tr>
                  <th></th>
                  <th>验配时间</th>
                  <th>类型</th>
                  <th>品牌</th>
                  <th>型号</th>
                  <th>价格</th>
                  <th>使用时长</th>
                  <th>满意程度</th>
                  <th>有无过敏</th>
                </tr>
                <tr>
                  <td>左</td>
                  <td>{{hearrebuildHistory.leftMatchingTime=="0"?"":hearrebuildHistory.leftMatchingTime}}</td>
                  <td>
                    <div
                      v-if="appearances[hearrebuildHistory.leftAppearanceType]"
                    >{{appearances[hearrebuildHistory.leftAppearanceType]}}</div>
                  </td>
                  <td>
                    <div
                      v-if="brands[hearrebuildHistory.leftBrand] "
                    >{{brands[hearrebuildHistory.leftBrand]}}</div>
                  </td>
                  <td>
                    <div
                      v-if="models[hearrebuildHistory.leftModel]"
                    >{{models[hearrebuildHistory.leftModel]}}</div>
                  </td>
                  <td>{{hearrebuildHistory.leftPrice}}</td>
                  <td>{{leftWearTime[hearrebuildHistory.leftWearTime]}}</td>
                  <td>{{leftSatisfied[hearrebuildHistory.leftSatisfied]}}</td>
                  <td>{{leftIsAllergy[hearrebuildHistory.leftIsAllergy]}}</td>
                </tr>
                <tr>
                  <td>右</td>
                  <td>{{hearrebuildHistory.rightMatchingTime=="0"?"":hearrebuildHistory.rightMatchingTime}}</td>
                  <td>
                    <div
                      v-if="appearances[hearrebuildHistory.rightAppearanceType]"
                    >{{appearances[hearrebuildHistory.rightAppearanceType]}}</div>
                  </td>
                  <td>
                    <div
                      v-if="brands[hearrebuildHistory.rightBrand] "
                    >{{brands[hearrebuildHistory.rightBrand]}}</div>
                  </td>
                  <td>
                    <div
                      v-if="models[hearrebuildHistory.rightModel]"
                    >{{models[hearrebuildHistory.rightModel]}}</div>
                  </td>
                  <td>{{hearrebuildHistory.rightPrice}}</td>
                  <td>{{leftWearTime[hearrebuildHistory.rightWearTime]}}</td>
                  <td>{{leftSatisfied[hearrebuildHistory.rightSatisfied]}}</td>
                  <td>{{leftIsAllergy[hearrebuildHistory.rightIsAllergy]}}</td>
                </tr>
              </table>
            </div>
            <div class="chunk-content">
              <div>原有助听器不足：</div>
              <div class="checkbox-grow">
                <van-checkbox-group
                  v-model="hearrebuildHistory.audiphoneInsufficient"
                  direction="horizontal"
                >
                  <van-checkbox name="1" shape="square">嘈杂环境听不清</van-checkbox>
                  <van-checkbox name="2" shape="square">看电视听不清</van-checkbox>
                  <van-checkbox name="3" shape="square">打电话听不清</van-checkbox>
                  <van-checkbox name="4" shape="square">大声音不舒服</van-checkbox>
                  <van-checkbox name="5" shape="square">操作不方便</van-checkbox>
                  <van-checkbox name="6" shape="square">小声音听不清</van-checkbox>
                  <van-checkbox name="7" shape="square">啸叫</van-checkbox>
                  <van-checkbox name="8" shape="square">不易操作</van-checkbox>
                  <van-checkbox name="9" shape="square">不易操作</van-checkbox>
                  <van-checkbox name="10" shape="square">助听器老化</van-checkbox>
                  <van-checkbox name="11" shape="square">
                    美观问题，其他
                    <div class="span flex-grow">{{hearrebuildHistory.audiphoneInsufficientTitle}}</div>
                  </van-checkbox>
                </van-checkbox-group>
              </div>
            </div>
            <div class="chunk-content">
              <div>3、言语矫治史：</div>
              <div class="span flex-grow">{{hearrebuildHistory.speechCorrectionDetail}}</div>
            </div>
            <div class="chunk-content">
              <div>4、开始语训年龄：</div>
              <van-checkbox-group v-model="hearrebuildHistory.trainingAge" direction="horizontal">
                <van-checkbox name="1" shape="square">3岁以内</van-checkbox>
                <van-checkbox name="2" shape="square">3-6岁</van-checkbox>
                <van-checkbox name="3" shape="square">6岁以上</van-checkbox>
              </van-checkbox-group>
            </div>
            <div class="chunk-content">
              <div>5、语训时间：</div>
              <van-checkbox-group v-model="hearrebuildHistory.trainingTime" direction="horizontal">
                <van-checkbox name="1" shape="square">&lt;3月</van-checkbox>
                <van-checkbox name="2" shape="square">3-6个月</van-checkbox>
                <van-checkbox name="3" shape="square">6-12个月</van-checkbox>
                <van-checkbox name="4" shape="square">12-18个月</van-checkbox>
                <van-checkbox name="5" shape="square">18-24个月</van-checkbox>
                <van-checkbox name="6" shape="square">24-30个月</van-checkbox>
                <van-checkbox name="7" shape="square">30个月以上</van-checkbox>
              </van-checkbox-group>
            </div>
            <div class="chunk-content">
              <div>6、语训机构：</div>
              <van-checkbox-group
                v-model="hearrebuildHistory.trainingCompany"
                direction="horizontal"
              >
                <van-checkbox name="1" shape="square">省级中心</van-checkbox>
                <van-checkbox name="2" shape="square">地市级中心</van-checkbox>
                <van-checkbox name="3" shape="square">聋哑学校</van-checkbox>
                <van-checkbox name="4" shape="square">私立语训机构</van-checkbox>
                <van-checkbox name="5" shape="square">幼儿园</van-checkbox>
                <van-checkbox name="6" shape="square">福利院</van-checkbox>
                <van-checkbox name="7" shape="square">街道</van-checkbox>
                <van-checkbox name="8" shape="square">家庭</van-checkbox>
                <van-checkbox name="9" shape="square">其他</van-checkbox>
              </van-checkbox-group>
            </div>
            <div class="chunk-content">
              <div>7、康复评估：</div>
              <div class="span flex-grow">{{hearrebuildHistory.rehabilitationAssessment}}</div>
            </div>
            <div class="chunk-content">
              <div>8、语训后走向：</div>
              <van-checkbox-group
                v-model="hearrebuildHistory.trainingResult"
                direction="horizontal"
              >
                <van-checkbox name="1" shape="square">入普通小学</van-checkbox>
                <van-checkbox name="2" shape="square">入普通幼儿园</van-checkbox>
                <van-checkbox name="3" shape="square">入聋哑学校</van-checkbox>
                <van-checkbox name="4" shape="square">在家</van-checkbox>
              </van-checkbox-group>
            </div>
          </div>
        </div>
        <div class="chunk">
          <div class="chunk-label">四、观察所见：</div>
          <div class="chunk-content">
            <div class="mr-12">左：乳突</div>
            <div class="checkbox-grow flex-grow">
              <van-checkbox-group v-model="observations.leftMastoid" direction="horizontal">
                <van-checkbox name="1" shape="square">红肿</van-checkbox>
                <van-checkbox name="2" shape="square">压痛</van-checkbox>
                <van-checkbox name="3" shape="square">疤痕</van-checkbox>
                <div class="flex-grow">
                  <div>其他：</div>
                  <div class="span flex-grow">{{observations.leftMastoidDetail}}</div>
                </div>
              </van-checkbox-group>
            </div>
          </div>
          <div class="chunk-content">
            <div class="mr-12">左：耳廓</div>
            <div class="checkbox-grow flex-grow">
              <van-checkbox-group v-model="observations.leftAuricle" direction="horizontal">
                <van-checkbox name="1" shape="square">畸形</van-checkbox>
                <van-checkbox name="2" shape="square">瘘管</van-checkbox>
                <van-checkbox name="3" shape="square">皮疹</van-checkbox>
                <van-checkbox name="4" shape="square">糜烂</van-checkbox>
                <van-checkbox name="5" shape="square">红肿</van-checkbox>
                <van-checkbox name="6" shape="square">血肿</van-checkbox>
                <van-checkbox name="7" shape="square">压痛</van-checkbox>
                <van-checkbox name="8" shape="square">牵拉痛</van-checkbox>
                <van-checkbox name="9" shape="square">耳周围淋巴结肿大</van-checkbox>
                <div class="flex-grow">
                  <div>其他：</div>
                  <div class="span flex-grow">{{observations.leftAuricleDetail}}</div>
                </div>
              </van-checkbox-group>
            </div>
          </div>
          <div class="chunk-content">
            <div class="mr-12">右：乳突</div>
            <div class="checkbox-grow flex-grow">
              <van-checkbox-group v-model="observations.rightMastoid" direction="horizontal">
                <van-checkbox name="1" shape="square">红肿</van-checkbox>
                <van-checkbox name="2" shape="square">压痛</van-checkbox>
                <van-checkbox name="3" shape="square">疤痕</van-checkbox>
                <div class="flex-grow">
                  <div>其他：</div>
                  <div class="span flex-grow">{{observations.rightMastoidDetail}}</div>
                </div>
              </van-checkbox-group>
            </div>
          </div>
          <div class="chunk-content">
            <div class="mr-12">右：耳廓</div>
            <div class="checkbox-grow flex-grow">
              <van-checkbox-group v-model="observations.rightAuricle" direction="horizontal">
                <van-checkbox name="1" shape="square">畸形</van-checkbox>
                <van-checkbox name="2" shape="square">瘘管</van-checkbox>
                <van-checkbox name="3" shape="square">皮疹</van-checkbox>
                <van-checkbox name="4" shape="square">糜烂</van-checkbox>
                <van-checkbox name="5" shape="square">红肿</van-checkbox>
                <van-checkbox name="6" shape="square">血肿</van-checkbox>
                <van-checkbox name="7" shape="square">压痛</van-checkbox>
                <van-checkbox name="8" shape="square">牵拉痛</van-checkbox>
                <van-checkbox name="9" shape="square">耳周围淋巴结肿大</van-checkbox>
                <div class="flex-grow">
                  <div>其他：</div>
                  <div class="span flex-grow">{{observations.rightAuricleDetail}}</div>
                </div>
              </van-checkbox-group>
            </div>
          </div>
        </div>
        <div class="chunk">
          <div class="chunk-label">五、诊断提示：</div>
          <div class="chunk-content"></div>
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
import moment from "moment";

export default {
  data() {
    return {
      slogan: "用爱经营 用良心服务 用匠心成就 ",
      orgName: "",
      truename: "",
      areaFlag: false,
      userInfo: {
        patientNum: "",
        truename: "",
        sex: "",
        nation: "汉",
        updatetime: "",
        birthday: "",
        area: "",
        address: "",
      },
      // 当前时间
      nowdatetime: new Date()
        .toLocaleString()
        .replace(/\//g, "-")
        .substring(
          0,
          new Date().toLocaleString().replace(/\//g, "-").indexOf(" ")
        ),
      family: {},
      // 现病史
      hpi: {
        mainDetails: null,
        leftFindTime: [],
        rightFindTime: [],
        leftProcess: [],
        rightProcess: [],
        leftBigsound: [],
        rightBigsound: [],
        goodEar: [],
        leftEarache: null,
        rightEarache: null,
        leftTinnitus: null,
        rightTinnitus: null,
        leftFester: [],
        rightFester: [],
        leftFesterDense: [],
        rightFesterDense: [],
        leftFesterContinue: [],
        rightFesterContinue: [],
        leftFesterSmelly: [],
        rightFesterSmelly: [],
        isVertigo: [],
        isAbnormalgait: [],
        isUnsteadystanding: [],
        details: null,
        speakGrowth: null,
        clarity: null,
        talk: null,
        childrenFindTime: [],
        childrenDisabilityLevel: [],
        childrenDisabilityLevelTitle: null,
        childrenLanguageAbility: [],
      },
      // 既往史
      ph: {
        otopathy: [],
        otopathyTitle: null,
        operation: null,
        medicine: null,
        medicineReason: null,
        noise: [],
        noiseDetail: null,
        isleave: [],
        otherDeformity: [],
        otherDeformityTitle: null,
        hasFamilyOtopathy: [],
        familyOtopathyDetail: null,
        familyOtopathyRelation: null,
        familyOtopathyFindTime: null,
        acquiredFactors: [],
        geneResults: [],
        HRCT: null,
        HRMRJ: null,
        previousDiseases: [],
        previousDiseasesTitle: null,
        intellectualHealth: null,
        mentalHealth: null,
        chronicDisease: [],
        chronicDiseaseTitle: null,
        chronicDiseaseMedicine: null,
        allergies: [],
        allergiesTitle: null,
        implants: [],
        implantsTitle: null,
        live: [],
        liveTitle: null,
        smoke: [],
        drink: [],
        nomotion: null,
        nofood: null,
        pregnantIsInfected: [],
        pregnantInfectedWeek: null,
        pregnantMedicine: [],
        pregnantMedicineTitle: null,
        pregnantInfectedVirus: [],
        pregnantInfectedVirusTitle: null,
        otherSymptom: [],
        otherSymptomTitle: null,
        pregnancyWeek: null,
        birthWeight: null,
        isOxygen: [],
        isOxygenTitle: null,
        isHypoxia: [],
        isNICU: [],
        isNICUDay: null,
        isNICUreason: null,
        isJaundice: [],
        JaundiceDay: null,
        JaundiceIsIllumination: null,
        JaundiceIlluminationDay: null,
        JaundiceExchangeBlood: null,
        JaundiceExchangeBloodDetail: null,
      },
      // 听力康复史
      hearrebuildHistory: {
        firstWearTime: null,
        audiphoneCount: null,
        leftMatchingTime: null,
        rightMatchingTime: null,
        leftAppearanceType: null,
        rightAppearanceType: null,
        leftBrand: null,
        rightBrand: null,
        leftModel: null,
        rightModel: null,
        leftPrice: null,
        rightPrice: null,
        leftWearTime: null,
        rightWearTime: null,
        leftSatisfied: null,
        rightSatisfied: null,
        leftIsAllergy: null,
        rightIsAllergy: null,
        audiphoneInsufficient: [],
        audiphoneInsufficientTitle: null,
        isSpeechCorrection: [],
        speechCorrectionDetail: null,
        trainingAge: [],
        trainingTime: [],
        trainingCompany: [],
        rehabilitationAssessment: null,
        trainingResult: [],
      },
      // 观察所见
      observations: {
        height: null,
        weight: null,
        leftVision: null,
        rightVision: null,
        leftMastoid: [],
        leftMastoidDetail: null,
        rightMastoid: [],
        rightMastoidDetail: null,
        leftAuricle: [],
        leftAuricleDetail: null,
        rightAuricle: [],
        rightAuricleDetail: null,
      },
      // 历史结果录入
      historyList: [],
      relationships: {},
      appearances: {},
      brands: {},
      models: {},
      findTime: ["", "最近7天", "1个月", "3个月", "6个月", "1年"],
      leftProcess: ["", "渐进性", "突发性", "波动性"],
      leftWearTime: ["", "0-3个月", "3个月-1年", "一年以上"],
      leftSatisfied: ["", "不满意", "满意", "非常满意"],
      leftIsAllergy: ["无", "有"],
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
          this.orgName = data.matchTitle;
          this.truename = data.matcherName;
        }
        if (this.userInfo.area != "") {
          // 获取地址数组
          api
            .postFormAPI("common/getAreaTree", {
              sid: localStorage.getItem("sid"),
            })
            .then((res) => {
              if (res.data.result != 1) {
                return;
              }
              const areslist = res.data.data;
              const aresArr = this.userInfo.area.split(",");
              this.userInfo.area = "";
              this.userInfo.area = this.getAreaCode(
                areslist,
                aresArr,
                0,
                this.userInfo.area
              );
              this.areaFlag = true;
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));

    // 验配师信息
    api
      .postFormAPI("patientMatchRecord/getMatcherByRecordId", {
        recordId: localStorage.getItem("patientId"),
      })
      .then((res) => {
        if (res.data.result == "1") {
          this.orgName = res.data.data.orgName;
          this.truename = res.data.data.truename;
        }
        //数据处理
      })
      .catch((err) => console.log(err));

    // 获取患者关系数据字典
    this.getDicByKey("relationship");
    this.getDicByKey("appearance");
    this.getDicByKey("brand");
    this.getDicByKey("model");

    // 获取现病史
    api
      .postFormAPI("patientHpi/getInfo", {
        recordId: localStorage.getItem("recordId"),
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result != 1) {
          return;
        }
        const data = res.data.data;
        for (const key in this.hpi) {
          if (data.hasOwnProperty(key)) {
            switch (key) {
              case "leftFindTime":
              case "rightFindTime":
              case "leftProcess":
              case "rightProcess":
              case "leftBigsound":
              case "rightBigsound":
              case "goodEar":
              case "leftFester":
              case "rightFester":
              case "rightFester":
              case "leftFesterDense":
              case "rightFesterDense":
              case "leftFesterContinue":
              case "rightFesterContinue":
              case "leftFesterSmelly":
              case "rightFesterSmelly":
              case "isVertigo":
              case "isAbnormalgait":
              case "isUnsteadystanding":
              case "childrenFindTime":
              case "childrenDisabilityLevel":
              case "childrenLanguageAbility":
                {
                  data[key] = data[key].split(",");
                }
                break;
            }
            this.hpi[key] = data[key];
          }
        }
      })
      .catch((err) => console.log(err));

    // 获取既往史
    api
      .postFormAPI("patientPh/getInfo", {
        recordId: localStorage.getItem("recordId"),
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result != 1) {
          return;
        }
        const data = res.data.data;
        for (let key in this.ph) {
          if (data.hasOwnProperty(key)) {
            if (Array.isArray(this.ph[key])) {
              data[key] = data[key].split(",");
              if (data[key].length > 0) {
                if (data[key][0] == "") {
                  data[key].slice(0);
                }
              }
            }
            this.ph[key] = data[key];
          }
        }
        //数据处理
      })
      .catch((err) => console.log(err));

    // 获取听力康复史
    api
      .postFormAPI("patientHearrebuildHistory/getInfo", {
        recordId: localStorage.getItem("recordId"),
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result != 1) {
          return;
        }
        const data = res.data.data;

        for (const key in this.hearrebuildHistory) {
          if (data.hasOwnProperty(key)) {
            switch (key) {
              case "leftWearTime":
              case "rightWearTime":
              case "leftSatisfied":
              case "rightSatisfied":
              case "leftIsAllergy":
              case "rightIsAllergy":
              case "audiphoneInsufficient":
              case "isSpeechCorrection":
              case "trainingAge":
              case "trainingTime":
              case "trainingCompany":
              case "trainingResult":
                {
                  data[key] = data[key].split(",");
                }
                break;
            }
            this.hearrebuildHistory[key] = data[key];
          }
        }
        //数据处理
      })
      .catch((err) => console.log(err));

    // 获取观察所见
    api
      .postFormAPI("patientObservations/getInfo", {
        recordId: localStorage.getItem("recordId"),
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result != 1) {
          return;
        }
        const data = res.data.data;
        for (const key in this.observations) {
          if (data.hasOwnProperty(key)) {
            switch (key) {
              case "leftMastoid":
              case "rightMastoid":
              case "leftAuricle":
              case "rightAuricle":
                {
                  data[key] = data[key].split(",");
                }
                break;
            }
            this.observations[key] = data[key];
          }
        }
        //数据处理
      })
      .catch((err) => console.log(err));

    //获取家庭背景信息
    api
      .postFormAPI("patientFamily/getInfo", {
        patientId: localStorage.getItem("patientId"),
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result != 1) {
          return;
        }
        this.family = res.data.data;
        //数据处理
      })
      .catch((err) => console.log(err));
    
    // 历史结果录入列表
    api
      .postFormAPI("patientHistory/index", {
        sid: localStorage.getItem("sid"),
        recordId: localStorage.getItem("recordId"),
      })
      .then((res) => {
        if (res.data.result != 1) {
          return;
        }
        this.historyList = res.data.data;
        //数据处理
      })
      .catch((err) => console.log(err));
  },
  methods: {
    // 获取数据字典
    getDicByKey(e) {
      api
        .postFormAPI("common/getDicByKey", {
          key: e,
        })
        .then((res) => {
          if (res.data.result == "1") {
            const data = res.data.data;
            data.forEach((item) => {
              this.$set(this[e + "s"], item.key, item.value);
            });
          }
        })
        .catch((err) => console.log(err));
    },

    // 地址编码转换成中文
    getAreaCode(areslist, aresArr, index, str) {
      if (index == aresArr.length) {
        return str;
      }
      for (let i = 0; i < areslist.length; i++) {
        if (aresArr[index] == areslist[i].area_code) {
          if (index == 0) {
            str += areslist[i].area_name;
          } else {
            str = str + "-" + areslist[i].area_name;
          }
          str = this.getAreaCode(areslist[i].children, aresArr, index + 1, str);
          return str;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.childFirstReport {
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
    .button {
      display: flex;
      position: absolute;
      top: 0;
      right: 30px;
      .print {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 82px;
        height: 34px;
        background: #f1f1f1;
        border-radius: 18px;
        margin-right: 14px;
        img {
          width: 14px;
          height: 14px;
        }
        span {
          width: 28px;
          height: 18px;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 18px;
          color: #333;
          padding-left: 4px;
        }
      }
      .close {
        width: 34px;
        height: 34px;
        background: #f1f1f1 url("../../assets/image/tanchu_close@2x.png")
          no-repeat;
        background-size: 14px 14px;
        background-position: center center;
        border-radius: 50%;
      }
    }
  }
  .report-wrapper {
    margin: 0 30px;
    margin-top: 20px;
    .chunk {
      margin-bottom: 26px;
      display: flex;
      flex-direction: column;
    }
    .chunk-content {
      width: 100%;
      box-sizing: border-box;
      padding: 14px 0 0 1em;
      line-height: 26px;
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
    }
    .flex-grow {
      display: flex;
      flex-grow: 1;
    }
    .chunk-label {
      font-weight: bold;
    }
    .flex {
      display: flex;
      margin-top: 14px;
    }
    .span {
      min-height: 24px;
      border-bottom: 1px solid #212121;
      padding: 0 1em;
      margin: 0 6px;
      min-width: 26px;
    }
    .table {
      width: 100%;
      padding-right: 1em;
      th {
        font-weight: 400;
      }
      th,
      td {
        text-align: center;
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
}
</style>
<style lang="scss">
.childFirstReport {
  .van-checkbox {
    margin-top: 6px;
    .van-checkbox__label {
      color: #212121;
    }
  }
  .checkbox-grow .van-checkbox-group {
    flex-grow: 1;
    .van-checkbox:last-of-type {
      flex-grow: 1;
      .van-checkbox__label {
        flex-grow: 1;
        display: flex;
      }
    }
  }
  .van-checkbox-group--horizontal {
    margin-left: 8px;
  }
  .min-text .van-checkbox__icon {
    font-size: unset;
  }
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
}
</style>
