import './App.css'
import { Sizes, type Sizes as SizesType } from './types/models';
import depopLogo from "C:/Coding Projects/SwiftList/public/depop.svg"
import grailedLogo from "C:/Coding Projects/SwiftList/public/grailed.svg"
import mercariLogo from "C:/Coding Projects/SwiftList/public/mercari.svg"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from '@radix-ui/react-label';
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { FieldError } from "@/components/ui/field"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { projectSchema } from "@/schemas/project"
import { Controller } from "react-hook-form"

async function onSubmit(data: z.infer<typeof projectSchema>)
{
  const result = projectSchema.safeParse(data);
  console.log(result);

  if (!result.success)
      console.error(result.error.message);
}

function App() {
  const form = useForm<z.infer<typeof projectSchema>>({
    defaultValues: {
      depopSelected: false,
      grailedSelected: false,
      mercariSelected: false,
      photos: [],
      subcategory: "Other",
      brand: "Nike",
      price: "0.15",
      description: "this is a test description"
    },
    resolver: zodResolver(projectSchema)
  })
  
  //'watch' tracks + provides access to the current value of an uncontrolled input field
  const images = form.watch("photos"); 

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const newImages = Array.from(files);
    const allImages = [...images, ...newImages].slice(0, 8); // Max 8 images
    form.setValue("photos", allImages, { shouldValidate: true });
    
    // Browsers do not fire the onChange event for a file input if the user selects the same image again
    // Reset the input value so that the user can select the same image again
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    form.setValue("photos", images.filter((_, i) => i !== index), { shouldValidate: true });
  };

  return (
    <form onSubmit = {form.handleSubmit(onSubmit)}>
      <div className="dark p-6 max-w-2xl mx-auto">
        <FieldSet>
          {/* Page Header */}
          <FieldGroup>
            <div className="text-left">
              <h1 className="text-3xl font-bold tracking-tight">Create Listing</h1>
              <p className="text-muted-foreground mt-1 text-lg">
                Select which marketplaces to list on and enter the details for your item.
              </p>
            </div>
          </FieldGroup>

          <FieldSeparator />
          
          {/* Marketplaces Section */}
          <FieldGroup>
            <Field data-invalid={!!form.formState.errors.depopSelected || !!form.formState.errors.grailedSelected || !!form.formState.errors.mercariSelected}> {/* makes the Marketplaces text red/destructive if there is an error */}
              <FieldLabel htmlFor="marketplaces">Marketplaces</FieldLabel>
              <div className="grid grid-cols-3 gap-3">
                {/* Depop Checkbox */}
                <Controller 
                  name="depopSelected"
                  control={form.control}
                  render={({ field: { value, onChange, ...field } }) => {
                    const hasMarketplaceError = !!form.formState.errors.depopSelected || !!form.formState.errors.grailedSelected || !!form.formState.errors.mercariSelected;
                    return (
                      <Label className={`hover:bg-accent/50 flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors has-aria-checked:border-blue-600 has-aria-checked:bg-blue-950 ${hasMarketplaceError ? 'border-destructive' : ''}`}>
                        <Checkbox
                          id={field.name}
                          {...field}
                          aria-invalid={hasMarketplaceError}
                          onCheckedChange={onChange}
                          checked={value}
                          className={`data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 ${hasMarketplaceError ? 'border-destructive' : ''}`}
                        />
                        <div className="flex items-center gap-2">
                          <img src={depopLogo} alt="depop" className="w-6 h-6" />
                          <span className="text-sm font-medium">Depop</span>
                        </div>
                      </Label>
                    );
                  }}
                />

                {/* Grailed Checkbox */}
                <Controller 
                  name="grailedSelected"
                  control={form.control}
                  render={({ field: { value, onChange, ...field } }) => {
                    const hasMarketplaceError = !!form.formState.errors.depopSelected || !!form.formState.errors.grailedSelected || !!form.formState.errors.mercariSelected;
                    return (
                      <Label className={`hover:bg-accent/50 flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors has-aria-checked:border-blue-600 has-aria-checked:bg-blue-950 ${hasMarketplaceError ? 'border-destructive' : ''}`}>
                        <Checkbox
                          id={field.name}
                          {...field}
                          aria-invalid={hasMarketplaceError}
                          onCheckedChange={onChange}
                          checked={value}
                          className={`data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 ${hasMarketplaceError ? 'border-destructive' : ''}`}
                        />
                        <div className="flex items-center gap-2">
                          <img src={grailedLogo} alt="grailed" className="w-6 h-6" />
                          <span className="text-sm font-medium">Grailed</span>
                        </div>
                      </Label>
                    );
                  }}
                />

                {/* Mercari Checkbox */}
                <Controller 
                  name="mercariSelected"
                  control={form.control}
                  render={({ field: { value, onChange, ...field } }) => {
                    const hasMarketplaceError = !!form.formState.errors.depopSelected || !!form.formState.errors.grailedSelected || !!form.formState.errors.mercariSelected;
                    return (
                      <Label className={`hover:bg-accent/50 flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors has-aria-checked:border-blue-600 has-aria-checked:bg-blue-950 ${hasMarketplaceError ? 'border-destructive' : ''}`}>
                        <Checkbox
                          id={field.name}
                          {...field}
                          aria-invalid={hasMarketplaceError}
                          onCheckedChange={onChange}
                          checked={value}
                          className={`data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 ${hasMarketplaceError ? 'border-destructive' : ''}`}
                        />
                        <div className="flex items-center gap-2">
                          <img src={mercariLogo} alt="mercari" className="w-6 h-6" />
                          <span className="text-sm font-medium">Mercari</span>
                        </div>
                      </Label>
                    );
                  }}
                />
              </div>
              {(form.formState.errors.depopSelected || form.formState.errors.grailedSelected || form.formState.errors.mercariSelected) && (
                <p className="text-destructive text-sm mt-2">At least one marketplace must be selected</p>
                //all 3 conditions must be true in the case that none of the marketplaces are selected
              )}
            </Field>
          </FieldGroup>

          <FieldSeparator />

          {/* Image Upload Section */}
          <FieldGroup>
            <Controller
              name = "photos"
              control = {form.control}
              render = { ({field, fieldState}) => (
              <Field data-invalid = {fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Photos ({images.length}/8)</FieldLabel>
                <div className="grid grid-cols-4 gap-3">
                  {/* Display the user uploaded images */}
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border bg-muted">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center text-sm transition-colors"
                      >
                        ×
                      </button>

                      {/* Show a cover tag if the image is the first one */}
                      {index === 0 && (
                        <span className="absolute bottom-1 left-1 text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
                          Cover
                        </span>
                      )}
                    </div>
                    
                  ))}
                  
                  {/* Add image button -> only shown if there are currently less than 8 images */}
                  {images.length < 8 && (
                    <label className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/30 hover:border-muted-foreground/50 cursor-pointer flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      <span className="text-xs">Add Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="sr-only"
                      />
                    </label>
                  )}
                </div>
              </Field>
            )}
            />

          </FieldGroup>
          

          <FieldSeparator />

          {/* Item title and description section */}
          <FieldGroup>
            {/* Item Name Input */}
            <Controller
              name = "itemName"
              control = {form.control}
              render = { ({field, fieldState}) => (
              <Field data-invalid = {fieldState.invalid}>
                <FieldLabel htmlFor="title">Item Name</FieldLabel>
                <Input id={field.name} {...field} aria-invalid = {fieldState.invalid} type="text" placeholder="e.g. Vintage Nike Windbreaker Jacket" />
                {fieldState.invalid && (
                  <FieldError errors = {[fieldState.error]} />
                )}
              </Field>
              )}
            />
            {/* Item Description Input */}
            <Controller
              name="description"
              control = {form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid = {fieldState.invalid}>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea
                    {...field}
                    id={field.name}
                    aria-invalid = {fieldState.invalid}
                    placeholder="Describe your item in detail (e.g. brand, measurements, condition, etc.)"
                    rows={4}
                  />
                  {fieldState.invalid && (
                    <FieldError errors = {[fieldState.error]} />
                  )}
                </Field>  
              )}
            />
          </FieldGroup>

          <FieldSeparator />

          {/* Item Details Section */}
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              {/* Condition Select */}
              <Controller
                name="condition"
                control={form.control}
                render={({ field: { onChange, onBlur, ...field }, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="condition">Condition</FieldLabel>
                    <Select {...field} onValueChange={onChange}>
                      <SelectTrigger onBlur={onBlur} aria-invalid={fieldState.invalid}>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Conditions</SelectLabel>
                          {['New', 'Gently Used', 'Used', 'Poor'].map((condition) => (
                            <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />

              {/* Gender Select */}
              <Controller
                name="gender"
                control={form.control}
                render={({ field: { onChange, onBlur, ...field }, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="gender">Gender</FieldLabel>
                    <Select {...field} onValueChange={onChange}>
                      <SelectTrigger onBlur={onBlur} aria-invalid={fieldState.invalid}>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Genders</SelectLabel>
                          {['Men', 'Women', 'Unisex'].map((gender) => (
                            <SelectItem key={gender} value={gender}>{gender}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Article Type Select */}
              <Controller
                name="articleType"
                control={form.control}
                render={({ field: { onChange, onBlur, ...field }, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="articleType">Article Type</FieldLabel>
                    <Select {...field} onValueChange={onChange}>
                      <SelectTrigger onBlur={onBlur} aria-invalid={fieldState.invalid}>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Article Types</SelectLabel>
                          {['T-Shirt', 'Hoodie', 'Sweater', 'Jacket', 'Pants', 'Shorts', 'Dress', 'Skirt', 'Other'].map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />

              {/* Subcategory Select */}
              <Controller
                name="subcategory"
                control={form.control}
                render={({ field: { onChange, onBlur, ...field }, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="subcategory">Subcategory</FieldLabel>
                    <Select {...field} onValueChange={onChange}>
                      <SelectTrigger onBlur={onBlur} aria-invalid={fieldState.invalid}>
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Subcategories</SelectLabel>
                          {['Vintage', 'Streetwear', 'Designer', 'Athletic', 'Casual', 'Formal', 'Other'].map((sub) => (
                            <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Size Select */}
              <Controller
                name="size"
                control={form.control}
                render={({ field: { onChange, onBlur, ...field }, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="size">Size</FieldLabel>
                    <Select {...field} onValueChange={onChange}>
                      <SelectTrigger onBlur={onBlur} aria-invalid={fieldState.invalid}>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Sizes</SelectLabel>
                          {Object.values(Sizes).map((size: SizesType) => (
                            <SelectItem key={size} value={size}>{size}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />

              {/* Brand Select */}
              <Controller
                name="brand"
                control={form.control}
                render={({ field: { onChange, onBlur, ...field }, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="brand">Brand</FieldLabel>
                    <Select {...field} onValueChange={onChange}>
                      <SelectTrigger onBlur={onBlur} aria-invalid={fieldState.invalid}>
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Brands</SelectLabel>
                          {['Nike', 'Adidas', 'Asics', 'Puma', 'New Balance', 'Other'].map((brand) => (
                            <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
            </div>
          </FieldGroup>

          <FieldSeparator />

          {/* Pricing & Shipping Section */}
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              {/* Price Input */}
              <Controller
                name="price"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="price">Price ($)</FieldLabel>
                    <Input id={field.name} {...field} aria-invalid={fieldState.invalid} type="number" placeholder="e.g. 54.99" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Package Size Select */}
              <Controller
                name="packageSize"
                control={form.control}
                render={({ field: { onChange, onBlur, ...field }, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="packageSize">Package Size</FieldLabel>
                    <Select {...field} onValueChange={onChange}>
                      <SelectTrigger onBlur={onBlur} aria-invalid={fieldState.invalid}>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Package Sizes</SelectLabel>
                          {[
                            { value: 'xxs', label: 'Extra Extra Small', weight: 'Under 4oz' },
                            { value: 'xs', label: 'Extra Small', weight: 'Under 8oz' },
                            { value: 's', label: 'Small', weight: 'Under 12oz' },
                            { value: 'm', label: 'Medium', weight: 'Under 1lb' },
                            { value: 'l', label: 'Large', weight: 'Under 2lb' },
                            { value: 'xl', label: 'Extra Large', weight: 'Under 10lb' },
                          ].map((pkg) => (
                            <SelectItem key={pkg.value} value={pkg.value}>
                              {`${pkg.label} (${pkg.weight})`}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
            </div>
          </FieldGroup>

          <FieldSeparator />

          {/* TODO: Submit Button */}
          <FieldGroup>
            <div className="flex gap-3 justify-center">
              <Button type="submit">Submit</Button>
            </div>
          </FieldGroup>
        </FieldSet>
      </div>
    </form>
  )
}

export default App
