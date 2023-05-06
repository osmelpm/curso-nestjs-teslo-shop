import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';

interface ConnectedClients {
  [id: string]: {
    socket: Socket;
    user: User;
  };
}

@Injectable()
export class MessagesWsService {
  private connectedClients: ConnectedClients = {};

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async suscribeClient(client: Socket, userId: string) {
    const user = await this.userRepository.findOneBy({
      id: userId,
    });

    if (!user.isActive) {
      console.log(`User is inactive`);
      client.disconnect();
      return;
    }

    this.checkUserDuplicity(user);

    this.connectedClients[client.id] = {
      socket: client,
      user,
    };
  }

  unsuscribeClient(clientId: string) {
    delete this.connectedClients[clientId];
  }

  getClients() {
    return Object.keys(this.connectedClients);
  }

  getFullName(socketId: string) {
    return this.connectedClients[socketId].user.fullName;
  }

  private checkUserDuplicity(user: User) {
    for (const clientId of Object.keys(this.connectedClients)) {
      const connectedUser = this.connectedClients[clientId];
      if (connectedUser.user.id === user.id) {
        connectedUser.socket.disconnect();
        break;
      }
    }
  }
}
