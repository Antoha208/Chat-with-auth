export const wsProtocol = (wss) => {
    wss.on('connection', function connection(ws) {
        ws.on('message', function (message) {
            message = JSON.parse(message)
            ws.id = [message.compId, message.id].sort()
            ws.privateId = message.id
            switch (message.event) {
                case 'connection':
                    broadcastMessage(wss, message)
                    break;
                case 'request':
                    requestMessage(wss, message, message.compId)
                    break;
                case 'edit':
                    editMessage(wss, message, message.compId)
                    break;
                case 'deleteMess':
                    editMessage(wss, message, message.compId)
                    break;
                case 'message':
                    privateMessage(wss, message, ws.id)
                    break;
                case 'deleteChat':
                    requestMessage(wss, message, message.compId)
                    break;
                case 'disconnect':
                    privateMessage(wss, message, ws.id)
                    ws.close()
            }
        })
    })
}

export const broadcastMessage = (wss, message) => {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}

export const privateMessage = (wss, message, id) => {
    wss.clients.forEach(client => {
        if (JSON.stringify(client.id) === JSON.stringify(id)) {
            client.send(JSON.stringify(message))
        }
    })
}

export const requestMessage = (wss, message, id) => {
    wss.clients.forEach(client => {
        if (client.id.includes(id)) {
            client.send(JSON.stringify(message))
        }
    })
}

export const editMessage = (wss, message, id) => {
    wss.clients.forEach(client => {
        if (client.privateId === id) {
            client.send(JSON.stringify(message))
        }
    })
}
