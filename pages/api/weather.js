import axios from 'axios';

export async function getCityData(cityName, stateCode) {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching city data:', error.message);
        throw new Error('Failed to fetch city data');
    }
}

export async function getWeatherData(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=imperial`; 
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        throw new Error('Failed to fetch weather data');
    }
}

