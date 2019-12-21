//this is function is being used to check if user is valid
const CheckAuth=()=>{
    return new Promise((resolve, reject)=>{
        const token=localStorage.getItem("token");
        const uid=localStorage.getItem("uid");
        const requestBody={
            query:`
            mutation {
                checkAuth(uid:"${uid}")
            }
            `
        }
        fetch('http://localhost:8000/graphql',{
            method:"POST",
            body:JSON.stringify(requestBody),
            headers:{
                'Content-Type':'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then((res)=>{
            return res.json();
        }).then((res)=>{
            if(res.errors && res.errors[0].message==="Unauthenticated"){
                console.log("Error");
                reject();
                // window.location.href="/";
            }else{
                resolve();
            }
            // console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    })
}


export default CheckAuth;