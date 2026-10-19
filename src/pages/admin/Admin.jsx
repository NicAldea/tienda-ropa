import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row, Table } from "react-bootstrap";
import { useSession } from "../../hooks/useSession";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../../services/products";
import { CATEGORIES } from "../../utils/constants";
import { formatPrice } from "../../utils/formatters";

const EMPTY = { code: "", name: "", price: "", stock: "", criticalStock: "", category: CATEGORIES[0], image: "/img/", description: "" };

function Admin() {
  const { userSession } = useSession();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  // READ: se carga la lista al entrar y cada vez que algo cambia
  const reload = () => getProducts().then(setProducts);
  useEffect(() => { reload(); }, []);

  if (userSession?.role !== "admin") {
    return <Alert variant="warning">Solo un administrador puede ver esta página. Inicia sesión con admin@duoc.cl.</Alert>;
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.code.trim() || !form.name.trim() || Number(form.price) <= 0 || Number(form.stock) < 0) {
      setError("Código y nombre son obligatorios, el precio debe ser mayor a 0 y el stock no puede ser negativo");
      return;
    }
    setError("");
    // Los inputs entregan texto: se convierten a número antes de guardar
    const data = { ...form, price: Number(form.price), stock: Number(form.stock), criticalStock: Number(form.criticalStock) };
    if (editingId) {
      await updateProduct(editingId, data);   // UPDATE
    } else {
      await createProduct(data);              // CREATE
    }
    setForm(EMPTY);
    setEditingId(null);
    reload();
  };

  const handleEdit = (p) => {
    setEditingId(p.id);
    setForm({ ...p, price: String(p.price), stock: String(p.stock), criticalStock: String(p.criticalStock) });
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);                  // DELETE
    reload();
  };

  return (
    <>
      <h1>Administración de productos</h1>
      <hr />
      <h2 className="h5">{editingId ? `Editando producto #${editingId}` : "Nuevo producto"}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit} className="mb-4">
        <Row className="g-2">
          <Col xs={6} md={2}><Form.Control name="code" placeholder="Código" value={form.code} onChange={handleChange} aria-label="Código" /></Col>
          <Col xs={6} md={4}><Form.Control name="name" placeholder="Nombre" value={form.name} onChange={handleChange} aria-label="Nombre" /></Col>
          <Col xs={4} md={2}><Form.Control name="price" type="number" placeholder="Precio" value={form.price} onChange={handleChange} aria-label="Precio" /></Col>
          <Col xs={4} md={2}><Form.Control name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} aria-label="Stock" /></Col>
          <Col xs={4} md={2}><Form.Control name="criticalStock" type="number" placeholder="Stock crítico" value={form.criticalStock} onChange={handleChange} aria-label="Stock crítico" /></Col>
          <Col xs={12} md={3}>
            <Form.Select name="category" value={form.category} onChange={handleChange} aria-label="Categoría">
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </Form.Select>
          </Col>
          <Col xs={12} md={3}><Form.Control name="image" placeholder="/img/archivo.jpg" value={form.image} onChange={handleChange} aria-label="Imagen" /></Col>
          <Col xs={12} md={6}><Form.Control name="description" placeholder="Descripción" value={form.description} onChange={handleChange} aria-label="Descripción" /></Col>
        </Row>
        <div className="d-flex gap-2 mt-2">
          <Button type="submit">{editingId ? "Guardar cambios" : "Crear producto"}</Button>
          {editingId && <Button variant="secondary" onClick={() => { setEditingId(null); setForm(EMPTY); }}>Cancelar</Button>}
        </div>
      </Form>
      <Table responsive striped className="align-middle">
        <thead><tr><th>Código</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr></thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className={p.stock <= p.criticalStock ? "table-warning" : ""}>
              <td>{p.code}</td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{formatPrice(p.price)}</td>
              <td>{p.stock}{p.stock <= p.criticalStock && " ⚠️ crítico"}</td>
              <td className="d-flex gap-2">
                <Button size="sm" variant="outline-primary" onClick={() => handleEdit(p)}>Editar</Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(p.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Admin;
