import Link from "next/link";
import { Button } from "@/components/ui/button";

const productCategories = [
  {
    name: "Medicines",
    slug: "Medicines",
    image:
      "https://plus.unsplash.com/premium_photo-1670240794513-1b8a6a9ce016?q=80&w=2815&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Medicines",
    slug: "Medicines",
    image:
      "https://plus.unsplash.com/premium_photo-1670240794513-1b8a6a9ce016?q=80&w=2815&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Medicines",
    slug: "Medicines",
    image:
      "https://plus.unsplash.com/premium_photo-1670240794513-1b8a6a9ce016?q=80&w=2815&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Medicines",
    slug: "Medicines",
    image:
      "https://plus.unsplash.com/premium_photo-1670240794513-1b8a6a9ce016?q=80&w=2815&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function ProductCategorySection() {
  return (
    <section className="flex flex-col gap-4 mt-5">
      <div className="flex items-baseline justify-between">
        <h1 className="font-semibold text-lg">Product Category Section</h1>

        <Link href="/categories">
          <Button variant="link">View All</Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {productCategories.map((category, index) => (
          <ProductCategoryCard key={index} {...category} />
        ))}
      </div>
    </section>
  );
}

function ProductCategoryCard({
  image,
  name,
  slug,
}: {
  image: string;
  name: string;
  slug: string;
}) {
  return (
    <Link
      to={`/categories/${slug}`}
      className="p-2.5 bg-primary/5 shadow-md rounded-xl"
    >
      <img src={image} alt={name} />
      <h1 className="font-medium text-lg text-center">{name}</h1>
    </Link>
  );
}

export default ProductCategorySection;
