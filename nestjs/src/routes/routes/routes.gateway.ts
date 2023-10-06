import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RoutesGateway {
  @SubscribeMessage('new-points')
  handleMessage(client: Socket,
    payload: { route_id:string; lat:number; lng: number},
  ) {
    client.broadcast.emit('admin-new-points', payload);
    client.broadcast.emit(`new-points/${payload.route_id}`, payload);
  }
}
