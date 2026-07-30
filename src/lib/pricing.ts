export type PricingTier = {
  name: string;
  price: string;
  priceNote?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaLabel: string;
};

export const pricingTiers: PricingTier[] = [
  {
    name: "Almacén",
    price: "$25.000",
    priceNote: "/mes neto · $833/día",
    description: "Para el almacén de barrio que parte con lo esencial.",
    features: [
      "1 usuario",
      "POS + Inventario",
      "DTEs incluidos",
      "Soporte N1",
    ],
    ctaLabel: "Solicitar Demo",
  },
  {
    name: "Minimarket",
    price: "$49.990",
    priceNote: "/mes neto · $1.666/día",
    description: "El plan más elegido por minimarkets con equipo.",
    features: [
      "5 usuarios",
      "DTEs ilimitados",
      "Reportes avanzados",
      "Soporte prioritario",
    ],
    highlighted: true,
    ctaLabel: "Solicitar Demo",
  },
  {
    name: "Supermercado",
    price: "Cotizar",
    description: "Para cadenas y operaciones multi-sucursal.",
    features: [
      "Usuarios ilimitados",
      "Multi-sucursal",
      "Integraciones custom",
      "Soporte 24/7 + Cloud independiente",
    ],
    ctaLabel: "Conversemos",
  },
];

export const pricingLegalNote =
  "Precio neto. IVA 19% adicional. DTEs adicionales: 0.4 UF por cada 1.000. Setup facturador Almasend: 2 UF + IVA (pago único). Prueba gratis: 30 días sin tarjeta de crédito.";
