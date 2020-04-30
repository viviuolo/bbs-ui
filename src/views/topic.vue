<template>
  <div class="page">
    <div v-if="!topics" style="text-align: center">No topics</div>

    <el-card v-for="item of topics" :key="item.Id" style="margin-top: 1%; margin-bottom: 1%" shadow="hover">
      <el-row>
        <el-col :span="4" style="float: left; width: 60px">
          <el-avatar :style="$common.getRandomColor()">{{ item.User__Name[0].toUpperCase()}}</el-avatar>
        </el-col>
        <el-col :span="20">
          <div>
            <el-link @click="toTopicDetail(item)" class="title" :underline="false">{{ item.Title }}</el-link>
          </div>
          <div class="content">{{ item.Content }}</div>

          <div class="content">
            <span>{{ item.User__Name }}</span>
            <span> • </span>
            <span>{{ item.CreatedTime.slice(0,10)}}</span>
            <span> • </span>
            <span>{{ item.ReplyCount }} </span><span v-if="item.ReplyCount <= 1">reply</span><span v-else>replies</span>
          </div>
        </el-col>
      </el-row>
    </el-card>
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
      topics: [],
      count: 0,
      currentPage: 1,
      PageSize,
    };
  },
  created: function() {
    this.getTopics();
  },
  methods: {
    getTopics() {
      this.$axios.get(`${URL.topic}?page=${this.currentPage}&page_size=${PageSize}`)
      .then((response) => {
        this.topics = response.data.topics;
        this.count = response.data.count;
      })
      .catch((error) => {
        this.$message.error(error.message);
      });
    },
    toTopicDetail(item) {
      //this.$cookie.set(TopicKey, JSON.stringify(item));
      this.$cookie.set(TopicKey, item.Id.toString());
      this.$axios.put(`${URL.topicView}${item.Id}`)
      .catch((error) => {
        console.log(error.message);
      });
      this.$router.push({ name: 'detail'})
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTopics();
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 20px;
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

