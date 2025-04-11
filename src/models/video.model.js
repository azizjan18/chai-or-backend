import mongoose, {schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchema = new schema(
    {
        vieoFile:{
            type:string,//cloudinary url
            required:true,
        },
        thumbnail:{
            type:string,//cloudinary url
            required:true,
        },
        title:{
            type:string,
            required:true,
        },
        description:{
            type:string,
            required:true,
        },
        duration:{
            type:number,
            required:true

        },
        views:{
            type :number,
            deafault:0
        },
        isPublished:{
            type:boolean,
            deafault:false
        },
        owner:{
            type:shema.type.ObjectId,
            ref:"/user"
        }
    },

    {
        timeStamps:true
    }
)
videoSchema.plugin(mongooseAggregatePaginate)





export const Video = mongoose.model('video', videoSchema)