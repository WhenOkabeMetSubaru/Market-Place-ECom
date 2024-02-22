export const getInvoicePDF = async ({orderId})=>{
    try {
        let response = await fetch("https://testingbuild-psi.vercel.app/api/user/order/invoice/" + orderId,{
            method:"GET",
            headers:{
                'Content-Type':"application/pdf",
                'Accept':'application/pdf'
            }
        })

        let data = await response.json();
        return data;
    } catch (error) {
        return error.message;
    }
}


export const searchProductHomeScreen = async({name})=>{
    try {
        
        let response = await fetch("https://testingbuild-psi.vercel.app/api/v1/products/search/home/"+name,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            }
        })

        let data = await response.json();

        return data;

    } catch (error) {
        return error.message;
    }
}