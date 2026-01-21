export async function createevent(username:string,password:string):Promise<void>{
    const res = await fetch("/api/createevent",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({username,password}),
    })

    if(!res.ok){
        let msg="Cannot create user";
        try{
            const data = await res.json();
            if (data?.error) msg=data.error;
        }
        catch{

        }
    }   
}
