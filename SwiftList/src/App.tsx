import { useState } from 'react'
import './App.css'
import type { ExtensionMessage } from "./types";
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

//convert the file to base64 string
function fileToBase64(file: File): Promise<string>
{
  return new Promise( (resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string); //callback when the file is read successfully -> return the base64 string
    reader.onerror = () => reject(new Error("Failed to read file")); //callback when the file is read unsuccessfully
    reader.readAsDataURL(file); //read the file as a data URL
  })
}

async function openDepop(file: File | null): Promise<void>
{
  if (!file)
      return;
  const base64Image = await fileToBase64(file);
  const message: ExtensionMessage = {action: "openDepop", base64Image: base64Image};
  chrome.runtime.sendMessage(message);
}

async function openGrailed(file: File | null): Promise<void>
{
  if (!file)
    return;
  const base64Image = await fileToBase64(file);
  const message: ExtensionMessage = {action: "openGrailed", base64Image: base64Image};
  chrome.runtime.sendMessage(message);
}


function App() {
  const [images, setImages] = useState<File[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const newImages = Array.from(files);
    const totalImages = [...images, ...newImages].slice(0, 8); // Max 8 images
    setImages(totalImages);
    
    // Browsers do not fire the onChange event for a file input if the user selects the same image again
    // Reset the input value so that the user can select the same image again
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
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
          <Field>
            <FieldLabel htmlFor="marketplaces">Marketplaces</FieldLabel>
            <div className="grid grid-cols-3 gap-3">
              <Label className="hover:bg-accent/50 flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors has-aria-checked:border-blue-600 has-aria-checked:bg-blue-950">
                <Checkbox
                  id="platform-depop"
                  defaultChecked
                  className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
                />
                <div className="flex items-center gap-2">
                  <img src={depopLogo} alt="depop" className="w-6 h-6" />
                  <span className="text-sm font-medium">Depop</span>
                </div>
              </Label>
            
            <Label className="hover:bg-accent/50 flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors has-aria-checked:border-blue-600 has-aria-checked:bg-blue-950">
              <Checkbox
                id="platform-grailed"
                defaultChecked
                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
              />
              <div className="flex items-center gap-2">
                <img src={grailedLogo} alt="grailed" className="w-6 h-6" />
                <span className="text-sm font-medium">Grailed</span>
              </div>
            </Label>

            <Label className="hover:bg-accent/50 flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors has-aria-checked:border-blue-600 has-aria-checked:bg-blue-950">
              <Checkbox
                id="platform-mercari"
                defaultChecked
                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
              />
              <div className="flex items-center gap-2">
                <img src={mercariLogo} alt="mercari" className="w-6 h-6" />
                <span className="text-sm font-medium">Mercari</span>
              </div>
            </Label>
            </div>
          </Field>
        </FieldGroup>

        <FieldSeparator />

        {/* Image Upload Section */}
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="images">Photos ({images.length}/8)</FieldLabel>
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
        </FieldGroup>
        

        <FieldSeparator />

        {/* Item title and description section */}
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="title">Item Name</FieldLabel>
            <Input id="title" type="text" placeholder="e.g. Vintage Nike Windbreaker Jacket" />
          </Field>

          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              placeholder="Describe your item in detail (e.g. brand, measurements, condition, etc.)"
              rows={4}
            />
          </Field>
        </FieldGroup>

        <FieldSeparator />

        {/* Item Details Section */}
        <FieldGroup>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="condition">Condition</FieldLabel>
              <Select>
                <SelectTrigger>
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

            <Field>
              <FieldLabel htmlFor="gender">Gender</FieldLabel>
              <Select>
                <SelectTrigger>
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="articleType">Article Type</FieldLabel>
              <Select>
                <SelectTrigger>
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

            <Field>
              <FieldLabel htmlFor="subcategory">Subcategory</FieldLabel>
              <Select>
                <SelectTrigger>
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="size">Size</FieldLabel>
              <Select>
                <SelectTrigger>
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

            <Field>
              <FieldLabel htmlFor="brand">Brand</FieldLabel>
              <Select>
                <SelectTrigger>
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
          </div>
        </FieldGroup>

        <FieldSeparator />

        {/* Pricing & Shipping Section */}
        <FieldGroup>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="price">Price ($)</FieldLabel>
              <Input id="price" type="number" placeholder="e.g. 54.99" />
            </Field>

            <Field>
              <FieldLabel htmlFor="packageSize">Package Size</FieldLabel>
              <Select>
                <SelectTrigger>
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
          </div>
        </FieldGroup>

        <FieldSeparator />

        {/* TODO: Submit Button */}
        <FieldGroup>
          <div className="flex gap-3 justify-center">
            <Button>Submit</Button>
          </div>
        </FieldGroup>
      </FieldSet>
    </div>
  )
}

export default App
