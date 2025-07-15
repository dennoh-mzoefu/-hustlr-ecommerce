import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "./ProductCard.css";

const ProductCard = ({ product, onAddToCart }) => {
    const isAvailable = product.rating?.count > 0 ?? true;

    const getVariants = (category) => {
        switch (category) {
            case "men's clothing":
            case "women's clothing":
                return ["S", "M", "L", "XL"];
            case "jewelery":
                return ["Gold", "Silver", "Platinum"];
            case "electronics":
                return ["Black", "White", "Gray"];
            default:
                return ["Standard"];
        }
    };

    const variants = getVariants(product.category);
    const [selectedVariant, setSelectedVariant] = useState(variants[0]);

    return (
        <div className="col-md-4 col-sm-6 col-12 mb-4 d-flex align-items-stretch">
            <div className="card product-card shadow-sm border-0 w-100 h-100" >
                <img
                    src={product.image}
                    alt={product.title}
                    className="card-img-top p-3 bg-light"
                    style={{ height: "280px", objectFit: "contain" }}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-semibold text-truncate" title={product.title}>
                        {product.title}
                    </h5>
                    <p className="card-text text-muted small mb-2">
                        {product.description.substring(0, 80)}...
                    </p>

                    <div className="text-primary fw-bold fs-5 mb-2">${product.price}</div>

                    <div className="mb-3">
                        <label htmlFor={`variant-${product.id}`} className="form-label small fw-medium">
                            Choose Variant:
                        </label>
                        <select
                            id={`variant-${product.id}`}
                            className="form-select form-select-sm"
                            value={selectedVariant}
                            onChange={(e) => setSelectedVariant(e.target.value)}
                        >
                            {variants.map((variant) => (
                                <option key={variant} value={variant}>
                                    {variant}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-auto d-flex justify-content-between gap-2">
                        <Link
                            to={`/product/${product.id}`}
                            className="btn btn-outline-primary btn-sm flex-fill"
                        >
                            View
                        </Link>
                        {isAvailable ? (
                            <button
                                className="btn btn-glow btn-sm flex-fill"
                                onClick={() => {
                                    toast.success(`Added to cart (${selectedVariant})`);
                                    onAddToCart({ ...product, selectedVariant });
                                }}
                            >
                                Add to Cart
                            </button>


                        ) : (
                            <button className="btn btn-secondary btn-sm flex-fill" disabled>
                                Out of Stock
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ProductCard;
