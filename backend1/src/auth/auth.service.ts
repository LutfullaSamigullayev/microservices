import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Auth } from "./schemas/auth.schema";
import { Model } from "mongoose";
import { RegisterAuthDto } from "./dto/register-auth.dto";
import { LoginAuthDto } from "./dto/login-auth.dto";

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private authModel: Model<Auth>) {}
  async register(registerAuthDto: RegisterAuthDto) {
    const foundedEmail = await this.authModel.findOne({
      email: registerAuthDto.email,
    });
    if (foundedEmail) {
      throw new UnauthorizedException("Email already exists");
    }
    return this.authModel.create(registerAuthDto);
  }

  async login(loginAuthDto: LoginAuthDto) {
    const foundedUser = await this.authModel.findOne({
      email: loginAuthDto.email,
    });
    if (!foundedUser) {
      throw new BadRequestException("Email or password invalid");
    }
    if (loginAuthDto.password !== foundedUser.password) {
      throw new BadRequestException("Email or password invalid");
    }
    return "Succsess";
  }
}
