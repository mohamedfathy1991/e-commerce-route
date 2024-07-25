
const deleteOldImage=async()=>{
     
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      console.log(__dirname);
      
      let oldimage=oldcategory.image.split('/').pop()
      const oldpath=path.join(__dirname,"..","..","..","uploads","category",oldimage)
      
      fs.unlinkSync(oldpath);
      

}