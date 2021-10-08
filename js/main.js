import prodb,{
    bulkcreate,
    getData,
    createEle,
    Sortobj
} from'./Module.js'

let db = prodb("Productdb",{
    products:`++id,name,seller,price`
})
//NotFound
const notfound = document.getElementById("notfound");

//input Tags
const userid = document.getElementById("userid");
const porname = document.getElementById("proname");
const seller = document.getElementById("seller");
const price = document.getElementById("price");

//Buttons
const btncreate = document.getElementById("btn-create");
const btnread = document.getElementById("btn-read");
const btnupdate = document.getElementById("btn-update");
const btndelete = document.getElementById("btn-delete");

//window show event
window.onload=()=>{
    textID(userid);
}

//insert value using create button
btncreate.onclick=(event)=>{
   let flag= bulkcreate(db.products,{
      name:porname.value,
      seller:seller.value,
      price:price.value
    });

    porname.value = seller.value = price.value="";
   
    getData(db.products,(data)=>{
        userid.value = data.id+1 || 1;
    });
    table();

    let insertmsg = document.querySelector(".insertmsg");
    getMsg(flag, insertmsg);
};

//Create event on alldelete button
btndelete.onclick = ()=>{
    db.delete();
    db=prodb("Productdb",{
        products:`++id,name,seller,price`
    });
    db.open();
    table();
    textID(userid);

    let deletemsg= document.querySelector(".deletemsg")
            getMsg(true, deletemsg);

} 



//Create event on update button
btnupdate.onclick = table;

//update event
btnupdate.onclick= ()=>{
    const id = parseInt(userid.value||0);
    if(id){
        db.products.update(id,{
            name:porname.value,
            seller:seller.value,
            price:price.value
        }).then((updated) =>{
            //let get = updated?`data Updated` :`Data Not Update!!!`
            let get = updated ? true:false;

            let upadatemsg = document.querySelector(".upadatemsg")
            getMsg(get, upadatemsg);
        })
    }
}


//Create event on read button
btnread.onclick = table;
    //Read event
    function table(){
        const tbody = document.getElementById("tbody");

            while(tbody.hasChildNodes()){
            tbody.removeChild(tbody.firstChild);  
        }


        getData(db.products,(data)=>{
            if(data){
                createEle("tr",tbody,tr=>{
                    for(const value in data){
                        createEle("td",tr,td=>{
                            td.textContent = data.price === data[value]?`₹ ${data[value]}` :data[value];
                        })
                    }
                        createEle("td",tr,td=>{
                        createEle("i",td,i=>{
                            i.className +="fas fa-edit btnedit";
                            i.setAttribute(`data-id`,data.id); 
                            i.onclick = editbtn;
                        }) 
                    })
                        createEle("td",tr,td=>{
                        createEle("i",td,i=>{
                            i.className +="fas fa-trash-alt btndelete";
                            i.setAttribute(`data-id`,data.id);
                            i.onclick = deletebtn;
                        }) 
                    })
                })
            }else{
                notfound.textContent = "!!!NO RECORD FOUND!!!"
            }
        })
    }

function editbtn(event){
    let id = parseInt(event.target.dataset.id);
    db.products.get(id,data =>{
        userid.value = data.id || 0;
        porname.value = data.name||"";
        seller.value = data.seller||"";
        price.value = data.price||""; 
    })
      
}

function deletebtn(event){
    let id = parseInt(event.target.dataset.id);
    db.products.delete(id);
    table();
}

function textID(textboxid){
    getData(db.products,data=>{
        textboxid.value = data.id +1 || 1;
    })
}

function getMsg(flag, element) {
    if (flag) {
      // call msg 
      element.className += " movedown";
  
      setTimeout(() => {
        element.classList.forEach(classname => {
          classname == "movedown" ? undefined : element.classList.remove('movedown');
        })
      }, 4069);
    }
  }