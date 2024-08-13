


export class Apifiture{
      constructor( serchquery,mongosequery ){
            this.serchquery = serchquery;
            this.mongosequery = mongosequery;
     }
     pagination(){
      let pagenumber= this.serchquery.page ||1
      let limit= 2
      let skip= (pagenumber-1)*limit 
      this.pagenumber=pagenumber
      this.mongosequery.skip(skip).limit(limit)
      return this
      

     }
     filter(){
             let filteitem= structuredClone(this.serchquery)
            filteitem= JSON.stringify(filteitem).replace(/(gt)|(lt)|eq/,(val)=>{
                  return  ("$"+val)
            })
            filteitem= JSON.parse(filteitem)
            let excusefiled=["page","sort","limit","fields","search"]
            excusefiled.forEach(item=>{
                  delete filteitem[item]

            })
            console.log(filteitem);
            this.mongosequery.find(filteitem)
            return this
            }

     sort(){
      if(this.serchquery.sort){
            let sortby= req.query.sort.split(',').join(' ')
            mongosequery=mongosequery.sort(sortby) 
                  
            }
            return this

     }  
     fields(){
      if(this.serchquery.fields){
            let selectfiled= this.query.fields.split(',').join(' ')
            this.mongosequery=this.mongosequery.select(selectfiled) 
                  
            }
            return this
     }
       
     search(){
      if(this.serchquery.search){
            this.mongosequery=his.mongosequery.find({title:{$regex:req.query.search,$options:"i"}}) 
                  
            }
            return this
     } 
}