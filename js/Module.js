const productdb = (dbname, table) =>{

    const db = new Dexie(dbname)
    db.version(1).stores(table);
    db.open();
    
    return db;
}

//insert function

const bulkcreate = (dbtable,data)=>{
    let flag = empty(data);
    if(flag){
        dbtable.bulkAdd([data])
        console.log("Added successfully!!!");
    }else{
        console.log("Error!! Provide data");
    }
    return flag;
}

//check textbox validation

const empty = object=>{
    let flag = false;

    for(const value in object){
        if(object[value] != "" && object.hasOwnProperty(value)){
            flag=true;
        }else{
            flag= false;
        }
    }
    return flag;
}

//get data from the database
const getData = (dbname,fn)=>{
    let index = 0;
    let obj = {};

    dbname.count((count)=>{
        if(count){
            dbname.each(table=>{
               
                obj = Sortobj(table);
                fn(obj, index++);
            });
        }else{
            fn(0);
        }
    });
};
//sort object
const Sortobj = sortobj=>{
    let obj = {};
    obj = {
        id:sortobj.id,
        name:sortobj.name,
        seller:sortobj.seller,
        price:sortobj.price
    }
    return obj;
}

//create dynamic elements
const createEle = (tagname, appendTo, fn) => {
    const element = document.createElement(tagname);
    if (appendTo) appendTo.appendChild(element);
    if (fn) fn(element);
  };

export default productdb;
export{
    bulkcreate,
    getData,
    createEle,
    Sortobj
}