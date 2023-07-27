import axios from 'axios';

export async function getTimezoneFromCoordinates(latitude, longitude, apiKey) {
  const apiUrl = 'https://maps.googleapis.com/maps/api/timezone/json';

  try {
    const response = await axios.get(apiUrl, {
      params: {
        location: `${latitude},${longitude}`,
        key: apiKey,
        timestamp: 1331161200,
      },
    });

    if (response.data && response.data.timeZoneId) {
      return response.data.timeZoneId;
    }
  } catch (err) {
    console.error(err);
  }
}
