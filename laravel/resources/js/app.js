import './bootstrap'
import Vue from 'vue'
import ArticleLike from './components/ArticleLike'
import ArticleTagsInput from './components/ArticleTagsInput'
import FollowButton from './components/FollowButton'

import EditorJS from "@editorjs/editorjs";
import axios from "axios";
import qs from "qs";

axios.defaults.headers.common = {
  "X-Requested-With": "XMLHttpRequest",
  "X-CSRF-TOKEN": document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content"),
};

export default {
  data: function () {
    return {
      editor: undefined,
      title: "",
      mainText: "",
      interval_handler: undefined,
      post_id: undefined,
    };
  },
  methods: {
    save: async function () {
      if (this.post_id != undefined) {
        this.update();
        return;
      }

      //Editor.jsの作成したエディタ内容の保存
      //保存するとオブジェクトになる。
      const result = await this.editor.save();

      //axiosでサーバーに送信する。
      //Edier.jsの保存データは、オブジェクトなので、文字列化して送信する
      const save_result = await axios.post(`/api/posts`, {
        post: { title: this.title, main_text: JSON.stringify(result) },
        paramsSerializer: function (params) {
          return qs.stringify(params, { arrayFormat: "brackets" });
        },
      });

      //初回保存の結果に含まれるIDを保存
      this.post_id = save_result.data.id;

      //初回の保存ができた、一分ごとの自動保存を開始する
      this.interval_handler = setInterval(this.save, 60000);
    },
    update: async function () {
      const result = await this.editor.save();

      //IDを基に更新を実行
      const save_result = await axios.patch(`/api/posts/${this.post_id}`, {
        post: { title: this.title, main_text: JSON.stringify(result) },
        paramsSerializer: function (params) {
          return qs.stringify(params, { arrayFormat: "brackets" });
        },
      });
      if (save_result.data.state == "OK") {
        console.log("Updated");
      }
    },
    init: async function () {
      //Editor.jsの初期化
      this.editor = new EditorJS({
        //Editor.jsの対象にするidを与える
        holder: "editorjs",
      });
    },
  },
  mounted() {
    this.init();
  },
  beforeUnmount: function () {
    //コンポーネント破棄される前にintervalを削除する
    clearInterval(this.interval_handler);
  },
};
const app = new Vue({
  el: '#app',
  components: {
    ArticleLike,
    ArticleTagsInput,
    FollowButton,
  }
})