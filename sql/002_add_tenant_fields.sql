CREATE TYPE lead_plan AS ENUM ('almacen', 'minimarket', 'supermercado');

ALTER TABLE leads
  ADD COLUMN business_rut TEXT,
  ADD COLUMN business_address TEXT,
  ADD COLUMN city TEXT,
  ADD COLUMN needs_invoicing BOOLEAN,
  ADD COLUMN is_cencocal_client BOOLEAN,
  ADD COLUMN plan lead_plan;
