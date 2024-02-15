export const getInvoicePDF = async ({orderId})=>{
    try {
        let response = await fetch("http://localhost:4000/api/user/order/invoice/" + orderId,{
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