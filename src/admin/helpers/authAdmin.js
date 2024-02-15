import Cookies from "js-cookie"
const authAdmin = {
    isAuthenticated(){
        if(typeof window =='undefined'){return false};

        if(Cookies.get('admintoken')){
            return JSON.parse(Cookies.get('admintoken'))
        }else return false
    },
    authenticate(jwt,cb){
        if(typeof window !== 'undefined')
            Cookies.set('admintoken',JSON.stringify(jwt))
        cb()
    },
    clearJWT(cb){
        if(typeof window !=='undefined'){
           Cookies.remove('admintoken')
        }
        cb()
        
    }
}

export default authAdmin