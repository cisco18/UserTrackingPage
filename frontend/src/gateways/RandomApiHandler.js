import {uid} from 'uid';

class RandomApiHandler {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async fetchRandomData() {
    try {
      const response = await fetch(this.baseUrl);
      const data = await response.json();
      const newUid = data.uid;
      return newUid;
    } catch (error) {
      const newUid = uid();
      return newUid;
    }
  }
}

export default RandomApiHandler;
