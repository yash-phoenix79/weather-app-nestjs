import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";

@Injectable()
export class WeatherService {

    private readonly logger = new Logger(WeatherService.name);

    constructor(private readonly configService: ConfigService, private readonly httpService: HttpService) {

    }

    async getWeather(city: string): Promise<any> {
        const apiKey = this.configService.get<string>('WEATHER_API_KEY');
        // const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        this.logger.debug(`Fetching weather data for city: ${city}`);
        this.logger.debug(`Using URL: ${url}`);


        try {
            const res = await firstValueFrom(this.httpService.get(url));
            this.logger.log(`Weather data fetched successfully for city: ${city}`);
            this.logger.debug(`Response data: ${JSON.stringify(res.data)}`);
            return res.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                this.logger.error(`City not found: ${city}`, error.stack);
                throw new Error(`City not found: ${city}`);
            } else {
                this.logger.error(`Failed to fetch weather data for city: ${city}`, error.stack);
                throw new Error(`Failed to fetch weather data: ${error.message}`);
            }
        }
    }
}





/*
import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class WeatherService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'https://api.openweathermap.org/data/2.5/',
      params: {
        APPID: 'c12bdbbf
*/