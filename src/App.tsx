import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowRightLeft,
  BadgeCheck,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  House,
  Leaf,
  MapPin,
  Menu,
  Plus,
  Search,
  SearchX,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  SlidersHorizontal,
  Snowflake,
  Sparkles,
  UserRound,
  Wind,
  X,
} from "lucide-react";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { categories, initialItems } from "./data/items";
import type { Category, CategoryId, Item, NewItem } from "./types";

const categoryIcons: Record<CategoryId, typeof Shirt> = {
  "ao-khoac": Wind,
  "ao-thun-so-mi": Shirt,
  "quan-jeans": UserRound,
  "vay-dam": Sparkles,
  "do-thu-dong": Snowflake,
  "phu-kien": ShoppingBag,
};

const fallbackImage = "/placeholder.svg";

function App() {
  const navigate = useNavigate();
  const [items, setItems] = useState(initialItems);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isRequestsOpen, setIsRequestsOpen] = useState(false);
  const [proposals, setProposals] = useState<Item[]>([]);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 3200);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const createListing = (draft: NewItem) => {
    const newItem: Item = {
      ...draft,
      id: `item-${Date.now()}`,
      owner: "Bạn",
      postedAt: "Vừa đăng",
    };
    setItems((current) => [newItem, ...current]);
    setIsPostOpen(false);
    setNotice("Tin trao đổi của bạn đã được đăng.");
  };

  const proposeSwap = (item: Item) => {
    setProposals((current) => [item, ...current]);
    setSelectedItem(null);
    setNotice(`Đã gửi đề xuất đổi cho "${item.title}".`);
  };

  return (
    <div className="app-shell">
      <ScrollToTop />
      <Header
        proposalCount={proposals.length}
        onCreateListing={() => setIsPostOpen(true)}
        onOpenRequests={() => setIsRequestsOpen(true)}
      />
      <Routes>
        <Route
          path="/"
          element={<HomePage items={items} onOpenItem={setSelectedItem} />}
        />
        <Route
          path="/search"
          element={<SearchPage items={items} onOpenItem={setSelectedItem} />}
        />
        <Route
          path="/category/:categoryId"
          element={
            <CategoryPage items={items} onOpenItem={setSelectedItem} />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <ItemDialog
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onPropose={proposeSwap}
      />
      {isPostOpen && (
        <CreateListingDialog
          onClose={() => setIsPostOpen(false)}
          onSubmit={createListing}
        />
      )}
      {isRequestsOpen && (
        <RequestsDialog
          proposals={proposals}
          onClose={() => setIsRequestsOpen(false)}
          onBrowse={() => {
            setIsRequestsOpen(false);
            navigate("/search?q=");
          }}
        />
      )}
      {notice && (
        <div className="toast" role="status">
          <Check size={18} />
          {notice}
        </div>
      )}
    </div>
  );
}

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, search]);

  return null;
}

function Header({
  proposalCount,
  onCreateListing,
  onOpenRequests,
}: {
  proposalCount: number;
  onCreateListing: () => void;
  onOpenRequests: () => void;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setQuery(new URLSearchParams(location.search).get("q") ?? "");
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <header className="site-header">
      <div className="header-main page-width">
        <button
          className="mobile-menu-button icon-button"
          type="button"
          aria-label={mobileMenuOpen ? "Đóng danh mục" : "Mở danh mục"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <Link className="brand" to="/" aria-label="Trạm Đổi Đồ - Trang chủ">
          <span className="brand-mark">
            <ArrowRightLeft size={21} strokeWidth={2.2} />
          </span>
          <span className="brand-copy">
            <strong>
              Trạm <span>Đổi Đồ</span>
            </strong>
            <small>Thời trang tuần hoàn</small>
          </span>
        </Link>

        <form className="header-search" role="search" onSubmit={submitSearch}>
          <Search size={18} aria-hidden="true" />
          <input
            aria-label="Tìm sản phẩm"
            placeholder="Bạn đang tìm món đồ nào?"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit" aria-label="Tìm kiếm">
            <span>Tìm kiếm</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="header-actions">
          <button
            className="request-button"
            type="button"
            onClick={onOpenRequests}
          >
            <ShieldCheck size={17} />
            <span>Yêu cầu đổi</span>
            <span className="request-count">{proposalCount}</span>
          </button>
          <button
            className="button button-primary header-post"
            type="button"
            onClick={onCreateListing}
          >
            <Plus size={17} />
            <span>Đăng tin</span>
          </button>
        </div>
      </div>

      <nav
        className={`category-nav ${mobileMenuOpen ? "is-open" : ""}`}
        aria-label="Danh mục sản phẩm"
      >
        <div className="category-nav-inner page-width">
          <Link
            className={`nav-home ${location.pathname === "/" ? "is-active" : ""}`}
            to="/"
          >
            <House size={15} />
            Trang chủ
          </Link>
          {categories.map((category) => {
            const Icon = categoryIcons[category.id];
            const active =
              location.pathname === `/category/${category.id}`;
            return (
              <Link
                className={`nav-category ${active ? "is-active" : ""}`}
                key={category.id}
                to={`/category/${category.id}`}
              >
                <Icon size={15} />
                {category.shortName}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

function HomePage({
  items,
  onOpenItem,
}: {
  items: Item[];
  onOpenItem: (item: Item) => void;
}) {
  return (
    <main>
      <section className="home-hero">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-content page-width">
          <div className="hero-copy">
            <span className="eyebrow">
              <Leaf size={15} />
              Mặc chất hơn, sống xanh hơn
            </span>
            <h1>
              Món đồ mới
              <br />
              <span>từ tủ đồ cũ.</span>
            </h1>
            <p>
              Tìm món đồ bạn yêu thích, trao đổi món đồ bạn không còn mặc.
              Mỗi lựa chọn đều giúp thời trang đi xa hơn.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/search?q=">
                Khám phá đồ đổi
                <ArrowRight size={17} />
              </Link>
              <a className="text-link" href="#categories">
                Xem danh mục <ArrowDown size={15} />
              </a>
            </div>
            <div className="hero-proof">
              <span className="proof-avatars" aria-hidden="true">
                <i>H</i>
                <i>A</i>
                <i>M</i>
              </span>
              <span>
                <strong>Cộng đồng đổi đồ tử tế</strong>
                <small>Trao đổi minh bạch, an tâm hơn</small>
              </span>
            </div>
          </div>
          <div className="hero-art" aria-label="Thời trang secondhand">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=90"
              alt="Bạn trẻ lựa chọn trang phục trong cửa hàng thời trang"
              fetchPriority="high"
              onError={(event) => {
                event.currentTarget.src = fallbackImage;
              }}
            />
            <div className="hero-note">
              <span className="hero-note-icon">
                <ShieldCheck size={19} />
              </span>
              <span>
                <strong>Đổi đồ an tâm</strong>
                <small>Mỗi món đồ đều có mô tả rõ ràng</small>
              </span>
              <BadgeCheck className="verified-icon" size={19} />
            </div>
            <span className="hero-sticker">
              <Sparkles size={15} />
              Mặc lại, yêu thêm
            </span>
          </div>
        </div>
        <div className="hero-bottom page-width">
          <span>Khám phá theo phong cách của bạn</span>
          <span className="hero-bottom-line" />
          <span className="hero-bottom-count">01 / 06</span>
        </div>
      </section>

      <section className="category-section page-width" id="categories">
        <SectionHeading
          eyebrow="Khám phá"
          title="Tìm đúng món bạn cần"
          description="Chọn một danh mục để xem toàn bộ món đồ đang chờ chủ mới."
          action={
            <Link className="text-link desktop-link" to="/search?q=">
              Tất cả sản phẩm <ArrowRight size={16} />
            </Link>
          }
        />
        <div className="category-grid">
          {categories.map((category, index) => (
            <CategoryTile
              category={category}
              index={index}
              key={category.id}
            />
          ))}
        </div>
      </section>

      <section className="featured-section page-width" id="new-arrivals">
        <SectionHeading
          eyebrow="Vừa lên kệ"
          title="Những món đồ mới nhất"
          description="Mỗi món đồ có câu chuyện riêng. Biết đâu bạn sẽ tìm thấy món tiếp theo của mình."
          action={
            <Link className="text-link desktop-link" to="/search?q=">
              Khám phá tất cả <ArrowRight size={16} />
            </Link>
          }
        />
        <ItemGrid items={items.slice(0, 8)} onOpenItem={onOpenItem} />
        <Link className="button button-outline mobile-all-button" to="/search?q=">
          Xem tất cả sản phẩm <ArrowRight size={16} />
        </Link>
      </section>

      <section className="trust-banner page-width">
        <div className="trust-icon">
          <ShieldCheck size={25} />
        </div>
        <div>
          <span className="eyebrow">Trao đổi an tâm</span>
          <h2>Mô tả rõ ràng. Kết nối tử tế.</h2>
          <p>
            Xem kỹ tình trạng, size và mong muốn trao đổi trước khi gửi đề xuất.
          </p>
        </div>
        <div className="trust-points">
          <span>
            <Check size={15} /> Thông tin minh bạch
          </span>
          <span>
            <Check size={15} /> Cộng đồng chia sẻ
          </span>
        </div>
      </section>
    </main>
  );
}

function SearchPage({
  items,
  onOpenItem,
}: {
  items: Item[];
  onOpenItem: (item: Item) => void;
}) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";
  const results = useMemo(() => {
    if (!query) return items;
    const normalizedQuery = normalizeText(query);
    const primaryMatches = items.filter((item) =>
      normalizeText(
        [
          item.title,
          item.category,
          categoryName(item.category),
          item.size,
          item.style,
          item.brand,
          item.location,
          item.owner,
        ].join(" "),
      ).includes(normalizedQuery),
    );
    if (primaryMatches.length > 0) return primaryMatches;
    return items.filter((item) =>
      normalizeText(`${item.wishlist} ${item.description}`).includes(
        normalizedQuery,
      ),
    );
  }, [items, query]);

  return (
    <CatalogPage
      key={`search-${query}`}
      eyebrow="Kết quả tìm kiếm"
      title={query ? `Kết quả cho “${query}”` : "Khám phá tất cả sản phẩm"}
      description={
        query
          ? "Những món đồ phù hợp nhất với điều bạn đang tìm."
          : "Tìm món đồ yêu thích trong tủ đồ của cộng đồng."
      }
      items={results}
      onOpenItem={onOpenItem}
      emptyTitle={`Chưa tìm thấy món đồ phù hợp với “${query}”`}
      emptyDescription="Thử một từ khóa khác như áo khoác, denim, váy hoặc size M."
      searchQuery={query}
    />
  );
}

function CategoryPage({
  items,
  onOpenItem,
}: {
  items: Item[];
  onOpenItem: (item: Item) => void;
}) {
  const { categoryId } = useParams();
  const category = categories.find((entry) => entry.id === categoryId);

  if (!category) return <Navigate to="/" replace />;

  const categoryItems = items.filter((item) => item.category === category.id);

  return (
    <CatalogPage
      key={category.id}
      eyebrow="Danh mục"
      title={category.name}
      description={category.description}
      items={categoryItems}
      onOpenItem={onOpenItem}
      category={category}
      emptyTitle="Danh mục này chưa có món đồ nào"
      emptyDescription="Hãy quay lại sau hoặc khám phá những danh mục khác."
    />
  );
}

function CatalogPage({
  eyebrow,
  title,
  description,
  items,
  onOpenItem,
  category,
  emptyTitle,
  emptyDescription,
  searchQuery,
}: {
  eyebrow: string;
  title: string;
  description: string;
  items: Item[];
  onOpenItem: (item: Item) => void;
  category?: Category;
  emptyTitle: string;
  emptyDescription: string;
  searchQuery?: string;
}) {
  const [size, setSize] = useState("all");
  const [location, setLocation] = useState("all");
  const filteredItems = items.filter(
    (item) =>
      (size === "all" || item.size === size) &&
      (location === "all" || item.location === location),
  );

  return (
    <main className="catalog-page page-width">
      <div className="breadcrumbs">
        <Link to="/">Trang chủ</Link>
        <span>/</span>
        <span>{category ? category.shortName : "Tìm kiếm"}</span>
      </div>
      <section className="catalog-heading">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {category && (
          <div className="category-heading-art">
            <img
              src={category.image}
              alt=""
              onError={(event) => {
                event.currentTarget.src = fallbackImage;
              }}
            />
            <span>{category.shortName}</span>
          </div>
        )}
      </section>

      <div className="catalog-toolbar">
        <div className="result-count">
          <SlidersHorizontal size={17} />
          <span>
            <strong>{filteredItems.length}</strong> món đồ
            {searchQuery ? ` cho “${searchQuery}”` : ""}
          </span>
        </div>
        <div className="filter-controls">
          <label>
            <span>Size</span>
            <select value={size} onChange={(event) => setSize(event.target.value)}>
              <option value="all">Tất cả</option>
              {Array.from(new Set(items.map((item) => item.size))).map(
                (itemSize) => (
                  <option key={itemSize} value={itemSize}>
                    {itemSize}
                  </option>
                ),
              )}
            </select>
            <ChevronDown size={14} />
          </label>
          <label>
            <span>Khu vực</span>
            <select
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            >
              <option value="all">Toàn quốc</option>
              {Array.from(new Set(items.map((item) => item.location))).map(
                (itemLocation) => (
                  <option key={itemLocation} value={itemLocation}>
                    {itemLocation}
                  </option>
                ),
              )}
            </select>
            <ChevronDown size={14} />
          </label>
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <ItemGrid items={filteredItems} onOpenItem={onOpenItem} />
      ) : (
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          action={
            <Link className="button button-primary" to="/">
              <ArrowLeft size={16} />
              Về trang chủ
            </Link>
          }
        />
      )}
    </main>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}

function CategoryTile({
  category,
  index,
}: {
  category: Category;
  index: number;
}) {
  const Icon = categoryIcons[category.id];

  return (
    <Link
      className={`category-tile category-tone-${index % 3}`}
      to={`/category/${category.id}`}
    >
      <span className="category-tile-icon">
        <Icon size={19} />
      </span>
      <span className="category-tile-copy">
        <strong>{category.shortName}</strong>
        <small>{category.name}</small>
      </span>
      <ArrowRight className="category-tile-arrow" size={17} />
    </Link>
  );
}

function ItemGrid({
  items,
  onOpenItem,
}: {
  items: Item[];
  onOpenItem: (item: Item) => void;
}) {
  return (
    <div className="item-grid">
      {items.map((item) => (
        <ItemCard item={item} key={item.id} onOpen={() => onOpenItem(item)} />
      ))}
    </div>
  );
}

function ItemCard({
  item,
  onOpen,
}: {
  item: Item;
  onOpen: () => void;
}) {
  return (
    <article className="item-card">
      <button
        className="item-image-button"
        type="button"
        onClick={onOpen}
        aria-label={`Xem ${item.title}`}
      >
        <img
          className="item-image"
          src={item.image}
          alt={item.title}
          loading="lazy"
          decoding="async"
          onError={(event) => {
            event.currentTarget.src = fallbackImage;
          }}
        />
        <span className="item-condition">
          <BadgeCheck size={14} />
          {item.condition}
        </span>
        <span className="item-size">Size {item.size}</span>
        <span className="item-image-shade" />
      </button>
      <div className="item-card-content">
        <div className="item-meta">
          <span>{categoryName(item.category)}</span>
          <span>
            <Clock3 size={12} />
            {item.postedAt}
          </span>
        </div>
        <button className="item-title" type="button" onClick={onOpen}>
          {item.title}
        </button>
        <div className="item-wishlist">
          <span>
            <ArrowRightLeft size={13} />
            Mong muốn đổi
          </span>
          <p>{item.wishlist}</p>
        </div>
        <div className="item-card-footer">
          <span className="item-owner">
            <i>{item.owner.charAt(0)}</i>
            {item.owner}
          </span>
          <button className="card-action" type="button" onClick={onOpen}>
            Xem món đồ <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}

function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action: ReactNode;
}) {
  return (
    <div className="empty-state">
      <span className="empty-state-icon">
        <SearchX size={26} />
      </span>
      <h2>{title}</h2>
      <p>{description}</p>
      {action}
    </div>
  );
}

function ItemDialog({
  item,
  onClose,
  onPropose,
}: {
  item: Item | null;
  onClose: () => void;
  onPropose: (item: Item) => void;
}) {
  useEffect(() => {
    if (!item) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section
        className="item-dialog modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="item-dialog-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          className="dialog-close icon-button"
          type="button"
          onClick={onClose}
          aria-label="Đóng chi tiết"
        >
          <X size={19} />
        </button>
        <img className="dialog-image" src={item.image} alt={item.title} />
        <div className="dialog-content">
          <div className="dialog-tags">
            <span>
              <BadgeCheck size={14} />
              {item.condition}
            </span>
            <span>Size {item.size}</span>
            <span>{categoryName(item.category)}</span>
          </div>
          <h2 id="item-dialog-title">{item.title}</h2>
          <p className="dialog-brand">
            {item.brand} <span>·</span> {item.style}
          </p>
          <div className="dialog-location">
            <MapPin size={15} />
            {item.location}
            <span>·</span>
            Đăng bởi {item.owner}
          </div>
          <div className="dialog-wishlist">
            <strong>
              <ArrowRightLeft size={15} />
              Mong muốn đổi lấy
            </strong>
            <p>{item.wishlist}</p>
          </div>
          <div className="dialog-description">
            <h3>Mô tả món đồ</h3>
            <p>{item.description}</p>
          </div>
          <button
            className="button button-primary dialog-propose"
            type="button"
            onClick={() => onPropose(item)}
          >
            <ArrowRightLeft size={17} />
            Đề xuất đổi món này
          </button>
        </div>
      </section>
    </div>
  );
}

function CreateListingDialog({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (item: NewItem) => void;
}) {
  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const category = formData.get("category") as CategoryId;
    const selectedCategory = categories.find((item) => item.id === category);

    onSubmit({
      title: String(formData.get("title")).trim(),
      category,
      size: String(formData.get("size")),
      style: String(formData.get("style")),
      condition: String(formData.get("condition")),
      brand: String(formData.get("brand")).trim() || "Secondhand",
      location: String(formData.get("location")),
      wishlist: String(formData.get("wishlist")).trim(),
      description: String(formData.get("description")).trim(),
      image:
        String(formData.get("image")).trim() ||
        selectedCategory?.image ||
        fallbackImage,
    });
  };

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section
        className="create-dialog modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-dialog-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="create-dialog-heading">
          <div>
            <span className="eyebrow">Chia sẻ cùng cộng đồng</span>
            <h2 id="create-dialog-title">Đăng món đồ muốn đổi</h2>
            <p>Thêm thông tin rõ ràng để tìm được người phù hợp.</p>
          </div>
          <button
            className="icon-button"
            type="button"
            onClick={onClose}
            aria-label="Đóng"
          >
            <X size={19} />
          </button>
        </div>
        <form className="listing-form" onSubmit={submitForm}>
          <label className="form-field form-full">
            Tên món đồ <span>*</span>
            <input
              name="title"
              required
              maxLength={100}
              placeholder="VD: Áo khoác denim form rộng"
            />
          </label>
          <label className="form-field">
            Danh mục <span>*</span>
            <select name="category" defaultValue="ao-khoac">
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label className="form-field">
            Size <span>*</span>
            <select name="size" defaultValue="M">
              {["XS", "S", "M", "L", "XL", "Freesize"].map((size) => (
                <option key={size}>{size}</option>
              ))}
            </select>
          </label>
          <label className="form-field">
            Tình trạng
            <select name="condition" defaultValue="Ít mặc">
              <option>Mới 95%</option>
              <option>Ít mặc</option>
              <option>Vintage</option>
            </select>
          </label>
          <label className="form-field">
            Phong cách
            <select name="style" defaultValue="Unisex / Streetwear">
              <option>Unisex / Streetwear</option>
              <option>Nữ tính / Minimalist</option>
              <option>Thanh lịch / Công sở</option>
              <option>Vintage / Retro</option>
            </select>
          </label>
          <label className="form-field">
            Thương hiệu
            <input name="brand" placeholder="VD: Levi's, Local Brand" />
          </label>
          <label className="form-field">
            Khu vực
            <select name="location" defaultValue="Đà Nẵng">
              {["Đà Nẵng", "Hà Nội", "TP.HCM", "Cần Thơ"].map((city) => (
                <option key={city}>{city}</option>
              ))}
            </select>
          </label>
          <label className="form-field form-full">
            Link ảnh
            <input name="image" type="url" placeholder="https://..." />
          </label>
          <label className="form-field form-full">
            Bạn muốn đổi lấy gì? <span>*</span>
            <input
              name="wishlist"
              required
              placeholder="VD: Áo sơ mi size M hoặc túi tote"
            />
          </label>
          <label className="form-field form-full">
            Mô tả món đồ <span>*</span>
            <textarea
              name="description"
              rows={3}
              required
              placeholder="Chất liệu, số lần sử dụng, tình trạng thực tế..."
            />
          </label>
          <div className="form-footer form-full">
            <p>
              <ShieldCheck size={16} />
              Mô tả trung thực để mọi cuộc trao đổi đều an tâm.
            </p>
            <button className="button button-primary" type="submit">
              <Plus size={17} />
              Đăng tin đổi đồ
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function RequestsDialog({
  proposals,
  onClose,
  onBrowse,
}: {
  proposals: Item[];
  onClose: () => void;
  onBrowse: () => void;
}) {
  return (
    <div className="modal-backdrop modal-backdrop-end" onMouseDown={onClose}>
      <section
        className="requests-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="requests-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="requests-heading">
          <div className="requests-heading-icon">
            <ShieldCheck size={19} />
          </div>
          <div>
            <h2 id="requests-title">Yêu cầu đổi đồ</h2>
            <p>Theo dõi những món bạn quan tâm</p>
          </div>
          <button
            className="icon-button"
            type="button"
            onClick={onClose}
            aria-label="Đóng yêu cầu đổi"
          >
            <X size={19} />
          </button>
        </div>
        {proposals.length === 0 ? (
          <div className="requests-empty">
            <span>
              <ArrowRightLeft size={23} />
            </span>
            <h3>Bạn chưa có yêu cầu nào</h3>
            <p>
              Khám phá các món đồ và gửi đề xuất trao đổi khi bạn tìm thấy món
              mình thích.
            </p>
            <button
              className="button button-primary"
              type="button"
              onClick={onBrowse}
            >
              Khám phá đồ đổi <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div className="request-list">
            {proposals.map((item) => (
              <article className="request-item" key={`${item.id}-${item.title}`}>
                <img src={item.image} alt="" />
                <div>
                  <strong>{item.title}</strong>
                  <span>
                    <Check size={13} />
                    Đã gửi đề xuất
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
        <div className="requests-safe">
          <ShieldCheck size={15} />
          Trao đổi minh bạch, an toàn cho cả hai bên
        </div>
      </section>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main page-width">
        <div className="footer-brand">
          <Link className="brand brand-light" to="/">
            <span className="brand-mark">
              <ArrowRightLeft size={21} />
            </span>
            <span className="brand-copy">
              <strong>
                Trạm <span>Đổi Đồ</span>
              </strong>
              <small>Thời trang tuần hoàn</small>
            </span>
          </Link>
          <p>
            Kết nối những món đồ đẹp với chủ nhân mới và cùng nhau chọn cách
            tiêu dùng bền vững hơn.
          </p>
          <span className="footer-location">
            <MapPin size={15} />
            Đà Nẵng · Hà Nội · TP.HCM
          </span>
        </div>
        <div className="footer-links">
          <strong>Khám phá</strong>
          <Link to="/">Trang chủ</Link>
          <Link to="/search?q=">Tất cả món đồ</Link>
          <a href="/#categories">Danh mục</a>
        </div>
        <div className="footer-links">
          <strong>Cộng đồng</strong>
          <span>Trao đổi tử tế</span>
          <span>Thời trang tuần hoàn</span>
          <span>Hỗ trợ: hotro@tramdoido.vn</span>
        </div>
      </div>
      <div className="footer-bottom page-width">
        <span>© 2026 Trạm Đổi Đồ. Mặc lại, yêu thêm.</span>
        <span>
          <CircleHelp size={14} />
          Cùng nhau trao đổi an tâm
        </span>
      </div>
    </footer>
  );
}

function categoryName(id: CategoryId) {
  return categories.find((category) => category.id === id)?.shortName ?? id;
}

function normalizeText(value: string) {
  return value
    .toLocaleLowerCase("vi")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
}

export default App;
