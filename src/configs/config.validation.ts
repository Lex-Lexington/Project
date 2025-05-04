import { plainToClass } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsNumberString,
  MinLength,
  validateSync,
} from 'class-validator';
import { Environment } from './config';

export class ConfigValidation {
  @IsDefined()
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsDefined()
  @IsNumberString()
  @MinLength(1)
  PORT: string;
}

export function validateConfig(configuration: Record<string, unknown>) {
  const finalConfig = plainToClass(ConfigValidation, configuration, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(finalConfig, { skipMissingProperties: false });

  let index = 0;
  for (const err of errors) {
    Object.values({ ...err.constraints }).map((str) => {
      ++index;
      console.log(index, str);
    });
    console.log('\n ***** \n');
  }
  if (errors.length)
    throw new Error('Please provide the valid ENVs mentioned above');

  return finalConfig;
}