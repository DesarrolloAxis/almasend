CREATE TYPE lead_type AS ENUM ('comprador', 'proveedor');

CREATE TABLE leads (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  business_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  type lead_type NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX leads_created_at_idx ON leads (created_at DESC);
