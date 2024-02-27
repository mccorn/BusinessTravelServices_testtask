const BASE_API_URL = "https://api.thecatapi.com/v1/images";
const SEARCH_API_URL = BASE_API_URL + "/search";

class GalleryAPI {
  async getImages(count = 1) {
    return await fetch(`${SEARCH_API_URL}?limit=${count}`)
      .then(response => response.json())
      .catch((error) => console.log("api_error:", error))
  }
}

export default new GalleryAPI();