
import Cookies from "js-cookie"
const authSeller = {
    isAuthenticated(){
        if(typeof window =='undefined'){return false};

        if(Cookies.get('sellerjwt')){
            return JSON.parse(Cookies.get('sellerjwt'))
        }else return false
    },
    authenticate(jwt,cb){
        if(typeof window !== 'undefined')
            Cookies.set('sellerjwt',JSON.stringify(jwt))
        cb()
    },
    clearJWT(cb){
        if(typeof window !=='undefined'){
            Cookies.remove('sellerjwt')
        }
        cb()
        // signout().then((data)=>{
        //     document.cookie = "t=' expires=Thu,01 Jan 2030 00:00:00 UTC; path=/;"
        // })
    }
}

export default authSeller