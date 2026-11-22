import type { Category, Item } from "../types";

export const categories: Category[] = [
  {
    id: "ao-khoac",
    name: "Áo khoác denim / jacket",
    shortName: "Áo khoác",
    description: "Jacket, denim, bomber và những lớp khoác cá tính.",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "ao-thun-so-mi",
    name: "Áo thun / sơ mi",
    shortName: "Áo thun & sơ mi",
    description: "Những món cơ bản dễ phối cho mọi ngày.",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "quan-jeans",
    name: "Quần jeans / quần tây",
    shortName: "Quần",
    description: "Tìm chiếc quần vừa vặn, hợp phong cách của bạn.",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "vay-dam",
    name: "Váy / đầm",
    shortName: "Váy & đầm",
    description: "Váy nhẹ nhàng, đầm đi tiệc và nhiều hơn nữa.",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "do-thu-dong",
    name: "Đồ thu đông / len",
    shortName: "Đồ thu đông",
    description: "Cardigan, áo len và những món đồ ấm áp.",
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "phu-kien",
    name: "Phụ kiện thời trang",
    shortName: "Phụ kiện",
    description: "Túi xách, giày và điểm nhấn cho bộ trang phục.",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=85",
  },
];

export const initialItems: Item[] = [
  {
    id: "item-1",
    title: "Áo khoác Denim Trucker Jacket Wash Xanh Retro",
    category: "ao-khoac",
    size: "L",
    style: "Unisex / Streetwear",
    condition: "Mới 95%",
    brand: "Levi's",
    location: "Đà Nẵng",
    owner: "Đức Huy",
    postedAt: "2 giờ trước",
    wishlist: "Quần jeans ống suông size L hoặc áo sơ mi kẻ sọc",
    description:
      "Chất vải denim 100% cotton dày dặn, giữ form đẹp, màu wash xanh cổ điển. Mặc được khoảng 4-5 lần, không sờn rách, khuy kim loại sáng bóng.",
    image:
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "item-2",
    title: "Đầm Midi Linen Tay Phồng Cổ Vuông Màu Kem",
    category: "vay-dam",
    size: "S",
    style: "Nữ tính / Minimalist",
    condition: "Ít mặc",
    brand: "Zara",
    location: "TP.HCM",
    owner: "Lan Anh",
    postedAt: "4 giờ trước",
    wishlist: "Áo sơ mi lụa/linen size S hoặc túi tote vải canvas",
    description:
      "Vải linen pha thoáng mát, ít nhăn hơn linen thuần, có lớp lót mềm mại bên trong. Mới mặc đi tiệc đúng 1 lần, đã giặt hấp sạch sẽ.",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "item-3",
    title: "Quần Jeans Ống Suông Rộng Xanh Nhạt",
    category: "quan-jeans",
    size: "M",
    style: "Unisex / Streetwear",
    condition: "Mới 95%",
    brand: "Uniqlo",
    location: "Hà Nội",
    owner: "Minh Tuấn",
    postedAt: "6 giờ trước",
    wishlist: "Áo khoác jacket kaki size M hoặc quần tây xếp ly",
    description:
      "Form suông rộng thoải mái, đường may chắc chắn, khóa kéo mượt. Hợp dáng người từ 1m65 - 1m75, 55 - 65kg.",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "item-4",
    title: "Áo Len Cardigan Dệt Kim Màu Be Ấm Áp",
    category: "do-thu-dong",
    size: "Freesize",
    style: "Nữ tính / Minimalist",
    condition: "Ít mặc",
    brand: "Local Brand",
    location: "Đà Nẵng",
    owner: "Thu Hà",
    postedAt: "1 ngày trước",
    wishlist: "Váy/đầm dáng dài Freesize hoặc khăn len/mũ len",
    description:
      "Sợi len dệt kim mịn màng, không ngứa da, giữ ấm tốt cho những ngày se lạnh hoặc phòng điều hòa. Không xù lông.",
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "item-5",
    title: "Áo Sơ Mi Oxford Tay Dài Trắng Ngà Công Sở",
    category: "ao-thun-so-mi",
    size: "M",
    style: "Thanh lịch / Công sở",
    condition: "Mới 95%",
    brand: "MUJI",
    location: "TP.HCM",
    owner: "Quốc Bảo",
    postedAt: "1 ngày trước",
    wishlist: "Quần tây ống đứng size M hoặc áo thun polo tối màu",
    description:
      "Vải Oxford dệt vân nổi đặc trưng, đứng dáng nhưng vẫn thoáng khí. Phù hợp mặc đi làm, đi gặp đối tác hoặc khoác ngoài áo thun.",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "item-6",
    title: 'Túi Tote Vải Canvas Dày Dặn Đựng Vừa Laptop 14"',
    category: "phu-kien",
    size: "Freesize",
    style: "Nữ tính / Minimalist",
    condition: "Ít mặc",
    brand: "EcoCraft",
    location: "Cần Thơ",
    owner: "Thanh Trúc",
    postedAt: "2 ngày trước",
    wishlist: "Áo thun oversized hoặc mũ lưỡi trai / khăn lụa",
    description:
      "Canvas 16oz dày dặn có đáy rộng đứng form, quai đeo bản to êm vai, bên trong có ngăn nhỏ đựng ví và chìa khóa.",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "item-7",
    title: "Áo Khoác Varsity / Bomber Phối Tay Da Lộn",
    category: "ao-khoac",
    size: "XL",
    style: "Vintage / Retro",
    condition: "Vintage",
    brand: "Thrift Archive",
    location: "Hà Nội",
    owner: "Văn Hùng",
    postedAt: "2 ngày trước",
    wishlist: "Quần jeans rộng size XL hoặc áo hoodie nỉ bông",
    description:
      "Phong cách retro đậm chất vintage, bo cổ và bo gấu còn đàn hồi tốt, lót chần bông nhẹ nhàng. Phù hợp phối đồ streetwear cá tính.",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "item-8",
    title: "Quần Tây Âu Ống Đứng Xếp Ly Màu Xám Tro",
    category: "quan-jeans",
    size: "L",
    style: "Thanh lịch / Công sở",
    condition: "Mới 95%",
    brand: "Mango Man",
    location: "Đà Nẵng",
    owner: "Ngọc Mai",
    postedAt: "3 ngày trước",
    wishlist: "Áo sơ mi hoặc áo khoác nhẹ size L",
    description:
      "Chất vải tuytsi co giãn nhẹ, ít nhăn, lên form đứng thẳng chân. Chưa từng cắt gấu, nguyên đường may gốc.",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "item-9",
    title: "Áo Sơ Mi Sọc Dọc Xanh Pastel Form Rộng",
    category: "ao-thun-so-mi",
    size: "M",
    style: "Thanh lịch / Công sở",
    condition: "Mới 95%",
    brand: "H&M",
    location: "Đà Nẵng",
    owner: "Đức Huy",
    postedAt: "3 ngày trước",
    wishlist: "Quần short kaki hoặc áo thun trơn size M",
    description:
      "Họa tiết sọc mảnh thanh lịch, chất cotton mát nhẹ, mặc thả dáng hoặc sơ vin đều đẹp.",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "item-10",
    title: "Giày Sneaker Retro Da Trắng Phối Đế Gum",
    category: "phu-kien",
    size: "39",
    style: "Unisex / Streetwear",
    condition: "Ít mặc",
    brand: "StreetStep",
    location: "TP.HCM",
    owner: "Lan Anh",
    postedAt: "4 ngày trước",
    wishlist: "Đầm ngắn hoặc áo hoodie nỉ bông",
    description:
      "Đôi sneaker dáng cổ điển dễ phối đồ hàng ngày, đế cao su êm chân, phần da trắng đã vệ sinh sạch sẽ.",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "item-11",
    title: "Áo Hoodie Nỉ Bông Kéo Khóa Màu Rêu Olive",
    category: "do-thu-dong",
    size: "L",
    style: "Unisex / Streetwear",
    condition: "Mới 95%",
    brand: "Rooted",
    location: "Hà Nội",
    owner: "Minh Tuấn",
    postedAt: "5 ngày trước",
    wishlist: "Quần jogger hoặc áo thun graphic size L",
    description:
      "Nỉ bông mềm mịn, mũ 2 lớp đứng form, khóa kéo mượt mà, giữ ấm tốt cho tiết trời chuyển mùa.",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "item-12",
    title: "Đầm Babydoll Caro Nhẹ Nhàng Dáng Ngắn",
    category: "vay-dam",
    size: "S",
    style: "Vintage / Retro",
    condition: "Ít mặc",
    brand: "Daisy Studio",
    location: "Cần Thơ",
    owner: "Thanh Trúc",
    postedAt: "5 ngày trước",
    wishlist: "Áo cardigan mỏng hoặc túi đeo chéo nhỏ",
    description:
      "Váy dáng babydoll che khuyết điểm vòng eo tốt, họa tiết caro tinh tế, chất vải mềm rủ.",
    image:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=85",
  },
];
