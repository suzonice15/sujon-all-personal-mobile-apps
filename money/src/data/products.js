export const productImages = [
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1544717305-2782542b9136?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1546868871-af0de0ae72b8?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop',
];

const toBengaliDigits = (value) => String(value).replace(/\d/g, (digit) => '০১২৩৪৫৬৭৮৯'[digit]);

export const products = [
  { id: '1', title: 'নবীদের গল্প', price: '150', coinPrice: '15000', category: 'book', seller: 'Money Income BD', rating: 4.5, sold: 230 },
  { id: '2', title: 'কুরআন তাফসির', price: '200', coinPrice: '20000', category: 'book', seller: 'Money Income BD', rating: 4.8, sold: 180 },
  { id: '3', title: 'টি-শার্ট (হোয়াইট)', price: '350', coinPrice: '35000', category: 'clothing', seller: 'Money Income BD', rating: 4.3, sold: 90 },
  { id: '4', title: 'হেডফোন', price: '500', coinPrice: '50000', category: 'electronics', seller: 'Money Income BD', rating: 4.6, sold: 150 },
  { id: '5', title: 'ইসলামিক ক্যালেন্ডার', price: '80', coinPrice: '8000', category: 'others', seller: 'Money Income BD', rating: 4.2, sold: 310 },
  { id: '6', title: 'পাঞ্জাবি (নেভি)', price: '450', coinPrice: '45000', category: 'clothing', seller: 'Money Income BD', rating: 4.7, sold: 75 },
  { id: '7', title: 'মিসওয়াক', price: '30', coinPrice: '3000', category: 'others', seller: 'Money Income BD', rating: 4.1, sold: 500 },
  { id: '8', title: 'আতর (মিশক)', price: '250', coinPrice: '25000', category: 'others', seller: 'Money Income BD', rating: 4.9, sold: 420 },
  { id: '9', title: 'সীরাতুন নবী', price: '180', coinPrice: '18000', category: 'book', seller: 'Money Income BD', rating: 4.8, sold: 260 },
  { id: '10', title: 'ব্লুটুথ স্পিকার', price: '650', coinPrice: '65000', category: 'electronics', seller: 'Money Income BD', rating: 4.4, sold: 120 },
].map((product) => ({
  ...product,
  price: toBengaliDigits(product.price),
  coinPrice: toBengaliDigits(product.coinPrice),
}));

export const productBackgroundColors = [
  '#FEE2E2', '#DBEAFE', '#D1FAE5', '#FEF3C7', '#E0E7FF',
  '#FCE7F3', '#EDE9FE', '#FEE2E2', '#D1FAE5', '#FEF3C7',
];
