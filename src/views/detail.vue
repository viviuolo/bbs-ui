<template>
  <div class="page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'topic' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Topic</el-breadcrumb-item>
    </el-breadcrumb>

    <div v-if="topic">
      <h1>{{ topic.Title }}</h1>
      <el-row>
        <div style="float: left; width: 60px">
          <el-avatar v-if="topic.User__Name" :style="avatorColor"> {{topic.User__Name[0].toUpperCase()}}</el-avatar>
        </div>
        <div style="padding-top: 10px">
          <div class="content">
            <span>{{ topic.User__Name }}</span>
            <span> • </span>
            <span v-if="topic.CreatedTime">posted at {{ topic.CreatedTime.slice(0,10)}}</span>
            <i v-if="$store.getters.isLogin" class="el-icon-star-off" @click="toggleStar($event)" style="float:right; font-size:18px"></i>
          </div>
        </div>
      </el-row>
      <p>{{ topic.Content }}</p>
      <div style="color: #666666">
        <i class="el-icon-star-off"></i><span> {{topic.AgreeCount}} </span><span v-if="topic.AgreeCount <= 1">star</span><span v-else>stars</span>
        <span style="margin: auto 10px"> </span>
        <i class="el-icon-chat-round"></i><span> {{count}} </span><span v-if="count <= 1">comment</span><span v-else>comments</span>
        <span style="margin: auto 10px"> </span>
        <i class="el-icon-view"></i><span> {{topic.ViewCount}} </span><span v-if="topic.ViewCount <= 1">view</span><span v-else>views</span>
      </div>
    </div>

    <el-divider><i class="el-icon-chat-round"></i></el-divider>

    <el-row :gutter="20" v-if="$store.getters.isLogin">
      <el-col :span="23">
        <el-input v-model="userReply" type="textarea" placeholder="say something" :rows="3" maxlength="1000" autocomplete="off"></el-input>
      </el-col>
      <el-col :span="1" style="margin-top: 30px">
        <el-button @click="reply()" type="primary" icon="el-icon-position" circle></el-button>
      </el-col>
    </el-row>

    <el-timeline  style="padding-inline-start: 0; margin-top: 5%">
      <el-timeline-item v-for="item of replies" :key="item.Id" :timestamp="`${item.User__Name} ${item.CreatedTime.slice(0,10)} ${item.CreatedTime.slice(11,19)}`" icon="el-icon-chat-round" color="#FF791A" placement="top">
        <el-row v-if="$store.getters.userId == item.User__User">
          <span>{{item.Content}}</span>
          <i class="el-icon-edit" @click="reply()" style="margin-left: 10px"></i>
        </el-row>
        <p v-else>{{item.Content}}</p>
      </el-timeline-item>
    </el-timeline>

    <el-pagination v-if="count > 0"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="PageSize"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
  </div>
</template>

<script>
import { URL, TopicKey, PageSize } from '../utils/constants';

export default {
  name: 'Topic',
  data() {
    return {
      topicId: this.$cookie.get(TopicKey),
      topic: {},
      replies: [],
      count: 0,
      currentPage: 1,
      userReply: '',
      avatorColor: this.$common.getRandomColor(),
      PageSize
    };
  },
  created: function() {
    /*
    let topic = this.$cookie.get(TopicKey);
    if (!topic) {
      return;
    }
    this.topic = JSON.parse(topic)
    this.getReplies();
    */
   this.getTopic();
   this.getReplies();
  },
  methods: {
    getTopic() {
      this.$axios.get(`${URL.topic}/${this.topicId}`)
      .then((response) => {
        this.topic = response.data;
      })
      .catch((error) => {
        this.$message.error(error.message);
      });
    },
    getReplies() {
      this.$axios.get(`${URL.reply}?topic_id=${this.topicId}&page=${this.currentPage}&page_size=${PageSize}`)
      .then((response) => {
        this.replies = response.data.replies;
        this.count = response.data.count;
      })
      .catch((error) => {
        this.$message.error(error.message);
      });
    },
    reply() {
      if (this.userReply == '') {
        this.$message.error("Content should not be empty!");
        return;
      }

      this.$axios.post(`${URL.reply}`, {
        topic: this.topic.Id,
        content: this.userReply,
      })
      .then(() => {
        this.userReply = '';
        this.getReplies();
      })
      .catch((error) => {
        this.$message.error(error.message);
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getReplies();
    },
    // TODO: related star with user
    toggleStar(e) {
      var url = undefined;
  
      if (e.target.style.color) {
        e.target.style.color = ''
        url = `${URL.topicStar}${this.topic.Id}?type=decline`;
      } else {
        e.target.style.color='#FF791A';
        url = `${URL.topicStar}${this.topic.Id}?type=add`;
      }

      this.$axios.put(url)
      .then(() => {
        this.getTopic();
      })
      .catch((error) => {
        this.$message.error(error.message);
      });
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 16px;
  font-weight: 600;
}
.content {
  font-size: 14px;
  color: #666666;
}
.reply {
  font-size: 14px;
  margin-bottom: 18px;
}
.el-card__header {
  background-color: #666666;
  color: #c9c9c9
}
.el-card {
  border-radius: 4px;
  background-color: #FFFFFF;
  overflow: hidden;
  color: #333333;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}
</style>

