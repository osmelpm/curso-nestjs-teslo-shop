import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { MessageDto } from './dtos/message.dto';
import { MessagesWsService } from './messages-ws.service';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;
  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;
    let payload: JwtPayload;
    try {
      payload = this.jwtService.verify(token);
      await this.messagesWsService.suscribeClient(client, payload.userId);
    } catch (error) {
      client.disconnect();
      return;
    }

    this.wss.emit('clients-updated', this.messagesWsService.getClients());
  }

  handleDisconnect(client: Socket) {
    this.messagesWsService.unsuscribeClient(client.id);
    this.wss.emit('clients-updated', this.messagesWsService.getClients());
  }

  @SubscribeMessage('client-message')
  onClientMessage(client: Socket, payload: MessageDto) {
    //Para emitir solo al cliente que emitió
    // client.emit('server-message', {
    //   fullName: client.id,
    //   message: payload.message,
    // });

    //Para emitir a todos menos al cliente que emitió
    // client.broadcast.emit('server-message', {
    //   fullName: client.id,
    //   message: payload.message,
    // });

    //Para emitir a todos los clientes
    this.wss.emit('server-message', {
      fullName: this.messagesWsService.getFullName(client.id),
      message: payload.message,
    });
  }
}
