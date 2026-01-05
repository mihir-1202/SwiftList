import { z } from "zod"

export const projectSchema = z.object({
    depopSelected: z.boolean(),
    grailedSelected: z.boolean(),
    mercariSelected: z.boolean(),
    photos: z.array(z.instanceof(File)).min(1).max(8),
    itemName: z.string().min(1),
    description: z.string().min(1),
    condition: z.enum(["New", "Gently Used", "Used", "Poor"]),
    gender: z.enum(["Men", "Women", "Unisex"]),
    articleType: z.enum(["T-Shirt", "Hoodie", "Sweater", "Jacket", "Pants", "Shorts", "Dress", "Skirt", "Other"]),
    subcategory: z.enum(["Vintage", "Streetwear", "Designer", "Athletic", "Casual", "Formal", "Other"]),
    size: z.string().min(1),
    brand: z.string().min(1),
    price: z.string().min(1),
    packageSize: z.enum(["xxs", "xs", "s", "m", "l", "xl"]),
})
.refine( (data) => {
        return data.depopSelected || data.grailedSelected || data.mercariSelected;
    },

    {
        message: "At least one marketplace must be selected",
        path: ["depopSelected", "grailedSelected", "mercariSelected"],   
    }
)