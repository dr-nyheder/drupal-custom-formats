let config = {
    stagingFolder:'/Volumes/staging/',
    deployFolder:'/Volumes/2018/',
    local: {
        DEBUGGING:true,
        ASSETS_PATH:JSON.stringify('assets/'),
    },
    staging: {
        DEBUGGING:true,
        ASSETS_PATH:JSON.stringify('https://www.dr.dk/tjenester/visuel/staging/projekt-navn/')
    },
    deploy: {
        DEBUGGING:false,
        ASSETS_PATH:JSON.stringify('https://www.dr.dk/nyheder/htm/grafik/2018/projekt-navn/')
    }
}
module.exports = config;