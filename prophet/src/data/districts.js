import { api_url } from '../config/url';

const fallbackDistricts = [
  { id: 1, data_id: 1, name: 'ঢাকা', name_en: 'Dhaka' },
  { id: 2, data_id: 2, name: 'ফরিদপুর', name_en: 'Faridpur' },
  { id: 3, data_id: 3, name: 'গাজীপুর', name_en: 'Gazipur' },
  { id: 4, data_id: 4, name: 'গোপালগঞ্জ', name_en: 'Gopalganj' },
  { id: 5, data_id: 5, name: 'কিশোরগঞ্জ', name_en: 'Kishoreganj' },
  { id: 6, data_id: 6, name: 'মাদারীপুর', name_en: 'Madaripur' },
  { id: 7, data_id: 7, name: 'মানিকগঞ্জ', name_en: 'Manikganj' },
  { id: 8, data_id: 8, name: 'মুন্সিগঞ্জ', name_en: 'Munshiganj' },
  { id: 9, data_id: 9, name: 'নারায়ণগঞ্জ', name_en: 'Narayanganj' },
  { id: 10, data_id: 10, name: 'নরসিংদী', name_en: 'Narsingdi' },
  { id: 11, data_id: 11, name: 'রাজবাড়ী', name_en: 'Rajbari' },
  { id: 12, data_id: 12, name: 'শরীয়তপুর', name_en: 'Shariatpur' },
  { id: 13, data_id: 13, name: 'টাঙ্গাইল', name_en: 'Tangail' },
  { id: 14, data_id: 14, name: 'চট্টগ্রাম', name_en: 'Chattogram' },
  { id: 15, data_id: 15, name: 'বান্দরবান', name_en: 'Bandarban' },
  { id: 16, data_id: 16, name: 'ব্রাহ্মণবাড়িয়া', name_en: 'Brahmanbaria' },
  { id: 17, data_id: 17, name: 'চাঁদপুর', name_en: 'Chandpur' },
  { id: 18, data_id: 18, name: 'কক্সবাজার', name_en: 'Cox\'s Bazar' },
  { id: 19, data_id: 19, name: 'কুমিল্লা', name_en: 'Cumilla' },
  { id: 20, data_id: 20, name: 'ফেনী', name_en: 'Feni' },
  { id: 21, data_id: 21, name: 'খাগড়াছড়ি', name_en: 'Khagrachari' },
  { id: 22, data_id: 22, name: 'লক্ষ্মীপুর', name_en: 'Lakshmipur' },
  { id: 23, data_id: 23, name: 'নোয়াখালী', name_en: 'Noakhali' },
  { id: 24, data_id: 24, name: 'রাঙ্গামাটি', name_en: 'Rangamati' },
  { id: 25, data_id: 25, name: 'রাজশাহী', name_en: 'Rajshahi' },
  { id: 26, data_id: 26, name: 'বগুড়া', name_en: 'Bogura' },
  { id: 27, data_id: 27, name: 'জয়পুরহাট', name_en: 'Joypurhat' },
  { id: 28, data_id: 28, name: 'নওগাঁ', name_en: 'Naogaon' },
  { id: 29, data_id: 29, name: 'নাটোর', name_en: 'Natore' },
  { id: 30, data_id: 30, name: 'পাবনা', name_en: 'Pabna' },
  { id: 31, data_id: 31, name: 'সিরাজগঞ্জ', name_en: 'Sirajganj' },
  { id: 32, data_id: 32, name: 'খুলনা', name_en: 'Khulna' },
  { id: 33, data_id: 33, name: 'বাগেরহাট', name_en: 'Bagerhat' },
  { id: 34, data_id: 34, name: 'চুয়াডাঙ্গা', name_en: 'Chuadanga' },
  { id: 35, data_id: 35, name: 'যশোর', name_en: 'Jashore' },
  { id: 36, data_id: 36, name: 'ঝিনাইদহ', name_en: 'Jhenaidah' },
  { id: 37, data_id: 37, name: 'কুষ্টিয়া', name_en: 'Kushtia' },
  { id: 38, data_id: 38, name: 'মাগুরা', name_en: 'Magura' },
  { id: 39, data_id: 39, name: 'মেহেরপুর', name_en: 'Meherpur' },
  { id: 40, data_id: 40, name: 'নড়াইল', name_en: 'Narail' },
  { id: 41, data_id: 41, name: 'সাতক্ষীরা', name_en: 'Satkhira' },
  { id: 42, data_id: 42, name: 'বরিশাল', name_en: 'Barishal' },
  { id: 43, data_id: 43, name: 'ভোলা', name_en: 'Bhola' },
  { id: 44, data_id: 44, name: 'ঝালকাঠি', name_en: 'Jhalokathi' },
  { id: 45, data_id: 45, name: 'পটুয়াখালী', name_en: 'Patuakhali' },
  { id: 46, data_id: 46, name: 'পিরোজপুর', name_en: 'Pirojpur' },
  { id: 47, data_id: 47, name: 'বরগুনা', name_en: 'Barguna' },
  { id: 48, data_id: 48, name: 'সিলেট', name_en: 'Sylhet' },
  { id: 49, data_id: 49, name: 'হবিগঞ্জ', name_en: 'Habiganj' },
  { id: 50, data_id: 50, name: 'মৌলভীবাজার', name_en: 'Moulvibazar' },
  { id: 51, data_id: 51, name: 'সুনামগঞ্জ', name_en: 'Sunamganj' },
  { id: 52, data_id: 52, name: 'রংপুর', name_en: 'Rangpur' },
  { id: 53, data_id: 53, name: 'দিনাজপুর', name_en: 'Dinajpur' },
  { id: 54, data_id: 54, name: 'গাইবান্ধা', name_en: 'Gaibandha' },
  { id: 55, data_id: 55, name: 'কুড়িগ্রাম', name_en: 'Kurigram' },
  { id: 56, data_id: 56, name: 'লালমনিরহাট', name_en: 'Lalmonirhat' },
  { id: 57, data_id: 57, name: 'নীলফামারী', name_en: 'Nilphamari' },
  { id: 58, data_id: 58, name: 'পঞ্চগড়', name_en: 'Panchagarh' },
  { id: 59, data_id: 59, name: 'ঠাকুরগাঁও', name_en: 'Thakurgaon' },
  { id: 60, data_id: 60, name: 'ময়মনসিংহ', name_en: 'Mymensingh' },
  { id: 61, data_id: 61, name: 'জামালপুর', name_en: 'Jamalpur' },
  { id: 62, data_id: 62, name: 'নেত্রকোনা', name_en: 'Netrokona' },
  { id: 63, data_id: 63, name: 'শেরপুর', name_en: 'Sherpur' },
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
    cached = Array.isArray(data) && data.length > 0 ? data : fallbackDistricts;
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