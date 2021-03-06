import React, {Component} from 'react';
import {Button, InputItem, List, NavBar, WhiteSpace, WingBlank} from "antd-mobile";
import Logo from "../logo";

import md5 from 'blueimp-md5';

import {reqLogin} from '../../api'

class Login extends Component {
  
  state = {
    username :'',
    password:''
  };

  goRegister = () =>{
    this.props.history.replace('/register');
  };

  handleValue = (name,val) =>{
    this.setState({
      [name]:val
    })
  };
  //点击登录
  Tologin = async () =>{
    //获取状态
    const {username,password} = this.state;

    //判断用户输入是否合法
    if (!username || !password)  return;

    //发送请求
    const data = await reqLogin({username,password:md5(password)});
    console.log(data);
    //当我密码和用户名都正确时，跳转页面
    if (data.data.code === 0){
      this.props.history.replace('/main');
    }
  };

  render() {
    return (
      <div>
        <NavBar>硅 谷 直 聘</NavBar>
        <Logo />
        <WingBlank>
          <form>
            <List>
              <WhiteSpace />
              <InputItem placeholder="请输入用户名"
                         onChange={val => this.handleValue('username',val)}
                         >用户名:</InputItem>
              <WhiteSpace />
              <InputItem placeholder="请输入密码" type="password"
                         onChange={val => this.handleValue('password',val)}
                         >密 码:</InputItem>
              <WhiteSpace />
              <Button type="primary" onClick={this.Tologin}>登录</Button><WhiteSpace />
              <Button onClick={this.goRegister}>还没有账户</Button><WhiteSpace />
            </List>
          </form>
        </WingBlank>
      </div>
    )
  }
}

export default Login;