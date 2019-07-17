import Server from './server'

class API extends Server {
  /**
   *  用途：获取验证码
   *  @url http://cangdu.org:8001/v1/captchas
   *  返回status为1表示成功
   *  @method get
   *  @return {promise}
   */

  async getCaptchaCode () {
    try {
      let result = await this.forcaptcha('post', 'http://elm.cangdu.org/v1/captchas', {})
      if (result.status === 1 && (result instanceof Object)) {
        return result || []
      } else {
        let err = {
          tip: '获取验证码失败',
          response: result
        }
        throw err
      }
    } catch (err) {
      throw err
    }
  }

  /**
   *  用途：验证码验证
   *  @url http://cangdu.org:8001/v2/login
   *  @method post
   *  @return {promise}
   */
  async CaptchaCode (data) {
    try {
      let result = await this.forcaptcha('post', 'http://elm.cangdu.org/v2/login', data)
      if (result.status !== 0 && (result instanceof Object)) {
        return result || []
      } else {
        let err = {
          tip: '注册失败',
          response: result
        }
        return err
      }
    } catch (err) {
      throw err
    }
  }

  /**
   *  用途：账户验证
   *  @url http://cangdu.org:8001/v2/login
   *  @method post
   *  @return {promise}
   */
  async accountLogin (data) {
    try {
      let result = await this.axios('post', 'https://www.easy-mock.com/mock/5c01297d4ed9b43d7590d554/example/login', data)
      if (result.status !== 0 && (result instanceof Object)) {
        return result || []
      } else {
        let err = {
          tip: '登录失败',
          response: result
        }
        return err
      }
    } catch (err) {
      throw err
    }
  }

  /**
   *  用途：账户注册
   *  @method post
   *  @return {promise}
   */
  async accountRegister (data) {
    try {
      let result = await this.axios('post', 'http://47.102.147.80:80/auth/register', data)
      if (result.status !== 0 && (result instanceof Object)) {
        return result || []
      } else {
        let err = {
          tip: '登录失败',
          response: result
        }
        return err
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * 获取用户消息
   * @param {*} get的拼接参数
   */

  async getUser (data) {
    try {
      // eslint-disable-next-line no-undef
      let result = await this.axios('get', '/v1/user' + getUrlConcat(data))
      if (result.status !== 0 && (result instanceof Object)) {
        return result || []
      } else {
        let err = {
          tip: '获取用户信息失败',
          response: result
        }
        throw err
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * 发送点的信息
   */

  async sendPoint (data) {
    try {
      let result = await this.axios('post', 'https://www.easy-mock.com/mock/5c01297d4ed9b43d7590d554/example/sendPoint', data)
      if (result.status !== 0 && (result instanceof Object)) {
        return result || []
      } else {
        let err = {
          tip: '创建失败',
          response: result
        }
        return err
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * 获取所有点的大致信息
   */

  async getAllPoint (data) {
    try {
      let result = await this.axios('get', 'https://www.easy-mock.com/mock/5c01297d4ed9b43d7590d554/example/getAllPoint', data)
      if (result.status !== 0 && (result instanceof Object)) {
        return result || []
      } else {
        let err = {
          tip: '获取失败',
          response: result
        }
        return err
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * 获取一个点的详细信息
   */

  async getOnePoint (data) {
    try {
      let result = await this.axios('post', 'https://www.easy-mock.com/mock/5c01297d4ed9b43d7590d554/example/getOnePoint', data)
      if (result.status !== 0 && (result instanceof Object)) {
        return result || []
      } else {
        let err = {
          tip: '获取失败',
          response: result
        }
        return err
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * 发送一个已经编辑过的点
   */

  async sendNewPoint (data) {
    try {
      let result = await this.axios('put', 'https://www.easy-mock.com/mock/5c01297d4ed9b43d7590d554/example/sendNewPoint', data)
      if (result.status !== 0 && (result instanceof Object)) {
        return result || []
      } else {
        let err = {
          tip: '发送失败',
          response: result
        }
        return err
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * 删除一个点
   */

  async deletePoint (data) {
    try {
      let result = await this.axios('post', 'https://www.easy-mock.com/mock/5c01297d4ed9b43d7590d554/example/deletePoint', data)
      if (result.status !== 0 && (result instanceof Object)) {
        return result || []
      } else {
        let err = {
          tip: '删除失败',
          response: result
        }
        return err
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * 重置密码
   */

  async resetPassword (data) {
    try {
      let result = await this.axios('post', '', data)
      if (result.status !== 0 && (result instanceof Object)) {
        return result || []
      } else {
        let err = {
          tip: '重置失败',
          response: result
        }
        return err
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * 修改邮箱
   */

  async emailChange (data) {
    try {
      let result = await this.axios('put', '', data)
      if (result.status !== 0 && (result instanceof Object)) {
        return result || []
      } else {
        let err = {
          tip: '修改失败',
          response: result
        }
        return err
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * 确认修改邮箱
   */

  async confirmEmailChange (data) {
    try {
      let result = await this.axios('get', '', data)
      if (result.status !== 0 && (result instanceof Object)) {
        return result || []
      } else {
        let err = {
          tip: '失败',
          response: result
        }
        return err
      }
    } catch (err) {
      throw err
    }
  }
}

export default new API()
