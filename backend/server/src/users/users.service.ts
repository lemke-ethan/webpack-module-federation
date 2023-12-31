import { Injectable } from '@nestjs/common';
import { User } from "server"

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'sally',
      password: '123',
    },
    {
      userId: 2,
      username: 'maria',
      password: '123',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
