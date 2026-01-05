export const Sizes = {
    XXS: "XXS",
    XS: "XS",
    S: "S",
    M: "M",
    L: "L",
    XL: "XL",
    XXL: "XXL",
    XXXL: "XXXL",
} as const;

export const Categories = {
    
}

export type Sizes = typeof Sizes[keyof typeof Sizes];

export const Conditions = {
    New: {depop: 'Brand New', },
    GentlyUsed: {depop: 'Used - Excellent', grailed: 'Gently Used', mercari: 'Good'},
    Used: {depop: 'Used - Good', grailed: 'Used', mercari: 'Fair'},
    Poor: {depop: 'Used - Fair', grailed: 'Poor', mercari: 'Poor'},
} as const;

export type Conditions = typeof Conditions[keyof typeof Conditions];