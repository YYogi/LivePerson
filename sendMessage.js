const webSocket = require('ws');
const getJWT= require('./getJWT');

const jwtURL = 'https://va.idp.liveperson.net/api/account/40912224/signup';
const webSocketURL = "wss://va.msg.liveperson.net/ws_api/account/40912224/messaging/consumer?v=3";

const sendMessage = messageToSend => {
    try {
        //Create SendMessage Connection
        const _webSocket = new webSocket(webSocketURL, null,
            {
                headers: {
                    Authorization: 'jwt ' + getJWT.getJWT(jwtURL)
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
            console.error(`webSocket error: ${error}`);
            console.log(`webSocket error: ${error}`);
        }

        //WebSocket onClose
        _webSocket.onclose = () => {
            console.log(`webSocket: closed`);
        };
    } catch (err) {
        console.error(`sendMessage: ${err}`);
    }
}

//Sending a sample test message!
sendMessage('Hello!! This is my first message');

