import { Controller, Get, Logger, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('weather')
export class WeatherController {

    private readonly logger = new Logger(WeatherController.name);

    constructor(private readonly weatherService: WeatherService) { }

    @Get()
    @ApiOperation({ summary: 'Get weather information for a specific city' })
    @ApiQuery({ name: 'city', required: true, description: 'Name of the city' })
    @ApiResponse({ status: 200, description: 'Successful response' })
    @ApiResponse({ status: 400, description: 'Invalid request' })
    async getWeather(@Query('city') city: string) {
        this.logger.debug(`getWeather`);
        try {
            const weatherData = await this.weatherService.getWeather(city);
            this.logger.log(`Successfully fetched weather data for city: ${city}`);
            return weatherData;
        } catch (error) {
            this.logger.error(`Failed to fetch weather data for city: ${city}`, error.stack);
            throw error;
        }
    }
}
