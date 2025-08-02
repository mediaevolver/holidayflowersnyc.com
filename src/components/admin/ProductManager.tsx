'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus, Image as ImageIcon } from 'lucide-react';
import ProductForm from './ProductForm';

interface ProductManagerProps {
  category: 'plants' | 'orchids' | 'seasonal' | 'rentals';
  title: string;
}

export default function ProductManager({ category, title }: ProductManagerProps) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`/api/admin/products?category=${category}`);
      if (response.ok) {
        const result = await response.json();
        setProducts(result.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (productData: any) => {
    try {
      const action = editingProduct ? 'update' : 'add';
      const response = await fetch('/api/admin/products/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          product: productData,
          action
        }),
      });

      if (response.ok) {
        await fetchProducts(); // Refresh the list
        setShowForm(false);
        setEditingProduct(null);
        alert(`Product ${action}ed successfully!`);
      } else {
        alert('Save failed');
      }
    } catch (error) {
      alert('Save error');
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (product: any) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch('/api/admin/products/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          product: { id: product.id },
          action: 'delete'
        }),
      });

      if (response.ok) {
        await fetchProducts();
        alert('Product deleted successfully!');
      } else {
        alert('Delete failed');
      }
    } catch (error) {
      alert('Delete error');
    }
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  if (showForm) {
    return (
      <ProductForm
        category={category}
        product={editingProduct}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            {title} ({products.length})
          </CardTitle>
          <Button onClick={handleAddNew} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {products.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No {category} found. Add your first product!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product: any) => (
              <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  {product.image && (
                    <img
                      src={`/images/${product.image}`}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary">
                        {product.category}
                      </Badge>
                      {product.featured && (
                        <Badge variant="default">Featured</Badge>
                      )}
                      {!product.inStock && (
                        <Badge variant="destructive">Out of Stock</Badge>
                      )}
                      {category === 'plants' && product.price && (
                        <Badge variant="outline">${product.price}</Badge>
                      )}
                      {category === 'rentals' && product.dailyRate && (
                        <Badge variant="outline">${product.dailyRate}/day</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(product)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(product)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}