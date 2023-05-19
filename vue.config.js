module.exports = {
    css:{
        loaderOptions:{
            sass:{
                prependData:`@import "@/utils/common.scss";`
            }
        }
    },
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
}