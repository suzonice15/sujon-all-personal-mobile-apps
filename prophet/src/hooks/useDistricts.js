import { useState, useEffect } from 'react';
import { api_url } from '../config/url';

let cachedDistricts = null;

export default function useDistricts() {
  const [districts, setDistricts] = useState(cachedDistricts || []);
  const [loading, setLoading] = useState(!cachedDistricts);

  useEffect(() => {
    if (cachedDistricts) return;
    fetch(`${api_url}/v1/districts`)
      .then((res) => res.json())
      .then((data) => {
        cachedDistricts = data;
        setDistricts(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { districts, loading };
}
