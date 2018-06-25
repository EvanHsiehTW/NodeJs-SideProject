let fs=require('fs')

let tpl="example.tpl";
let output='output.tpl'

output = './output/'+ output ;



String.prototype.regexIndexOf = function (regex, startpos) {
    var indexOf = this.substring(startpos || 0).search(regex);
    return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
}


idBoost(tpl,output) //Run


function idBoost(tpl,output){

    fs.readFile(tpl,function(err,data){
      if(err) console.log(err)

        data=data.toString()
        data=data.split('\n')
        
        let count=0

        let Data=''
        
        let flag=0
        let ID="api.sid+'_'+api.mid+'_'+";
        let ID2;

            for(i=0;i<data.length;i++){
                
                if(data[i].toLowerCase().match(/<input/)){

                    flag=1
                    count++
                    if(data[i].toLowerCase().match(/id="/)){
                        id=data[i].toLowerCase().match(/\:?id\="(\S+)"/g)
                 
                        if(id == null) id=data[i].toLowerCase().match(/id=""/g)
                 
                        
                        ID2=ID+count
                        data[i]=data[i].replace(id,':id="'+ID+count+'"')
                        
                    }
                    else{
                        
                        ID2=ID+count
                        data[i]=data[i].replace('<input','<input :id="'+ID2+'"')
    
                    }
                }
                else if(data[i].toLowerCase().match(/<label/) && flag==1){
                    if(data[i].toLowerCase().match(/for="/)){
                        id=data[i].toLowerCase().match(/\:?for\="(\S+)"/g)
                        // console.log(id,1)
                        if(id == null) id=data[i].toLowerCase().match(/for=""/g)/7

                        data[i]=data[i].replace(id,':for="'+ID2+'"')
                    }
                    else{
                        data[i]=data[i].replace('<label','<label :for="'+ID2+'"')
    
                    }
                    flag=0;

                }
                
                Data+=data[i]
            }
            
            fs.writeFile(output,Data,function(err){
                err?console.log(err):'';
            })
           
    })
}

