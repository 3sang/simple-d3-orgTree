import mockjs from 'mockjs';

export default {
  'get /api/user/login': mockjs.mock({
    success: true,
    statusCode: 200,
    data: '数据嗷嗷嗷嗷',
  })
};