const SendMessage = require('ws');
const getJWT= require('./getJWT');

const JWTurl = 'https://va.idp.liveperson.net/api/account/40912224/signup';
const websocketURL = "wss://va.msg.liveperson.net/ws_api/account/40912224/messaging/consumer?v=3";

const sendMessage = messageToSend => {
    try {
        //Create SendMessage Connection
        const webSocket = new SendMessage(websocketURL, null,
            {
                headers: {
                    Authorization: 'jwt ' + getJWT.getJWT(JWTurl)
                }
            }
        );

        //Open SendMessage Connection
        webSocket.onopen = () => {
            webSocket.send('{"kind":"req","id":"1","type":"cm.ConsumerRequestConversation"}');
        }

        //OnMessage Received from SendMessage
        webSocket.onmessage = (e) => {
            const obj = JSON.parse(e.data);
            const conversationID = obj.body.conversationId;
            webSocket.send('{"kind":"req","id":2,"type":"ms.PublishEvent","body":{"dialogId":"'
                + conversationID + '","event":{"type":"ContentEvent","contentType":"text/plain","message":"'+messageToSend+'"}}}');

            webSocket.close();
        }

        //Error handling for SendMessage
        webSocket.onerror = error => {
            console.error(`WebSocket error: ${error}`);
            console.log(`WebSocket error: ${error}`);
        }

        webSocket.onclose = () => {
            console.log(`WebSocket: closed`);
        };
    } catch (err) {
        console.error(`WebSocket: ${err}`);
    }
}

sendMessage('Hello!! This is my first message');

