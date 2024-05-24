# Trucks Path extension
This repository provides the code for a Chrome extension that integrates Google Maps into a trucker website. It also includes the necessary modifications for embedding Google Maps using an iframe on the website. These enhancements will allow users to view and navigate locations on Google Maps directly from the trucker website.

# Requirement
For the project to run properly you need to
1. Add google developer API key to **src/utils**
2. Enable the following services in the [google developer console](https://console.cloud.google.com/apis/library)
    1. Geocoding Api
    2. Maps Javascript Api
    3. Directions API

# Build And Load Extension
```sh
npm run build_extension
```
Above command will create a dist folder. You can then load this extension by visting **chrome://extensions/**
> Note: You will need to have the website running for the iframe (containing Google Maps) to function properly.

# Run website
You can run the website locally to perform testing. Use command
```sh
npm run website_dev
```