<template>
  <div class="problem_add">
    <el-form ref="ruleForm" :model="ruleForm" label-width="60px" :rules="rules">
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <editor-bar v-model="ruleForm.content"></editor-bar>
      </el-form-item>
    </el-form>
    <div class="flex_row">
      <div class="save_btn" @click="save">保存</div>
      <div class="cancle_btn" @click="cancle">取消</div>
    </div>
  </div>
</template>

<script>
import EditorBar from "../commonProblem/wangEditor";
import common from "../../../utils/common";
import api from "../../../api/api";
export default {
  data() {
    return {
      ruleForm: {
        title: "",
        content: "",
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
    };
  },
  components: {
    EditorBar,
  },
  created() {
    if (this.$route.query.id) {
      this.ruleForm.id = this.$route.query.id;
      api
        .postFormAPI("question/appDetail", {
          id: this.$route.query.id,
        })
        .then((res) => {
          if (res.data.result != 1) {
            return;
          }
          this.ruleForm.title = res.data.data.title;
          this.ruleForm.content = res.data.data.content;
        })
        .catch((err) => console.log(err));
    }
  },
  methods: {
    save() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) {
          console.log(this.ruleForm.content);
          return;
        } else {
          this.ruleForm.sid = localStorage.getItem("sid");
          api
            .postFormAPI("question/appEdit", this.ruleForm)
            .then((res) => {
              if (res.data.result != 1) {
                this.$notify({
                  message: res.data.message,
                });
                return;
              }
              this.$notify({
                message: res.data.message,
              });
              common(this);
            })
            .catch((err) => console.log(err));
        }
      });
    },
    cancle() {
      common(this);
    },
  },
};
</script>

<style lang="scss" scoped>
.problem_add {
  margin: 30px 30px 0;
  font-size: 16px;
  font-family: PingFang SC;
  color: #212121;
  .flex_row {
    display: flex;
    justify-content: center;
  }
  .save_btn,
  .cancle_btn {
    background-color: #74bcee;
    color: #fff;
    font-size: 16px;
    border-radius: 6px;
    padding: 6px 12px;
    text-align: center;
  }
  .cancle_btn {
    margin-left: 20px;
    background-color: #fff;
    color: #646464;
    border: 1px solid #646464;
  }
}
</style>

<style lang="scss" >
.problem_add {
  .el-form-item {
    margin-bottom: 28px;
  }
  .el-form-item__label,
  .el-input__inner {
    font-size: 16px;
    font-family: PingFang SC;
    color: #646464;
  }
  .el-form-item__label {
    color: #212121;
  }
}
</style>