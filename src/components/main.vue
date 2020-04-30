<template>
  <el-container>
    <el-header>
      <el-menu mode="horizontal" :default-active="$route.path" router
        background-color="#333333"
        text-color="#C9C9C9"
        active-text-color="#FF791A">
        <el-menu-item index="">
          <!--Logo here-->
          <!--img src="#" style="height:30px; margin-top:5px" @click="$router.push({ name: 'topic'})"-->
        </el-menu-item>
        <el-menu-item index="" class="hidden-xs-only" @click="$router.push({ name: 'topic'})">
          <div>Balabala</div>
        </el-menu-item>

        <el-menu-item v-if="!$store.getters.isLogin" index="" style="float: right;">
          <el-button type="text" @click="registerVisible = true">Register</el-button>
        </el-menu-item>
        <el-menu-item v-if="!$store.getters.isLogin" index="" style="float: right; padding: 0">
          <el-divider direction="vertical"></el-divider>
        </el-menu-item>
        <el-menu-item v-if="!$store.getters.isLogin" index="" style="float: right">
          <el-button type="text" @click="loginVisible = true">Login</el-button>
        </el-menu-item>

        <el-submenu index="" v-if="$store.getters.isLogin" style="float: right; margin-right: 2%">
          <template slot="title">{{$store.getters.username}}</template>
          <!--el-menu-item index="">Profile</el-menu-item-->
          <el-menu-item index="" @click="logout()">Logout</el-menu-item>
        </el-submenu>
        <el-button v-if="$store.getters.isLogin" @click="topicVisible = true" type="primary" icon="el-icon-edit" size="small" circle style="margin: 14px 10px 0 0; float: right"></el-button>
      </el-menu>
    </el-header>
    <el-main v-if="isRouterAlive">
      <router-view></router-view>
    </el-main>

    <el-dialog title="Login" :visible.sync="loginVisible" width="50%" @close="resetForm('loginForm')">
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" @submit.native.prevent>
        <el-form-item label="Username" prop="name">
          <el-input v-model="loginForm.name" maxlength="100" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="loginForm.password" show-password maxlength="100" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="loginVisible = false; resetForm('loginForm')">Cancel</el-button>
        <el-button type="primary" @click="login()" native-type="submit">Login</el-button>
      </div>
    </el-dialog>

    <el-dialog title="Register" :visible.sync="registerVisible" :close-on-click-modal="false" width="50%" @close="resetForm('registerForm')">
      <el-form :model="registerForm" :rules="registerRules" ref="registerForm">
        <el-form-item label="Username" prop="name">
          <el-input v-model="registerForm.name" maxlength="100" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="registerForm.email" maxlength="100" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="registerForm.password" show-password maxlength="100" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Password Confirm" prop="checkPass">
          <el-input v-model="registerForm.checkPass" show-password maxlength="100" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="registerVisible = false; resetForm('registerForm')">Cancel</el-button>
        <el-button type="primary" @click="register()">Submit</el-button>
      </div>
    </el-dialog>

    <el-dialog title="Topic" :visible.sync="topicVisible" width="50%" @close="resetForm('topicForm')">
      <el-form :model="topicForm" :rules="topicRules" ref="topicForm">
        <el-form-item label="Title" prop="title">
          <el-input v-model="topicForm.title" maxlength="500" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Content" prop="content">
          <el-input v-model="topicForm.content" type="textarea" :rows="3" maxlength="1000" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="topicVisible = false; resetForm('topicForm')">Cancel</el-button>
        <el-button type="primary" @click="submitTopic()">Submit</el-button>
      </div>
    </el-dialog>
    
  </el-container>
</template>

<script>
import { URL, TokenKey } from '../utils/constants';

export default {
  name: 'Main',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'));
      } else if (value !== this.registerForm.password) {
        callback(new Error('Two password don\'t match!'));
      } else {
        callback();
      }
    };

    return {
      isRouterAlive: true,
      loginVisible: false,
      loginForm: {
        name: '',
        password: '',
      },
      loginRules: {
        name: [
          { required: true, message: 'This field is required', trigger: 'change' },
          { min: 3, max: 20, message: 'Length should be 3 to 20', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'This field is required', trigger: 'change' }
        ],
      },
      registerVisible: false,
      registerForm: {
        name: '',
        password: '',
        checkPass: '',
        email: '',
      },
      registerRules: {
        name: [
          { required: true, message: 'This field is required', trigger: 'change' },
          { min: 3, max: 20, message: 'Length should be 3 to 20', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'This field is required', trigger: 'change' }
        ],
        checkPass: [
          { required: true, message: 'This field is required', trigger: 'change' },
          { validator: validatePass, trigger: 'change' }
        ],
        email: [
          { required: true, message: 'This field is required', trigger: 'change' },
          { type: 'email', message: 'Enter a valid email address', trigger: 'change' }
        ],
      },
      topicVisible: false,
      topicForm: {
        title: '',
        content: '',
      },
      topicRules: {
        title: [
          { required: true, message: 'This field is required', trigger: 'change' },
          { min: 1, max: 500, message: 'Length should be 1 to 500', trigger: 'change' }
        ],
        content: [
          { required: false, min: 1, max: 1000, message: 'Length should be 1 to 1000', trigger: 'change' }
        ],
      },
    }
  },
  created: function() {
    this.authToken();
  },
  methods: {
    authToken() {
      this.$axios.get(URL.authToken)
        .then((response) => {
          this.$cookie.set(TokenKey, response.data.Token);
          const user = {
            id: response.data.Id,
            name: response.data.Name
          }
          this.$store.dispatch('login', user);
        })
        .catch(() => {
          this.logout();
        });
    },
    login() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.$axios.post(URL.login , this.loginForm)
          .then((response) => {
            this.$cookie.set(TokenKey, response.data.Token);
            const user = {
              id: response.data.Id,
              name: response.data.Name
            }
            this.$store.dispatch('login', user);
            this.loginVisible = false;
          })
          .catch((error) => {
            this.$message.error(error.message);
            this.logout();
          });
        } else {
          return false;
        }
      });
    },
    logout () {
      this.$store.dispatch('logout');
      this.$cookie.delete(TokenKey);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    refreshPage() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      })
    },
    submitTopic() {
      this.$refs['topicForm'].validate((valid) => {
        if (valid) {
          this.$axios.post(URL.topic , this.topicForm)
          .then(() => {
            this.topicVisible = false;
            this.$router.push({ name: 'topic'})
            this.refreshPage()
          })
          .catch((error) => {
            this.$message.error(error.message);
          });
        } else {
          return false;
        }
      });
    },
    register() {
      this.$refs['registerForm'].validate((valid) => {
        if (valid) {
          this.$axios.post(URL.user , this.registerForm)
          .then((response) => {
            this.$cookie.set(TokenKey, response.data.Token);
            const user = {
              id: response.data.Id,
              name: response.data.Name
            }
            this.$store.dispatch('login', user);
            this.registerVisible = false;
          })
          .catch((error) => {
            this.$message.error(error.message);
          });
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
.el-menu.el-menu--horizontal {
  border-bottom: solid 1px #FF791A !important;
}
.el-button--text {
  color: #c9c9c9 !important;
}
/*
.el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
  border-bottom: none !important;
}
*/
</style>
