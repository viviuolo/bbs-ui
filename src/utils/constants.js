export const URL = {
    user: '/api/user',
    login: '/api/login',
    topic: '/api/topic',
    topicStar: '/api/topicstar/',
    topicView: '/api/topicview/',
    topicReply: '/api/topicreply/',
    reply: '/api/reply',
    authToken: '/api/authtoken',
}

export const TokenExpiredTime = 60 * 60 * 1000; // 1h
export const TokenKey = "_token_bbs"
export const TopicKey = "_topic_items"  // Save into cookies in order to lose info when refresh page

export const PageSize = 10