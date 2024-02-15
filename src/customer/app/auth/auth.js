import Cookie from 'js-cookie'

const auth = {
    isAuthenticated(){
        if(typeof window =='undefined'){return false};

        if(Cookie.get('jwt')){
            return JSON.parse(Cookie.get('jwt'))
        }else return false
    },
    authenticate(jwt,cb){
        if(typeof window !== 'undefined')
            Cookie.set('jwt',JSON.stringify(jwt))
        cb()
    },
    clearJWT(cb){
        if(typeof window !=='undefined'){
            Cookie.remove('jwt')
        }
        cb()
        // signout().then((data)=>{
        //     document.cookie = "t=' expires=Thu,01 Jan 2030 00:00:00 UTC; path=/;"
        // })
    }
}

export default auth