import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    title: "The first book",
    description: "the first book i ever read",
    price: 6,
  },
  {
    id: "p2",
    title: "The second book",
    description: "the second book i ever read",
    price: 9,
  },
  {
    id: "p3",
    title: "The third book",
    description: "the third book i ever read",
    price: 12,
  },
];
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
