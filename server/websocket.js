// export function broadcastMessage(message) {
//     wss.clients.forEach(client => {
//         client.send(JSON.stringify(message))
//     })
// }

// export function privateMessage(message, id) {
//     wss.clients.forEach(client => {
//         if (JSON.stringify(client.id) === JSON.stringify(id)) {
//             client.send(JSON.stringify(message))
//         }
//     })
// }