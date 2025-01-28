
import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';


@Injectable()
export class UserService {


  constructor(@InjectRepository(User) private userRepo: Repository<User>, private jwtService: JwtService) { }
  async create(payload: CreateUserDto) {
    const { email, password, ...rest } = payload;
    const user = await this.userRepo.findOne({ where: { email: email } });
    if (user) {
      throw new HttpException('Email already exists', 400);
    }
    const hashedPassword = await argon2.hash(password);

    const userDetails = await this.userRepo.save({
      ...rest, email, password: hashedPassword
    })

    delete userDetails.password;
    const Userpayload = { email: userDetails.email, id: userDetails.id };
    return {
      access_token: await this.jwtService.signAsync(Userpayload),
    };
  }

  findEmail(email: any) {
    return this.userRepo.findOne({ where: { email } });
  }

  findAll() {
    return ('This action returns all user');
  }

  findOne(id: number) {
    return (`This action returns a #${id} user`);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return (`This action updates a #${id} user`);
  }

  remove(id: number) {
    return (`This action removes a #${id} user`);
  }

  async user(headers: any): Promise<any> {
    const authorizationHeader = headers.authorization;
    if (authorizationHeader) {
      const token = authorizationHeader.replace('Bearer', '');
      const secret = process.env.JWTSECRET;

      try {
        const decoded = this.jwtService.verify(token);
        let id = decoded["id"];
        let user = await this.userRepo.findOneBy({ id });

        return { id: user.id, name: user.name, email: user.email, role: user.role };
      }
      catch (error) {
        throw new UnauthorizedException('Invalid token');
      }

    } else {
      throw new UnauthorizedException('Invalid or missing Bearer token');
    }
  }
}