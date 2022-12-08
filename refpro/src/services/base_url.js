import ENV from './.ui_env';

var base_url = "https://sl9612.deta.dev";

if (ENV == 'production') {
    base_url = 'http://localhost:3000/api/'
}else if (ENV == 'test') {
    base_url = 'http://localhost:3001/api/'
}else if (ENV == 'development') {
    base_url = 'https://sl9612.deta.dev/'
}else {
    base_url = 'https://sl9612.deta.dev/'
}

export default base_url;
