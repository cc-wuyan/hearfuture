<template>
  <el-row>
    <div class="other-components">
      <el-col :span="24">
        <div>备忘录</div>
        <div class="chunk" v-for="item in memorandum" :key="item.id">
          <div class="flex_row">
            <div class="time">{{item.createtime}}</div>
            <div class="name">{{item.truename}}</div>
          </div>
          <div class="content">{{item.content}}</div>
        </div>
        <!-- <span>附件</span> -->
        <el-table
          :header-cell-style="{background:'#f3f3f3',borderColor: '#fff'}"
          ref="filterTable"
          border
          fit
          highlight-current-row
          :data="data"
          style="width: 100%;margin: 10px 0"
          :default-sort="{prop: 'date', order: 'ascending'}"
        >
          <el-table-column align="center" prop="type" label="报告类型" width="auto"></el-table-column>
          <el-table-column align="center" prop="createTime" label="上传日期" width="auto"></el-table-column>
          <el-table-column align="center" prop="matcher" label="上传者" width="auto"></el-table-column>
          <el-table-column align="center" label="操作" width="auto">
            <template slot-scope="scope">
              <a
                v-if="scope.row.images!=''&&scope.row.images.length>0"
                style="margin-right:10px;"
              >
                <el-button type="primary" size="mini" @click="downloadByBlob(scope.row.images[0],'pic')" title="下载">下载</el-button>
              </a>
              <el-button type="default" size="mini" @click="delDocument(scope.row)" v-if="!canEdit" title="删除">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-dialog title="提示" :visible.sync="dialogVisible" class="dialogModal" width="500px">
        <div class="text">确认删除“{{deleteTime}}”这天的{{deleteReport}}？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteItem">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </el-row>
</template>
<script>
import api from "../../../api/api";
export default {
  name: "other",
  props: ["canEdit"],
  data() {
    return {
      listQuery: {
        id: 0,
      },
      memorandum: {},
      data: [],
      deleteId: "",
      deleteTime: "",
      deleteReport:"",
      dialogVisible: false,
    };
  },
  created() {
    // this.listQuery.id = this.$route.params.id;
    api
        .postFormAPI("patient/memorandum", {
          recordId: localStorage.getItem("recordId"),
          id: localStorage.getItem("patientId"),
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.result == 1) {
            setTimeout(() => {
              this.loading = false;
            }, 1000);
            this.memorandum = res.data.data;
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    this.history()
  },
  methods: {
    delDocument(row) {
      this.deleteId = row.id;
      this.deleteTime = row.createTime;
      this.deleteReport = row.type
      this.dialogVisible = true;
    },
    history(){
      api.postFormAPI("patient/historyDocument", {
            recordId: localStorage.getItem("recordId"),
            id: localStorage.getItem("patientId"),
            sid: localStorage.getItem("sid"),
          })
          .then((res) => {
            if (res.data.result == 1) {
              setTimeout(() => {
                this.loading = false;
              }, 1000);
              this.data = res.data.data;
            }
            //数据处理
          })
          .catch((err) => console.log(err));
    },
    deleteItem() {
      this.dialogVisible = false;
      api
        .postFormAPI("patient/delHistoryDocument", {
          hisId: this.deleteId,
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.result == 1) {
            this.$notify({
              message: res.data.message,
            });
            this.history()
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    downloadByBlob(url,name) {
      let image = new Image()
      image.setAttribute('crossOrigin', 'anonymous')
      image.src = url
      image.onload = () => {
        let canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        let ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0, image.width, image.height)
        canvas.toBlob((blob) => {
          let url = URL.createObjectURL(blob)
          this.download(url,name)
          // 用完释放URL对象
          URL.revokeObjectURL(url)
        })
      }
    },
     download(href, name) {
      let eleLink = document.createElement('a')
      eleLink.download = name
      eleLink.href = href
      eleLink.click()
      eleLink.remove()
    }
  },
};
</script>

<style lang="scss" scoped>
.other-components {
  margin: 0 30px;
  color: #212121;
  .chunk {
    margin-left: 30px;
    padding: 12px;
    border-bottom: 1px solid #e4e7ed;
  }
  .flex_row {
    display: flex;
    align-items: center;
  }
  .time {
    color: #a1a1a1;
  }
  .name {
    margin-left: 30px;
    color: #409eff;
  }
  .content {
    margin-top: 12px;
    line-height: 26px;
  }
}
</style>

<style lang="scss">
.other-components {
  .dialogModal {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
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
    .text {
      font-size: 18px;
      text-align: center;
      color: #646464;
    }
  }
}
</style>
