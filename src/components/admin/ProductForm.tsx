'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, X, Save } from 'lucide-react';

interface ProductFormProps {
  category: 'plants' | 'orchids' | 'seasonal' | 'rentals';
  product?: any;
  onSave: (product: any) => void;
  onCancel: () => void;
}

export default function ProductForm({ category, product, onSave, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState(product || {
    id: '',
    name: '',
    image: '',
    description: '',
    category: '',
    inStock: true,
    featured: false,
    ...(category === 'plants' && { slug: '', price: 0 }),
    ...(category === 'seasonal' && { season: '' }),
    ...(category === 'rentals' && { 
      size: 'medium',
      dailyRate: 0,
      weeklyRate: 0,
      monthlyRate: 0,
      type: 'plant',
      care: 'medium',
      minDuration: 1
    })
  });
  
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        handleInputChange('image', result.filename);
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      alert('Upload error');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Generate ID if it's a new product
      if (!formData.id) {
        const timestamp = Date.now();
        const id = category === 'plants' ? timestamp : `${category}-${timestamp}`;
        formData.id = id;
      }

      // Generate slug for plants if not provided
      if (category === 'plants' && !formData.slug) {
        formData.slug = formData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      }

      await onSave(formData);
    } catch (error) {
      alert('Save failed');
    } finally {
      setSaving(false);
    }
  };

  // Get category options based on product type
  const getCategoryOptions = () => {
    switch (category) {
      case 'plants':
        return ['succulents', 'ficus', 'tropical', 'topiary', 'flowering'];
      case 'orchids':
        return ['white', 'purple', 'mixed', 'pink', 'yellow', 'colorful'];
      case 'seasonal':
        return ['holiday', 'spring', 'summer', 'fall', 'winter'];
      case 'rentals':
        return ['event', 'office', 'wedding', 'corporate'];
      default:
        return [];
    }
  };

  const getSeasonOptions = () => {
    return ['spring', 'summer', 'fall', 'winter', 'holiday'];
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {product ? 'Edit' : 'Add New'} {category.charAt(0).toUpperCase() + category.slice(1, -1)}
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <Input
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Product name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            >
              <option value="">Select category</option>
              {getCategoryOptions().map(option => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Plant-specific fields */}
        {category === 'plants' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Slug</label>
              <Input
                value={formData.slug}
                onChange={(e) => handleInputChange('slug', e.target.value)}
                placeholder="product-slug"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <Input
                type="number"
                value={formData.price || ''}
                onChange={(e) => handleInputChange('price', Number(e.target.value))}
                placeholder="0"
              />
            </div>
          </div>
        )}

        {/* Seasonal-specific fields */}
        {category === 'seasonal' && (
          <div>
            <label className="block text-sm font-medium mb-1">Season</label>
            <select
              value={formData.season}
              onChange={(e) => handleInputChange('season', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select season</option>
              {getSeasonOptions().map(option => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Rental-specific fields */}
        {category === 'rentals' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Size</label>
                <select
                  value={formData.size}
                  onChange={(e) => handleInputChange('size', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="plant">Plant</option>
                  <option value="arrangement">Arrangement</option>
                  <option value="display">Display</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Care Level</label>
                <select
                  value={formData.care}
                  onChange={(e) => handleInputChange('care', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Daily Rate</label>
                <Input
                  type="number"
                  value={formData.dailyRate || ''}
                  onChange={(e) => handleInputChange('dailyRate', Number(e.target.value))}
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Weekly Rate</label>
                <Input
                  type="number"
                  value={formData.weeklyRate || ''}
                  onChange={(e) => handleInputChange('weeklyRate', Number(e.target.value))}
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Monthly Rate</label>
                <Input
                  type="number"
                  value={formData.monthlyRate || ''}
                  onChange={(e) => handleInputChange('monthlyRate', Number(e.target.value))}
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Minimum Duration (days)</label>
              <Input
                type="number"
                value={formData.minDuration || ''}
                onChange={(e) => handleInputChange('minDuration', Number(e.target.value))}
                placeholder="1"
              />
            </div>
          </>
        )}

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Product description"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">Product Image</label>
          <div className="flex items-center space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              {uploading ? 'Uploading...' : 'Upload Image'}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            {formData.image && (
              <Badge variant="secondary">
                {formData.image}
              </Badge>
            )}
          </div>
          {formData.image && (
            <div className="mt-2">
              <img
                src={`/images/${formData.image}`}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border"
              />
            </div>
          )}
        </div>

        {/* Toggles */}
        <div className="flex items-center space-x-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.inStock}
              onChange={(e) => handleInputChange('inStock', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm font-medium">In Stock</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => handleInputChange('featured', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm font-medium">Featured</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : 'Save Product'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}