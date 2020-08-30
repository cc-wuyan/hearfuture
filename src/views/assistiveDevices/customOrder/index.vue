<template>
  <div class="customOrder">
    <div class="chunk">
      <div class="chunk_title">助听器方案</div>

      <div class="content">
        <div class="flex_row mb-10">
          <div class="label">品牌</div>
          <div class="select_chunk">
            <div class="img-left"></div>
            <div class="dropdown" @click="showDialog('brand','brandLeft')">
              <div v-if="form.brandLeft">{{formTitle.brandLeft}}</div>
              <div v-else>选择品牌</div>
              <div class="dropdown_icon"></div>
            </div>
            <div class="dropdown_icon"></div>
          </div>
          <div class="select_chunk">
            <div class="img-right"></div>
            <div class="dropdown" @click="showDialog('brand','brandRight')">
              <div v-if="form.brandRight">{{formTitle.brandRight}}</div>
              <div v-else>选择品牌</div>
              <div class="dropdown_icon"></div>
            </div>
            <div class="dropdown_icon"></div>
          </div>
        </div>
        <div class="flex_row mb-10">
          <div class="label">系列</div>
          <div class="select_chunk">
            <div class="img-left"></div>
            <div class="dropdown" @click="showDialog('series','seriesLeft')">
              <div v-if="form.seriesLeft">{{formTitle.seriesLeft}}</div>
              <div v-else>选择系列</div>
              <div class="dropdown_icon"></div>
            </div>
            <div class="dropdown_icon"></div>
          </div>
          <div class="select_chunk">
            <div class="img-right"></div>
            <div class="dropdown" @click="showDialog('series','seriesRight')">
              <div v-if="form.seriesRight">{{formTitle.seriesRight}}</div>
              <div v-else>选择系列</div>
              <div class="dropdown_icon"></div>
            </div>
            <div class="dropdown_icon"></div>
          </div>
        </div>
        <div class="flex_row mb-10">
          <div class="label">型号</div>
          <div class="select_chunk">
            <div class="img-left"></div>
            <div class="dropdown" @click="showDialog('model','modelLeft')">
              <div v-if="form.modelLeft">{{formTitle.modelLeft}}</div>
              <div v-else>选择型号</div>
              <div class="dropdown_icon"></div>
            </div>
            <div class="dropdown_icon"></div>
          </div>
          <div class="select_chunk">
            <div class="img-right"></div>
            <div class="dropdown" @click="showDialog('model','modelRight')">
              <div v-if="form.modelRight">{{formTitle.modelRight}}</div>
              <div v-else>选择型号</div>
              <div class="dropdown_icon"></div>
            </div>
            <div class="dropdown_icon"></div>
          </div>
        </div>
        <div class="flex_row mb-10">
          <div class="label">颜色</div>
          <div class="select_chunk">
            <div class="img-left"></div>
            <div class="dropdown" @click="showDialog('color','colorLeft')">
              <div v-if="form.colorLeft">{{formTitle.colorLeft}}</div>
              <div v-else>选择颜色</div>
              <div class="dropdown_icon"></div>
            </div>
            <div class="dropdown_icon"></div>
          </div>
          <div class="select_chunk">
            <div class="img-right"></div>
            <div class="dropdown" @click="showDialog('color','colorRight')">
              <div v-if="form.colorRight">{{formTitle.colorRight}}</div>
              <div v-else>选择颜色</div>
              <div class="dropdown_icon"></div>
            </div>
            <div class="dropdown_icon"></div>
          </div>
        </div>
        <div class="flex_row mb-10">
          <div class="label">机身码</div>
          <div class="select_chunk">
            <div class="img-left"></div>
            <div class="dropdown" @click="showDialog('code','codeLeft')">
              <div v-if="form.codeLeft">{{formTitle.codeLeft}}</div>
              <div v-else>选择机身码</div>
              <div class="dropdown_icon"></div>
            </div>
            <div class="dropdown_icon"></div>
          </div>
          <div class="select_chunk">
            <div class="img-right"></div>
            <div class="dropdown" @click="showDialog('code','codeRight')">
              <div v-if="form.codeRight">{{formTitle.codeRight}}</div>
              <div v-else>选择机身码</div>
              <div class="dropdown_icon"></div>
            </div>
            <div class="dropdown_icon"></div>
          </div>
        </div>
        <div class="flex_row mb-10">
          <div class="label">保修年限</div>
          <div class="select_chunk">
            <div class="img-left"></div>
            <div class="dropdown" @click="showDialog('guarantee','guaranteeLeft')">
              <div v-if="form.guaranteeLeft">{{formTitle.guaranteeLeft}}</div>
              <div v-else>选择保修年限</div>
              <div class="dropdown_icon"></div>
            </div>
            <div class="dropdown_icon"></div>
          </div>
          <div class="select_chunk">
            <div class="img-right"></div>
            <div class="dropdown" @click="showDialog('guarantee','guaranteeRight')">
              <div v-if="form.guaranteeRight">{{formTitle.guaranteeRight}}</div>
              <div v-else>选择保修年限</div>
              <div class="dropdown_icon"></div>
            </div>
            <div class="dropdown_icon"></div>
          </div>
        </div>
        <div class="flex_row mb-10">
          <div class="label">类型</div>
          <div class="select_chunk">
            <div class="img-left"></div>
            <div class="dropdown" @click="showDialog('type','typeLeft')">
              <div v-if="form.typeLeft">{{formTitle.typeLeft}}</div>
              <div v-else>选择类型</div>
              <div class="dropdown_icon"></div>
            </div>
            <div class="dropdown_icon"></div>
          </div>
          <div class="select_chunk">
            <div class="img-right"></div>
            <div class="dropdown" @click="showDialog('type','typeRight')">
              <div v-if="form.typeRight">{{formTitle.typeRight}}</div>
              <div v-else>选择类型</div>
              <div class="dropdown_icon"></div>
            </div>
            <div class="dropdown_icon"></div>
          </div>
        </div>
        <div class="flex_row mb-10">
          <div class="label">功率</div>
          <div class="select_chunk">
            <div class="img-left"></div>
            <div class="dropdown" @click="showDialog('power','powerLeft')">
              <div v-if="form.powerLeft">{{formTitle.powerLeft}}</div>
              <div v-else>选择类型</div>
              <div class="dropdown_icon"></div>
            </div>
            <div class="dropdown_icon"></div>
          </div>
          <div class="select_chunk">
            <div class="img-right"></div>
            <div class="dropdown" @click="showDialog('power','powerRight')">
              <div v-if="form.powerRight">{{formTitle.powerRight}}</div>
              <div v-else>选择类型</div>
              <div class="dropdown_icon"></div>
            </div>
            <div class="dropdown_icon"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="chunk">
      <div class="chunk_title">助听器定制选项</div>

      <div class="content">
        <div class="flex_row mb-14">
          <div class="label al-t">外壳颜色</div>
          <div style="flex-grow:1">
            <div class="select_chunk">
              <div class="img-left"></div>
              <el-radio-group v-model="form.shellColorLeft" direction="horizontal">
                <el-radio label="1">蓝色</el-radio>
                <el-radio label="2">肉色</el-radio>
                <el-radio label="3">透明</el-radio>
                <div class="checkwithinput_case">
                  <el-radio label="4">其他</el-radio>
                  <van-field
                    v-model="form.shellColorLeftOther"
                    placeholder="其他颜色"
                    @blur="inputBlur"
                    @focus="inputFocus"
                  />
                </div>
              </el-radio-group>
            </div>
            <div class="select_chunk">
              <div class="img-right"></div>
              <el-radio-group v-model="form.shellColorRight" direction="horizontal">
                <el-radio label="1">蓝色</el-radio>
                <el-radio label="2">肉色</el-radio>
                <el-radio label="3">透明</el-radio>
                <div class="checkwithinput_case">
                  <el-radio label="4">其他</el-radio>
                  <van-field
                    v-model="form.shellColorRightOther"
                    placeholder="其他颜色"
                    @blur="inputBlur"
                    @focus="inputFocus"
                  />
                </div>
              </el-radio-group>
            </div>
          </div>
        </div>
        <div class="flex_row mb-14">
          <div class="label al-t">面板颜色</div>
          <div style="flex-grow:1">
            <div class="select_chunk">
              <div class="img-left"></div>
              <el-radio-group v-model="form.panelColorLeft" direction="horizontal">
                <el-radio label="1">蓝色</el-radio>
                <el-radio label="2">肉色</el-radio>
                <el-radio label="3">透明</el-radio>
                <div class="checkwithinput_case">
                  <el-radio label="4">其他</el-radio>
                  <van-field
                    v-model="form.panelColorLeftOther"
                    placeholder="其他颜色"
                    @blur="inputBlur"
                    @focus="inputFocus"
                  />
                </div>
              </el-radio-group>
            </div>
            <div class="select_chunk">
              <div class="img-right"></div>
              <el-radio-group v-model="form.panelColorRight" direction="horizontal">
                <el-radio label="1">蓝色</el-radio>
                <el-radio label="2">肉色</el-radio>
                <el-radio label="3">透明</el-radio>
                <div class="checkwithinput_case">
                  <el-radio label="4">其他</el-radio>
                  <van-field
                    v-model="form.panelColorRightOther"
                    placeholder="其他颜色"
                    @blur="inputBlur"
                    @focus="inputFocus"
                  />
                </div>
              </el-radio-group>
            </div>
          </div>
        </div>
        <div class="flex_row mb-10">
          <div class="label">过第二弯</div>
          <div class="select_chunk">
            <div class="img-left"></div>
            <div class="dropdown" @click="showDialog('secondBend','secondBendLeft')">
              <div v-if="form.secondBendLeft">{{formTitle.secondBendLeft}}</div>
              <div v-else>选择过第二弯</div>
              <div class="dropdown_icon"></div>
            </div>
          </div>
          <div class="select_chunk">
            <div class="img-right"></div>
            <div class="dropdown" @click="showDialog('secondBend','secondBendRight')">
              <div v-if="form.secondBendRight">{{formTitle.secondBendRight}}</div>
              <div v-else>选择过第二弯</div>
              <div class="dropdown_icon"></div>
            </div>
          </div>
        </div>
        <div class="flex_row mb-10">
          <div class="label">音量按钮</div>
          <div class="select_chunk">
            <div class="img-left"></div>
            <div class="dropdown" @click="showDialog('volumeButton','volumeButtonLeft')">
              <div v-if="form.volumeButtonLeft">{{formTitle.volumeButtonLeft}}</div>
              <div v-else>选择音量按钮</div>
              <div class="dropdown_icon"></div>
            </div>
          </div>
          <div class="select_chunk">
            <div class="img-right"></div>
            <div class="dropdown" @click="showDialog('volumeButton','volumeButtonRight')">
              <div v-if="form.volumeButtonRight">{{formTitle.volumeButtonRight}}</div>
              <div v-else>选择音量按钮</div>
              <div class="dropdown_icon"></div>
            </div>
          </div>
        </div>
        <div class="flex_row mb-10">
          <div class="label">程序开关</div>
          <div class="select_chunk">
            <div class="img-left"></div>
            <div class="dropdown" @click="showDialog('programSwitch','programSwitchLeft')">
              <div v-if="form.programSwitchLeft">{{formTitle.programSwitchLeft}}</div>
              <div v-else>选择程序开关</div>
              <div class="dropdown_icon"></div>
            </div>
          </div>
          <div class="select_chunk">
            <div class="img-right"></div>
            <div class="dropdown" @click="showDialog('programSwitch','programSwitchRight')">
              <div v-if="form.programSwitchRight">{{formTitle.programSwitchRight}}</div>
              <div v-else>选择程序开关</div>
              <div class="dropdown_icon"></div>
            </div>
          </div>
        </div>
        <div class="flex_row mb-10">
          <div class="label">拉线</div>
          <div class="select_chunk">
            <div class="img-left"></div>
            <div class="dropdown" @click="showDialog('wire','wireLeft')">
              <div v-if="form.wireLeft">{{formTitle.wireLeft}}</div>
              <div v-else>选择拉线</div>
              <div class="dropdown_icon"></div>
            </div>
          </div>
          <div class="select_chunk">
            <div class="img-right"></div>
            <div class="dropdown" @click="showDialog('wire','wireRight')">
              <div v-if="form.wireRight">{{formTitle.wireRight}}</div>
              <div v-else>选择拉线</div>
              <div class="dropdown_icon"></div>
            </div>
          </div>
        </div>
        <div class="flex_row mb-10">
          <div class="label">防尘方式</div>
          <div class="select_chunk">
            <div class="img-left"></div>
            <div class="dropdown" @click="showDialog('dustProof','dustProofLeft')">
              <div v-if="form.dustProofLeft">{{formTitle.dustProofLeft}}</div>
              <div v-else>选择防尘方式</div>
              <div class="dropdown_icon"></div>
            </div>
          </div>
          <div class="select_chunk">
            <div class="img-right"></div>
            <div class="dropdown" @click="showDialog('dustProof','dustProofRight')">
              <div v-if="form.dustProofRight">{{formTitle.dustProofRight}}</div>
              <div v-else>选择防尘方式</div>
              <div class="dropdown_icon"></div>
            </div>
          </div>
        </div>
        <div class="flex_row mb-10">
          <div class="label" style="font-size:16px">受话器长度</div>
          <div class="select_chunk">
            <div class="img-left"></div>
            <div class="dropdown" @click="showDialog('receiver','receiverLeft')">
              <div v-if="form.receiverLeft">{{formTitle.receiverLeft}}</div>
              <div v-else>选择受话器长度</div>
              <div class="dropdown_icon"></div>
            </div>
          </div>
          <div class="select_chunk">
            <div class="img-right"></div>
            <div class="dropdown" @click="showDialog('receiver','receiverRight')">
              <div v-if="form.receiverRight">{{formTitle.receiverRight}}</div>
              <div v-else>选择受话器长度</div>
              <div class="dropdown_icon"></div>
            </div>
          </div>
        </div>
        <div class="flex_row mb-10">
          <div class="label">外壳拉线</div>
          <div class="select_chunk">
            <div class="img-left"></div>
            <div class="dropdown" @click="showDialog('wireShell','wireShellRight')">
              <div v-if="form.wireShellRight">{{formTitle.wireShellRight}}</div>
              <div v-else>选择外壳拉线</div>
              <div class="dropdown_icon"></div>
            </div>
          </div>
          <div class="select_chunk">
            <div class="img-right"></div>
            <div class="dropdown" @click="showDialog('wireShell','wireShellRight')">
              <div v-if="form.wireShellRight">{{formTitle.wireShellRight}}</div>
              <div v-else>选择外壳拉线</div>
              <div class="dropdown_icon"></div>
            </div>
          </div>
        </div>
        <div class="flex_row mb-10">
          <div class="label">是否封闭</div>
          <div class="select_chunk">
            <div class="img-left"></div>
            <div class="dropdown" @click="showDialog('close','closeLeft')">
              <div v-if="form.closeLeft">{{formTitle.closeLeft}}</div>
              <div v-else>选择是否封闭</div>
              <div class="dropdown_icon"></div>
            </div>
          </div>
          <div class="select_chunk">
            <div class="img-right"></div>
            <div class="dropdown" @click="showDialog('close','closeRight')">
              <div v-if="form.closeRight">{{formTitle.closeRight}}</div>
              <div v-else>选择是否封闭</div>
              <div class="dropdown_icon"></div>
            </div>
          </div>
        </div>
        <div class="flex_row mb-10">
          <div class="label">材质</div>
          <div class="select_chunk">
            <div class="img-left"></div>
            <div class="dropdown" @click="showDialog('material','materialLeft')">
              <div v-if="form.materialLeft">{{formTitle.materialLeft}}</div>
              <div v-else>选择材质</div>
              <div class="dropdown_icon"></div>
            </div>
          </div>
          <div class="select_chunk">
            <div class="img-right"></div>
            <div class="dropdown" @click="showDialog('material','materialRight')">
              <div v-if="form.materialRight">{{formTitle.materialRight}}</div>
              <div v-else>选择材质</div>
              <div class="dropdown_icon"></div>
            </div>
          </div>
        </div>
        <div class="flex_row mb-10">
          <div class="label">声学</div>
          <div class="select_chunk">
            <div class="img-left"></div>
            <div class="dropdown" @click="showDialog('acoustics','acousticsLeft')">
              <div v-if="form.acousticsLeft">{{formTitle.acousticsLeft}}</div>
              <div v-else>选择声学</div>
              <div class="dropdown_icon"></div>
            </div>
          </div>
          <div class="select_chunk">
            <div class="img-right"></div>
            <div class="dropdown" @click="showDialog('acoustics','acousticsRight')">
              <div v-if="form.acousticsRight">{{formTitle.acousticsRight}}</div>
              <div v-else>选择声学</div>
              <div class="dropdown_icon"></div>
            </div>
          </div>
        </div>
        <div class="flex_row mb-10">
          <div class="label">通气类型</div>
          <div class="select_chunk">
            <div class="img-left"></div>
            <div class="dropdown" @click="showDialog('ventilation','ventilationLeft')">
              <div v-if="form.ventilationLeft">{{formTitle.ventilationLeft}}</div>
              <div v-else>选择通气类型</div>
              <div class="dropdown_icon"></div>
            </div>
          </div>
          <div class="select_chunk">
            <div class="img-right"></div>
            <div class="dropdown" @click="showDialog('ventilation','ventilationRight')">
              <div v-if="form.ventilationRight">{{formTitle.ventilationRight}}</div>
              <div v-else>选择通气类型</div>
              <div class="dropdown_icon"></div>
            </div>
          </div>
        </div>
        <div class="flex_row mb-10">
          <div class="label">直径</div>
          <div class="select_chunk">
            <div class="img-left"></div>
            <div class="dropdown" @click="showDialog('diameter','diameterLeft')">
              <div v-if="form.diameterLeft">{{formTitle.diameterLeft}}</div>
              <div v-else>选择直径</div>
              <div class="dropdown_icon"></div>
            </div>
          </div>
          <div class="select_chunk">
            <div class="img-right"></div>
            <div class="dropdown" @click="showDialog('diameter','diameterRight')">
              <div v-if="form.diameterRight">{{formTitle.diameterRight}}</div>
              <div v-else>选择直径</div>
              <div class="dropdown_icon"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chunk">
      <div class="chunk_title">电子声/远场聆听方案</div>

      <div class="content">
        <div class="flex_row mb-14">
          <div class="label2">类型</div>
          <div class="select_chunk" style="margin-left:0">
            <el-checkbox-group v-model="form.listenType" direction="horizontal">
              <el-checkbox label="1" shape="square">手机伴侣</el-checkbox>
              <el-checkbox label="2" shape="square">FM系列</el-checkbox>
              <el-checkbox label="3" shape="square">耳鸣系列</el-checkbox>
              <el-checkbox label="4" shape="square">遥控器系列</el-checkbox>
              <el-checkbox label="5" shape="square">电视伴侣系列</el-checkbox>
              <el-checkbox label="6" shape="square">蓝牙麦克风系列</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="flex_row mb-14">
          <div class="label2">品名</div>
          <el-input v-model="form.listenProduct" @blur="inputBlur" @focus="inputFocus"></el-input>
          <div class="label2">品牌</div>
          <el-input v-model="form.listenBrand" @blur="inputBlur" @focus="inputFocus"></el-input>
        </div>
        <div class="flex_row">
          <div class="label2">型号</div>
          <el-input v-model="form.listenModel" @blur="inputBlur" @focus="inputFocus"></el-input>
          <div class="label2">数量</div>
          <el-input v-model="form.listenNum" @blur="inputBlur" @focus="inputFocus"></el-input>
        </div>
      </div>
    </div>
    <div class="chunk">
      <div class="chunk_title">零附件耗材</div>

      <div class="content">
        <div class="flex_row mb-14">
          <div class="label2 al-t">耳保健</div>
          <div class="select_chunk" style="margin-left:0">
            <el-checkbox-group v-model="form.earCare" direction="horizontal">
              <el-checkbox label="1" shape="square">耳保健套装</el-checkbox>
              <el-checkbox label="2" shape="square">耳道清洁喷雾</el-checkbox>
              <el-checkbox label="3" shape="square">清洁消毒喷雾</el-checkbox>
              <el-checkbox label="7" shape="square">防噪音耳塞</el-checkbox>
              <el-checkbox label="6" shape="square">耳光笔</el-checkbox>
              <el-checkbox label="5" shape="square">维E乳</el-checkbox>
              <el-checkbox label="4" shape="square">幼儿耳道清洁液</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="flex_row mb-14">
          <div class="label2 al-t">助听器护理</div>
          <div class="select_chunk" style="margin-left:0">
            <el-checkbox-group v-model="form.aidAcceptance" direction="horizontal">
              <el-checkbox label="1" shape="square">侧电仪</el-checkbox>
              <el-checkbox label="2" shape="square">吹气球</el-checkbox>
              <el-checkbox label="3" shape="square">小刷子</el-checkbox>
              <el-checkbox label="4" shape="square">通气杆</el-checkbox>
              <el-checkbox label="5" shape="square">小改锥</el-checkbox>
              <el-checkbox label="6" shape="square">电耳镜</el-checkbox>
              <el-checkbox label="11" shape="square">干燥盒</el-checkbox>
              <el-checkbox label="12" shape="square">干燥剂</el-checkbox>
              <el-checkbox label="7" shape="square">双耳听筒</el-checkbox>
              <el-checkbox label="8" shape="square">耳背机挂绳</el-checkbox>
              <el-checkbox label="9" shape="square">电子干燥器</el-checkbox>
              <el-checkbox label="10" shape="square">助听器盒子</el-checkbox>
              <el-checkbox label="13" shape="square">助听器护理套装</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="flex_row mb-14">
          <div class="label2 al-t">配件与耗材</div>
          <div class="select_chunk" style="margin-left:0">
            <el-checkbox-group v-model="form.parts" direction="horizontal">
              <el-checkbox label="1" shape="square">耳钩</el-checkbox>
              <el-checkbox label="5" shape="square">导线</el-checkbox>
              <el-checkbox label="6" shape="square">电池</el-checkbox>
              <el-checkbox label="11" shape="square">耳塞</el-checkbox>
              <el-checkbox label="2" shape="square">受话器</el-checkbox>
              <el-checkbox label="3" shape="square">细声管</el-checkbox>
              <el-checkbox label="4" shape="square">耳机头</el-checkbox>
              <el-checkbox label="7" shape="square">耵聍罩</el-checkbox>
              <el-checkbox label="8" shape="square">防尘条（短）</el-checkbox>
              <el-checkbox label="9" shape="square">防尘条（长）</el-checkbox>
              <el-checkbox label="10" shape="square">三件套</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="flex_row mb-14">
          <div class="label2">品名</div>
          <el-input v-model="form.partProduct" @blur="inputBlur" @focus="inputFocus"></el-input>
          <div class="label2">品牌</div>
          <el-input v-model="form.partBrand" @blur="inputBlur" @focus="inputFocus"></el-input>
        </div>
        <div class="flex_row">
          <div class="label2">型号</div>
          <el-input v-model="form.partModel" @blur="inputBlur" @focus="inputFocus"></el-input>
          <div class="label2">数量</div>
          <el-input v-model="form.partNum" @blur="inputBlur" @focus="inputFocus"></el-input>
        </div>
      </div>
    </div>
    <div class="chunk">
      <div class="chunk_title">备注信息</div>
      <div class="content">
        <div class="flex_row mb-14">
          <div class="label2"></div>
          <div>耳道与耳廓情况备注</div>
        </div>
        <div class="flex_row mb-14">
          <div class="label2"></div>
          <div class="select_chunk" style="margin-left:0">
            <el-checkbox-group v-model="form.earRemark" direction="horizontal">
              <el-checkbox label="1" shape="square">耳廓偏</el-checkbox>
              <el-checkbox label="2" shape="square">耳道畸形</el-checkbox>
              <el-checkbox label="3" shape="square">耳道炎</el-checkbox>
              <el-checkbox label="4" shape="square">耳科手</el-checkbox>
              <el-checkbox label="5" shape="square">耵聍过多</el-checkbox>
              <el-checkbox label="6" shape="square">硬油性耳垢</el-checkbox>
              <el-checkbox label="7" shape="square">鼓膜穿孔（干）</el-checkbox>
              <el-checkbox label="8" shape="square">症中耳炎</el-checkbox>
              <el-checkbox label="10" shape="square">耳道皮肤松弛</el-checkbox>
              <el-checkbox label="9" shape="square">术耳道内壁敏感</el-checkbox>
              <div class="checkwithinput_case">
                <el-checkbox label shape="square"></el-checkbox>
                <van-field
                  v-model="form.earRemarkTitle"
                  placeholder="其他"
                  @blur="inputBlur"
                  @focus="inputFocus"
                />
              </div>
            </el-checkbox-group>
          </div>
        </div>
        <div class="flex_row mb-14">
          <div class="label2"></div>
          <div style="flex-grow:1">
            <div class="mb-14">历史助听器备注</div>
            <el-input v-model="form.aidHistoryRemark" @blur="inputBlur" @focus="inputFocus"></el-input>
          </div>
          <div style="flex-grow:1;margin-left:40px">
            <div class="mb-14">订单备注</div>
            <el-input v-model="form.orderRemark" @blur="inputBlur" @focus="inputFocus"></el-input>
          </div>
        </div>
        <div class="flex_row mb-14">
          <div class="label2"></div>
          <div style="flex-grow:1;width:1px">
            <div class="mb-14">取机日期</div>
            <el-date-picker
              :editable="false"
              v-model="form.takeTime"
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
          <div style="flex-grow:1;margin-left:40px;width:1px">
            <div class="mb-14">订单金额</div>
            <el-input v-model="form.money" @blur="inputBlur" @focus="inputFocus"></el-input>
          </div>
        </div>
      </div>
    </div>

    <div class="save_btn" @click="submit"></div>

    <el-dialog title="提示" :visible.sync="dialogVisible" class="dialogModal" width="500px">
      <div class="options_case">
        <div
          v-for="(item, index) in dialogDataList"
          :key="index"
          class="chunk"
          :class="item.id == dialogData ? 'sign' : ''"
          @click="chooseData(item)"
        >{{item.title}}</div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import api from "../../../api/api";

export default {
  data() {
    return {
      radio: "",
      label: "",
      dialogDataList: [],
      dialogVisible: false,
      chooseList: {},
      dialogData: "",
      checkFormParam: "",
      form: {
        id: 0,
        recordId: this.$route.query.recordId,
        patientId: this.$route.query.patientId,
        partProduct: "",
        shellColorLeftOther: "",
        shellColorRightOther: "",
        panelColorLeftOther: "",
        panelColorRightOther: "",
        partBrand: "",
        partModel: "",
        partNum: "",
        brandLeft: "",
        seriesLeft: "",
        typeLeft: "",
        colorLeft: "",
        codeLeft: "",
        guaranteeLeft: "",
        ventilationRight: "",
        modelLeft: "",
        powerLeft: "",
        listenPrice: "",
        brandRight: "",
        seriesRight: "",
        typeRight: "",
        colorRight: "",
        codeRight: "",
        guaranteeRight: "",
        modelRight: "",
        powerRight: "",
        shellColorLeft: "",
        shellColorRight: "",
        panelColorLeft: "",
        earRemarkTitle: "",
        panelColorRight: "",
        secondBendLeft: "",
        secondBendRight: "",
        volumeButtonLeft: "",
        volumeButtonRight: "",
        programSwitchLeft: "",
        programSwitchRight: "",
        wireLeft: "",
        wireRight: "",
        wireShellRight: "",
        wireShellLeft: "",
        dustProofLeft: "",
        dustProofRight: "",
        receiverLeft: "",
        receiverRight: "",
        closeLeft: "",
        closeRight: "",
        materialLeft: "",
        materialRight: "",
        acousticsLeft: "",
        acousticsRight: "",
        ventilationLeft: "",
        diameterLeft: "",
        diameterRight: "",
        aidCustomizedPrice: "",
        listenType: [],
        listenProduct: "",
        listenBrand: "",
        listenModel: "",
        listenNum: "",
        earCare: [],
        aidAcceptance: [],
        parts: [],
        consumablesPrice: "",
        earRemark: [],
        aidHistoryRemark: "",
        orderRemark: "",
        money: 0.0,
        aidPrice: "",
        takeTime: "",
      },
      formTitle: {
        brandLeft: "",
        seriesLeft: "",
        typeLeft: "",
        colorLeft: "",
        codeLeft: "",
        guaranteeLeft: "",
        modelLeft: "",
        powerLeft: "",
        brandRight: "",
        seriesRight: "",
        typeRight: "",
        colorRight: "",
        codeRight: "",
        guaranteeRight: "",
        modelRight: "",
        powerRight: "",
        ventilationRight: "",
        shellColorLeft: "",
        shellColorRight: "",
        panelColorLeft: "",
        panelColorRight: "",
        secondBendLeft: "",
        secondBendRight: "",
        volumeButtonLeft: "",
        volumeButtonRight: "",
        programSwitchLeft: "",
        programSwitchRight: "",
        wireLeft: "",
        wireRight: "",
        wireShellRight: "",
        wireShellLeft: "",
        dustProofLeft: "",
        dustProofRight: "",
        receiverLeft: "",
        receiverRight: "",
        closeLeft: "",
        closeRight: "",
        materialLeft: "",
        materialRight: "",
        acousticsLeft: "",
        acousticsRight: "",
        ventilationLeft: "",
        diameterLeft: "",
        diameterRight: "",
        aidCustomizedPrice: "",
        listenType: "",
        listenProduct: "",
        listenBrand: "",
        listenModel: "",
        listenNum: "",
        earCare: "",
        aidAcceptance: "",
        parts: "",
        consumablesPrice: "",
        earRemark: [],
        aidHistoryRemark: "",
        orderRemark: "",
      },
      checkList: [],
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
    };
  },
  created() {
    this.init();
    this.getInfo();
    this.init();
  },
  methods: {
    // 选中关系
    chooseData(e) {
      this.dialogData = e.id;
      this.formTitle[this.checkFormParam] = e.title;
      this.form[this.checkFormParam] = e.id;
      this.dialogVisible = false;
    },
    showDialog(e, d) {
      this.dialogVisible = true;
      this.dialogDataList = this.chooseList[e];
      this.checkFormParam = d;
    },
    init() {
      //获取列表选项数据
      this.keyList.forEach((el) => {
        this.getValueByKey(el);
      });
    },
    submit() {
      let form = JSON.parse(JSON.stringify(this.form));
      if (
        this.form.listenType != "" ||
        this.form.earCare != "" ||
        this.form.aidAcceptance != "" ||
        this.form.parts != "" ||
        this.form.earRemark != ""
      ) {
        form.listenType = this.form.listenType.join(",");
        form.earCare = this.form.earCare.join(",");
        form.aidAcceptance = this.form.aidAcceptance.join(",");
        form.parts = this.form.parts.join(",");
        form.earRemark = this.form.earRemark.join(",");
      }
      form.sid = this.$route.query.sid;
      api
        .postFormAPI("contract/eardrumSubmit", form)
        .then((res) => {
          if (res.data.result == "1") {
            this.$notify({
              message: res.data.message,
              showClose: false,
              onClose(res) {
                console.log(res);
                location.reload();
              },
              duration: 3000,
            });
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    getInfo() {
      api
        .postFormAPI("contract/eardrumInfo", {
          recordId: this.$route.query.recordId,
          sid: this.$route.query.sid,
        })
        .then((res) => {
          if (res.data.result == "1") {
            const data = res.data.data;
            for (let key in this.form) {
              if (data.hasOwnProperty(key)) {
                this.form[key] = data[key];
              }
              if (
                key == "listenType" ||
                key == "earCare" ||
                key == "aidAcceptance" ||
                key == "parts" ||
                key == "earRemark"
              ) {
                if (data[key] != null && data[key].length > 0) {
                  var arr = data[key].split(",");
                  this.form[key] = arr;
                }
                if (data[key] == null) {
                  this.form[key] = [];
                }
              }
            }
          }
        })
        .catch((err) => console.log(err));
    },
    getValueByKey(key) {
      api
        .postFormAPI("common/getChildByKey", {
          key: key,
        })
        .then((res) => {
          if (res.data.result == "1") {
            this.chooseList[key] = res.data.data;
            res.data.data.forEach((el) => {
              var leftstr =
                key + "left".charAt(0).toUpperCase() + "left".slice(1);
              var rightstr =
                key + "right".charAt(0).toUpperCase() + "right".slice(1);
              if (el.id == this.form[leftstr]) {
                this.formTitle[leftstr] = el.title;
              }
              if (el.id == this.form[rightstr]) {
                this.formTitle[rightstr] = el.title;
              }
            });
          }
        })
        .catch((err) => console.log(err));
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
    inputBlur() {
      this.nativeCall({ focus: false }, "inputFocus");
    },
    inputFocus() {
      this.nativeCall({ focus: true }, "inputFocus");
    },
  },
};
</script>

<style lang="scss" scoped>
.customOrder {
  color: #212121;
  margin: 30px 30px 90px;
  overflow: hidden;
  .chunk {
    background-color: #f9f9f9;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    margin-bottom: 14px;
    .chunk_title {
      display: inline-block;
      height: 44px;
      line-height: 44px;
      text-align: center;
      padding: 0 16px;
      font-weight: bold;
      border-radius: 6px 0px 14px 0px;
      background-color: #ebf2f5;
      color: #5091c7;
    }
    .price {
      position: absolute;
      right: 26px;
      top: 16px;
    }
    .content {
      margin: 12px 26px;
      .flex_row {
        display: flex;
        align-items: center;
        flex-grow: 1;
      }
      .label {
        width: 80px;
        text-align: justify;
        text-align-last: justify;
        margin-right: 44px;
        flex-shrink: 0;
      }
      .label2 {
        width: 54px;
        flex-shrink: 0;
        text-align: justify;
        text-align-last: justify;
        margin-right: 32px;
        &:not(:first-of-type) {
          margin-left: 44px;
        }
      }
      .mb-10 {
        margin-bottom: 10px;
      }
      .mb-14 {
        margin-bottom: 14px;
      }
      .al-t {
        align-self: flex-start;
        margin-top: 14px;
      }
    }
  }
  .select_chunk {
    display: flex;
    flex-grow: 1;
    align-items: center;
    padding: 6px 0;
    padding-left: 12px;
    margin-left: 26px;
    border-radius: 2px;
    background-color: #f3f3f3;
    .dropdown {
      flex-grow: 1;
      height: 38px;
      width: 20px;
      margin-right: 10px;
      display: flex;
      align-items: center;
      background: #fff;
      color: #646464;
      padding: 0 8px;
      justify-content: space-between;
      .dropdown_icon {
        width: 16px;
        height: 10px;
        background: url("../../../assets/images/icon_more@2x.png") center/cover;
      }
    }
  }
  .checkwithinput_case {
    display: flex;
    align-items: center;
  }
  .img-left,
  .img-right {
    width: 14px;
    height: 20px;
    background: url("../../../assets/image/icon_ears_left@2x.png") no-repeat;
    background-size: contain;
    margin: 6px 12px;
    margin-left: 0;
  }

  .img-right {
    background: url("../../../assets/image/icon_ears_right@2x.png") no-repeat;
    background-size: contain;
  }
  .bottom {
    display: flex;
    align-items: center;
    margin: 30px 0;
    div:nth-of-type(2n + 1) {
      color: #fc3c3c;
    }
    div:nth-of-type(2n + 2) {
      width: 20px;
      flex-grow: 1;
    }
    & /deep/ .el-input__inner {
      border: 1px solid #dcdfe6;
    }
  }
  .save_btn {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    position: fixed;
    right: 20px;
    bottom: 90px;
    background: url("../../../assets/image/btn/icon_btn_save@2x.png") no-repeat
      center/contain;
  }
}
</style>

<style lang="scss">
.customOrder {
  .el-radio-group {
    display: flex;
    align-items: center;
  }
  .el-radio__label {
    color: #212121;
  }
  .el-radio-group .el-radio {
    margin-right: 14px;
  }
  //   优先级
  .select_chunk .checkwithinput_case .el-radio {
    margin-right: 10px;
  }
  .checkwithinput_case .van-cell {
    padding: 0 6px;
    height: 38px;
    line-height: 38px;
    margin-right: 10px;
    .van-cell__value {
      font-size: 18px;
    }
  }
  .el-input {
    font-size: 18px;
  }
  .el-input__inner {
    border-radius: 2px;
    border: unset;
  }
  .el-input__inner:hover {
    border: unset;
  }
  .el-checkbox {
    margin-top: 8px;
    margin-bottom: 8px;
    width: 116px;
  }
  .checkwithinput_case .el-checkbox {
    margin-right: 6px;
    width: auto;
  }
  .el-date-editor {
    width: 100%;
  }
}
.dialogModal {
  display: flex;
  align-items: center;
  justify-content: center;

  .el-dialog {
    margin: unset !important;
    border-radius: 10px;
  }
  .el-dialog__header {
    padding: 0;
    text-align: center;
    margin-top: 34px;
  }
  .el-dialog__headerbtn {
    top: 10px;
    right: 10px;
    font-size: 24px;
  }
  .el-dialog__title {
    font-size: 24px;
    color: #333;
    font-weight: bold;
  }
  .options_case {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 18px;
    .chunk {
      width: 270px;
      height: 60px;
      line-height: 60px;
      background-color: #fff;
      text-align: center;
      color: #212121;
    }
    .sign {
      color: #fff;
      background: url("../../../assets/images/icon_login_bg@2x.png") center/cover;
    }
  }
}
</style>
