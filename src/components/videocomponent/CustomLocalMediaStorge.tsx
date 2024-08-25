// @ts-nocheck
import { LocalMediaStorage } from '@vidstack/react';

class CustomLocalMediaStorage extends LocalMediaStorage {
  constructor() {
    super();
  }

  // Override the save method to include caption preferences
  async save(key, value) {
    if (key === 'vds-player') {
      localStorage.setItem('vds-player', JSON.stringify(value));
    } else {
      return super.save(key, value);
    }
  }

  // Override the get method to retrieve caption preferences
  async get(key) {
    if (key === 'vds-player') {
      const preference = localStorage.getItem('vds-player');
      return preference ? JSON.parse(preference) : null;
    } else {
      return super.get(key);
    }
  }
}

export default CustomLocalMediaStorage;
