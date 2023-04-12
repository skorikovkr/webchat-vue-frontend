let api_url;

if (process.env.NODE_ENV === "production") {
    api_url = "https://www.skorikovkr.somee.com";
} else {
    api_url = "https://localhost:7007";
}

const config = {
    API_URL: api_url,
    ACCESS_TOKEN_KEY: "access-token-key"
}

export default config;