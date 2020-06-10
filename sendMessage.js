const WebSocket = require('ws');
const getJWT= require('./getJWT');

const JWTurl = 'https://va.idp.liveperson.net/api/account/40912224/signup';
const websocketURL = "wss://va.msg.liveperson.net/ws_api/account/40912224/messaging/consumer?v=3";

const sendMessage = messageToSend => {
    try {
        //Create SendMessage Connection
        const _webSocket = new WebSocket(websocketURL, null,
            {
                headers: {
                    Authorization: 'jwt ' + getJWT.getJWT(JWTurl)
                }
            }
        );

        //Open SendMessage Connection
        _webSocket.onopen = () => {
            _webSocket.send('{"kind":"req","id":"1","type":"cm.ConsumerRequestConversation"}');
        }

        //OnMessage Received from SendMessage
        _webSocket.onmessage = (e) => {
            const obj = JSON.parse(e.data);
            const conversationID = obj.body.conversationId;
            _webSocket.send('{"kind":"req","id":2,"type":"ms.PublishEvent","body":{"dialogId":"'
                + conversationID + '","event":{"type":"ContentEvent","contentType":"text/plain","message":"'+messageToSend+'"}}}');

            _webSocket.close();
        }

        //Error handling for SendMessage
        _webSocket.onerror = error => {
            console.error(`WebSocket error: ${error}`);
            console.log(`WebSocket error: ${error}`);
        }

        //WebSocket onClose
        _webSocket.onclose = () => {
            console.log(`WebSocket: closed`);
        };
    } catch (err) {
        console.error(`WebSocket: ${err}`);
    }
}

sendMessage('Hello!! This is my first message');

