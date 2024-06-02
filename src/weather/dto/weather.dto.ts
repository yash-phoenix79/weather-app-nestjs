// src/weather/dto/weather.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class WeatherDto {
    @ApiProperty()
    city: string;

    @ApiProperty()
    temperature: number;

    @ApiProperty()
    description: string;
}
