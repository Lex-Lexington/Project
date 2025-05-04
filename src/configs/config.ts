import { registerAs } from "@nestjs/config";
export enum ConfigKey {
  App = 'APP',
}

export enum Environment {
    Local = 'local',
    Development = 'development',
    Staging = 'staging',
    Production = 'production',
    Testing = 'testing',
  }

const APPConfig = registerAs(ConfigKey.App, () => ({
    env:
        Environment[process.env.NODE_ENV as keyof typeof Environment] ||
        'development',
    port: parseInt(process.env.PORT || '3000')
}));

export const configurations = [APPConfig];