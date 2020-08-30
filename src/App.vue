<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import api from "./api/api";
export default {
  name: "app",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      localStorage.setItem("routeHistory", JSON.stringify(from.query));
      next();
    });
    window["GETSIDCallback"] = function (e) {
      console.log(e);
      localStorage.setItem("sid", e);
    };
    window["clearPatientId"] = function () {
      localStorage.removeItem("patientId");
      localStorage.removeItem("recordId");
      localStorage.removeItem("sid");
    };
    if (typeof localStorage.getItem("sidOption") == "string") {
      localStorage.getItem("sid");
    } else {
      window.GETSIDCallback();
      this.nativeCall({ call: "GETSIDCallback" }, "getSid");
    }
  },
  methods: {
    queryParams(data, isPrefix = false) {
      console.log(data);
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
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
  mounted() {},
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  /* -webkit-user-modify: read-write-plaintext-only; */
}
html,
body {
  width: 100%;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-user-select: text;
  font-size: 18px;
  font-family:Microsoft YaHei;
}
*:not(input, textarea) {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
a:focus,
input:focus,
p:focus,
img:focus,
span:focus,
div:focus {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
[contenteditable="true"],
input,
textarea {
  -webkit-user-select: auto !important;
  -khtml-user-select: auto !important;
  -moz-user-select: auto !important;
  -ms-user-select: auto !important;
  -o-user-select: auto !important;
  user-select: auto !important;
}
#app {
  height: auto;
}
.el-checkbox__inner {
  width: 24px !important;
  height: 24px !important;
}
.el-radio__inner {
  width: 24px !important;
  height: 24px !important;
}
.el-checkbox__inner::after {
  height: 14px !important;
  left: 10px !important;
  width: 5px !important;
}
.el-checkbox__label {
  font-size: 16px !important;
  color: #333 !important;
}

.el-radio__label {
  font-size: 16px !important;
  color: #333 !important;
}
</style>