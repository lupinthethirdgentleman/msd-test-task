import axios from 'axios';

const JSON_STRUCTURE = JSON.stringify({
  date: 'date',
  newCases: 'newCasesByPublishDate',
  areaName: 'areaName',
  areaCode:"areaCode",
  newPeopleVaccinatedFirstDoseByPublishDate: 'newPeopleVaccinatedFirstDoseByPublishDate',
  newPeopleVaccinatedSecondDoseByPublishDate: 'newPeopleVaccinatedSecondDoseByPublishDate'
});

export async function covidDataService() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }
  const apiUrl = `${baseUrl}?filters=areaType=nation;date=2021-06-05&structure=${JSON_STRUCTURE}`;

  try {
    const response = await axios.get(apiUrl);

    return response.data;
  } catch (error) {
    console.error("Error fetching COVID data:", error);
    throw error;
  }
}
