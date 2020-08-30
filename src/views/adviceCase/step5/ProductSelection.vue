<template>
  <div class="OrganizationProfile">
    <div v-show="componentIndex == 0" class="one_case">
      <div class="top">
        <div class="left">
          <img :src="showImg ? showImg : loveData[0].pic" alt />
          <div class="btn_case">
            <div @click="directionVal = 'front'" :class="directionVal == 'front' ? 'is_sign' : ''">
              <img :src="showImgDirection ? showImgDirection.front.pic : loveData[0].pic" alt />
            </div>
            <div @click="directionVal = 'after'" :class="directionVal == 'after' ? 'is_sign' : ''">
              <img :src="showImgDirection ? showImgDirection.after.pic : loveData[2].pic" alt />
            </div>
            <div @click="directionVal = 'left'" :class="directionVal == 'left' ? 'is_sign' : ''">
              <img :src="showImgDirection ? showImgDirection.left.pic : loveData[3].pic" alt />
            </div>
            <div @click="directionVal = 'right'" :class="directionVal == 'right' ? 'is_sign' : ''">
              <img :src="showImgDirection ? showImgDirection.right.pic : loveData[1].pic" alt />
            </div>
          </div>
        </div>
        <div class="right">
          <div @click="roleVal = 'man'" :class="roleVal == 'man' ? 'is_sign' : ''">
            <img src="../../../assets/image/image553.jpg" alt />
            <p>男性</p>
          </div>
          <div @click="roleVal = 'lady'" :class="roleVal == 'lady' ? 'is_sign' : ''">
            <img src="../../../assets/image/image547.jpg" alt />
            <p>女性(头发盘起)</p>
          </div>
          <div @click="roleVal = 'woman'" :class="roleVal == 'woman' ? 'is_sign' : ''">
            <img src="../../../assets/image/image550.jpg" alt />
            <p>女性(头发放下)</p>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div @click="earVal = 1" :class="earVal == 1 ? 'is_sign' : ''">
          <img src="../../../assets/image/ear1.jpg" alt />
          <p>深耳道型</p>
        </div>
        <div @click="earVal = 2" :class="earVal == 2 ? 'is_sign' : ''">
          <img src="../../../assets/image/ear2.jpg" alt />
          <p>耳道型(10号电池)</p>
        </div>
        <div @click="earVal = 3" :class="earVal == 3 ? 'is_sign' : ''">
          <img src="../../../assets/image/ear3.jpg" alt />
          <p>耳内型</p>
        </div>
        <div @click="earVal = 4" :class="earVal == 4 ? 'is_sign' : ''">
          <img src="../../../assets/image/ear4.jpg" alt />
          <p>前毂型</p>
        </div>
        <div @click="earVal = 5" :class="earVal == 5 ? 'is_sign' : ''">
          <img src="../../../assets/image/ear5.jpg" alt />
          <p>耳挂型</p>
        </div>
      </div>
    </div>
    <div v-show="componentIndex == 1" class="two_case">
      <div class="top">
        <div class="left">
          <img :src="productImg ? productImg : productColor[0].pic" alt />
          <div>
            <p>助听器颜色</p>
            <div class="case">
              <div
                class="color_btn"
                v-for="(item, index) in productColor"
                :key="index"
                :style="{'background':item.color}"
                @click="chioseColor(index)"
                :class="chioseColorVal == index ? 'sign' : ''"
              ></div>
            </div>
          </div>
        </div>
        <div class="right">
          <img :src="productRoleBigImg ? productRoleBigImg : allProductRoleImgs[0].pic" alt />
        </div>
      </div>
      <div class="bottom">
        <img
          :src="item.pic"
          :class="productRole == index ? 'sign' : ''"
          @click="productRole = index"
          v-for="(item, index) in productRoleImgs"
          :key="index"
          alt
        />
      </div>
    </div>
    <div v-show="componentIndex == 2" class="three_case">
      <div>
        <img
          @click="turnHelpTip(0)"
          src="../../../assets/productColor/AACC6BDC-7FC2-44b4-BE67-00F6A7E01D57.png"
          alt
        />
        <img
          @click="turnHelpTip(1)"
          src="../../../assets/productColor/E5FE1851-ED4E-4826-914C-3277D0E21B2F.png"
          alt
        />
      </div>
      <div>
        <img
          @click="turnHelpTip(5)"
          src="../../../assets/productColor/777D1B00-DEAF-4e8a-A408-468CC47D1873.png"
          alt
        />
        <p>{{helpTipsVal ? helpTipsVal : '听觉无障碍辅助系统'}}</p>
        <img
          @click="turnHelpTip(2)"
          src="../../../assets/productColor/2F810D01-0416-46cb-A80D-61E8A55A86C5.png"
          alt
        />
      </div>
      <div>
        <img
          @click="turnHelpTip(4)"
          src="../../../assets/productColor/4262065E-E846-4336-B6AE-7869E1EF8E8E.png"
          alt
        />
        <img
          @click="turnHelpTip(3)"
          src="../../../assets/productColor/2D47195B-3756-421f-9341-8518C3BCF67F.png"
          alt
        />
      </div>
    </div>
    <bottom-btn :btnList="btnList" :whichCheck="componentIndex" @componentIndex="getComponentIndex"></bottom-btn>
  </div>
</template>

<script>
import BottomBtn from "../components/bottom_btn";
import api from "../../../api/api";

export default {
  data() {
    return {
      componentIndex: 0,
      imageList: [],
      directionVal: "front",
      roleVal: "man",
      earVal: "1",
      showImg: "",
      btnList: ["产品样式", "产品颜色", "听觉无障碍辅助系统"],
      loveData: [
        {
          direction: "front",
          role: "man",
          ear: 1,
          pic: require("../../../assets/image/1-1-1.jpg"),
        },
        {
          direction: "right",
          role: "man",
          ear: 1,
          pic: require("../../../assets/image/1-1-2.jpg"),
        },
        {
          direction: "after",
          role: "man",
          ear: 1,
          pic: require("../../../assets/image/1-1-3.jpg"),
        },
        {
          direction: "left",
          role: "man",
          ear: 1,
          pic: require("../../../assets/image/1-1-4.jpg"),
        },
        {
          direction: "front",
          role: "man",
          ear: 2,
          pic: require("../../../assets/image/1-2-1.jpg"),
        },
        {
          direction: "right",
          role: "man",
          ear: 2,
          pic: require("../../../assets/image/1-2-2.jpg"),
        },
        {
          direction: "after",
          role: "man",
          ear: 2,
          pic: require("../../../assets/image/1-2-3.jpg"),
        },
        {
          direction: "left",
          role: "man",
          ear: 2,
          pic: require("../../../assets/image/1-2-4.jpg"),
        },
        {
          direction: "front",
          role: "man",
          ear: 3,
          pic: require("../../../assets/image/1-3-1.jpg"),
        },
        {
          direction: "right",
          role: "man",
          ear: 3,
          pic: require("../../../assets/image/1-3-2.jpg"),
        },
        {
          direction: "after",
          role: "man",
          ear: 3,
          pic: require("../../../assets/image/1-3-3.jpg"),
        },
        {
          direction: "left",
          role: "man",
          ear: 3,
          pic: require("../../../assets/image/1-3-4.jpg"),
        },
        {
          direction: "front",
          role: "man",
          ear: 4,
          pic: require("../../../assets/image/1-4-1.jpg"),
        },
        {
          direction: "right",
          role: "man",
          ear: 4,
          pic: require("../../../assets/image/1-4-2.jpg"),
        },
        {
          direction: "after",
          role: "man",
          ear: 4,
          pic: require("../../../assets/image/1-4-3.jpg"),
        },
        {
          direction: "left",
          role: "man",
          ear: 4,
          pic: require("../../../assets/image/1-4-4.jpg"),
        },
        {
          direction: "front",
          role: "man",
          ear: 5,
          pic: require("../../../assets/image/1-5-1.jpg"),
        },
        {
          direction: "right",
          role: "man",
          ear: 5,
          pic: require("../../../assets/image/1-5-2.jpg"),
        },
        {
          direction: "after",
          role: "man",
          ear: 5,
          pic: require("../../../assets/image/1-5-3.jpg"),
        },
        {
          direction: "left",
          role: "man",
          ear: 5,
          pic: require("../../../assets/image/1-5-4.jpg"),
        },
        {
          direction: "front",
          role: "lady",
          ear: 1,
          pic: require("../../../assets/image/2-1-1.jpg"),
        },
        {
          direction: "right",
          role: "lady",
          ear: 1,
          pic: require("../../../assets/image/2-1-2.jpg"),
        },
        {
          direction: "after",
          role: "lady",
          ear: 1,
          pic: require("../../../assets/image/2-1-3.jpg"),
        },
        {
          direction: "left",
          role: "lady",
          ear: 1,
          pic: require("../../../assets/image/2-1-4.jpg"),
        },
        {
          direction: "front",
          role: "lady",
          ear: 2,
          pic: require("../../../assets/image/2-2-1.jpg"),
        },
        {
          direction: "right",
          role: "lady",
          ear: 2,
          pic: require("../../../assets/image/2-2-2.jpg"),
        },
        {
          direction: "after",
          role: "lady",
          ear: 2,
          pic: require("../../../assets/image/2-2-3.jpg"),
        },
        {
          direction: "left",
          role: "lady",
          ear: 2,
          pic: require("../../../assets/image/2-2-4.jpg"),
        },
        {
          direction: "front",
          role: "lady",
          ear: 3,
          pic: require("../../../assets/image/2-3-1.jpg"),
        },
        {
          direction: "right",
          role: "lady",
          ear: 3,
          pic: require("../../../assets/image/2-3-2.jpg"),
        },
        {
          direction: "after",
          role: "lady",
          ear: 3,
          pic: require("../../../assets/image/2-3-3.jpg"),
        },
        {
          direction: "left",
          role: "lady",
          ear: 3,
          pic: require("../../../assets/image/2-3-4.jpg"),
        },
        {
          direction: "front",
          role: "lady",
          ear: 4,
          pic: require("../../../assets/image/2-4-1.jpg"),
        },
        {
          direction: "right",
          role: "lady",
          ear: 4,
          pic: require("../../../assets/image/2-4-2.jpg"),
        },
        {
          direction: "after",
          role: "lady",
          ear: 4,
          pic: require("../../../assets/image/2-4-3.jpg"),
        },
        {
          direction: "left",
          role: "lady",
          ear: 4,
          pic: require("../../../assets/image/2-4-4.jpg"),
        },
        {
          direction: "front",
          role: "lady",
          ear: 5,
          pic: require("../../../assets/image/2-5-1.jpg"),
        },
        {
          direction: "right",
          role: "lady",
          ear: 5,
          pic: require("../../../assets/image/2-5-2.jpg"),
        },
        {
          direction: "after",
          role: "lady",
          ear: 5,
          pic: require("../../../assets/image/2-5-3.jpg"),
        },
        {
          direction: "left",
          role: "lady",
          ear: 5,
          pic: require("../../../assets/image/2-5-4.jpg"),
        },
        {
          direction: "front",
          role: "woman",
          ear: 1,
          pic: require("../../../assets/image/3-5-1.jpg"),
        },
        {
          direction: "right",
          role: "woman",
          ear: 1,
          pic: require("../../../assets/image/3-5-2.jpg"),
        },
        {
          direction: "after",
          role: "woman",
          ear: 1,
          pic: require("../../../assets/image/3-5-3.jpg"),
        },
        {
          direction: "left",
          role: "woman",
          ear: 1,
          pic: require("../../../assets/image/3-5-4.jpg"),
        },
        {
          direction: "front",
          role: "woman",
          ear: 2,
          pic: require("../../../assets/image/3-5-1.jpg"),
        },
        {
          direction: "right",
          role: "woman",
          ear: 2,
          pic: require("../../../assets/image/3-5-2.jpg"),
        },
        {
          direction: "after",
          role: "woman",
          ear: 2,
          pic: require("../../../assets/image/3-5-3.jpg"),
        },
        {
          direction: "left",
          role: "woman",
          ear: 2,
          pic: require("../../../assets/image/3-5-4.jpg"),
        },
        {
          direction: "front",
          role: "woman",
          ear: 3,
          pic: require("../../../assets/image/3-5-1.jpg"),
        },
        {
          direction: "right",
          role: "woman",
          ear: 3,
          pic: require("../../../assets/image/3-5-2.jpg"),
        },
        {
          direction: "after",
          role: "woman",
          ear: 3,
          pic: require("../../../assets/image/3-5-3.jpg"),
        },
        {
          direction: "left",
          role: "woman",
          ear: 3,
          pic: require("../../../assets/image/3-5-4.jpg"),
        },
        {
          direction: "front",
          role: "woman",
          ear: 4,
          pic: require("../../../assets/image/3-5-1.jpg"),
        },
        {
          direction: "right",
          role: "woman",
          ear: 4,
          pic: require("../../../assets/image/3-5-2.jpg"),
        },
        {
          direction: "after",
          role: "woman",
          ear: 4,
          pic: require("../../../assets/image/3-5-3.jpg"),
        },
        {
          direction: "left",
          role: "woman",
          ear: 4,
          pic: require("../../../assets/image/3-5-4.jpg"),
        },
        {
          direction: "front",
          role: "woman",
          ear: 5,
          pic: require("../../../assets/image/3-5-1.jpg"),
        },
        {
          direction: "right",
          role: "woman",
          ear: 5,
          pic: require("../../../assets/image/3-5-2.jpg"),
        },
        {
          direction: "after",
          role: "woman",
          ear: 5,
          pic: require("../../../assets/image/3-5-3.jpg"),
        },
        {
          direction: "left",
          role: "woman",
          ear: 5,
          pic: require("../../../assets/image/3-5-4.jpg"),
        },
      ],
      productColor: [
        {
          color: "#E0D2C7",
          pic: require("../../../assets/productColor/image86.png"),
        },
        {
          color: "#A7958A",
          pic: require("../../../assets/productColor/image88.png"),
        },
        {
          color: "#615053",
          pic: require("../../../assets/productColor/image90.png"),
        },
        {
          color: "#D8DEE3",
          pic: require("../../../assets/productColor/image92.png"),
        },
        {
          color: "#8A919C",
          pic: require("../../../assets/productColor/image94.png"),
        },
        {
          color: "#464650",
          pic: require("../../../assets/productColor/image96.png"),
        },
        {
          color: "#EBE8E5",
          pic: require("../../../assets/productColor/image98.png"),
        },
        {
          color: "#F2C03C",
          pic: require("../../../assets/productColor/image100.png"),
        },
        {
          color: "#D47D51",
          pic: require("../../../assets/productColor/image102.png"),
        },
        {
          color: "#DF4878",
          pic: require("../../../assets/productColor/image104.png"),
        },
        {
          color: "#784C7B",
          pic: require("../../../assets/productColor/image106.png"),
        },
        {
          color: "#1A74A6",
          pic: require("../../../assets/productColor/image108.png"),
        },
        {
          color: "#008382",
          pic: require("../../../assets/productColor/image110.png"),
        },
      ],
      productRoleImgs: [
        {
          pic: require("../../../assets/productColor/image29.jpg"),
        },
        {
          pic: require("../../../assets/productColor/image23.jpg"),
        },
        {
          pic: require("../../../assets/productColor/image21.jpg"),
        },
        {
          pic: require("../../../assets/productColor/image43.jpg"),
        },
        {
          pic: require("../../../assets/productColor/image27.jpg"),
        },
        {
          pic: require("../../../assets/productColor/image25.jpg"),
        },
      ],
      productImg: "",
      showImgDirection: "",
      whichColor: 0,
      productRole: 0,
      allProductRoleImgs: [
        {
          role: 0,
          color: 0,
          pic: require("../../../assets/productColor/image451.jpg"),
        },
        {
          role: 0,
          color: 1,
          pic: require("../../../assets/productColor/image453.jpg"),
        },
        {
          role: 0,
          color: 2,
          pic: require("../../../assets/productColor/image455.jpg"),
        },
        {
          role: 0,
          color: 3,
          pic: require("../../../assets/productColor/image457.jpg"),
        },
        {
          role: 0,
          color: 4,
          pic: require("../../../assets/productColor/image459.jpg"),
        },
        {
          role: 0,
          color: 5,
          pic: require("../../../assets/productColor/image461.jpg"),
        },
        {
          role: 0,
          color: 6,
          pic: require("../../../assets/productColor/image463.jpg"),
        },
        {
          role: 0,
          color: 7,
          pic: require("../../../assets/productColor/image465.jpg"),
        },
        {
          role: 0,
          color: 8,
          pic: require("../../../assets/productColor/image467.jpg"),
        },
        {
          role: 0,
          color: 9,
          pic: require("../../../assets/productColor/image469.jpg"),
        },
        {
          role: 0,
          color: 10,
          pic: require("../../../assets/productColor/image471.jpg"),
        },
        {
          role: 0,
          color: 11,
          pic: require("../../../assets/productColor/image473.jpg"),
        },
        {
          role: 0,
          color: 12,
          pic: require("../../../assets/productColor/image475.jpg"),
        },

        {
          role: 1,
          color: 0,
          pic: require("../../../assets/productColor/image373.jpg"),
        },
        {
          role: 1,
          color: 1,
          pic: require("../../../assets/productColor/image375.jpg"),
        },
        {
          role: 1,
          color: 2,
          pic: require("../../../assets/productColor/image377.jpg"),
        },
        {
          role: 1,
          color: 3,
          pic: require("../../../assets/productColor/image379.jpg"),
        },
        {
          role: 1,
          color: 4,
          pic: require("../../../assets/productColor/image381.jpg"),
        },
        {
          role: 1,
          color: 5,
          pic: require("../../../assets/productColor/image383.jpg"),
        },
        {
          role: 1,
          color: 6,
          pic: require("../../../assets/productColor/image385.jpg"),
        },
        {
          role: 1,
          color: 7,
          pic: require("../../../assets/productColor/image387.jpg"),
        },
        {
          role: 1,
          color: 8,
          pic: require("../../../assets/productColor/image389.jpg"),
        },
        {
          role: 1,
          color: 9,
          pic: require("../../../assets/productColor/image391.jpg"),
        },
        {
          role: 1,
          color: 10,
          pic: require("../../../assets/productColor/image393.jpg"),
        },
        {
          role: 1,
          color: 11,
          pic: require("../../../assets/productColor/image395.jpg"),
        },
        {
          role: 1,
          color: 12,
          pic: require("../../../assets/productColor/image397.jpg"),
        },

        {
          role: 2,
          color: 0,
          pic: require("../../../assets/productColor/image347.jpg"),
        },
        {
          role: 2,
          color: 1,
          pic: require("../../../assets/productColor/image349.jpg"),
        },
        {
          role: 2,
          color: 2,
          pic: require("../../../assets/productColor/image351.jpg"),
        },
        {
          role: 2,
          color: 3,
          pic: require("../../../assets/productColor/image353.jpg"),
        },
        {
          role: 2,
          color: 4,
          pic: require("../../../assets/productColor/image355.jpg"),
        },
        {
          role: 2,
          color: 5,
          pic: require("../../../assets/productColor/image357.jpg"),
        },
        {
          role: 2,
          color: 6,
          pic: require("../../../assets/productColor/image359.jpg"),
        },
        {
          role: 2,
          color: 7,
          pic: require("../../../assets/productColor/image361.jpg"),
        },
        {
          role: 2,
          color: 8,
          pic: require("../../../assets/productColor/image363.jpg"),
        },
        {
          role: 2,
          color: 9,
          pic: require("../../../assets/productColor/image365.jpg"),
        },
        {
          role: 2,
          color: 10,
          pic: require("../../../assets/productColor/image367.jpg"),
        },
        {
          role: 2,
          color: 11,
          pic: require("../../../assets/productColor/image369.jpg"),
        },
        {
          role: 2,
          color: 12,
          pic: require("../../../assets/productColor/image371.jpg"),
        },

        {
          role: 3,
          color: 0,
          pic: require("../../../assets/productColor/image633.jpg"),
        },
        {
          role: 3,
          color: 1,
          pic: require("../../../assets/productColor/image635.jpg"),
        },
        {
          role: 3,
          color: 2,
          pic: require("../../../assets/productColor/image637.jpg"),
        },
        {
          role: 3,
          color: 3,
          pic: require("../../../assets/productColor/image639.jpg"),
        },
        {
          role: 3,
          color: 4,
          pic: require("../../../assets/productColor/image641.jpg"),
        },
        {
          role: 3,
          color: 5,
          pic: require("../../../assets/productColor/image643.jpg"),
        },
        {
          role: 3,
          color: 6,
          pic: require("../../../assets/productColor/image645.jpg"),
        },
        {
          role: 3,
          color: 7,
          pic: require("../../../assets/productColor/image647.jpg"),
        },
        {
          role: 3,
          color: 8,
          pic: require("../../../assets/productColor/image649.jpg"),
        },
        {
          role: 3,
          color: 9,
          pic: require("../../../assets/productColor/image651.jpg"),
        },
        {
          role: 3,
          color: 10,
          pic: require("../../../assets/productColor/image653.jpg"),
        },
        {
          role: 3,
          color: 11,
          pic: require("../../../assets/productColor/image655.jpg"),
        },
        {
          role: 3,
          color: 12,
          pic: require("../../../assets/productColor/image657.jpg"),
        },

        {
          role: 4,
          color: 0,
          pic: require("../../../assets/productColor/image425.jpg"),
        },
        {
          role: 4,
          color: 1,
          pic: require("../../../assets/productColor/image427.jpg"),
        },
        {
          role: 4,
          color: 2,
          pic: require("../../../assets/productColor/image429.jpg"),
        },
        {
          role: 4,
          color: 3,
          pic: require("../../../assets/productColor/image431.jpg"),
        },
        {
          role: 4,
          color: 4,
          pic: require("../../../assets/productColor/image433.jpg"),
        },
        {
          role: 4,
          color: 5,
          pic: require("../../../assets/productColor/image435.jpg"),
        },
        {
          role: 4,
          color: 6,
          pic: require("../../../assets/productColor/image437.jpg"),
        },
        {
          role: 4,
          color: 7,
          pic: require("../../../assets/productColor/image439.jpg"),
        },
        {
          role: 4,
          color: 8,
          pic: require("../../../assets/productColor/image441.jpg"),
        },
        {
          role: 4,
          color: 9,
          pic: require("../../../assets/productColor/image443.jpg"),
        },
        {
          role: 4,
          color: 10,
          pic: require("../../../assets/productColor/image445.jpg"),
        },
        {
          role: 4,
          color: 11,
          pic: require("../../../assets/productColor/image447.jpg"),
        },
        {
          role: 4,
          color: 12,
          pic: require("../../../assets/productColor/image449.jpg"),
        },

        {
          role: 5,
          color: 0,
          pic: require("../../../assets/productColor/image399.jpg"),
        },
        {
          role: 5,
          color: 1,
          pic: require("../../../assets/productColor/image401.jpg"),
        },
        {
          role: 5,
          color: 2,
          pic: require("../../../assets/productColor/image403.jpg"),
        },
        {
          role: 5,
          color: 3,
          pic: require("../../../assets/productColor/image405.jpg"),
        },
        {
          role: 5,
          color: 4,
          pic: require("../../../assets/productColor/image407.jpg"),
        },
        {
          role: 5,
          color: 5,
          pic: require("../../../assets/productColor/image409.jpg"),
        },
        {
          role: 5,
          color: 6,
          pic: require("../../../assets/productColor/image411.jpg"),
        },
        {
          role: 5,
          color: 7,
          pic: require("../../../assets/productColor/image413.jpg"),
        },
        {
          role: 5,
          color: 8,
          pic: require("../../../assets/productColor/image415.jpg"),
        },
        {
          role: 5,
          color: 9,
          pic: require("../../../assets/productColor/image417.jpg"),
        },
        {
          role: 5,
          color: 10,
          pic: require("../../../assets/productColor/image419.jpg"),
        },
        {
          role: 5,
          color: 11,
          pic: require("../../../assets/productColor/image421.jpg"),
        },
        {
          role: 5,
          color: 12,
          pic: require("../../../assets/productColor/image423.jpg"),
        },
      ],
      chioseColorVal: 0,
      productRole: 0,
      productRoleBigImg: "",
      helpTipsVal: "",
      helpData: [
        "闹钟可以作为提醒的工具，采用闪光或震动闹钟可以叫醒熟睡中的你",
        "LEXIS是一个用在耳挂式助听器上的无线个人沟通系统，在对话时，LEXIS帮助克服环境中的噪音、距离、回音等挑战，LEXIS系统有两个组成：手持式发射器/麦克风以及FM接收器",
        "使用门铃感应器，当客人来访时会以闪光或震动来提醒你",
        "感应线圈回路系统经常会被安装在教堂、市政府、戏院等，配备有感应线圈的助听器可以接收到回路系统中的声音",
        "电话安装铃声及声音扩大器或闪光灯让使用者更容易注意到电话声及电话对话",
        "使用无线耳机直接将电子设备的声音传达给使用者",
      ],
    };
  },
  watch: {
    directionVal: {
      handler(val) {
        this.turnImg();
      },
      deep: true,
    },
    roleVal: {
      handler(val) {
        this.turnImg();
      },
      deep: true,
    },
    earVal: {
      handler(val) {
        this.turnImg();
      },
      deep: true,
    },
    chioseColorVal: {
      handler(val) {
        this.turnProduct();
      },
      deep: true,
    },
    productRole: {
      handler(val) {
        this.turnProduct();
      },
      deep: true,
    },
  },
  components: {
    BottomBtn,
  },
  created() {
    // this.init();
    console.log(this.ImageList);
  },
  methods: {
    async init() {
      await this.getImage("achievement,dataInfo");
      console.log(this.imageList);
    },
    getImage(key) {
      return api
        .postFormAPI("consultingManage/getConsultByCate", {
          category: key,
        })
        .then((res) => {
          if (res.data.result != 1) {
            return;
          }
          this.imageList.push(res.data.data[0]);
          return;
        })
        .catch((err) => console.log(err));
    },
    getComponentIndex(index) {
      this.componentIndex = index;
    },
    turnImg() {
      var directionVal = this.directionVal;
      var roleVal = this.roleVal;
      var earVal = this.earVal;
      var keys = {
        front: "",
        right: "",
        after: "",
        left: "",
      };
      this.loveData.forEach((item, index) => {
        if (
          item.direction == directionVal &&
          item.role == roleVal &&
          item.ear == earVal
        ) {
          // console.log(index);
          this.showImg = item.pic;
        }
        if (item.role == roleVal && item.ear == earVal) {
          for (let val in keys) {
            if (val == item.direction) {
              keys[val] = item;
            }
          }
        }
      });
      this.showImgDirection = keys;
    },
    chioseColor(e) {
      this.chioseColorVal = e;
      this.productImg = this.productColor[e].pic;
    },
    turnProduct() {
      var chioseColorVal = this.chioseColorVal;
      var productRole = this.productRole;
      this.allProductRoleImgs.forEach((item, index) => {
        if (item.color == chioseColorVal && item.role == productRole) {
          // console.log(index);
          this.productRoleBigImg = item.pic;
        }
      });
    },
    turnHelpTip(e) {
      this.helpTipsVal = this.helpData[e];
    },
  },
};
</script>

<style scoped lang="scss">
.OrganizationProfile {
  height: 100vh;
  display: flex;
  align-items: center;
  .chunk {
    box-sizing: border-box;
    height: 100vh;
    padding: 0 30px 66px;
    display: flex;
    align-items: center;
  }
  .one_case {
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .top {
      display: flex;
      flex-direction: row;
      .left {
        flex: 2;
        border: 1px solid #000;
        position: relative;
        img {
          width: 300px;
          height: auto;
          display: block;
          margin: 0 auto;
        }
        .btn_case {
          display: flex;
          margin-top: 20px;
          div {
            flex: 1;
            border: 1px solid #ddd;
            border-right: unset;
            box-sizing: border-box;
            font-size: 20px;
            text-align: center;
            img {
              width: 100%;
              height: auto;
            }
          }
          .is_sign {
            border: 4px solid #23db77;
            box-sizing: border-box;
          }
          div:last-child {
            border-right: 1px solid #ddd;
          }
        }
      }
      .right {
        margin-left: 40px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        div {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 10px 0 #ddd;
          cursor: pointer;
          padding: 10px;
        }
        .is_sign {
          box-shadow: 0 0 10px 0 #23db77;
        }
        img {
          width: auto;
          height: auto;
          margin-bottom: 6px;
        }
      }
    }
    .bottom {
      display: flex;
      flex-direction: row;
      text-align: center;
      margin-top: 30px;
      div {
        flex: 1;
        padding: 20px;
        box-sizing: border-box;
        position: relative;
        p {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
        }
      }
      .is_sign {
        box-shadow: 0 0 10px 0 #23db77;
      }
      img {
        width: 100%;
        height: auto;
      }
    }
  }
  .two_case {
    width: 100%;
    display: flex;
    flex-direction: column;
    .top {
      width: 100%;
      display: flex;
      flex-direction: row;
      .left {
        flex-grow: 1;
        margin-right: 30px;
        margin-left: 30px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        img {
          width: 200px;
          height: auto;
          display: block;
          margin: 0 auto;
        }
        p {
          margin: 40px 10px 20px;
        }
        .case {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          .color_btn {
            width: 50px;
            height: 50px;
            margin: 10px;
          }
          .sign {
            box-shadow: 0 0 20px 0 #333;
          }
        }
      }
      .right {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        margin-right: 30px;
        img {
          width: 500px;
        }
      }
    }
    .bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 30px;
      padding: 0 30px;
      img {
        width: 150px;
        height: auto;
      }
      .sign {
        box-shadow: 0 0 20px 0 #333;
      }
    }
  }
  .three_case {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    div {
      width: 100%;
      margin: 20px 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    p {
      margin: 40px;
      font-size: 30px;
      font-weight: bold;
      max-width: 400px;
      text-align: center;
    }
    img {
      width: 200px;
      height: 200px;
    }
  }
}
</style>
