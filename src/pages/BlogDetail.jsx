import { NavLink, useParams } from "react-router";
import { BLOGS } from "../data/blogs";
import { ROUTE_PATHS } from "../utils/constants";

function BlogDetail() {
  const { id } = useParams();
  const blog = BLOGS.find((b) => b.id === parseInt(id));

  if (!blog) {
    return <p>Blog no encontrado. <NavLink to={ROUTE_PATHS.BLOGS}>Volver a Blogs</NavLink></p>;
  }

  return (
    <article className="mx-auto" style={{ maxWidth: 760 }}>
      <h1>{blog.title}</h1>
      <p className="text-muted">{blog.date}</p>
      <img src={blog.image} alt={`Imagen del blog ${blog.title}`} className="img-fluid rounded mb-4" />
      {blog.content.map((parrafo, i) => <p key={i}>{parrafo}</p>)}
      <NavLink to={ROUTE_PATHS.BLOGS}>← Volver a Blogs</NavLink>
    </article>
  );
}

export default BlogDetail;
