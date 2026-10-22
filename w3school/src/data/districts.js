import { api_url } from '../config/url';

const fallbackDistricts = [
  { id: 1, data_id: 1, name: 'Dhaka', name_en: 'Dhaka' },
  { id: 2, data_id: 2, name: 'Faridpur', name_en: 'Faridpur' },
  { id: 3, data_id: 3, name: 'Gazipur', name_en: 'Gazipur' },
  { id: 4, data_id: 4, name: 'Gopalganj', name_en: 'Gopalganj' },
  { id: 5, data_id: 5, name: 'Kishoreganj', name_en: 'Kishoreganj' },
  { id: 6, data_id: 6, name: 'Madaripur', name_en: 'Madaripur' },
  { id: 7, data_id: 7, name: 'Manikganj', name_en: 'Manikganj' },
  { id: 8, data_id: 8, name: 'Munshiganj', name_en: 'Munshiganj' },
  { id: 9, data_id: 9, name: 'Narayanganj', name_en: 'Narayanganj' },
  { id: 10, data_id: 10, name: 'Narsingdi', name_en: 'Narsingdi' },
  { id: 11, data_id: 11, name: 'Rajbari', name_en: 'Rajbari' },
  { id: 12, data_id: 12, name: 'Shariatpur', name_en: 'Shariatpur' },
  { id: 13, data_id: 13, name: 'Tangail', name_en: 'Tangail' },
  { id: 14, data_id: 14, name: 'Chattogram', name_en: 'Chattogram' },
  { id: 15, data_id: 15, name: 'Bandarban', name_en: 'Bandarban' },
  { id: 16, data_id: 16, name: 'Brahmanbaria', name_en: 'Brahmanbaria' },
  { id: 17, data_id: 17, name: 'Chandpur', name_en: 'Chandpur' },
  { id: 18, data_id: 18, name: 'Cox\'s Bazar', name_en: 'Cox\'s Bazar' },
  { id: 19, data_id: 19, name: 'Cumilla', name_en: 'Cumilla' },
  { id: 20, data_id: 20, name: 'Feni', name_en: 'Feni' },
  { id: 21, data_id: 21, name: 'Khagrachari', name_en: 'Khagrachari' },
  { id: 22, data_id: 22, name: 'Lakshmipur', name_en: 'Lakshmipur' },
  { id: 23, data_id: 23, name: 'Noakhali', name_en: 'Noakhali' },
  { id: 24, data_id: 24, name: 'Rangamati', name_en: 'Rangamati' },
  { id: 25, data_id: 25, name: 'Rajshahi', name_en: 'Rajshahi' },
  { id: 26, data_id: 26, name: 'Bogura', name_en: 'Bogura' },
  { id: 27, data_id: 27, name: 'Joypurhat', name_en: 'Joypurhat' },
  { id: 28, data_id: 28, name: 'Naogaon', name_en: 'Naogaon' },
  { id: 29, data_id: 29, name: 'Natore', name_en: 'Natore' },
  { id: 30, data_id: 30, name: 'Pabna', name_en: 'Pabna' },
  { id: 31, data_id: 31, name: 'Sirajganj', name_en: 'Sirajganj' },
  { id: 32, data_id: 32, name: 'Khulna', name_en: 'Khulna' },
  { id: 33, data_id: 33, name: 'Bagerhat', name_en: 'Bagerhat' },
  { id: 34, data_id: 34, name: 'Chuadanga', name_en: 'Chuadanga' },
  { id: 35, data_id: 35, name: 'Jashore', name_en: 'Jashore' },
  { id: 36, data_id: 36, name: 'Jhenaidah', name_en: 'Jhenaidah' },
  { id: 37, data_id: 37, name: 'Kushtia', name_en: 'Kushtia' },
  { id: 38, data_id: 38, name: 'Magura', name_en: 'Magura' },
  { id: 39, data_id: 39, name: 'Meherpur', name_en: 'Meherpur' },
  { id: 40, data_id: 40, name: 'Narail', name_en: 'Narail' },
  { id: 41, data_id: 41, name: 'Satkhira', name_en: 'Satkhira' },
  { id: 42, data_id: 42, name: 'Barishal', name_en: 'Barishal' },
  { id: 43, data_id: 43, name: 'Bhola', name_en: 'Bhola' },
  { id: 44, data_id: 44, name: 'Jhalokathi', name_en: 'Jhalokathi' },
  { id: 45, data_id: 45, name: 'Patuakhali', name_en: 'Patuakhali' },
  { id: 46, data_id: 46, name: 'Pirojpur', name_en: 'Pirojpur' },
  { id: 47, data_id: 47, name: 'Barguna', name_en: 'Barguna' },
  { id: 48, data_id: 48, name: 'Sylhet', name_en: 'Sylhet' },
  { id: 49, data_id: 49, name: 'Habiganj', name_en: 'Habiganj' },
  { id: 50, data_id: 50, name: 'Moulvibazar', name_en: 'Moulvibazar' },
  { id: 51, data_id: 51, name: 'Sunamganj', name_en: 'Sunamganj' },
  { id: 52, data_id: 52, name: 'Rangpur', name_en: 'Rangpur' },
  { id: 53, data_id: 53, name: 'Dinajpur', name_en: 'Dinajpur' },
  { id: 54, data_id: 54, name: 'Gaibandha', name_en: 'Gaibandha' },
  { id: 55, data_id: 55, name: 'Kurigram', name_en: 'Kurigram' },
  { id: 56, data_id: 56, name: 'Lalmonirhat', name_en: 'Lalmonirhat' },
  { id: 57, data_id: 57, name: 'Nilphamari', name_en: 'Nilphamari' },
  { id: 58, data_id: 58, name: 'Panchagarh', name_en: 'Panchagarh' },
  { id: 59, data_id: 59, name: 'Thakurgaon', name_en: 'Thakurgaon' },
  { id: 60, data_id: 60, name: 'Mymensingh', name_en: 'Mymensingh' },
  { id: 61, data_id: 61, name: 'Jamalpur', name_en: 'Jamalpur' },
  { id: 62, data_id: 62, name: 'Netrokona', name_en: 'Netrokona' },
  { id: 63, data_id: 63, name: 'Sherpur', name_en: 'Sherpur' },
];

let cached = null;

export const fetchDistricts = async () => {
  if (cached) return cached;
  try {
    const url = `${api_url}/v1/districts`;
    const res = await fetch(url);
    if (!res.ok) {
      cached = fallbackDistricts;
      return cached;
    }
    const data = await res.json();
    // The API returns Bangla names in name; show the English one.
    cached = Array.isArray(data) && data.length > 0 ? data.map((d) => ({ ...d, name: d.name_en || d.name })) : fallbackDistricts;
    return cached;
  } catch {
    cached = fallbackDistricts;
    return cached;
  }
};

export const getDistrictName = (id, list) => {
  if (!list || list.length === 0) return '—';
  const d = list.find((x) => x.id === id || x.data_id === id);
  return d ? d.name : '—';
};