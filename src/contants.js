const BASE_URL = "https://api.covid19india.org";
const MAPS_DIR = "/mini_maps";
const MAP_META = {
  "Andaman and Nicobar Islands": {
    geoDataFile: `${MAPS_DIR}/andamannicobarislands.json`,
    graphObjectDistricts: "andamannicobarislands_district",
  },
  "Arunachal Pradesh": {
    geoDataFile: `${MAPS_DIR}/arunachalpradesh.json`,
    graphObjectDistricts: "arunachalpradesh_district",
  },
  "Andhra Pradesh": {
    geoDataFile: `${MAPS_DIR}/andhrapradesh.json`,
    graphObjectDistricts: "andhrapradesh_district",
  },
  Assam: {
    geoDataFile: `${MAPS_DIR}/assam.json`,
    graphObjectDistricts: "assam_district",
  },
  Bihar: {
    geoDataFile: `${MAPS_DIR}/bihar.json`,
    graphObjectDistricts: "bihar_district",
  },
  Chandigarh: {
    geoDataFile: `${MAPS_DIR}/chandigarh.json`,
    graphObjectDistricts: "chandigarh_district",
  },
  Chhattisgarh: {
    geoDataFile: `${MAPS_DIR}/chhattisgarh.json`,
    graphObjectDistricts: "chhattisgarh_district",
  },
  "Dadra and Nagar Haveli and Daman and Diu": {
    geoDataFile: `${MAPS_DIR}/dnh-and-dd.json`,
    graphObjectDistricts: "dnh-and-dd",
  },
  Delhi: {
    geoDataFile: `${MAPS_DIR}/delhi.json`,
    graphObjectDistricts: "delhi_district",
  },
  Karnataka: {
    geoDataFile: `${MAPS_DIR}/karnataka.json`,
    graphObjectDistricts: "karnataka_district",
  },
  Kerala: {
    geoDataFile: `${MAPS_DIR}/kerala.json`,
    graphObjectDistricts: "kerala_district",
  },
  Goa: {
    geoDataFile: `${MAPS_DIR}/goa.json`,
    graphObjectDistricts: "goa_district",
  },
  Gujarat: {
    geoDataFile: `${MAPS_DIR}/gujarat.json`,
    graphObjectDistricts: "gujarat_district",
  },
  Haryana: {
    geoDataFile: `${MAPS_DIR}/haryana.json`,
    graphObjectDistricts: "haryana_district",
  },
  "Himachal Pradesh": {
    geoDataFile: `${MAPS_DIR}/himachalpradesh.json`,
    graphObjectDistricts: "himachalpradesh_district",
  },
  "Jammu and Kashmir": {
    geoDataFile: `${MAPS_DIR}/jammukashmir.json`,
    graphObjectDistricts: "jammukashmir_district",
  },
  Jharkhand: {
    geoDataFile: `${MAPS_DIR}/jharkhand.json`,
    graphObjectDistricts: "jharkhand_district",
  },
  Ladakh: {
    geoDataFile: `${MAPS_DIR}/ladakh.json`,
    graphObjectDistricts: "ladakh_district",
  },
  Lakshadweep: {
    geoDataFile: `${MAPS_DIR}/lakshadweep.json`,
    graphObjectDistricts: "lakshadweep_district",
  },
  "Madhya Pradesh": {
    geoDataFile: `${MAPS_DIR}/madhyapradesh.json`,
    graphObjectDistricts: "madhyapradesh_district",
  },
  Maharashtra: {
    geoDataFile: `${MAPS_DIR}/maharashtra.json`,
    graphObjectDistricts: "maharashtra_district",
  },
  Manipur: {
    geoDataFile: `${MAPS_DIR}/manipur.json`,
    graphObjectDistricts: "manipur_district",
  },
  Meghalaya: {
    geoDataFile: `${MAPS_DIR}/meghalaya.json`,
    graphObjectDistricts: "meghalaya_district",
  },
  Mizoram: {
    geoDataFile: `${MAPS_DIR}/mizoram.json`,
    graphObjectDistricts: "mizoram_district",
  },
  Nagaland: {
    geoDataFile: `${MAPS_DIR}/nagaland.json`,
    graphObjectDistricts: "nagaland_district",
  },
  Odisha: {
    geoDataFile: `${MAPS_DIR}/odisha.json`,
    graphObjectDistricts: "odisha_district",
  },
  Puducherry: {
    geoDataFile: `${MAPS_DIR}/puducherry.json`,
    graphObjectDistricts: "puducherry_district",
  },
  Punjab: {
    geoDataFile: `${MAPS_DIR}/punjab.json`,
    graphObjectDistricts: "punjab_district",
  },
  Rajasthan: {
    geoDataFile: `${MAPS_DIR}/rajasthan.json`,
    graphObjectDistricts: "rajasthan_district",
  },
  Sikkim: {
    geoDataFile: `${MAPS_DIR}/sikkim.json`,
    graphObjectDistricts: "sikkim_district",
  },
  "Tamil Nadu": {
    geoDataFile: `${MAPS_DIR}/tamilnadu.json`,
    graphObjectDistricts: "tamilnadu_district",
  },
  Telangana: {
    geoDataFile: `${MAPS_DIR}/telangana.json`,
    graphObjectDistricts: "telangana_district",
  },
  Tripura: {
    geoDataFile: `${MAPS_DIR}/tripura.json`,
    graphObjectDistricts: "tripura_district",
  },
  Uttarakhand: {
    geoDataFile: `${MAPS_DIR}/uttarakhand.json`,
    graphObjectDistricts: "uttarakhand_district",
  },
  "Uttar Pradesh": {
    geoDataFile: `${MAPS_DIR}/uttarpradesh.json`,
    graphObjectDistricts: "uttarpradesh_district",
  },
  "West Bengal": {
    geoDataFile: `${MAPS_DIR}/westbengal.json`,
    graphObjectDistricts: "westbengal_district",
  },
};
