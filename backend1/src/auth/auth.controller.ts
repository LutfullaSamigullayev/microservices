import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterAuthDto } from "./dto/register-auth.dto";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { EventPattern } from "@nestjs/microservices";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @EventPattern('hello')
  async hello(data: string) {
    console.log(data);
  }

  @EventPattern('hello2')
  async hello2(data: string) {
    console.log(data);
  }

  @Post()
  register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Post()
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }
}
