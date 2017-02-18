CREATE TABLE allergens (
  id INTEGER PRIMARY KEY,
  description TEXT
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  ean VARCHAR(15),
  name TEXT
);

CREATE TABLE products_allergens (
  product_id INTEGER REFERENCES products(id),
  allergen_id INTEGER REFERENCES allergens(id),
  type VARCHAR(10)
);

INSERT INTO allergens (id, description) VALUES
  (1, 'obiloviny obsahující lepek a výrobky z nich'),
  (2, 'korýši a výrobky z nich'),
  (3, 'vejce a výrobky z nich'),
  (4, 'ryby a výrobky z nich'),
  (5, 'podzemnice olejná (arašídy) a výrobky z ní'),
  (6, 'sójové boby (sója) a výrobky z nich'),
  (7, 'mléko a výrobky z nich'),
  (8, 'skořápkové plody a výrobky z nich – všechny druhy ořechů'),
  (9, 'celer a výrobky z něj'),
  (10, 'hořčice a výrobky z ní'),
  (11, 'sezamová semena (sezam) a výrobky z nich'),
  (12, 'oxid siřičitý a siřičitany v koncentracích oxidu siřičitého vyšších než 10 mg/kg'),
  (13, 'vlčí bob (lupina) a výrobky z něj'),
  (14, 'měkkýši a výrobky z nich');

INSERT INTO products (id, ean, name) VALUES
  (1, '8593807234713', 'OLMA Mléko čersrvé 1,5l');

INSERT INTO products_allergens (product_id, allergen_id, type) VALUES
  (1, 7, 'contains');
