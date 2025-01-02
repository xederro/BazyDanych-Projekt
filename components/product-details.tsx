'use client'

interface ProductProp {
  product?:
  {
    product_id: number,
    name: string,
    price: number,
    description: string,
    specification: string,
  }
}

export function ProductDetails({product}: ProductProp) {
  return (
    <>
      <div className="grid md:grid-cols-1 gap-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-2xl font-bold text-gray-900 mb-6">{product.price.toFixed(2)}zł</p>
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Specifications</h2>
              <ul className="space-y-2">
                {Object.entries(product.specification).map(([k, v]) => (
                  <li key={k} className="flex justify-between">
                    <span className="font-medium" style={{textTransform: "capitalize"}}>{k.replaceAll("_", " ")}:</span>
                    <span className="text-gray-600">{v}</span>
                  </li>
                  ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}