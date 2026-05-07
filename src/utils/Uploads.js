import multer from "multer";
import { v4 as uuid4 } from "uuid"


export const uploadSingleFile = (fieldName) =>{

    const storage = multer.diskStorage({
        destination: function (req,file,cb){
            cb(null, 'uploads/recipes')
        },
        filename: function (req, file, cb){
            cb(null, uuid4()+ "-" + file.originalname)
        }
    })
    
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]
    
    function fileFilter (req, file, cb) {
       if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
       } else {
        cb(new Error("Only jpg, jpeg, png allowed"), false)
       }
    
    }
    
    const upload = multer({storage,fileFilter, limits:{
        fileSize : 1*1024*1024
    }})

    // return upload.single(fieldName)  //upload one image
    return upload.array(fieldName, 5)
}